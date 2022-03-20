<template>
    <div>
        <nuxt />
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { ChillnnTrainingError, ErrorCode, UserModel } from 'cleaning-assessment-service-abr'
import { authInteractor } from '~/driver/amplify/auth'
import { userInteractor } from '~/api'
@Component({
    components: {
    },
})
export default class DefaultLayout extends Vue {
    public userModel: UserModel | null = null

    public async created() {
        const isSignIn = await authInteractor.isSignIn()
        if (!isSignIn) {
            this.$router.push({ name: 'auth-signin' })
        }
        this.userModel = await userInteractor.fetchMyUserModel()
        const userRole = this.userModel.role
        if (userRole === 'manager' ) {
            this.$router.push({ name: 'manager-manager_top' })
        } else if (userRole === 'cleaner' ) {
            this.$router.push({ name: 'cleaner-cleaner_top' })
        } else {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_401_notSignIn)
        }
    }
}
</script>
