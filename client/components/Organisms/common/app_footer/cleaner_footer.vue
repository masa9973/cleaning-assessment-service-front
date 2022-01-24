<template>
    <div class="footer_item_container">
        <nuxt-link
            :to="{
                name: 'cleaner-cleaner_top',
            }"
        >
            <div class="home_button">
                <img src="~/assets/img/account_circle.png" />
            </div>
        </nuxt-link>
        <nuxt-link
            :to="{
                name: 'cleaner-record_list-user',
            }"
        >
            <div class="record_button">
                <img src="~/assets/img/schedule.png" />
            </div>
        </nuxt-link>
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
    // justify-content: space-between;
    // align-items: center;
    background-color: #c4c4c4;
    .home_button {
        display: flex;
        // justify-content: center;
        // align-items: center;
        img {
            width: 100%;
            height: auto;
        }
    }
    .record_button {
        display: flex;
        // justify-content: center;
        // align-items: center;
    }
}
</style>