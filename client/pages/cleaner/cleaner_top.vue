<template>
    <div>
        <div v-if="user" class="user_icon_wrapper">
            <!-- icon -->
            <user-icon :user-model="user" :show-edit="isMyPage" />
        </div>
        <div>
            タップして清掃を開始する
        </div>
        <div class="user_assigned_record_list">
            <div
                v-for="userAssginedRecord in userAssginedRecords"
                :key="userAssginedRecord.recordID"
            >
                <nuxt-link
                    :to="{
                        name: 'cleaner-add_record-recordID',
                        params: { recordID: userAssginedRecord.recordID },
                    }"
                >
                    <div v-if="userAssginedRecord.cleaningTime === 0">
                        <room-card :room-i-d="userAssginedRecord.cleaningRoomID" />
                    </div>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { RecordModel, RoomModel, UserModel } from 'stage3-abr'
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
    public userAssginedRecords: RecordModel[] = []
    public user: UserModel | null = null
    public isMyPage = true
    public roomModel: RoomModel | null = null

    public async created() {
        this.user = await userInteractor.fetchMyUserModel()
        const myCleanerID = this.user.userID
        this.userAssginedRecords = await userInteractor.fetchRecordsByCleanerID(
            myCleanerID
        )
    }
}
</script>
