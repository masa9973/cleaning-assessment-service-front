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
            <div v-else class="no_assigned_cleaning_message">
                右下のボタンから清掃をアサインできます。
            </div>
        </div>
        <div class="plus_button_container">
            <div class="plus_button" @click="openModal">＋</div>
        </div>
        <app-modal v-model="isShowModal">
            <div class="modal_inner">
                <assign-record @registered="registered" />
            </div>
        </app-modal>
        <div class="blanc"></div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { RecordModel, UserModel } from 'stage3-abr'
import AppModal from '@/components/Organisms/common/app_modal/index.vue'
import AppButton from '@/components/Atom/AppButton.vue'
import assignedRecordCard from '@/components/Organisms/record/assigned_card/index.vue'
import { userInteractor } from '~/api'
import AssignRecord from '@/components/Organisms/record/assign_record/index.vue'
@Component({
    layout: 'manager',
    components: {
        AppModal,
        AppButton,
        assignedRecordCard,
        AssignRecord,
    },
})
export default class ManagerTopPage extends Vue {
    public currentUser: UserModel | null = null
    public isShowModal: boolean = false
    public assignedRecords: RecordModel[] = []

    public async created() {
        this.currentUser = await userInteractor.fetchMyUserModel()
        this.assignedRecords = await this.currentUser.fetchAssignedRecords()
    }

    public openModal() {
        this.isShowModal = true
    }

    public async registered() {
        this.assignedRecords = await this.currentUser!.fetchAssignedRecords()
        this.isShowModal = false
    }
}
</script>
<style lang="stylus" scoped>
.assigned_cleaning {
    .record_card_list {
    }

    .no_assigned_cleaning_message {
        padding-top: 5px;
        padding-left: 5px;
    }
}

.plus_button_container {
    position: fixed;
    right: 10%;
    bottom: 15%;

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

.this_will_be_footer {
    position: fixed;
    bottom: 0px;
}

.blanc {
    height: 60px;
}
</style>