<template>
    <div>
        <app-modal v-model="isShowModal">
            <input v-model="scoreValue" />
            <div>{{ recordModel.recordID }}</div>
            <button @click="register">評価を確定する</button>
        </app-modal>
        <button @click="openModal">この清掃を評価する</button>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { RecordModel, ScoreModel } from 'stage3-abr'
import AppModal from '@/components/Organisms/common/app_modal/index.vue'
import { scoreInteractorFactory } from '~/api'

@Component({
    components: {
        AppModal
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
        const scoreInteractor = await scoreInteractorFactory(this.recordModel)
        this.blancScore = await scoreInteractor.createNewScore()
        this.blancScore.score = this.scoreValue
        await this.blancScore.register()
        console.log('スコアに何の値が入っているか', this.blancScore)
        this.isShowModal = false
    }
}
</script>
