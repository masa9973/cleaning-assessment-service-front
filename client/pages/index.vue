<template>
    <div class="menu_container">
        <div class="user_mapping_button_container">
            <nuxt-link :to="{ name: 'user' }">
                <button>ユーザー一覧</button>
            </nuxt-link>
        </div>
        <div class="start_cleaning_button_container">
            <nuxt-link
                :to="{
                    name: 'cleaner-add_record'
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
import { Vue, Component } from 'nuxt-property-decorator'
import AppButton from '@/components/Atom/AppButton.vue'

@Component({
    components: {
        AppButton
    }
})

export default class Top extends Vue {
    public async created() {
    }
}
</script>
<style lang="stylus" scoped>
// .menu_container {
//     text-align: center;
//     padding: auto;
//     margin: 30px;
    // .start_cleaning_button_container {
    // margin: 30px;
    // }
// }
</style>