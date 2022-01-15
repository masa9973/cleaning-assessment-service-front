<template>
    <div>
        <div class="user_mapping_container">
            <nuxt-link :to="{ name: 'top' }">
                <button>ユーザー一覧</button>
            </nuxt-link>
        </div>
        <div class="start_cleaning_button_container">
            <nuxt-link
                :to="{
                    name: 'cleaner'
                }"
            >
                <button>清掃を開始する</button>
            </nuxt-link>
        </div>
        <div class="start_scoreing_button_container">
            <nuxt-link :to="{ name: 'manager-record_list' }">
                <button>清掃の評価を開始する</button>
            </nuxt-link>
        </div>
    </div>
</template>
<script lang="ts">
import { UserModel } from 'stage3-abr'
import { Component, Vue } from 'nuxt-property-decorator'
import { userInteractor } from '~/api'
@Component({
    components: {},
})
export default class Top extends Vue {
    public myUserModel: UserModel | null = null
    public registeredUsers: UserModel[] = []
    public async created() {
        // this.registeredUsers = await userInteractor.fetchAllUser()
        this.myUserModel = await userInteractor.fetchMyUserModel()
    }
}
</script>
