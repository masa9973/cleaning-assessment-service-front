<template>
    <div>
        <div class="message_and_user_list_container">
            <div class="title">清掃者一覧</div>
            <div>
                <div v-if="cleaners.length">
                    <div class="user_list_container">
                        <div
                            v-for="(user, idx) in cleaners"
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
                                <div>
                                    <user-icon
                                        :user-model="user"
                                        class="user_icon_item"
                                    />
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <nuxt-link
                        tag="div"
                        :to="{
                            name: 'manager-setting',
                        }"
                    >
                        <div>まだ清掃者が登録されていません</div>
                        <div>ここを押して清掃者を追加できます</div></nuxt-link
                    >。
                </div>
            </div>
        </div>
        <div class="blanc"></div>
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
    public currentUser: UserModel | null = null
    public cleaners: UserModel[] = []

    public async created() {
        this.currentUser = await userInteractor.fetchMyUserModel()
        this.cleaners = await this.currentUser.fetchSameHotelCleaner()
    }
}
</script>
<style lang="stylus" scoped>
.title {
    font-weight: bold;
}

.message_and_user_list_container {
    border: 1px solid #ccc;
    padding: 5px;
    background-color: #fff;
    border-radius: 8px;
    margin: 5px;
}

.user_list_container {
    margin-top: 10px;
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

.blanc {
    height: 60px;
}
</style>