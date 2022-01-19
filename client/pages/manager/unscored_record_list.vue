<template>
    <div class="records_list_container">
        <div>未評価清掃リスト</div>
        <div class="record_card_container">
            <div
                v-for="record in records"
                :key="record.recordID"
                class="record_card_with_addscorebutton"
            >
                <record-card v-if="!record.ifScored" :record-model="record" />
                <add-score v-if="!record.ifScored" :record-model="record" />
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
<style lang="stylus" scoped>

.record_list_container {
    text-align: center;

.record_card_container {

    .record_card_with_addscorebutton {
        margin-bottom: 35px;
        padding: auto;

        .addscorebutton {
            text-align: center;
        }
    }
}
}
</style>