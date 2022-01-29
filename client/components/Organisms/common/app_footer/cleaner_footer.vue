<template>
    <div class="cleaner_footer_item_container">
        <div class="footer_button">
            <nuxt-link
                tag="div"
                active-class="link_active_class"
                :to="{
                    name: 'cleaner-cleaner_top',
                }"
            >
                <div class="image_container">
                    <img src="~/assets/img/account_circle.png" />
                </div>
                <div class="text_container">ホーム</div>
            </nuxt-link>
        </div>
        <div class="footer_button">
            <nuxt-link
                tag="div"
                active-class="link_active_class"
                :to="{
                    name: 'cleaner-record_list-user',
                }"
            >
                <div class="image_container">
                    <img src="~/assets/img/schedule.png" />
                </div>
                <div class="text_container">記録を見る</div>
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
.cleaner_footer_item_container {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    background-color: #c4c4c4;
    position: fixed;
    bottom: 0px;

    .footer_button {
        width: 100%;
        text-align: center;
        align-items: center;

        .image_container {
            height: 36px;
        }
    }

    .link_active_class {
        background-color: #efefef
    }
}
</style>