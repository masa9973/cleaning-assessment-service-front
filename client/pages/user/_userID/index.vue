<template>
    <div class="user_detail_container">
        <div v-if="userModel" class="user_icon_wrapper">
            <!-- icon -->
            <user-icon :user-model="userModel" :show-edit="isMyPage" />
        </div>
        <div class="image_table_wrapper">
            <!-- images -->
            <div
                v-for="record in recordModels"
                :key="record.recordID"
                class="record_card_container"
            >
                <div class="record_card">
                    <record-card :record-model="record" />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { RecordModel, UserModel } from 'stage3-abr'
import { Vue, Component } from 'nuxt-property-decorator'
import { userInteractor } from '~/api'
import RecordCard from '@/components/Organisms/record/card/index.vue'
import UserIcon from '@/components/Organisms/User/Icon/index.vue'
@Component({
    components: {
        UserIcon,
        RecordCard,
    },
})
export default class UserPage extends Vue {
    public userModel: UserModel | null = null
    public recordModels: RecordModel[] = []
    public myUserModel: UserModel | null = null

    public async created() {
        const userID = this.$route.params.userID
        this.myUserModel = await userInteractor.fetchMyUserModel()
        this.recordModels = await userInteractor.fetchRecordsByCleanerID(userID)
        this.userModel = await userInteractor.fetchUserModelByUserID(userID)
    }

    public get isMyPage() {
        return (
            this.myUserModel && this.myUserModel.userID === this.$route.params.userID
        )
    }
}
</script>
