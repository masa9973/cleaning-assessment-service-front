<template>
    <div class="body border border-solid bg-white p-[5px] rounded-lg m-[5px]">
        <slot />
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({})
export default class BodyWrapper extends Vue {}
</script>
<style lang="stylus" scoped>
.body {
    border-color: #ccc;
}
</style>
