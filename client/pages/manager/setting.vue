<template>
    <div>
        <div class="invite_cleaner_url_container">
            <div id="inviteUrl">
                https://dev.stage3.ishikawam.com/auth_cleaner/signin/{{
                    roomHotelID
                }}
            </div>
            <button @click="writeToClipboard">URLコピー</button>
            <div>localhost:3000/auth_cleaner/signin/{{ roomHotelID }}</div>
        </div>
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
                <app-button :disabled="!roomNameValue" @click="register"
                    >登録する</app-button
                >
            </div>
        </app-modal>
        <div class="item_list_container">
            <div>登録済みの評価項目</div>
            <div
                v-for="scoreItem in scoreItems"
                :key="scoreItem.scoreItemID"
                class="item_icon_wrapper"
            >
                <div class="score_item">
                    {{ item.scoreItemName }}
                </div>
            </div>
        </div>
        <button @click="openAddItemModal">評価項目を登録する</button>
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
import { RoomModel, ScoreItemModel, UserModel } from 'stage3-abr'
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
    public isShowModal: boolean = false
    public isShowAddItemModal: boolean = false
    public blancScoreItem: ScoreItemModel | null = null
    public scoreItemNameValue: string = ''
    public scoreItems: ScoreItemModel[] = []

    public async created() {
        this.currentUser = await userInteractor.fetchMyUserModel()
        this.rooms = await this.currentUser.fetchSameHotelRooms()
        this.scoreItems = await this.currentUser.fetchSameHotelScoreItems()
    }

    public deleteRoom() {}

    public openModal() {
        this.isShowModal = true
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
        window.alert('部屋登録完了。続けて別の部屋を登録できます')
        this.roomNameValue = ''
        this.rooms = await this.currentUser!.fetchSameHotelRooms()
    }

    @AsyncLoadingAndErrorHandle()
    public async registerScoreItem() {
        this.blancScoreItem = await userInteractor.createNewScoreItem(
            this.scoreItemNameValue
        )
        await this.blancScoreItem.register()
        this.scoreItemNameValue = ''
        this.scoreItems = await this.currentUser!.fetchSameHotelScoreItems()
    }
}
</script>
<style lang="stylus" scoped>
.invite_cleaner_url_container {
    word-break: break-all;
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
