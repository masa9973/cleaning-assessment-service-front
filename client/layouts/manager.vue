<template>
    <div class="manager_app_container">
        <div class="app">
            <nuxt />
        </div>
        <!-- footer -->
        <div class="app_manager_footer">
            <app-manager-footer />
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import AppManagerFooter from '@/components/Organisms/common/app_footer/manager_footer.vue'
@Component({
    components: {
        AppManagerFooter,
    },
})
export default class ManagerLayout extends Vue {}
</script>
<style lang="stylus" scoped>
.app_manager_footer {
    width: 100%
}
</style>