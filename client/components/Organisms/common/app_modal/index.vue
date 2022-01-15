<template>
    <div
        v-show="localValue"
        class="modal_wrapper"
        @click.self="localValue = false"
    >
        <div class="inner">
            <slot />
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class AppModal extends Vue {
    @Prop({ required: true }) value!: boolean
    public get localValue() {
        return this.value
    }

    public set localValue(input: boolean) {
        this.$emit('input', input)
    }
}
</script>
<style lang="stylus" scoped>
.modal_wrapper {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);

    .inner {
        box-sizing: border-box;
        max-width: 1200px;
        // max-height: 1000px;
        background-color: white;
        padding: 50px 100px;
        border-radius: 25px;

        @media only screen and (max-width: $spSize) {
            font-size: 14px;
            padding: 40px 10px;
            width: 90%;
        }
    }
}
</style>
