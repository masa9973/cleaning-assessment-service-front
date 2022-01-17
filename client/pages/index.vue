<template>
    <div>
        <div class="user_mapping_container">
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
import { Vue } from 'nuxt-property-decorator'

export default class Top extends Vue {
    public async created() {
    }
}
</script>
