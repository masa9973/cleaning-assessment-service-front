<template>
    <div class="add_score">
        <div
            v-if="recordModel"
            class="record_card_for_add_score"
            @click="openModal"
        >
            <record-card :record-model="recordModel" />
        </div>
        <app-modal v-model="isShowModal">
            <div class="modal_inner_score_list_container">
                <div
                    v-for="score in scores"
                    :key="score.scoreID"
                    class="score_item_container"
                >
                    <score-item-card :score-item="score" />
                </div>
            </div>
            <div class="add_score_container">
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
                <input v-model="scoreValue" />
            </div>
            <div class="score_list_container">
                <div v-for="score in scores" :key="score.scoreID"></div>
            </div>
            <div class="app_button_container">
                <app-button class="app_button" @click="register"
                    >スコアを追加</app-button
                >
                <app-button class="app_button" @click="scored"
                    >評価済みにする</app-button
                >
            </div>
        </app-modal>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { RecordModel, ScoreItemModel, ScoreModel, UserModel } from 'stage3-abr'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import { scoreInteractorFactory, userInteractor } from '~/api'
import AppModal from '@/components/Organisms/common/app_modal/index.vue'
import AppButton from '@/components/Atom/AppButton.vue'
import RecordCard from '@/components/Organisms/record/card/index.vue'
import ScoreItemCard from '@/components/Organisms/score/score_item_card/index.vue'

@Component({
    components: {
        AppModal,
        AppButton,
        RecordCard,
        ScoreItemCard,
    },
})
export default class AddScore extends Vue {
    @Prop({ required: true }) recordModel!: RecordModel
    public currentUser: UserModel | null = null
    public scoreItems: ScoreItemModel[] = []
    public isShowModal: boolean = false
    public scores: ScoreModel[] = []
    // 使ってる変数
    public blancScore: ScoreModel | null = null
    public scoreValue: number = 0
    public selectedScoreItemID: string = ''
    public scoreValues: number[] = []
    public blancScores: ScoreModel[] = []

    async created() {
        this.currentUser = await userInteractor.fetchMyUserModel()
        this.scoreItems = await this.currentUser.fetchSameHotelScoreItems()
        this.scores = await this.recordModel.fetchScores()
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
        // window.alert('清掃評価は正常に送信されました。')
        this.scores = await this.recordModel.fetchScores()
    }

    @AsyncLoadingAndErrorHandle()
    public async scored() {
        await this.recordModel.switchIfScored()
        this.$emit('registered')
    }
}
</script>
<style lang="stylus" scoped>
.add_score_container {
    padding-bottom: 5px;
}

.app_button_container {
    text-align: center;

    .app_button {
        padding-bottom: 5px;
    }
}
</style>