<template>
    <div>
        <div>{{ scoreItemName }}:{{ scoreValue }}</div>
        <input v-model="scoreValue">
    </div>
</template>
<script lang="ts">
import { Prop, Vue, Component } from 'nuxt-property-decorator'
import { ScoreItemModel, ScoreModel } from 'stage3-abr'
import { userInteractor } from '~/api'
@Component({})
export default class ScoreItemCard extends Vue {
    @Prop({ required: true }) scoreItem!: ScoreModel
    public viewScoreItemID: string = ''
    public scoreCategory: ScoreItemModel | null = null
    public scoreItemName: string = ''
    public scoreValue: number = 0

    public async created() {
        this.viewScoreItemID = this.scoreItem.scoreItemID
        this.scoreCategory = await userInteractor.fetchScoreItemByScoreItemID(
            this.viewScoreItemID
        )
        if (this.scoreCategory)
        this.scoreItemName = this.scoreCategory!.scoreItemName
    }
}
</script>
