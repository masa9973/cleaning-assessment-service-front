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
            <div class="new_add_score_container">
                <div v-if="scoreItems.length">
                    <div
                        v-for="scoreItem in scoreItems"
                        :key="scoreItem.scoreItemID"
                    >
                        <add-score-value
                            :score-item-model="scoreItem"
                            :record-model="recordModel"
                            @changeScoreValue="changeScoreValue"
                        />
                    </div>
                </div>
                <div v-else class="no_item_message">
                    <nuxt-link
                        tag="div"
                        :to="{
                            name: 'manager-setting',
                        }"
                    >
                        <div>まだ評価項目が登録されていません</div>
                        <div>ここを押して評価項目を追加できます</div>
                    </nuxt-link>
                </div>
            </div>
            <div class="app_button_container">
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
import { userInteractor } from '~/api'
import AppModal from '@/components/Organisms/common/app_modal/index.vue'
import AppButton from '@/components/Atom/AppButton.vue'
import RecordCard from '@/components/Organisms/record/card/index.vue'
import ScoreItemCard from '@/components/Organisms/score/score_item_card/index.vue'
import AddScoreValue from '@/components/Organisms/score/addscore/addscore_value/index.vue'

@Component({
    components: {
        AppModal,
        AppButton,
        RecordCard,
        ScoreItemCard,
        AddScoreValue,
    },
})
export default class AddScore extends Vue {
    @Prop({ required: true }) recordModel!: RecordModel
    public currentUser: UserModel | null = null
    public scoreItems: ScoreItemModel[] = []
    public isShowModal: boolean = false
    public blancScores: ScoreModel[] = []
    public scoreValues: number[] = []
    public cleanerID: string = ''
    // 使ってる変数

    // ここでブランクスコア配列作るのはどう？

    async created() {
        this.currentUser = await userInteractor.fetchMyUserModel()
        this.scoreItems = await this.currentUser.fetchSameHotelScoreItems()
        for (let i=0; i<this.scoreItems.length; i++) {
            this.blancScores[i] = await this.scoreItems[i].createNewScore(this.recordModel.recordID)
        }
    }

    public openModal() {
        this.isShowModal = true
        this.scoreValues = []
    }

    public changeScoreValue(scoreValue:number) {
        this.scoreValues.push(scoreValue)
    }

    @AsyncLoadingAndErrorHandle()
    public async scored() {
        for (let i=0; i<this.scoreItems.length; i++) {
            this.blancScores[i].scoreCleanerID = this.recordModel.cleanerID
            this.blancScores[i].scoreRoomID = this.recordModel.cleaningRoomID
            this.blancScores[i].score = this.scoreValues[i] 
            await this.blancScores[i].register()
        }
        await this.recordModel.switchIfScored()
        this.$emit('registered')
    }
}
</script>
<style lang="stylus" scoped>
.no_item_message {
    margin-bottom: 10px;
    text-align: center;
}

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