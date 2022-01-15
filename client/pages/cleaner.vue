<template>
    <div>
        <div class="time_add_cotainer">
            <div>開始時刻</div>
            <button @click="getStartTime">清掃を開始</button>
            <div>{{ new Date(startTime) }}</div>
            <div>終了時刻</div>
            <button @click="getFinishTime">清掃を終了</button>
            <div>{{ new Date(finishedTime) }}</div>
        </div>
        <div class="room_add_container">
            <div>清掃部屋</div>
            <input v-model="roomValue" />
        </div>
        <div class="button">
            <button @click="register">記録する</button>
        </div>
    </div>
</template>
<script lang="ts">
import { RecordModel } from 'stage3-abr'
import { Component, Vue } from 'nuxt-property-decorator'

// component
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import { userInteractor } from '~/api'

@Component({
    components: {
    },
})
export default class AddRecord extends Vue {
    public blancRecord: RecordModel | null = null
    public startTime: number = 0
    public finishedTime: number = 0
    public roomValue: string = ''

    public async created() {
    }

    public getStartTime() {
        this.startTime = new Date().getTime()
        return this.startTime
    }

    public getFinishTime() {
        this.finishedTime = new Date().getTime()
        return this.finishedTime
    }

    @AsyncLoadingAndErrorHandle()
    public async register() {
        this.blancRecord = await userInteractor.createNewRecord()
        this.blancRecord.startAt = this.startTime
        this.blancRecord.finishedAt = this.finishedTime
        this.blancRecord.room = this.roomValue
        await this.blancRecord.register()
        this.$emit('registered')
    }
}
</script>
