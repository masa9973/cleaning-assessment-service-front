<template>
    <div class="record_item_container">
        <div class="record_date">
            <div>{{ getViewCleaningDate(createdAt) }}</div>
        </div>
        <div class="inportant_info">
            <div class="record_room">
                <div>部屋:{{ cleaningRoomName }}</div>
            </div>
            <div class="cleaning_time">
                <div>{{ cleaningTime }}</div>
            </div>
            <div class="cleaner_info_container">
                <div class="cleaner_icon">
                    <img :src="userIconUrl" />
                </div>
                <div>{{ name }}さん</div>
            </div>
        </div>
        <div class="score_list_container">
            <div v-for="score in scores" :key="score.scoreID">
                <div class="score_item_container">
                    <score-item-card :score-item="score" />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import {
    ChillnnTrainingError,
    ErrorCode,
    millisecondToStringTime,
    RecordModel,
    RoomModel,
    ScoreModel,
    UserModel,
} from 'stage3-abr'
import UserIcon from '@/components/Organisms/User/Icon/index.vue'
import { userInteractor } from '~/api'
import ScoreItemCard from '@/components/Organisms/score/score_item_card/index.vue'

@Component({
    components: {
        UserIcon,
        ScoreItemCard,
    },
})
export default class RecordCard extends Vue {
    @Prop({ required: true }) recordModel!: RecordModel
    public recordUser: UserModel | null = null
    public scores: ScoreModel[] = []
    public viewCleaningDate: string = ''
    public room: RoomModel | null = null
    public user: UserModel | null = null
    public roomHotelID: string = ''
    public cleaningRoomName: string = ''

    async created() {
        this.recordUser = await userInteractor.fetchUserModelByUserID(
            this.recordModel.cleanerID
        )
        this.scores = await this.recordModel.fetchScores()
        this.room = await userInteractor.fetchRoomByRoomID(
            this.recordModel.cleaningRoomID
        )
        if (!this.room) {
            throw new ChillnnTrainingError(
                ErrorCode.chillnnTraining_404_resourceNotFound
            )
        }
        this.cleaningRoomName = this.room.roomName
    }

    public getViewCleaningDate(createdAt: number) {
        const date = new Date(createdAt)
        const yyyy = `${date.getFullYear()}`
        const MM = `0${date.getMonth() + 1}`.slice(-2)
        const dd = `0${date.getDate()}`.slice(-2)
        const HH = `0${date.getHours()}`.slice(-2)
        const mm = `0${date.getMinutes()}`.slice(-2)
        const ss = `0${date.getSeconds()}`.slice(-2)
        return `${yyyy}/${MM}/${dd} ${HH}:${mm}:${ss}`
    }

    get createdAt() {
        return this.recordModel.createdAt
    }

    get cleanerID() {
        return this.recordModel.cleanerID
    }

    get userIconUrl() {
        return this.recordUser?.userIcon
    }

    get name() {
        return this.recordUser?.name
    }

    get startAt() {
        return this.recordModel.startAt
    }

    get finishedAt() {
        return this.recordModel.finishedAt
    }

    get cleaningTime() {
        return millisecondToStringTime(this.recordModel.cleaningTime)
    }
}
</script>
<style lang="stylus" scoped>
.record_item_container {
    box-shadow: 0 0 5px 0 $shadowColor;
    padding: 5px;
    margin: 10px auto;
    border-radius: 8px;
    width: 90%;
    background-color: #F9F9FA;

    // .record_room {
    //     font-size: 20px;
    // }

    // .cleaning_time {
    //     font-size: 20px;
    // }

    // .cleaner_info_container {
    //     display: flex;

        img {
            object-fit: cover;
            border-radius: 10000px;
            width: 50px;
            height: 50px;
        }
    // }
}
</style>