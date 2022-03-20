<template>
    <div>
        <div>{{ scoreItemName }}:{{ scoreValue }}</div>
    </div>
</template>
<script lang="ts">
import { Prop, Vue, Component } from 'nuxt-property-decorator'
import { ScoreItemModel, ScoreModel } from 'cleaning-assessment-service-abr'
import { userInteractor } from '~/api'
@Component({})
export default class ScoreItemCard extends Vue {
    @Prop({ required: true }) score!: ScoreModel
    public viewScoreItemID: string = ''
    public scoreCategory: ScoreItemModel | null = null
    public scoreItemName: string = ''
    public scoreValue: number = 0

    public async created() {
        this.viewScoreItemID = this.score.scoreItemID
        this.scoreCategory = await userInteractor.fetchScoreItemByScoreItemID(
            this.viewScoreItemID
        )
        if (this.scoreCategory)
        this.scoreItemName = this.scoreCategory!.scoreItemName
        this.scoreValue = this.score.score
    }
}
</script>
