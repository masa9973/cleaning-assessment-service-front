<template>
    <div class="modal_inner">
        <div class="room_user_selecter">
            <div class="room_selecter">
                <div v-if="rooms.length">
                    <div>部屋を選択</div>
                    <select v-model="selectedRoomID">
                        <option
                            v-for="room in rooms"
                            :key="room.roomID"
                            :value="room.roomID"
                        >
                            {{ room.roomName }}
                        </option>
                    </select>
                </div>
                <div v-else>設定から部屋を追加できます。</div>
            </div>
            <div class="user_selecter">
                <div v-if="cleaners.length">
                    <div>清掃者を選択</div>
                    <select v-model="selectedUserID">
                        <option
                            v-for="cleaner in cleaners"
                            :key="cleaner.userID"
                            :value="cleaner.userID"
                        >
                            {{ cleaner.name }}
                        </option>
                    </select>
                </div>
                <div v-else>設定から清掃者を登録できます。</div>
            </div>
        </div>
        <app-button
            :disabled="!selectedRoomID || !selectedUserID"
            @click="assigned"
            >アサインする</app-button
        >
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { RecordModel, RoomModel, UserModel } from 'stage3-abr'
import AppModal from '@/components/Organisms/common/app_modal/index.vue'
import AppButton from '@/components/Atom/AppButton.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import { userInteractor } from '~/api'
@Component({
    layout: 'manager',
    components: {
        AppModal,
        AppButton,
    },
})
export default class AssignRecord extends Vue {
    public currentUser: UserModel | null = null
    public blancRecord: RecordModel | null = null
    public rooms: RoomModel[] = []
    public cleaners: UserModel[] = []
    public selectedRoomID: string = ''
    public selectedUserID: string = ''

    async created() {
        this.currentUser = await userInteractor.fetchMyUserModel()
        this.rooms = await this.currentUser.fetchSameHotelRooms()
        this.cleaners = await this.currentUser.fetchSameHotelCleaner()
    }

    @AsyncLoadingAndErrorHandle()
    public async assigned() {
        this.blancRecord = await userInteractor.createNewRecord()
        this.blancRecord.cleanerID = this.selectedUserID
        this.blancRecord.cleaningRoomID = this.selectedRoomID
        await this.blancRecord.register()
        // emitで親更新
        this.$emit('registered')
    }
}
</script>
<style lang="stylus" scoped>
.modal_inner {
    text-align: center;

    .room_user_selecter {
        display: flex;
        margin-bottom: 5px;
        justify-content: space-evenly;

        .room_selecter {
            display: flex;
        }

        .user_selecter {
            display: flex;
        }
    }
}
</style>