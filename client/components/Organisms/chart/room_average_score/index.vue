<template>
    <div>
        <div class="chart_title">{{ scoreItemModel.scoreItemName }}</div>
        <div class="scale_and_chart">
            <div class="scale">
                <div class="scale_top">10</div>
                <div class="scale_bottom">0</div>
            </div>
            <div class="chart_item_container">
                <div
                    v-for="scoreModel in scores"
                    :key="scoreModel.scoreID"
                    class="room_inner_score_card_container"
                >
                    <room-inner-score-card :score-model="scoreModel" />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import {
    RoomModel,
    ScoreItemModel,
    ScoreModel,
    UserModel,
} from 'cleaning-assessment-service-abr'
import RoomInnerScoreCard from '@/components/Organisms/chart/room_average_score/room_inner_card/index.vue'
@Component({
    components: {
        RoomInnerScoreCard,
    },
})
export default class ScoreChart extends Vue {
    @Prop({ required: true }) scoreItemModel!: ScoreItemModel
    @Prop({ required: true }) currentUser!: UserModel
    @Prop({ required: true }) roomModel!: RoomModel
    public scoreModels: ScoreModel[] = []
    public scores: ScoreModel[] = []

    public async created() {
        this.scoreModels =
            await this.scoreItemModel.fetchUserMonthScoresByRoomID(
                this.currentUser.userID,
                this.roomModel.roomID
            )
        this.scores = this.scoreModels.filter(
            (item) => item.scoreItemID === this.scoreItemModel.scoreItemID
        )
    }
}
</script>
<style lang="stylus" scoped>
.chart_title {
    font-weight: bold;
}

.scale_and_chart {
    display: flex;
    border: 1px solid #ccc;
    padding: 5px;
    background-color: #fff;
    border-radius: 8px;
    margin: 5px;

    .scale {
        height: 117px;
        font-size: 10px;
        width: 30px;
        position: relative;

        .scale_top {
            position: absolute;
            left: 15px;
        }

        .scale_bottom {
            position: absolute;
            bottom: 7px;
            left: 15px;
        }
    }

    .chart_item_container {
        display: flex;
        flex-direction: row-reverse;
        flex-wrap: nowrap;
        align-items: flex-end;
        justify-content: flex-start;
        height: 115px;
        justify-content: space-evenly;
        flex-grow: 1;
    }
}

.room_inner_score_card_container {
    padding-left: 5px;
    padding-right: 5px;
}
</style>
