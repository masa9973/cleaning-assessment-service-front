<template>
    <div>
        <div class="cleaner_footer_item_container">
            <div class="footer_button">
                <nuxt-link
                    tag="div"
                    :to="{
                        name: 'manager-manager_top',
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
                    :to="{
                        name: 'manager-unscored_record_list',
                    }"
                >
                    <div class="image_container">
                        <img src="~/assets/img/check_circle_outline.png" />
                    </div>
                    <div class="text_container">スコア</div>
                </nuxt-link>
            </div>
            <div class="footer_button">
                <nuxt-link
                    tag="div"
                    :to="{
                        name: 'manager-record_list',
                    }"
                >
                    <div class="image_container">
                        <img src="~/assets/img/schedule.png" />
                    </div>
                    <div class="text_container">記録</div>
                </nuxt-link>
            </div>
            <div class="footer_button">
                <nuxt-link
                    tag="div"
                    :to="{
                        name: 'manager-config',
                    }"
                >
                    <div class="image_container">
                        <img src="~/assets/img/settings.png" />
                    </div>
                    <div class="text_container">設定</div>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class AppManagerFooter extends Vue {}
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
        width: 30%;
        text-align: center;
        align-items: center;
    .image_container {
        height: 36px;
    }
    }
}
</style>