<template>
    <div class="records_list_container">
        <div
            v-for="record in records"
            :key="record.recordID"
            class="record_card_with_addscorebutton"
        >
            <record-card v-if="!record.ifScored" :record-model="record" />
            <add-score v-if="!record.ifScored" :record-model="record" @registered="this.record = $event"/>
        </div>
    </div>
</template>
<script lang="ts">
import { RecordModel, ScoreModel } from 'stage3-abr'
import { Component, Vue } from 'nuxt-property-decorator'
import { userInteractor } from '~/api'
import RecordCard from '@/components/Organisms/record/card/index.vue'
import AddScore from '@/components/Organisms/score/addscore/index.vue'

// component

@Component({
    components: {
        RecordCard,
        AddScore,
    },
})
export default class RecordListForManager extends Vue {
    public records: RecordModel[] = []
    public unscoredRecords: RecordModel[] = []
    public blancScore: ScoreModel | null = null
    public isShowModal: boolean = false
    public scoreValue: number = 0

    public async created() {
        this.records = await userInteractor.fetchAllRecords()
        // ifScoredがfalseなら表示したい
        // this.unscoredRecords = this.records.filter()
    }

    // public openModal() {
    //     this.isShowModal = true
    // }

    // public async register() {
    //     const scoreInteractor = await scoreInteractorFactory(this.recordModel)
    //     this.blancScore = await scoreInteractor.createNewScore()
    //     this.blancScore.score = this.scoreValue
    //     await this.blancScore.register()
    //     console.log('スコアに何の値が入っているか', this.blancScore)
    //     this.isShowModal = false
    //     this.record.ifScored = true
    //     this.$emit('registered', this.recordModel)
    // }
}
</script>
<style lang="stylus" scoped>
.record_card_with_addscorebutton {
    margin-bottom: 35px;

    .addscorebutton {
        text-align: center;
    }
}
</style>