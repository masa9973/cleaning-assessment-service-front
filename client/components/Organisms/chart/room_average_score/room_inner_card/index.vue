<template>
    <div class="room_inner_score_card">
        <div :style="barScoreClass"></div>
        <div class="date_string">{{ date }}</div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { dateFormatter, ScoreModel } from 'cleaning-assessment-service-abr'
@Component({})
export default class RoomInnerScoreCard extends Vue {
    @Prop({ required: true }) scoreModel!: ScoreModel
    public date: string = ''

    public created() {
        this.date = dateFormatter(this.scoreModel.createdAt)
    }

    get barScoreClass() {
        return {
            width: `10px`,
            height: `${this.scoreModel.score * 10 + "px"}`,
            margin: `0 auto`,
            backgroundColor: `#000`,
        }
    }
}
</script>
<style lang="stylus" scoped>
.date_string {
    font-size: 5px
}
</style>