<template>
    <div>
        <div>清掃スコア{{ score }}</div>
    </div>
</template>
<script lang="ts">
import { Vue, Prop } from 'nuxt-property-decorator'
import { ScoreModel } from 'stage3-abr'
export default class ScoreCard extends Vue {
    @Prop({ required: true }) scoreModel!: ScoreModel

    get score() {
        return this.scoreModel.score
    }
}
</script>
