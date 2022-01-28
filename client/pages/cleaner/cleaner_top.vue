<template>
    <div>
        <div v-if="user" class="user_icon_wrapper">
            <!-- icon -->
            <user-icon :user-model="user" :show-edit="isMyPage" />
        </div>
        <div class="user_assigned_record_list">
            <div v-if="filteredassignedRecords.length">
                <div
                    v-for="userassignedRecord in filteredassignedRecords"
                    :key="userassignedRecord.recordID"
                >
                    <nuxt-link
                        tag="div"
                        :to="{
                            name: 'cleaner-add_record-recordID',
                            params: { recordID: userassignedRecord.recordID },
                        }"
                    >
                        <room-card
                            :room-i-d="userassignedRecord.cleaningRoomID"
                        />
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
import { RecordModel, UserModel } from 'stage3-abr'
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
    // 使ってる変数
    public assignedRecords: RecordModel[] = []
    public isMyPage = true

    public async created() {
        this.currentUser = await userInteractor.fetchMyUserModel()
        this.assignedRecords = await this.currentUser.fetchAssignedRecords()
    }
}
</script>
<style lang="stylus" scoped>
.user_icon_wrapper {
    padding-top: 50px;
    padding-bottom: 30px;
}
.blanc {
    height: 60px
}
</style>