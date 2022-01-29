<template>
    <div class="assigned_record_card">
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
export default class assignedRecordCard extends Vue {
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
    }
}
</script>
<style lang="stylus" scoped>
.assigned_record_card {
    display: flex;
    box-shadow: 0 0 5px 0 $shadowColor;
    padding: 5px;
    margin: 10px auto;
    border-radius: 8px;
    width: 90%;
    background-color: #F9F9FA;

    .user_icon_wrapper {
    }

    .cleaning_room_name {
        display: flex;
        justify-content: center;
        align-items: center;
        width 30%
    }
}
</style>