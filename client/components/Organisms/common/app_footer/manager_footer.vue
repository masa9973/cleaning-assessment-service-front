<template>
    <div>
        <div class="this_will_be_footer">
            <nuxt-link
                :to="{
                    name: 'manager-unscored_record_list',
                }"
            >
                <button>清掃記録の評価を開始する</button>
            </nuxt-link>
            <nuxt-link
                :to="{
                    name: 'manager-record_list',
                }"
            >
                <button>過去の記録を見る</button>
            </nuxt-link>
            <nuxt-link
                :to="{
                    name: 'manager-config',
                }"
            >
                <button>清掃者を追加する</button>
            </nuxt-link>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class AppManagerFooter extends Vue {

}
</script>
