<template>
    <div class="room_card">
            <div>{{ cleaningRoomName }}</div>
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

</style>
