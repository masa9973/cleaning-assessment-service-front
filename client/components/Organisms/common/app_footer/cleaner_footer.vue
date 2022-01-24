<template>
    <div class="footer_item_container">
        <div class="home_button">
            <nuxt-link
                :to="{
                    name: 'cleaner-cleaner_top',
                }"
            >
                <img src="~/assets/img/account_circle.png" />
                <div>ホーム</div>
            </nuxt-link>
        </div>
        <div class="record_button">
            <nuxt-link
                :to="{
                    name: 'cleaner-record_list-user',
                }"
            >
                <img src="~/assets/img/schedule.png" />
                <div>記録をみる</div>
            </nuxt-link>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class AppCleanerFooter extends Vue {}
</script>
<style lang="stylus" scoped>
.footer_item_container {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    background-color: #c4c4c4;
}
</style>