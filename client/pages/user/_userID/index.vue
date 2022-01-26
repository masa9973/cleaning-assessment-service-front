<template>
    <div class="record_list_associated_with_user">
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
        <!-- <link-button :to="{ name: 'cleaner-record_list-room' }"
            >部屋ごとのレコードを表示する</link-button
        > -->
        <div v-if="!ifFiltering" class="user_all_records">
        <div>平均清掃時間{{ viewAvarageCleaningTime }}</div>
            <div v-for="record in records" :key="record.recordID">
                <record-card :record-model="record" />
            </div>
        </div>
        <div v-else class="user_filtered_records">
            <div>平均清掃時間{{ viewFilteredAvarageCleaningTime }}</div>
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
    UserModel,
} from 'stage3-abr'
import { userInteractor } from '~/api'
import LinkButton from '@/components/Atom/LinkButton.vue'
import RecordCard from '@/components/Organisms/record/card/index.vue'
@Component({
    layout: 'manager',
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
    public roomHotelID: string = ''
    public resultRecords: RecordModel[] = []
    public ifFiltering: boolean = false
    public i: number = 0
    public avarageCleaningTime: number = 0
    public viewAvarageCleaningTime: string = ''
    public filteredAvarageCleaningTime: number = 0
    public viewFilteredAvarageCleaningTime: string = ''


    async created() {
        this.user = await userInteractor.fetchMyUserModel()
        this.records = await userInteractor.fetchRecordsByCleanerID(
            this.$route.params.userID
        )
        this.roomHotelID = this.user.userHotelID
        this.rooms = await userInteractor.fetchRoomsByHotelID(this.roomHotelID)
        // 平均時間の算出
        // this.records[i].cleaningTimeでi番目のcleaningTimeを持ってこれる
        const cleaningTimeResults = []
        for (this.i = 0; this.i < this.records.length; this.i++) {
            cleaningTimeResults[this.i] = this.records[this.i].cleaningTime
        }
        const reducer = (sum: number, currentValue: number) =>
            sum + currentValue
        this.avarageCleaningTime =
            cleaningTimeResults.reduce(reducer) / cleaningTimeResults.length
        // ミリ秒変換
        this.viewAvarageCleaningTime = millisecondToStringTime(
            this.avarageCleaningTime
        )
    }

    public filterRecord() {
        this.resultRecords = this.records.filter(
            (record) => record.cleaningRoomID === this.selectedRoomID
        )
        const cleaningTimeResults = []
        for (this.i = 0; this.i < this.resultRecords.length; this.i++) {
            cleaningTimeResults[this.i] = this.resultRecords[this.i].cleaningTime
        }
        const reducer = (sum: number, currentValue: number) =>
            sum + currentValue
        this.filteredAvarageCleaningTime =
            cleaningTimeResults.reduce(reducer) / cleaningTimeResults.length
        // ミリ秒変換
        this.viewFilteredAvarageCleaningTime = millisecondToStringTime(this.filteredAvarageCleaningTime)
            this.ifFiltering = true
    }

    public reset() {
        this.selectedRoomID = ''
        this.ifFiltering = false
    }
}
</script>
<style lang="stylus" scoped>
.blanc {
    height: 56px;
}
</style>