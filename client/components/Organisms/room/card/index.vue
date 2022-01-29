<template>
    <div class="room_card">
        <div class="room_card_inner">{{ cleaningRoomName }}</div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { RoomModel } from 'stage3-abr'
import AppButton from '@/components/Atom/AppButton.vue'
import { userInteractor } from '~/api'

@Component({
    components: {
        AppButton,
    },
})
export default class RoomCard extends Vue {
    @Prop({ required: true }) roomID!: string
    public roomModel: RoomModel | null = null
    public cleaningRoomName: string = ''

    async created() {
        this.roomModel = await userInteractor.fetchRoomByRoomID(this.roomID)
        this.cleaningRoomName = this.roomModel!.roomName
    }
}
</script>
<style lang="stylus" scoped>
.room_card {
    width: 100%;
    display: flex;
    padding-bottom: 20px
    justify-content: center;

    .room_card_inner {
        border: 0;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        width: 300px;
        height: 44px;
        background-color: #EFEFEF;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
