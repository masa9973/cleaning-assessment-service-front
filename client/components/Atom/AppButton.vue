<template>
    <div class="button_container">
        <button :disabled="disabled" @click="click">
            <slot />
        </button>
    </div>
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