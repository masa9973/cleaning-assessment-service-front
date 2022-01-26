<template>
    <div>
        <div class="assigned_cleaning">
            <div
                v-for="assginedRecord in assginedRecords"
                :key="assginedRecord.recordID"
            >
                <div
                    v-if="assginedRecord.cleaningTime === 0"
                    class="record_card_list"
                >
                    <assgined-record-card :record-model="assginedRecord" />
                </div>
            </div>
        </div>
        <div class="plus_button_container">
            <div class="plus_button" @click="openModal">＋</div>
        </div>
        <app-modal v-model="isShowModal">
            <div class="modal_inner">
                <div class="room_user_selecter">
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
                    <div>清掃者を選択</div>
                    <select v-model="selectedUserID">
                        <option
                            v-for="cleaner in cleaners"
                            :key="cleaner.userID"
                            :value="cleaner.userID"
                        >
                            {{ cleaner.name }}
                        </option>
                    </select>
                </div>
                <app-button :disabled="!selectedRoomID || !selectedUserID" @click="assigned">アサインする</app-button>
            </div>
        </app-modal>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { RecordModel, RoomModel, UserModel } from 'stage3-abr'
import AppModal from '@/components/Organisms/common/app_modal/index.vue'
import AppButton from '@/components/Atom/AppButton.vue'
import AssginedRecordCard from '@/components/Organisms/record/assgined_card/index.vue'
import { userInteractor } from '~/api'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
@Component({
    layout: 'manager',
    components: {
        AppModal,
        AppButton,
        AssginedRecordCard,
    },
})
export default class ManagerTopPage extends Vue {
    public isShowModal: boolean = false
    public rooms: RoomModel[] = []
    public user: UserModel | null = null
    public roomHotelID: string = ''
    public cleaners: UserModel[] = []
    public selectedRoomID: string = ''
    public selectedUserID: string = ''
    public blancRecord: RecordModel | null = null
    public assginedRecords: RecordModel[] = []

    public async created() {
        this.user = await userInteractor.fetchMyUserModel()
        this.roomHotelID = this.user.userHotelID
        this.rooms = await userInteractor.fetchRoomsByHotelID(this.roomHotelID)
        this.cleaners = await userInteractor.fetchAllUserByHotelID(
            this.roomHotelID
        )
        this.assginedRecords = await userInteractor.fetchAllRecordsByHotelID(
            this.roomHotelID
        )
    }

    public openModal() {
        this.isShowModal = true
    }

    @AsyncLoadingAndErrorHandle()
    public async assigned() {
        this.blancRecord = await userInteractor.createNewRecord()
        this.blancRecord.cleanerID = this.selectedUserID
        this.blancRecord.cleaningRoomID = this.selectedRoomID
        this.blancRecord.recordHotelID = this.roomHotelID
        this.blancRecord.startAt = 0
        this.blancRecord.finishedAt = 0
        await this.blancRecord.register()
        this.selectedRoomID = ''
        this.selectedUserID = ''
        this.isShowModal = false
        this.assginedRecords = await userInteractor.fetchAllRecordsByHotelID(
            this.roomHotelID
        )
    }
}
</script>
<style lang="stylus" scoped>
.assigned_cleaning {
    .record_card_list {
    }
}

.plus_button_container {
    position: fixed;
    right: 10%;
    bottom: 10%;

    .plus_button {
        width: 50px;
        height: 50px;
        border-radius: 30px;
        box-shadow: 0 0 10px 0 $shadowColor;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        font-size: 24px;
    }
}

.modal_inner {
    text-align: center;
    .room_user_selecter {
        display: flex;
        margin-bottom: 5px;
    }
}

.this_will_be_footer {
    position: fixed;
    bottom: 0px;
}
</style>