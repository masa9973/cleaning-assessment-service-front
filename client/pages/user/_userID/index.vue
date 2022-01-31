<template>
    <div class="record_list_associated_with_user">
        <div
            v-for="roomModel in roomModels"
            :key="roomModel.roomID"
            class="chart"
        >
            <div class="room_info">{{ roomModel.roomName }}</div>
            <time-chart
                :current-user="currentUser"
                :room-model="roomModel"
                class="time_chart"
            />
            <div
                v-for="scoreItemModel in scoreItemModels"
                :key="scoreItemModel.scoreItemID"
                class="score_chart"
            >
                <score-chart
                    :current-user="currentUser"
                    :score-item-model="scoreItemModel"
                    :room-model="roomModel"
                />
            </div>
        </div>

        <div class="blanc"></div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { RecordModel, RoomModel, ScoreItemModel, UserModel } from 'stage3-abr'
import { userInteractor } from '~/api'
import LinkButton from '@/components/Atom/LinkButton.vue'
import RecordCard from '@/components/Organisms/record/card/index.vue'
import TimeChart from '@/components/Organisms/chart/room_average_time/index.vue'
import ScoreChart from '@/components/Organisms/chart/room_average_score/index.vue'
@Component({
    layout: 'manager',
    components: {
        LinkButton,
        RecordCard,
        TimeChart,
        ScoreChart,
    },
})
export default class UserRecordList extends Vue {
    public currentUser: UserModel | null = null
    public scoredRecords: RecordModel[] = []
    public scoreItemModels: ScoreItemModel[] = []
    public roomModels: RoomModel[] = []
    // 使ってる変数

    async created() {
        this.currentUser = await userInteractor.fetchUserModelByUserID(
            this.$route.params.userID
        )
        this.roomModels = await this.currentUser.fetchSameHotelRooms()
        this.scoreItemModels = await this.currentUser.fetchSameHotelScoreItems()
    }
}
</script>
<style lang="stylus" scoped>
.time_chart {
    padding-bottom: 10px;
}

.score_chart {
    padding-bottom: 10px;
}

.chart {
    border: 1px solid #ccc;
    padding: 5px;
    margin: 5px;
    border-radius: 8px;

    .room_info {
        text-align: center;
        font-weight: bold;
        font-size: 20px;
    }
}

.blanc {
    height: 60px;
}
</style>