<template>
    <div>
        <div>レコードの数だけ棒を作成</div>
        <div class="chart_item_container">
            <div v-for="scoreModel in scoreModels"
            :key="scoreModel.scoreID">
                <room-inner-score-card
                    :score-model="scoreModel"
                />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ScoreItemModel, ScoreModel, UserModel } from 'stage3-abr'
import { userInteractor } from '~/api'
import RoomInnerScoreCard from '@/components/Organisms/chart/room_average_score/room_inner_card/index.vue'
@Component({
    components: {
        RoomInnerScoreCard,
    },
})
export default class ScoreChart extends Vue {
    @Prop({ required: true }) scoreItemID!: string
    @Prop({ required: true }) currentUser!: UserModel
    public scoreItemModel: ScoreItemModel | null = null
    public scoreModels: ScoreModel[] = []

    public async created() {
        this.scoreItemModel = await userInteractor.fetchScoreItemByScoreItemID(
            this.scoreItemID
        )
        this.scoreModels = await this.scoreItemModel!.fetchScores()
        // このユーザーのって情報がない
        console.log(this.scoreModels)

        // itemでスコア取得、propで渡す
    }
}
</script>
<style lang="stylus" scoped>
.chart_item_container {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    align-items: flex-end;
}

.date {
    margin: 0 auto;
}

.bar {
    width: 20px;
    height: 100px;
    margin: 0 auto;
    background-color: #000;
}

.one {
    width: 20px;
    height: 10px;
    margin: 0 auto;
    background-color: #000;
}

.two {
    width: 20px;
    height: 20px;
    margin: 0 auto;
    background-color: #000;
}
</style>
