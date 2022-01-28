<template>
    <div>
        <div class="assigned_cleaning">
            <div v-if="assignedRecords.length">
                <div
                    v-for="assignedRecord in assignedRecords"
                    :key="assignedRecord.recordID"
                >
                    <div class="record_card_list">
                        <assigned-record-card :record-model="assignedRecord" />
                    </div>
                </div>
            </div>
            <div v-else class="no_assigned_cleaning">
                右下のボタンから清掃をアサインできます。
            </div>
        </div>
        <div class="plus_button_container">
            <div class="plus_button" @click="openModal">＋</div>
        </div>
        <app-modal v-model="isShowModal">
            <div class="modal_inner">
                <div class="room_user_selecter">
                    <div class="room_selecter">
                        <div v-if="rooms.length">
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
                        </div>
                        <div v-else>設定から部屋を追加できます。</div>
                    </div>
                    <div class="user_selecter">
                        <div v-if="cleaners.length">
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
                        <div v-else>設定から清掃者を登録できます。</div>
                    </div>
                </div>
                <app-button
                    :disabled="!selectedRoomID || !selectedUserID"
                    @click="assigned"
                    >アサインする</app-button
                >
            </div>
        </app-modal>
        <div class="blanc"></div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { RecordModel, RoomModel, UserModel } from 'stage3-abr'
import AppModal from '@/components/Organisms/common/app_modal/index.vue'
import AppButton from '@/components/Atom/AppButton.vue'
import assignedRecordCard from '@/components/Organisms/record/assigned_card/index.vue'
import { userInteractor } from '~/api'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
@Component({
    layout: 'manager',
    components: {
        AppModal,
        AppButton,
        assignedRecordCard,
    },
})
export default class ManagerTopPage extends Vue {
    public currentUser: UserModel | null = null
    public isShowModal: boolean = false
    public rooms: RoomModel[] = []
    public cleaners: UserModel[] = []
    public selectedRoomID: string = ''
    public selectedUserID: string = ''
    public blancRecord: RecordModel | null = null
    public assignedRecords: RecordModel[] = []

    public async created() {
        this.currentUser = await userInteractor.fetchMyUserModel()
        this.rooms = await this.currentUser.fetchSameHotelRooms()
        this.cleaners = await this.currentUser.fetchSameHotelCleaner()
        this.assignedRecords = await this.currentUser.fetchAssignedRecords()
    }

    public openModal() {
        this.isShowModal = true
    }

    @AsyncLoadingAndErrorHandle()
    public async assigned() {
        this.blancRecord = await userInteractor.createNewRecord()
        this.blancRecord.cleanerID = this.selectedUserID
        this.blancRecord.cleaningRoomID = this.selectedRoomID
        await this.blancRecord.register()
        this.selectedRoomID = ''
        this.selectedUserID = ''
        this.isShowModal = false
        this.assignedRecords = await this.currentUser!.fetchAssignedRecords()
    }
}
</script>
<style lang="stylus" scoped>
.assigned_cleaning {
    .record_card_list {
    }

    .no_assigned_cleaning {
        padding-top: 5px;
        padding-left: 5px;
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
        justify-content: space-evenly;

        .room_selecter {
            display: flex;
        }

        .user_selecter {
            display: flex;
        }
    }
}

.this_will_be_footer {
    position: fixed;
    bottom: 0px;
}

.blanc {
    height: 60px;
}
</style>