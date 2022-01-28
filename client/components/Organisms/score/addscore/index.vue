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
                <div v-for="scoreItem in scoreItems" :key="scoreItem.scoreItemID">
                    <add-score-value
                        ref="addScoreValue"
                        :score-item-model="scoreItem"
                        :record-model="recordModel"
                    />
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
    public scores: ScoreModel[] = []
    // 使ってる変数

    async created() {
        this.currentUser = await userInteractor.fetchMyUserModel()
        this.scoreItems = await this.currentUser.fetchSameHotelScoreItems()
        this.scores = await this.recordModel.fetchScores()
    }

    public openModal() {
        this.isShowModal = true
    }

    // public registerScores() {
    //     if (this.$refs.addScoreValue)
    //     this.$refs.addScoreValue.register()
    // }

    @AsyncLoadingAndErrorHandle()
    public async scored() {
        if (window.confirm('全てのスコアを登録しましたか？'))
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