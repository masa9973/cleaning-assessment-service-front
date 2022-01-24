<template>
    <div class="user_detail_container">
        <div>ここでユーザーのrole変更をしたい</div>
        <button @click="roleChange">ロール変更</button>
        <div v-if="userModel" class="user_icon_wrapper">
            <!-- icon -->
            <user-icon :user-model="userModel" />
        </div>
        <div >
            <div
                v-for="record in recordModels"
                :key="record.recordID"
                class="record_card_container"
            >
                <div class="record_card">
                    <!-- <record-card :record-model="record" /> -->
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
        this.recordModels = await userInteractor.fetchRecordsByCleanerID(userID)
        this.userModel = await userInteractor.fetchUserModelByUserID(userID)
    }

    public async roleChange() {
        window.confirm('このユーザーを管理者に変更しますか？')
        this.userModel!.role = 'manager'
        await this.userModel!.register()
    }
}
</script>
