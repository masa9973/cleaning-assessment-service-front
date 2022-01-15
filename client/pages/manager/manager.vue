<template>
    <div>
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
