<template>
    <div>
        <div class="room_container">
            <div>清掃部屋</div>
        </div>
        <div class="cleaner_container">
            <div>清掃者ID</div>
        </div>
        <div class="score_add_container">
            <div>評価</div>
            <app-input v-model="scoreModel.score" />
        </div>
        <div class="button">
            <app-button @click="register">記録する</app-button>
        </div>
    </div>
</template>
<script lang="ts">
import { RecordModel, ScoreModel } from 'stage3-abr'
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
export default class AddScore extends Vue {
    @Prop({ required: true }) scoreModel!: ScoreModel
    @Prop({ required: true }) recordModel!: RecordModel

    public get room() {
        return this.recordModel.room
    }

    public get cleanerID() {
        return this.recordModel.cleanerID
    }

    // async created() {
    //     this.recordModel = await userInteractor.fetchUserModelByUserID(this.cleanerID)
    // }

    @AsyncLoadingAndErrorHandle()
    public async register() {
        await this.scoreModel.register()
        this.$emit('registered')
    }
}
</script>
