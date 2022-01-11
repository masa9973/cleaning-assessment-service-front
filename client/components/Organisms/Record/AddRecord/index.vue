<template>
    <div>
        <div class="time_add_cotainer">
            <div>開始時刻</div>
            <app-input v-model="recordModel.startAt" />
            <div>終了時刻</div>
            <app-input v-model="recordModel.finishedAt" />
        </div>
        <div class="room_add_container">
            <div>清掃部屋</div>
            <app-input v-model="recordModel.room" />
        </div>
        <div class="button">
            <app-button @click="register">記録する</app-button>
        </div>
    </div>
</template>
<script lang="ts">
import { RecordModel } from 'stage3-abr'
import { Component, Prop, Vue } from 'nuxt-property-decorator'

// component
import AppInput from '~/components/Atom/AppInput.vue'
import AppButton from '@/components/Atom/AppButton.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({
    components: {
        AppInput,
        AppButton,
    },
})
export default class AddRecord extends Vue {
    @Prop({ required: true }) recordModel!: RecordModel

    @AsyncLoadingAndErrorHandle()
    public async register() {
        await this.recordModel.register()
        this.$emit('registered')
    }
}
</script>
