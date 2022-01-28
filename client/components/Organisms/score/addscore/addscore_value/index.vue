<template>
    <div>
        <div>{{ scoreItemModel.scoreItemName }}</div>
        <input v-model="scoreValue" />
        <button @click="register">登録</button>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { RecordModel, ScoreItemModel, ScoreModel } from 'stage3-abr'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
@Component({})
export default class AddScoreValue extends Vue {
    @Prop({ required: true }) scoreItemModel!: ScoreItemModel
    @Prop({ required: true }) recordModel!: RecordModel
    public scores: ScoreModel[] = []
    public scoreValue: number = 0
    public blancScore: ScoreModel | null = null

    public async created() {
    }

    @AsyncLoadingAndErrorHandle()
    public async register() {
        this.blancScore = await this.scoreItemModel.createNewScore(
            this.recordModel.recordID
        )
        this.blancScore.score = this.scoreValue
        this.blancScore.register()
    }
}
</script>
