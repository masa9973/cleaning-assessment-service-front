<template>
    <div>
        <div v-if="currentUser" class="user_icon_wrapper">
            <!-- icon -->
            <user-icon :user-model="currentUser" :show-edit="isMyPage" />
        </div>
        <div class="user_assigned_record_list">
            <div v-if="assignedRecords.length">
                <div class="title">アサインされた清掃一覧</div>
                <div
                    v-for="assignedRecord in assignedRecords"
                    :key="assignedRecord.recordID"
                >
                    <nuxt-link
                        tag="div"
                        :to="{
                            name: 'cleaner-add_record-recordID',
                            params: { recordID: assignedRecord.recordID },
                        }"
                    >
                        <room-card :room-i-d="assignedRecord.cleaningRoomID" />
                    </nuxt-link>
                </div>
            </div>
            <div v-else>アサインされている清掃はありません</div>
        </div>
        <div class="blanc"></div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { RecordModel, UserModel } from 'cleaning-assessment-service-abr'
import { userInteractor } from '~/api'
import UserIcon from '@/components/Organisms/User/Icon/index.vue'
import RoomCard from '@/components/Organisms/room/card/index.vue'
@Component({
    layout: 'cleaner',
    components: {
        UserIcon,
        RoomCard,
    },
})
export default class CleanerTopPage extends Vue {
    public currentUser: UserModel | null = null
    public assignedRecords: RecordModel[] = []
    public isMyPage = true
    // 使ってる変数

    public async created() {
        this.currentUser = await userInteractor.fetchMyUserModel()
        this.assignedRecords = await this.currentUser.fetchAssignedRecords()
    }
}
</script>
<style lang="stylus" scoped>
.title {
    font-weight: bold
    margin-bottom: 20px
}

.user_icon_wrapper {
    padding-top: 50px;
    padding-bottom: 30px;
}

.user_assigned_record_list {
    border: 1px solid #ccc;
    padding: 5px;
    background-color: #fff;
    border-radius: 8px;
    margin: 5px;
}

.blanc {
    height: 60px;
}
</style>