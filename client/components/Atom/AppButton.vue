<template>
    <button
        class="
            bg-gray-300
            rounded-md
            text-base
            w-[300px]
            h-11
            disabled:bg-slate-300
            cursor-pointer
            py-[5px]
            px-[30px]
        "
        :disabled="disabled"
        @click="click"
    >
        <slot />
    </button>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class AppButton extends Vue {
    @Prop({ required: false, default: false }) disabled!: boolean
    public click() {
        this.$emit('click')
    }
}
</script>