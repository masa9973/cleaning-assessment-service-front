<template>
    <div class="app_text_container">
        <textarea
            v-if="placeholder === 'コメントを追加...'"
            v-model="localValue"
            :placeholder="placeholder"
            maxlength="140"
            :rows="rows"
            max-rows="10"
            cols="20"
            wrap="hard"
        ></textarea>
        <textarea
            v-model="localValue"
            :placeholder="placeholder"
            maxlength="150"
            :rows="rows"
            max-rows="10"
            cols="20"
            class="left-aligned"
            wrap="hard"
        />
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class AppTextarea extends Vue {
    @Prop({ required: true }) public value!: string | number
    @Prop({ required: true }) public placeholder!: string
    @Prop({ required: true }) public rows!: number

    public get localValue() {
        return this.value
    }

    public set localValue(textarea: string | number) {
        this.$emit('input', textarea)
    }
}
</script>
<style lang="stylus" scoped>
.app_text_container {
    box-sizing: border-box;
    width: 100%;
    height: 100%;

    textarea {
        resize: none;
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        border: 1px solid $borderColor;
        padding: 10px 10px;
        border-radius: 5px;
        line-height: 1.1em;

        @media only screen and (max-width: $spSize) {
            padding: 5px 10px;
        }

        &:focus {
            outline: 0;
            box-shadow: none;
            border: 1px solid $borderColor;
            background-color: #ffffff;
        }

        .left-aligned {
            text-align: left;
        }

        .input_centered {
            text-align: center;
        }
    }
}
</style>