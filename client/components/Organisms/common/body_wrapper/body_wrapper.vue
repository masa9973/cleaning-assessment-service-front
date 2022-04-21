<template>
    <div class="border border-solid bg-white p-[5px] rounded-lg m-[5px]">
        <slot />
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({})
export default class BodyWrapper extends Vue {}
</script>
