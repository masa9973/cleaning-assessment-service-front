<template>
    <div>
        <div class="time_add_cotainer">
            <div>開始時刻{{ viewStartTime }}</div>
            <button onclick="this.disabled = true" @click="getStartTime">
                清掃を開始
            </button>
            <div>終了時刻{{ viewFinishedTime }}</div>
            <button onclick="this.disabled = true" @click="getFinishTime">
                清掃を終了
            </button>
        </div>
        <div class="room_add_container">
            <div>清掃部屋</div>
            <input v-model="roomValue" />
        </div>
        <div class="button">
            <button :disabled="!roomValue" @click="register">記録する</button>
        </div>
    </div>
</template>
<script lang="ts">
import { RecordModel } from 'stage3-abr'
import { Component, Vue } from 'nuxt-property-decorator'

// component
import { userInteractor } from '~/api'

@Component({
    components: {},
})
export default class AddRecord extends Vue {
    public blancRecord: RecordModel | null = null
    public startTime: number = 0
    public finishedTime: number = 0
    public roomValue: string = ''
    public viewStartTime: string = '00:00:00'
    public viewFinishedTime: string = '00:00:00'

    public async created() {}

    public getStartTime() {
        this.startTime = new Date().getTime()
        const date = new Date(this.startTime)
        const HH = `0${date.getHours()}`.slice(-2)
        const mm = `0${date.getMinutes()}`.slice(-2)
        const ss = `0${date.getSeconds()}`.slice(-2)
        this.viewStartTime = `${HH}:${mm}:${ss}`
    }

    public getFinishTime() {
        this.finishedTime = new Date().getTime()
        const date = new Date(this.finishedTime)
        const HH = `0${date.getHours()}`.slice(-2)
        const mm = `0${date.getMinutes()}`.slice(-2)
        const ss = `0${date.getSeconds()}`.slice(-2)
        this.viewFinishedTime = `${HH}:${mm}:${ss}`
    }

    public async register() {
        this.blancRecord = await userInteractor.createNewRecord()
        this.blancRecord.startAt = this.startTime
        this.blancRecord.finishedAt = this.finishedTime
        this.blancRecord.room = this.roomValue
        await this.blancRecord.register()
        window.alert(
            '清掃記録は正常に送信されました。続けて別の清掃を記録するにはページをリロードしてください。'
        )
    }
}
</script>
