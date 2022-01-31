<template>
    <div>
        <div :style="barClass"></div>
        <div>{{ date }}</div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { dateFormatter, ScoreModel } from 'stage3-abr'
@Component({})
export default class RoomInnerScoreCard extends Vue {
    @Prop({ required: true }) scoreModel!: ScoreModel
    public date: string = ''

    public created() {
        console.log(this.scoreModel)
        this.date = dateFormatter(this.scoreModel.createdAt)
    }

    get barClass() {
        return {
            width: `20px`,
            height: `${this.scoreModel.score * 10 + "px"}`,
            margin: `0 auto`,
            backgroundColor: `#000`,
        }
    }
}
</script>
<style lang="stylus" scoped>

</style>