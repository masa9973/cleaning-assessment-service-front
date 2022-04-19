<template>
    <div class="auth_signup_container">
        <div>
            <auth-title>サインイン</auth-title>
        </div>
        <div class="input_container">
            <auth-input v-model="email" label="Eメール" class="input_item" />
            <auth-input
                v-model="password"
                label="パスワード"
                type="password"
                class="input_item"
            />
        </div>
        <div class="button_container">
            <app-button :disabled="disabled" @click="signIn"
                >サインイン</app-button
            >
        </div>
        <div class="link_container">
            <link-button :to="{ name: 'auth-signup' }"
                >アカウントをお持ちでない方はこちら</link-button
            >
        </div>
        <error-modal
            v-if="openModal"
            :error="err"
            @close="openModal = false"
        ></error-modal>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// component
import AuthTitle from '@/components/Organisms/Auth/AuthTitle.vue'
import AuthInput from '@/components/Organisms/Auth/AuthInput.vue'
import AppButton from '@/components/Atom/AppButton.vue'
import LinkButton from '@/components/Atom/LinkButton.vue'
import ErrorModal from '@/components/Organisms/modal/error_modal.vue'
import { authInteractor } from '~/driver/amplify/auth'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({
    layout: 'auth',
    components: {
        AuthTitle,
        AuthInput,
        AppButton,
        LinkButton,
        ErrorModal,
    },
})
export default class SignInPage extends Vue {
    public email: string = ''
    public password: string = ''
    public err: any = ''
    public openModal: boolean = false

    public get disabled() {
        return !this.email || !this.password
    }

    @AsyncLoadingAndErrorHandle()
    public async signIn() {
        try {
            await authInteractor.signIn(this.email, this.password)
            this.$router.push({
                name: 'index',
            })
        } catch (err) {
            this.openModal = true
            this.err = authInteractor.errorHandle(err as any)
        }
    }
}
</script>
<style lang="stylus" scoped>
.auth_signup_container {
    padding: 80px 80px 60px;

    @media only screen and (max-width: $spSize) {
        padding: 50px 20px;
    }

    .input_container {
        .input_item {
            padding-bottom: 20px;
        }
    }

    .button_container {
        padding: 10px 0;
        text-align: center;
    }

    .link_container {
        text-align: center;
    }
}
</style>