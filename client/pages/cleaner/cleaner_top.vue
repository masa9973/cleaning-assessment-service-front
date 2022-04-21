<template>
    <div>
        <div v-if="currentUser" class="user_icon_wrapper">
            <!-- icon -->
            <user-icon :user-model="currentUser" :show-edit="true" />
        </div>

        <!-- お帰りなさい、今日も一日がんばりましょう -->
        <body-wrapper>
            <div class="py-5 px-2">
                お帰りなさい、今日も一日がんばりましょう🚗
            </div>
        </body-wrapper>

        <body-wrapper>
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
        </body-wrapper>
        <div class="h-[60px]"></div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { RecordModel, UserModel } from 'cleaning-assessment-service-abr'
import { userInteractor } from '~/api'
import UserIcon from '@/components/Organisms/User/Icon/index.vue'
import RoomCard from '@/components/Organisms/room/card/index.vue'
import BodyWrapper from '@/components/Organisms/common/body_wrapper/body_wrapper.vue'
@Component({
    layout: 'cleaner',
    components: {
        UserIcon,
        RoomCard,
        BodyWrapper,
    },
})
export default class CleanerTopPage extends Vue {
    public currentUser: UserModel | null = null
    public assignedRecords: RecordModel[] = []

    public async created() {
        this.currentUser = await userInteractor.fetchMyUserModel()
        this.assignedRecords = await this.currentUser.fetchAssignedRecords()
    }
}
</script>
<style lang="stylus" scoped>
.title {
    font-weight: bold;
    margin-bottom: 20px;
}

.user_icon_wrapper {
    padding-top: 50px;
    padding-bottom: 30px;
}
</style>