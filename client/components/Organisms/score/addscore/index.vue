<template>
    <div class="add_score">
        <app-modal v-model="isShowModal">
            <input v-model="scoreValue" />
            <app-button @click="register">評価を確定する</app-button>
        </app-modal>
        <app-button @click="openModal">この清掃を評価する</app-button>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { RecordModel, ScoreModel } from 'stage3-abr'
import AppModal from '@/components/Organisms/common/app_modal/index.vue'
import { scoreInteractorFactory } from '~/api'
import AppButton from '@/components/Atom/AppButton.vue'

@Component({
    components: {
        AppModal,
        AppButton,
    }
})

export default class AddScore extends Vue {
    @Prop({ required: true }) recordModel!: RecordModel
    public blancScore: ScoreModel | null = null
    public scoreValue: number = 0
    public isShowModal: boolean = false

    public openModal() {
        this.isShowModal = true
    }

    public async register() {
        const scoreInteractor = scoreInteractorFactory(this.recordModel)
        this.blancScore = await scoreInteractor.createNewScore()
        this.blancScore.score = this.scoreValue
        await this.blancScore.register()
        await this.recordModel.switchIfScored()
        window.alert(
            '清掃評価は正常に送信されました。'
        )
    }
}
</script>
<style lang="stylus" scoped>
.add_score {
    text-align: center;
}
</style>