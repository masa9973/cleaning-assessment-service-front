<template>
    <div>
        <div class="time_add_cotainer">
            <div>開始時刻{{ viewStartTime }}</div>
            <button :disabled="ifPushStartButton" @click="getStartTime">
                清掃を開始
            </button>
            <div>終了時刻{{ viewFinishedTime }}</div>
            <button :disabled="ifPushFinishButton" @click="getFinishTime">
                清掃を終了
            </button>
        </div>
        <div class="room_add_container">
            <div>清掃部屋</div>
            <input v-model="roomValue" />
        </div>
        <div class="button">
            <button :disabled="!roomValue" @click="openModal">完了</button>
        </div>

        <app-modal v-model="isShowModal" class="check_modal">
            <div class="cleaning_result">
                <div>開始時刻{{ viewStartTime }}</div>
                <div>終了時刻{{ viewFinishedTime }}</div>
                <div>時間(ms){{ time }}</div>
                <div>清掃時間{{ viewTime }}</div>
                <div>清掃部屋{{ roomValue }}</div>
                <button @click="register">送信する</button>
            </div>
        </app-modal>
    </div>
</template>
<script lang="ts">
import { RecordModel } from 'stage3-abr'
import { Component, Vue } from 'nuxt-property-decorator'
import AppModal from '@/components/Organisms/common/app_modal/index.vue'

// component
import { userInteractor } from '~/api'

@Component({
    components: {
        AppModal,
    },
})
export default class AddRecord extends Vue {
    public ifPushStartButton: boolean = false
    public ifPushFinishButton: boolean = true
    public blancRecord: RecordModel | null = null
    public startTime: number = 0
    public finishedTime: number = 0
    public roomValue: string = ''
    public viewStartTime: string = '00:00:00'
    public viewFinishedTime: string = '00:00:00'
    public isShowModal: boolean = false
    public time: number = 0
    public viewTime: string = ''

    public async created() {}

    public openModal() {
        this.isShowModal = true
        this.time = this.finishedTime - this.startTime
        const diffTime = this.finishedTime - this.startTime
        const HH = Math.floor(diffTime / 3600000)
        const mm = Math.floor(diffTime / 60000)
        const ss = Math.floor(diffTime / 1000)
        this.viewTime = `${HH}時間${mm}分${ss}秒`
    }

    public getStartTime() {
        this.startTime = new Date().getTime()
        const date = new Date(this.startTime)
        const HH = `0${date.getHours()}`.slice(-2)
        const mm = `0${date.getMinutes()}`.slice(-2)
        const ss = `0${date.getSeconds()}`.slice(-2)
        this.viewStartTime = `${HH}:${mm}:${ss}`
        this.ifPushStartButton = true
        this.ifPushFinishButton = false
    }

    public getFinishTime() {
        this.finishedTime = new Date().getTime()
        const date = new Date(this.finishedTime)
        const HH = `0${date.getHours()}`.slice(-2)
        const mm = `0${date.getMinutes()}`.slice(-2)
        const ss = `0${date.getSeconds()}`.slice(-2)
        this.viewFinishedTime = `${HH}:${mm}:${ss}`
        this.ifPushFinishButton = true
    }

    public async register() {
        this.blancRecord = await userInteractor.createNewRecord()
        this.blancRecord.startAt = this.startTime
        this.blancRecord.finishedAt = this.finishedTime
        this.blancRecord.room = this.roomValue
        await this.blancRecord.register()
        window.alert(
            '清掃記録は正常に送信されました。'
        )
        this.startTime = 0
        this.finishedTime = 0
        this.viewStartTime = '00:00:00'
        this.viewFinishedTime = '00:00:00'
        this.roomValue = ''
        this.isShowModal = false
        this.ifPushStartButton = false
    }
}
</script>
<style lang="stylus">
.cleaning_result {
    text-align: center;
}
</style>