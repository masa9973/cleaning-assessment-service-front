<template>
    <div>
        <div>レコード一覧</div>
        <div
        v-for="record in registeredRecords"
        :key="record.recordID"
        ></div>
        <nuxt-link :to="{ name: 'manager-addscore'}" >
            <button>評価画面へ</button>
        </nuxt-link>
    </div>
</template>
<script lang="ts">
import { RecordModel } from 'stage3-abr';
import { Vue } from 'nuxt-property-decorator'
import { userInteractor } from '~/api';

export default class RecordList extends Vue {
    public registeredRecords: RecordModel[] = []
    public async created() {
        this.registeredRecords = await userInteractor.fetchAllRecords()
    }
}
</script>
