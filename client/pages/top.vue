<template>
    <div class="user_list_container">
        <div>{{ registeredUsers }}</div>
        <div
            v-for="(user, idx) in registeredUsers"
            :key="user.userID"
            class="user_icon_wrapper"
            :class="{ three: !((idx + 1) % 3) }"
        >
            <nuxt-link
                :to="{
                    name: 'cleaner-userID',
                    params: { userID: user.userID },
                }"
                tag="div"
                class="link"
            >
            </nuxt-link>
        </div>
    </div>
</template>
<script lang="ts">
import { UserModel } from 'stage3-abr'
import { Component, Vue } from 'nuxt-property-decorator'
import { userInteractor } from '~/api'
// component
@Component({
    components: {},
})
export default class Top extends Vue {
    public userModel: UserModel | null = null
    public registeredUsers: UserModel[] = []
    public async created() {
        this.registeredUsers = await userInteractor.fetchAllUser()
    }

    public get name() {
            return this.userModel!.name
    }
}
</script>