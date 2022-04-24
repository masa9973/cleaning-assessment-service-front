<template>
    <div>
        <div class="chart_title">清掃時間グラフ</div>
        <div class="scale_and_chart overflow-x-scroll">
            <div class="scale">
                <div class="scale_top">1時間</div>
                <div class="scale_bottom">0分</div>
            </div>
            <div class="chart_item_container">
                <div
                    v-for="recordModel in recordModels"
                    :key="recordModel.recordID"
                >
                    <div class="room_inner_time_card_container">
                        <room-inner-time-card :record-model="recordModel" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
// recordをpropとして受け取って、cleaningTimeの値によってdivの大きさを変えられるようにする
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import {
    RecordModel,
    RoomModel,
    UserModel,
} from 'cleaning-assessment-service-abr'
import RoomInnerTimeCard from '@/components/Organisms/chart/room_average_time/time_inner_card/index.vue'
@Component({
    components: {
        RoomInnerTimeCard,
    },
})
export default class TimeChart extends Vue {
    @Prop({ required: true }) currentUser!: UserModel
    @Prop({ required: true }) roomModel!: RoomModel
    public recordModels: RecordModel[] = []

    public async created() {
        // この部屋の1ヶ月分の清掃記録
        this.recordModels =
            await this.currentUser!.fetchUserMonthRecordsByRoomID(
                this.roomModel.roomID
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
            left: 3px;
        }

        .scale_bottom {
            position: absolute;
            bottom: 0px;
            left: 6px;
        }
    }

    .chart_item_container {
        display: flex;
        flex-direction: row-reverse;
        flex-wrap: nowrap;
        align-items: flex-end;
        height: 115px;
        justify-content: space-evenly;
    }
}

.room_inner_time_card_container {
    padding-left: 5px;
    padding-right: 5px;
}
</style>
