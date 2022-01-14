<template>
    <div>
        <div>hoge{{ record }}</div>
        <nuxt-link :to="{ name: 'manager-addscore' }" >
            <button>評価画面へ</button>
        </nuxt-link>
    </div>
</template>
<script lang="ts">
import { RecordModel, ScoreModel } from 'stage3-abr'
import { Component, Vue } from 'nuxt-property-decorator'
import { scoreInteractorFactory, userInteractor } from '~/api'

// component

@Component({
    components: {
    },
})
export default class AddScore extends Vue {
    // fetchRecordしなきゃいけない
    public record: RecordModel | null = null
    public records: RecordModel[] = []
    public scoreModel: ScoreModel | null = null
    public scoreValue: number = 0

    public async created() {
        this.records = await userInteractor.fetchAllRecords()
        console.log('hoge', this.records)
        console.log('hogehoge', this.record)
    }

    public async register() {
        const recordInteractor = scoreInteractorFactory(this.record!)
        this.scoreModel! = await recordInteractor.createNewScore()
        this.scoreModel!.score = this.scoreValue
        await this.scoreModel.register()
        this.$emit('registered')
    }
}
</script>
