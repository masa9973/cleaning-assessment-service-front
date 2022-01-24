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
        <button :disabled="!selectedRoomID" @click="filterRecord">選んだ部屋の記録をみる</button>
        <button @click="reset">リセット</button>
        <!-- <link-button :to="{ name: 'cleaner-record_list-room' }"
            >部屋ごとのレコードを表示する</link-button
        > -->
        <div v-if="!ifFiltering" class="user_all_records">
            <div v-for="record in records" :key="record.recordID">
                <record-card :record-model="record" />
            </div>
        </div>
        <div v-else class="user_filtered_records">
            <div v-for="record in resultRecords" :key="record.recordID">
                <record-card :record-model="record" />
            </div>
        </div>
        <div class="blanc"></div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { RecordModel, RoomModel, UserModel } from 'stage3-abr'
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
    public roomHotelID: string = ''
    public resultRecords: RecordModel[] = []
    public ifFiltering: boolean = false

    async created() {
        this.user = await userInteractor.fetchMyUserModel()
        this.records = await userInteractor.fetchRecordsByCleanerID(
            this.user.userID
        )
        this.roomHotelID = this.user.userHotelID
        this.rooms = await userInteractor.fetchRoomsByHotelID(this.roomHotelID)
    }

    public filterRecord() {
        this.resultRecords = this.records.filter(
            (record) => record.cleaningRoomID === this.selectedRoomID
        )
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