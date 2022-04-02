<template>
    <div>
        <div class="cleaner_footer_item_container text-center">
            <div class="footer_button">
                <nuxt-link
                    tag="div"
                    active-class="link_active_class"
                    :to="{
                        name: 'manager-manager_top',
                    }"
                >
                    <div class="image_container">
                        <img
                            class="mx-auto"
                            src="~/assets/img/account_circle.png"
                        />
                    </div>
                    <div class="text_container">アサイン</div>
                </nuxt-link>
            </div>
            <div class="footer_button">
                <nuxt-link
                    tag="div"
                    active-class="link_active_class"
                    :to="{
                        name: 'manager-unscored_record_list',
                    }"
                >
                    <div class="image_container">
                        <img
                            class="mx-auto"
                            src="~/assets/img/check_circle_outline.png"
                        />
                    </div>
                    <div class="text_container">評価</div>
                </nuxt-link>
            </div>
            <div class="footer_button">
                <nuxt-link
                    tag="div"
                    active-class="link_active_class"
                    :to="{
                        name: 'manager-user_list',
                    }"
                >
                    <div class="image_container">
                        <img class="mx-auto" src="~/assets/img/schedule.png" />
                    </div>
                    <div class="text_container">ユーザー一覧</div>
                </nuxt-link>
            </div>
            <div class="footer_button">
                <nuxt-link
                    tag="div"
                    active-class="link_active_class"
                    :to="{
                        name: 'manager-setting',
                    }"
                >
                    <div class="image_container">
                        <img class="mx-auto" src="~/assets/img/settings.png" />
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

        // text-align: center;
        // align-items: center;
        .image_container {
            height: 36px;
        }
    }

    .link_active_class {
        background-color: #efefef;
    }
}
</style>