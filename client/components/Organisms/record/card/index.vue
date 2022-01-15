<template>
    <div class="record_item_container">
        <div class="record_date">
            <div>清掃日{{ new Date(createdAt) }}</div>
        </div>
        <div class="cleaner_name">
            <div>清掃者{{ name }}</div>
            <div class="cleaner_icon">
                <img :src="userIconUrl" />
            </div>
        </div>
        <div class="record_room">
            <div>部屋番号{{ room }}</div>
        </div>
        <div class="cleaning_time">
            <div>清掃時間{{ time }}</div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { RecordModel, UserModel } from 'stage3-abr'
import UserIcon from '@/components/Organisms/User/Icon/index.vue'
import { userInteractor } from '~/api'

@Component({
    components: {
        UserIcon,
    },
})
export default class RecordCard extends Vue {
    @Prop({ required: true }) recordModel!: RecordModel
    public pageUser: UserModel | null = null

    async created() {
        this.pageUser = await userInteractor.fetchUserModelByUserID(
            this.recordModel.cleanerID
        )
    }

    get createdAt() {
        return this.recordModel.createdAt
    }

    get cleanerID() {
        return this.recordModel.cleanerID
    }

    get room() {
        return this.recordModel.room
    }

    get userIconUrl() {
        return this.pageUser?.userIcon
    }

    get name() {
        return this.pageUser?.name
    }

    get startAt() {
        return this.recordModel.startAt
    }

    get finishedAt() {
        return this.recordModel.finishedAt
    }

    get time() {
        console.log('start', this.startAt)
        console.log('finished', this.finishedAt)
        return this.finishedAt - this.startAt
    }
}
</script>
<style lang="stylus" scoped>
.record_item_container {
    border: 1px solid;
    padding: 5px;
    margin: 5px;
    border-radius: 8px;
    
    img {
        object-fit: cover;
        border-radius: 10000px;
        width: 50px;
        height: 50px;
    }
}
</style>