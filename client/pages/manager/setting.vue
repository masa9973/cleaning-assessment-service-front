<template>
    <div v-if="currentUser" class="setting_page">
        <div class="settings_container">
            <div class="invite_cleaner_url_container">
                <div class="title">清掃者登録URL</div>
                <div id="inviteUrl">
                    https://dev.cleaning-assessment.ishikawam.com/auth_cleaner/signin/{{
                        currentUser.userHotelID
                    }}
                </div>
                <div class="flex items-center justify-center mt-1">
                    <app-button @click="writeToClipboard">URLコピー</app-button>
                </div>
                <!-- dev用 -->
                <!-- <div>
                    localhost:3000/auth_cleaner/signin/{{
                        currentUser.userHotelID
                    }}
                </div> -->
            </div>
            <div class="room_list_container">
                <div class="title">登録済みの部屋一覧</div>
                <div class="room_and_item_container">
                    <div
                        v-for="room in rooms"
                        :key="room.roomID"
                        class="room_and_item_icon"
                    >
                        {{ room.roomName }}
                    </div>
                </div>
                <div class="register_button mt-1">
                    <app-button @click="openAddRoomModal"
                        >部屋を登録する</app-button
                    >
                </div>
            </div>
            <div class="room_list_container">
                <div class="title">登録済みの評価項目</div>
                <div class="room_and_item_container">
                    <div
                        v-for="scoreItem in scoreItems"
                        :key="scoreItem.scoreItemID"
                        class="room_and_item_icon"
                    >
                        {{ scoreItem.scoreItemName }}
                    </div>
                </div>
                <div class="register_button mt-1">
                    <app-button @click="openAddItemModal"
                        >評価項目を登録する</app-button
                    >
                </div>
            </div>
        </div>
        <app-modal v-model="isShowAddRoomModal">
            <div class="modal_inner">
                <div class="input_container">
                    <div>部屋名</div>
                    <app-input v-model="roomNameValue" />
                </div>
                <app-button :disabled="!roomNameValue" @click="register"
                    >登録する</app-button
                >
            </div>
        </app-modal>
        <app-modal v-model="isShowAddItemModal">
            <div class="modal_inner">
                <div class="input_container">
                    <div>項目名</div>
                    <app-input v-model="scoreItemNameValue" />
                </div>
                <app-button
                    :disabled="!scoreItemNameValue"
                    @click="registerScoreItem"
                    >登録する</app-button
                >
            </div>
        </app-modal>
        <div class="blanc"></div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import {
    RoomModel,
    ScoreItemModel,
    UserModel,
} from 'cleaning-assessment-service-abr'
import { userInteractor } from '~/api'
import AppModal from '@/components/Organisms/common/app_modal/index.vue'
import AppButton from '@/components/Atom/AppButton.vue'
import AppInput from '@/components/Atom/AppInput.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
@Component({
    layout: 'manager',
    components: {
        AppModal,
        AppButton,
        AppInput,
    },
})
export default class ManagerConfig extends Vue {
    public currentUser: UserModel | null = null
    public rooms: RoomModel[] = []
    public blancRoom: RoomModel | null = null
    public roomNameValue: string = ''
    public isShowAddRoomModal: boolean = false
    public isShowAddItemModal: boolean = false
    public blancScoreItem: ScoreItemModel | null = null
    public scoreItemNameValue: string = ''
    public scoreItems: ScoreItemModel[] = []

    public async created() {
        this.currentUser = await userInteractor.fetchMyUserModel()
        this.rooms = await this.currentUser.fetchSameHotelRooms()
        this.scoreItems = await this.currentUser.fetchSameHotelScoreItems()
    }

    public openAddRoomModal() {
        this.isShowAddRoomModal = true
    }

    public openAddItemModal() {
        this.isShowAddItemModal = true
    }

    public writeToClipboard() {
        const copyText = this.$el.querySelector('#inviteUrl')!.textContent
        navigator.clipboard
            .writeText(copyText!)
            .then(() => {
                window.alert('copied!')
            })
            .catch((e) => {
                console.error(e)
            })
    }

    @AsyncLoadingAndErrorHandle()
    public async register() {
        this.blancRoom = await userInteractor.createNewRoom(this.roomNameValue)
        await this.blancRoom.register()
        // window.alert('部屋登録完了。続けて別の部屋を登録できます')
        this.roomNameValue = ''
        this.rooms = await this.currentUser!.fetchSameHotelRooms()
    }

    @AsyncLoadingAndErrorHandle()
    public async registerScoreItem() {
        this.blancScoreItem = await userInteractor.createNewScoreItem(
            this.scoreItemNameValue
        )
        await this.blancScoreItem.register()
        // window.alert('項目登録完了。続けて別の項目を登録できます')
        this.scoreItemNameValue = ''
        this.scoreItems = await this.currentUser!.fetchSameHotelScoreItems()
    }
}
</script>
<style lang="stylus" scoped>
.title {
    font-weight: bold;
}

.register_button {
    text-align: center;
}

.room_and_item_container {
    display: flex;
    flex-wrap: wrap;

    .room_and_item_icon {
        box-shadow: 0 0 5px 0 #c4c4c4;
        padding: 5px;
        margin: 10px 10px;
        border-radius: 8px;
        text-align: center;
    }
}

.invite_cleaner_url_container {
    border: 1px solid #ccc;
    padding: 5px;
    background-color: #fff;
    border-radius: 8px;
    margin: 5px;
    padding: 5px;
    word-break: break-all;
}

.room_list_container {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 8px;
    margin: 5px;
    padding: 5px;
}

.modal_inner {
    text-align: center;

    .input_container {
        margin-bottom: 5px;
    }
}

.blanc {
    height: 60px;
}
</style>
