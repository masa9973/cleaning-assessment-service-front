<template>
    <div class="record_add_container">
        <div class="time_add_cotainer">
            <div class="start_time">
                <div>開始時刻{{ viewStartTime }}</div>
                <app-button :disabled="ifPushStartButton" @click="getStartTime">
                    清掃を開始
                </app-button>
            </div>
            <div class="finish_time">
                <div>終了時刻{{ viewFinishedTime }}</div>
                <app-button
                    :disabled="ifPushFinishButton"
                    @click="getFinishTime"
                >
                    清掃を終了
                </app-button>
            </div>
        </div>
        <div class="app-button">
            <app-button @click="openModal">完了</app-button>
        </div>
        <app-modal v-model="isShowModal" class="check_modal">
            <div class="cleaning_result">
                <div>清掃部屋{{ recordRoomName }}</div>
                <div>{{ viewStartTime }}〜{{ viewFinishedTime }}</div>
                <div>{{ viewTime }}</div>
                <app-button
                    :disabled="!ifPushStartButton || !ifPushFinishButton"
                    @click="register"
                    >送信する</app-button
                >
                <app-button
                    :disabled="!ifPushFinishButton"
                    @click="resetFinishButton"
                    >まだ終わってない</app-button
                >
            </div>
        </app-modal>
    </div>
</template>
<script lang="ts">
import { millisecondToStringTime, RecordModel, timeStampToStringTime } from 'stage3-abr'
import { Component, Vue } from 'nuxt-property-decorator'
import AppModal from '@/components/Organisms/common/app_modal/index.vue'
import AppButton from '@/components/Atom/AppButton.vue'
import AppInput from '@/components/Atom/AppInput.vue'

// component
import { userInteractor } from '~/api'

@Component({
    layout: 'cleaner',
    components: {
        AppModal,
        AppButton,
        AppInput,
    },
})
export default class AddRecord extends Vue {
    public ifPushStartButton: boolean = false
    public ifPushFinishButton: boolean = true
    public blancRecord: RecordModel | null = null
    public startTime: number = 0
    public finishedTime: number = 0
    public viewStartTime: string = '00:00:00'
    public viewFinishedTime: string = '00:00:00'
    public isShowModal: boolean = false
    public viewTime: string = ''

    public async created() {
        this.blancRecord = await userInteractor.fetchRecordByRecordID(
            this.$route.params.recordID
        )
    }

    public openModal() {
        this.isShowModal = true
        this.viewTime = millisecondToStringTime(this.finishedTime - this.startTime)
    }

    public getStartTime() {
        this.startTime = new Date().getTime()
        this.viewStartTime = timeStampToStringTime(this.startTime)
        this.ifPushStartButton = true
        this.ifPushFinishButton = false
    }

    public getFinishTime() {
        this.finishedTime = new Date().getTime()
        this.viewFinishedTime = timeStampToStringTime(this.finishedTime)
        this.ifPushFinishButton = true
    }

    public resetFinishButton() {
        this.ifPushFinishButton = false
        this.isShowModal = false
    }

    public async register() {
        this.blancRecord = await userInteractor.fetchRecordByRecordID(
            this.$route.params.recordID
        )
        this.blancRecord.startAt = this.startTime
        this.blancRecord.finishedAt = this.finishedTime
        await this.blancRecord.register()
        window.alert('清掃記録は正常に送信されました。')
        this.$router.push({
            name: 'cleaner-cleaner_top',
        })
    }
}
</script>
<style lang="stylus">
.record_add_container {
    text-align: center;

    .start_time {
        margin-bottom: 40px;
    }

    .finish_time {
        margin-bottom: 40px;
    }

    .cleaning_result {
        text-align: center;
    }
}
</style>