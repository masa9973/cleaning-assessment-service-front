<template>
    <div>
        <div>やっぱユーザーリストにしたい</div>
        <div>ユーザーをタップして清掃者の記録を見る</div>
        <div>ここのユーザーはcleanerだけにしたい</div>
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
import UserIcon from '@/components/Organisms/User/Icon/index.vue'
import { userInteractor } from '~/api'

// component
@Component({
    layout: 'manager',
    components: {
        UserIcon,
    },
})
export default class Top extends Vue {
    public userModel: UserModel | null = null
    public registeredUsers: UserModel[] = []
    public async created() {
        this.userModel = await userInteractor.fetchMyUserModel()
        this.registeredUsers = await userInteractor.fetchAllUserByHotelID(
            this.userModel.userHotelID
        )
    }
}
</script>
<style lang="stylus" scoped>
.user_list_container {
    display: flex;

    .user_icon_wrapper {
        box-sizing: border-box;
        width: 30%;
        margin-right: 5%;
        cursor: pointer;
        padding-bottom: 30px;

        &.three {
            margin-right: 0;
        }
    }
}
</style>