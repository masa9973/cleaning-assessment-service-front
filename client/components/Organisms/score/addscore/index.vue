<template>
    <div class="add_score">
        <div
            v-if="propRecordModel"
            class="record_card_for_add_score"
            @click="openModal"
        >
            <record-card :record-model="propRecordModel" />
        </div>
        <app-modal v-model="isShowModal">
            <input v-model="scoreValue" />
            <div>項目を選択</div>
            <select v-model="selectedScoreItemID">
                <option
                    v-for="item in items"
                    :key="item.scoreItemID"
                    :value="item.scoreItemID"
                >
                    {{ item.scoreItemName }}
                </option>
            </select>
            <app-button @click="register">追加</app-button>
            <app-button @click="scored">確定</app-button>
        </app-modal>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { RecordModel, ScoreItemModel, ScoreModel, UserModel } from 'stage3-abr'
import AppModal from '@/components/Organisms/common/app_modal/index.vue'
import { scoreInteractorFactory, userInteractor } from '~/api'
import AppButton from '@/components/Atom/AppButton.vue'
import RecordCard from '@/components/Organisms/record/card/index.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({
    components: {
        AppModal,
        AppButton,
        RecordCard,
    },
})
export default class AddScore extends Vue {
    @Prop({ required: true }) recordModel!: RecordModel
    public blancScore: ScoreModel | null = null
    public scoreValue: number = 0
    public isShowModal: boolean = false
    public items: ScoreItemModel[] = []
    public user: UserModel | null = null
    public hotelID: string = ''
    public selectedScoreItemID: string = ''
    public scores: ScoreModel[] = []
    public propRecordID: string = ''
    public propRecordModel: RecordModel | null = null

    async created() {
        this.user = await userInteractor.fetchMyUserModel()
        this.hotelID = this.user.userHotelID
        this.items = await userInteractor.fetchScoreItemsByHotelID(this.hotelID)
        this.propRecordID = this.recordModel.recordID
        this.propRecordModel = await userInteractor.fetchRecordByRecordID(
            this.propRecordID
        )
        // scoreを取得
        // const scoreInteractor = scoreInteractorFactory(this.recordModel)
        // this.scores = await userInteractor.
    }

    public openModal() {
        this.isShowModal = true
    }

    @AsyncLoadingAndErrorHandle()
    public async register() {
        const scoreInteractor = scoreInteractorFactory(this.recordModel)
        this.blancScore = await scoreInteractor.createNewScore()
        this.blancScore.scoreItemID = this.selectedScoreItemID
        this.blancScore.score = this.scoreValue
        await this.blancScore.register()
        // await this.recordModel.switchIfScored()
        // window.alert('清掃評価は正常に送信されました。')
        this.propRecordModel = await userInteractor.fetchRecordByRecordID(
            this.propRecordID
        )
    }

    public async scored() {
        await this.recordModel.switchIfScored()
    }
}
</script>
<style lang="stylus" scoped>
.add_score {
    // text-align: center;
}
</style>