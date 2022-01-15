<template>
    <div>
        <div class="records_list_container">
            <div v-for="record in records" :key="record.recordID">
                <record-card :record-model="record" />
                
                <button>この清掃を評価する</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { RecordModel, ScoreModel, UserModel } from 'stage3-abr'
import { Component, Vue } from 'nuxt-property-decorator'
import { scoreInteractorFactory, userInteractor } from '~/api'
import RecordCard from '@/components/Organisms/record/card/index.vue'
import UserIcon from '@/components/Organisms/User/Icon/index.vue'

// component

@Component({
    components: {
        RecordCard,
        UserIcon,
    },
})
export default class AddScore extends Vue {
    public record: RecordModel | null = null
    public records: RecordModel[] = []
    public scoreModel: ScoreModel | null = null
    public scoreValue: number = 0
    public user: UserModel | null = null

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
