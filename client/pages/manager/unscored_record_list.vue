<template>
    <div class="records_list_container">
        <div>未評価清掃リスト</div>
        <div class="record_card_container">
            <div v-if="unScoredRecords.length">
                <div
                    v-for="record in unScoredRecords"
                    :key="record.recordID"
                    class="record_card_with_addscorebutton"
                >
                    <add-score :record-model="record"
                    @registered="registered" />
                </div>
            </div>
            <div v-else>未評価の清掃はありません。</div>
        </div>
        <div class="blanc"></div>
    </div>
</template>
<script lang="ts">
import { RecordModel, UserModel } from 'stage3-abr'
import { Component, Vue } from 'nuxt-property-decorator'
import RecordCard from '@/components/Organisms/record/card/index.vue'
import AddScore from '@/components/Organisms/score/addscore/index.vue'
import { userInteractor } from '~/api'

// component

@Component({
    layout: 'manager',
    components: {
        RecordCard,
        AddScore,
    },
})
export default class RecordListForManager extends Vue {
    public user: UserModel | null = null
    public recordsHotelID: string = ''
    public records: RecordModel[] = []
    public unScoredRecords: RecordModel[] = []

    public async created() {
        this.user = await userInteractor.fetchMyUserModel()
        this.recordsHotelID = this.user.userHotelID
        this.records = await userInteractor.fetchAllRecordsByHotelID(
            this.recordsHotelID
        )
        this.unScoredRecords = this.records.filter(
            (record) => !record.ifScored && !!record.cleaningTime
        )
    }

    public async registered() {
        this.records = await userInteractor.fetchAllRecordsByHotelID(
            this.recordsHotelID
        )
        this.unScoredRecords = this.records.filter(
            (record) => !record.ifScored && !!record.cleaningTime
        )
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

.blanc {
    height: 60px;
}
</style>