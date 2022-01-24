<template>
    <div class="cleaner_app_container">
        <div class="app">
            <nuxt />
        </div>
        <!-- footer -->
        <div class="app_cleaner_footer">
            <app-cleaner-footer />
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import AppCleanerFooter from '@/components/Organisms/common/app_footer/cleaner_footer.vue'
@Component({
    components: {
        AppCleanerFooter,
    },
})
export default class CleanerLayout extends Vue {}
</script>
<style lang="stylus" scoped>
.app_cleaner_footer {
    position: fixed;
    bottom: 0px;
    display: flex;
    // justify-content: center;
    justify-content: space-around;
    align-items: center;
    width: 100%
    height: 56px;
    background-color: #c4c4c4
}
</style>
