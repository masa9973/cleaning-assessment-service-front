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
import { RecordModel, UserModel } from 'stage3-abr'
import { Component, Vue } from 'nuxt-property-decorator'

// component
import AppInput from '~/components/Atom/AppInput.vue'
import AppButton from '@/components/Atom/AppButton.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import { userInteractor } from '~/api'
// import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({
    components: {
        AppInput,
        AppButton,
    },
})
export default class AddRecord extends Vue {
    // @Prop({ required: true }) recordModel!: RecordModel
    public recordModel!: RecordModel
    public recordModels: RecordModel[] = []
    public blancRecord: RecordModel | null = null
    public myUserModel: UserModel | null = null
    public startTime: number = 0
    public finishedTime: number = 0
    public roomValue: string = ''

    public async created() {
        // this.myUserModel = await userInteractor.fetchMyUserModel()
        // const userID = this.myUserModel.userID
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
        this.recordModel = await userInteractor.createNewRecord()
        this.recordModel!.startAt = this.startTime
        this.recordModel!.finishedAt = this.finishedTime
        this.recordModel!.room = this.roomValue
        await this.recordModel.register()
        this.$emit('registered')
    }
}
</script>
