<template>
    <div>
        <div>清掃者の記録を見る</div>
        <div class="user_list_container">
            <div
                v-for="(user, idx) in registeredUsers"
                :key="user.userID"
                class="user_icon_wrapper"
                :class="{ three: !((idx + 1) % 3) }"
            >
                <nuxt-link
                    :to="{
                        name: 'user-userID',
                        params: { userID: user.userID },
                    }"
                    tag="div"
                    class="link"
                >
                    <user-icon :user-model="user" class="user_icon_item" />
                </nuxt-link>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { UserModel } from 'stage3-abr'
import { Component, Vue } from 'nuxt-property-decorator'
import { userInteractor } from '~/api'
import UserIcon from '@/components/Organisms/User/Icon/index.vue'

// component
@Component({
    components: {
        UserIcon,
    },
})
export default class Top extends Vue {
    public userModel: UserModel | null = null
    public registeredUsers: UserModel[] = []
    public async created() {
        this.registeredUsers = await userInteractor.fetchAllUser()
    }
}
</script>