<template>
    <div class="record_list_associated_with_user">
        <div class="record_sort_container">
            <div>部屋を選択</div>
            <select v-model="selectedRoomID">
                <option
                    v-for="room in rooms"
                    :key="room.roomID"
                    :value="room.roomID"
                >
                    {{ room.roomName }}
                </option>
            </select>
            <button :disabled="!selectedRoomID" @click="filterRecord">
                選んだ部屋の記録をみる
            </button>
            <button @click="reset">リセット</button>
            <div>項目を選択</div>
            <button :disabled="!selectedScoreItemID" @click="filterItem">
                項目を選ぶ
            </button>
            <select v-model="selectedScoreItemID">
                <option
                    v-for="item in items"
                    :key="item.scoreItemID"
                    :value="item.scoreItemID"
                >
                    {{ item.scoreItemName }}
                </option>
            </select>
        </div>
        <div v-if="!ifFiltering" class="user_all_records">
            <div>平均清掃時間{{ viewAvarageCleaningTime }}</div>
            <div v-for="record in records" :key="record.recordID">
                <record-card :record-model="record" />
            </div>
        </div>
        <div v-else class="user_filtered_records">
            <div>
                この部屋の平均清掃時間{{ viewFilteredAvarageCleaningTime }}
            </div>
            <div>選んだカテゴリの平均値</div>
            <div v-for="record in resultRecords" :key="record.recordID">
                <record-card :record-model="record" />
            </div>
        </div>
        <div class="blanc"></div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import {
    millisecondToStringTime,
    RecordModel,
    RoomModel,
    ScoreItemModel,
    ScoreModel,
    UserModel,
} from 'stage3-abr'
import { userInteractor } from '~/api'
import LinkButton from '@/components/Atom/LinkButton.vue'
import RecordCard from '@/components/Organisms/record/card/index.vue'

@Component({
    layout: 'cleaner',
    components: {
        LinkButton,
        RecordCard,
    },
})
export default class UserRecordList extends Vue {
    public user: UserModel | null = null
    public records: RecordModel[] = []
    public selectedRoomID: string = ''
    public rooms: RoomModel[] = []
    public hotelID: string = ''
    public resultRecords: RecordModel[] = []
    public ifFiltering: boolean = false
    public avarageCleaningTime: number = 0
    public viewAvarageCleaningTime: string = ''
    public filteredAvarageCleaningTime: number = 0
    public viewFilteredAvarageCleaningTime: string = ''
    public items: ScoreItemModel[] = []
    public selectedScoreItemID: string = ''
    public scores: ScoreModel[] = []
    public avarageScore: number = 0

    async created() {
        this.user = await userInteractor.fetchMyUserModel()
        this.records = await userInteractor.fetchRecordsByCleanerID(
            this.user.userID
        )
        this.hotelID = this.user.userHotelID
        this.rooms = await userInteractor.fetchRoomsByHotelID(this.hotelID)
        this.items = await userInteractor.fetchScoreItemsByHotelID(
            this.hotelID
        )

        // 平均時間の算出
        const cleaningTimeResults = []
        for (let i = 0; i < this.records.length; i++) {
            cleaningTimeResults[i] = this.records[i].cleaningTime
        }
        this.avarageCleaningTime =
            cleaningTimeResults.reduce((a, b) => a + b) /
            cleaningTimeResults.length
        this.viewAvarageCleaningTime = millisecondToStringTime(
            this.avarageCleaningTime
        )

        // 平均スコアの算出
        const recordIDs = []
        for (let m = 0; m < this.records.length; m++) {
            recordIDs[m] = this.records[m].recordID
        }

        const recordScores = []
        for (let m = 0; m < this.records.length; m++) {
            recordScores[m] = await userInteractor.fetchScoresByRecordID(
                recordIDs[m]
            )
        }
        this.scores = recordScores.reduce((a, b) => [...a, ...b], [])
    }

    public filterItem() {
        const selectedScores = this.scores.filter(
            (score) => score.scoreItemID === this.selectedScoreItemID
        )
        const selectedScoresValues = []
        for (let i = 0; i < selectedScores.length; i++) {
            selectedScoresValues[i] = selectedScores[i].score
        }
        this.avarageScore =
            selectedScoresValues.reduce((a, b) => a + b) /
            selectedScoresValues.length
    }

    public filterRecord() {
        this.resultRecords = this.records.filter(
            (record) => record.cleaningRoomID === this.selectedRoomID
        )
        this.ifFiltering = true

        // 平均時間算出
        const cleaningTimeResults = []
        for (let i = 0; i < this.resultRecords.length; i++) {
            cleaningTimeResults[i] = this.resultRecords[i].cleaningTime
        }
        const reducer = (sum: number, currentValue: number) =>
            sum + currentValue
        this.filteredAvarageCleaningTime =
            cleaningTimeResults.reduce(reducer) / cleaningTimeResults.length
        this.viewFilteredAvarageCleaningTime = millisecondToStringTime(
            this.filteredAvarageCleaningTime
        )
    }

    public reset() {
        this.selectedRoomID = ''
        this.ifFiltering = false
    }
}
</script>
<style lang="stylus" scoped>
.blanc {
    height: 60px;
}
</style>