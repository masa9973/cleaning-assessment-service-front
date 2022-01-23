<template>
    <div>
        <div>
            タップして清掃を開始する
        </div>
        <div class="user_assigned_record_list">
            <div
                v-for="userAssginedRecord in userAssginedRecords"
                :key="userAssginedRecord.recordID"
            >
                <nuxt-link
                    :to="{
                        name: 'cleaner-add_record-recordID',
                        params: { recordID: userAssginedRecord.recordID },
                    }"
                >
                    <div v-if="userAssginedRecord.cleaningTime === 0">
                        {{ userAssginedRecord.recordID }}
                    </div>
                </nuxt-link>
            </div>
        </div>
        <div class="this_will_be_footer">
            <nuxt-link :to="{ name: 'cleaner-cleaner_top' }">
                <button>ホーム</button>
            </nuxt-link>
            <nuxt-link :to="{ name: 'cleaner-record_list-user' }">
                <button>記録をみる</button>
            </nuxt-link>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { RecordModel, UserModel } from 'stage3-abr'
import { userInteractor } from '~/api'
@Component({
    layout: 'cleaner',
    components: {},
})
export default class CleanerTopPage extends Vue {
    public userAssginedRecords: RecordModel[] = []
    public user: UserModel | null = null

    public async created() {
        this.user = await userInteractor.fetchMyUserModel()
        const myCleanerID = this.user.userID
        this.userAssginedRecords = await userInteractor.fetchRecordsByCleanerID(
            myCleanerID
        )
    }
}
</script>
