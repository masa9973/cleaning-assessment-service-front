<template>
    <div>
        <div>ここで清掃ルームの登録と施設名の登録をします。</div>
        <div>
            https://dev.stage3.ishikawam.com/auth_cleaner/signin/{{
                roomHotelID
            }}
        </div>
        <div>localhost:3000/auth_cleaner/signin/{{ roomHotelID }}</div>
        <div class="room_list_container">
            <div>登録済みの部屋一覧</div>
            <div
                v-for="room in rooms"
                :key="room.roomID"
                class="room_icon_wrapper"
            >
                {{ room.roomName }}
            </div>
        </div>
        <button @click="openModal">部屋を登録する</button>
        <app-modal v-model="isShowModal">
            <div class="modal_inner">
                <div class="input_container">
                    <div>部屋名</div>
                    <app-input v-model="roomNameValue" />
                </div>
                <app-button @click="register">登録する</app-button>
            </div>
        </app-modal>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { RoomModel, UserModel } from 'stage3-abr'
import { userInteractor } from '~/api'
import AppModal from '@/components/Organisms/common/app_modal/index.vue'
import AppButton from '@/components/Atom/AppButton.vue'
import AppInput from '@/components/Atom/AppInput.vue'
@Component({
    components: {
        AppModal,
        AppButton,
        AppInput,
    },
})
export default class ManagerConfig extends Vue {
    public user: UserModel | null = null
    public roomHotelID: string = ''
    public rooms: RoomModel[] = []
    public blancRoom: RoomModel | null = null
    public roomNameValue: string = ''
    public isShowModal: boolean = false

    public async created() {
        this.user = await userInteractor.fetchMyUserModel()
        this.roomHotelID = this.user.userHotelID
        this.rooms = await userInteractor.fetchRoomsByHotelID(this.roomHotelID)
    }

    public openModal() {
        this.isShowModal = true
    }

    public async register() {
        this.blancRoom = await userInteractor.createNewRoom(this.roomNameValue)
        await this.blancRoom.register()
        window.alert('部屋登録完了。続けて別の部屋を登録できます')
        this.roomNameValue = ''
    }
}
</script>
<style lang="stylus" scoped>
.modal_inner {
    text-align: center;
    .input_container {
        margin-bottom: 5px;
    }
}
</style>
