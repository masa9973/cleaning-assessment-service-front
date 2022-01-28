<template>
    <div class="record_list_associated_with_user">
        <div class="user_cleaning_data">
            あなたの記録
            <div class="average_cleaning_time">
                <div v-if="!ifFiltering">{{ averageTime }}</div>
                <div v-else-if="roomFilteredRecords.length">
                    {{ roomFilteredAverageTime }}
                </div>
                <div v-else>選択された部屋の記録はまだありません</div>
            </div>
            <div class="average_score">
                <div v-if="!selectedScoreItemID">項目を選択してください</div>
                <div v-else>{{ averageScore }}</div>
            </div>
        </div>
        <div class="sort_item_container">
            <div class="choice_room">
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
                <button :disabled="!selectedRoomID" @click="filterRoom">
                    選んだ部屋の記録をみる
                </button>
                <button @click="reset">リセット</button>
            </div>
            <div class="choice_score_item">
                <div>項目を選択</div>
                <select v-model="selectedScoreItemID">
                    <option
                        v-for="scoreItem in scoreItems"
                        :key="scoreItem.scoreItemID"
                        :value="scoreItem.scoreItemID"
                    >
                        {{ scoreItem.scoreItemName }}
                    </option>
                </select>
                <button
                    :disabled="!selectedScoreItemID"
                    @click="filterScoreItem"
                >
                    項目を選ぶ
                </button>
            </div>
        </div>
        <div v-if="!ifFiltering" class="user_all_records">
            <div
                v-for="scoredRecord in scoredRecords"
                :key="scoredRecord.recordID"
            >
                <record-card :record-model="scoredRecord" />
            </div>
        </div>
        <div
            v-else-if="roomFilteredRecords.length"
            class="user_filtered_records"
        >
            <div v-for="record in roomFilteredRecords" :key="record.recordID">
                <record-card :record-model="record" />
            </div>
        </div>
        <div v-else>選択された部屋の記録はまだありません</div>
        <div class="blanc"></div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { RecordModel, RoomModel, ScoreItemModel, UserModel } from 'stage3-abr'
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
    public currentUser: UserModel | null = null
    public scoredRecords: RecordModel[] = []
    public scoreItems: ScoreItemModel[] = []
    public rooms: RoomModel[] = []
    public selectedRoomID: string = ''
    public roomFilteredRecords: RecordModel[] = []
    public roomFilteredAverageTime: string = ''
    public averageScore: number = 0
    public ifFiltering: boolean = false
    public averageTime: string = ''
    public selectedScoreItemID: string = ''
    // 使ってる変数

    async created() {
        this.currentUser = await userInteractor.fetchMyUserModel()
        this.scoredRecords = await this.currentUser.fetchScoredRecords()
        this.rooms = await this.currentUser.fetchSameHotelRooms()
        this.scoreItems = await this.currentUser.fetchSameHotelScoreItems()
        this.averageTime = userInteractor.recordsToAverageStringTime(
            this.scoredRecords
        )
    }

    public async filterScoreItem() {
        this.averageScore =
            await userInteractor.scoreItemIDAndUserIDToAverageScore(
                this.currentUser!.userID,
                this.selectedScoreItemID
            )
    }

    public filterRoom() {
        this.roomFilteredRecords = this.scoredRecords.filter(
            (item) => item.cleaningRoomID === this.selectedRoomID
        )
        this.roomFilteredAverageTime =
            userInteractor.recordsToAverageStringTime(this.roomFilteredRecords)
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