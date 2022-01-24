<template>
    <div class="record_list_associated_with_user">
        <div>ここにユーザーのレコード一覧を表示する</div>
        <div v-for="record in records" :key="record.recordID">
            <record-card :record-model="record" />
        </div>
        <link-button :to="{ name: 'cleaner-record_list-room' }"
            >部屋に紐づくレコードを表示する</link-button
        >
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { RecordModel, UserModel } from 'stage3-abr'
import { userInteractor } from '~/api'
import LinkButton from '@/components/Atom/LinkButton.vue'
import RecordCard from '@/components/Organisms/record/card/index.vue'

@Component({
    layout: 'cleaner',
    components: {
        LinkButton,
        RecordCard,
    },
})
export default class UserRecordList extends Vue {
    public user: UserModel | null = null
    public records: RecordModel[] = []
    async created() {
        this.user = await userInteractor.fetchMyUserModel()
        this.records = await userInteractor.fetchRecordsByCleanerID(
            this.user.userID
        )
    }
}
</script>
