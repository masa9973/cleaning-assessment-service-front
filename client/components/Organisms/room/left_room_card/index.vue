<template>
    <div class="left_room_card">
        <div @click="openModal">
            <div class="left_room_card_inner">{{ cleaningRoomName }}</div>
        </div>
        <app-modal v-model="isShowModal">
            <div v-if="cleaners.length" class="choice_cleaner_container">
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
            <div class="button_container">
                <app-button :disabled="!selectedUserID" @click="assigned"
                    >アサインする</app-button
                >
            </div>
        </app-modal>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { RecordModel, RoomModel, UserModel } from 'stage3-abr'
import { userInteractor } from '~/api'
import AppModal from '@/components/Organisms/common/app_modal/index.vue'
import AppButton from '@/components/Atom/AppButton.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({
    components: {
        AppModal,
        AppButton,
    },
})
export default class LeftRoomCard extends Vue {
    @Prop({ required: true }) roomID!: string
    public roomModel: RoomModel | null = null
    public cleaningRoomName: string = ''
    public currentUser: UserModel | null = null
    public cleaners: UserModel[] = []
    public selectedUserID: string = ''
    public blancRecord: RecordModel | null = null
    public isShowModal: boolean = false

    async created() {
        this.currentUser = await userInteractor.fetchMyUserModel()
        this.roomModel = await userInteractor.fetchRoomByRoomID(this.roomID)
        this.cleaningRoomName = this.roomModel!.roomName
        this.cleaners = await this.currentUser.fetchSameHotelCleaner()
    }

    public openModal() {
        this.isShowModal = true
    }

    @AsyncLoadingAndErrorHandle()
    public async assigned() {
        this.blancRecord = await this.roomModel!.createNewRecord()
        this.blancRecord.cleanerID = this.selectedUserID
        await this.blancRecord.register()
        this.isShowModal = false
        this.$emit('registered')
    }
}
</script>
<style lang="stylus" scoped>
.left_room_card_inner {
    box-shadow: 0 0 5px 0 #c4c4c4;
    padding: 5px;
    margin: 10px 10px;
    border-radius: 8px;
}

.button_container {
    text-align: center
}

.choice_cleaner_container {
    display: flex
    justify-content: space-evenly
    padding-bottom: 5px
}
</style>
