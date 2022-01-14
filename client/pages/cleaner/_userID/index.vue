<template>
    <div class="user_detail_container">
        <div v-if="userModel" class="user_icon_wrapper">
            <!-- icon -->
            <user-icon :user-model="userModel" :show-edit="isMyPage" />
        </div>
        <div class="image_table_wrapper">
            <!-- images -->
            <div
                v-for="recordModel in recordModels"
                :key="recordModel.recordID"
            >
                <post-card :post-model="postModel" :user-model="userModel" />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { RecordModel, ScoreModel, UserModel } from 'stage3-abr'
import { Vue } from 'nuxt-property-decorator'
import { userInteractor } from '~/api'

export default class UserPage extends Vue {
    public myUserModel: UserModel | null = null
    // 他のユーザーも見たい、myUserModelいらん気がする
    // レコードと評価を見たい
    public userModel: UserModel | null = null
    public recordModel: RecordModel | null = null
    public recordModels: RecordModel[] = []
    public scoreModel: ScoreModel | null = null
    public scoreModels: ScoreModel[] = []

    public async created() {
        const userID = this.$route.params.userID
        this.myUserModel = await userInteractor.fetchMyUserModel()
        this.userModel = await userInteractor.fetchUserModelByUserID(userID)
        this.recordModels = await this.userModel.fetchMyRecords()
        this.scoreModels = await this.recordModel!.fetchScores()
        console.log('ユーザー', this.userModel)
        console.log('レコード', this.recordModels)
        console.log('スコア', this.scoreModel)
    }
}
</script>
