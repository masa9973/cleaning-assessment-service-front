<template>
    <div class="assgined_record_card">
        <div v-if="user" class="user_icon_wrapper">
            <user-icon :user-model="user" :show-edit="isMyPage" />
        </div>
        <div class="cleaning_room_name">{{ cleaningRoomName }}</div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
// component
import { RecordModel, RoomModel, UserModel } from 'stage3-abr'
import { userInteractor } from '~/api'
import UserIcon from '@/components//Organisms/User/Icon/index.vue'
@Component({
    components: {
        UserIcon,
    },
})
export default class AssginedRecordCard extends Vue {
    @Prop({ required: true }) recordModel!: RecordModel
    public user: UserModel | null = null
    public roomModel: RoomModel | null = null
    public cleaningRoomName: string = ''
    public isMyPage: boolean = false
    async created() {
        this.user = await userInteractor.fetchUserModelByUserID(
            this.recordModel.cleanerID
        )
        this.roomModel = await userInteractor.fetchRoomByRoomID(
            this.recordModel.cleaningRoomID
        )
        this.cleaningRoomName = this.roomModel!.roomName
        console.log('user', this.user)
    }
}
</script>
<style lang="stylus" scoped>
.assgined_record_card {
    display: flex;
    border: 1px solid;
    padding: 5px;
    margin: auto;
    border-radius: 8px;
    width: 90%;

    .user_icon_wrapper {
    }

    .cleaning_room_name {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>