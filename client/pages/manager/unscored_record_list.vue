<template>
    <div class="records_list_container">
        <div>未評価清掃リスト</div>
        <div class="record_card_container">
            <div
                v-for="record in records"
                :key="record.recordID"
                class="record_card_with_addscorebutton"
            >
                <add-score v-if="!record.ifScored" :record-model="record" />
            </div>
        </div>
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

    public async created() {
        this.user = await userInteractor.fetchMyUserModel()
        this.recordsHotelID = this.user.userHotelID
        this.records = await userInteractor.fetchAllRecordsByHotelID(
            this.recordsHotelID
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
</style>