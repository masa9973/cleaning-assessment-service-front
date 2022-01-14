<template>
    <div>
        <nuxt />
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { UserModel } from 'stage3-abr'
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
    }
}
</script>
