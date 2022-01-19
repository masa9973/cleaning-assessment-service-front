<template>
    <div class="record_item_container">
        <div class="record_date">
            <div>清掃日{{ getViewCleaningDate(createdAt) }}</div>
        </div>
        <div class="cleaner_name">
            <div>清掃者{{ name }}</div>
            <div class="cleaner_icon">
                <img :src="userIconUrl" />
            </div>
        </div>
        <div class="record_room">
            <div>部屋番号{{ room }}</div>
        </div>
        <div class="cleaning_time">
            <div>清掃時間{{ getTimeString(cleaningTime) }}</div>
        </div>
        <div class="score_list_container">
            <div v-for="scoreItem in scoreItems" :key="scoreItem.scoreID">
                <div>清掃評価{{ scoreItem.score }}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { RecordModel, ScoreModel, UserModel } from 'stage3-abr'
import UserIcon from '@/components/Organisms/User/Icon/index.vue'
import { userInteractor } from '~/api'

@Component({
    components: {
        UserIcon,
    },
})
export default class RecordCard extends Vue {
    @Prop({ required: true }) recordModel!: RecordModel
    public recordUser: UserModel | null = null
    public scoreItems: ScoreModel[] = []
    public viewCleaningDate: string = ''

    async created() {
        this.recordUser = await userInteractor.fetchUserModelByUserID(
            this.recordModel.cleanerID
        )
        this.scoreItems = await this.recordModel.fetchScoresByRecordID(
            this.recordModel.recordID
        )
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

    public getTimeString(time: number) {
        const diffTime = time
        const HH = Math.floor(diffTime / 3600000)
        const mm = Math.floor(diffTime / 60000)
        const ss = Math.floor(diffTime / 1000)
        return `${HH}時間${mm}分${ss}秒`
    }

    get createdAt() {
        return this.recordModel.createdAt
    }

    get cleanerID() {
        return this.recordModel.cleanerID
    }

    get room() {
        return this.recordModel.room
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
        return this.recordModel.cleaningTime
    }
}
</script>
<style lang="stylus" scoped>
.record_item_container {
    border: 1px solid;
    padding: 5px;
    margin: 5px;
    border-radius: 8px;
    width: 420px;

    img {
        object-fit: cover;
        border-radius: 10000px;
        width: 50px;
        height: 50px;
    }
}
</style>