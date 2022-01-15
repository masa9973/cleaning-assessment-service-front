<template>
    <div>
        <div class="records_list_container">
            <div v-for="record in records" :key="record.recordID">
                <record-card :record-model="record" />
                <add-score :record-model="record"/>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { RecordModel } from 'stage3-abr'
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

    public async created() {
        this.records = await userInteractor.fetchAllRecords()
    }
}
</script>
