<template>
    <div>
        <div class="assigned_cleaning">
            <body-wrapper>
                <div v-if="leftRoomIDs.length" class="left_room_message">
                    未清掃の部屋一覧
                </div>
                <div v-else>
                    <nuxt-link
                        tag="div"
                        :to="{
                            name: 'manager-setting',
                        }"
                    >
                        <div>
                            本日未清掃の部屋はありません🎉<br />ここを押して部屋を追加できます
                        </div>
                    </nuxt-link>
                </div>
                <div class="left_room_container">
                    <div v-for="roomID in leftRoomIDs" :key="roomID">
                        <left-room-card
                            :room-i-d="roomID"
                            @registered="registered"
                        />
                    </div>
                </div>
            </body-wrapper>
            <body-wrapper>
                <div class="font-bold mb-[25px]">アサイン済みの清掃</div>
                <div v-if="assignedRecords.length">
                    <div
                        v-for="assignedRecord in assignedRecords"
                        :key="assignedRecord.recordID"
                    >
                        <div class="record_card_list">
                            <assigned-record-card
                                :record-model="assignedRecord"
                            />
                        </div>
                    </div>
                </div>
                <div v-else class="no_assigned_cleaning_message">
                    部屋を押して清掃をアサインできます。
                </div>
            </body-wrapper>
        </div>
        <div class="blanc"></div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import {
    RecordModel,
    RoomModel,
    UserModel,
} from 'cleaning-assessment-service-abr'
import AppModal from '@/components/Organisms/common/app_modal/index.vue'
import AppButton from '@/components/Atom/AppButton.vue'
import assignedRecordCard from '@/components/Organisms/record/assigned_card/index.vue'
import { userInteractor } from '~/api'
import AssignRecord from '@/components/Organisms/record/assign_record/index.vue'
import LeftRoomCard from '@/components/Organisms/room/left_room_card/index.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import BodyWrapper from '~/components/Organisms/common/body_wrapper/body_wrapper.vue'

@Component({
    layout: 'manager',
    components: {
        AppModal,
        AppButton,
        assignedRecordCard,
        AssignRecord,
        LeftRoomCard,
        BodyWrapper,
    },
})
export default class ManagerTopPage extends Vue {
    public currentUser: UserModel | null = null
    public isShowModal: boolean = false
    public assignedRecords: RecordModel[] = []
    public leftRoomIDs: string[] = []
    public leftRoom: RoomModel[] = []

    public async created() {
        this.currentUser = await userInteractor.fetchMyUserModel()
        this.assignedRecords = await this.currentUser.fetchAssignedRecords()
        this.leftRoomIDs = await this.currentUser.fetchYetAssignRoom()
    }

    public openModal() {
        this.isShowModal = true
    }

    @AsyncLoadingAndErrorHandle()
    public async registered() {
        this.assignedRecords = await this.currentUser!.fetchAssignedRecords()
        this.leftRoomIDs = await this.currentUser!.fetchYetAssignRoom()
        this.isShowModal = false
    }
}
</script>
<style lang="stylus" scoped>
.assigned_cleaning {
    .no_assigned_cleaning_message {
        padding-top: 5px;
        padding-left: 5px;
    }
}

.left_room_message {
    font-weight: bold;
}

.left_room_container {
    display: flex;
    flex-wrap: wrap;
}

.blanc {
    height: 60px;
}
</style>