<template>
    <div>
        <div class="records_list_container">
            <div class="title">未評価の清掃一覧</div>
            <div class="record_card_container">
                <div v-if="unScoredRecords.length">
                    <div
                        v-for="record in unScoredRecords"
                        :key="record.recordID"
                        class="record_card_with_addscorebutton"
                    >
                        <add-score
                            :record-model="record"
                            @registered="registered"
                        />
                    </div>
                </div>
                <div v-else>未評価の清掃はありません。</div>
            </div>
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
    public currentUser: UserModel | null = null
    public unScoredRecords: RecordModel[] = []

    public async created() {
        this.currentUser = await userInteractor.fetchMyUserModel()
        this.unScoredRecords = await this.currentUser.fetchUnscoredRecords()
    }

    public async registered() {
        this.unScoredRecords = await this.currentUser!.fetchUnscoredRecords()
    }
}
</script>
<style lang="stylus" scoped>
.title {
    font-weight: bold
    margin-bottom: 25px
}

.records_list_container {
    border: 1px solid #ccc;
    padding: 5px;
    background-color: #fff;
    border-radius: 8px;
    margin: 5px;

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