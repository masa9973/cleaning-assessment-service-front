<template>
    <div class="room_inner_time_card">
        <div :style="barTimeClass"></div>
        <div class="date_string">{{ date }}</div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { dateFormatter, RecordModel } from 'stage3-abr'
@Component({})
export default class RoomInnerTimeCard extends Vue {
    @Prop({ required: true }) recordModel!: RecordModel
    public date: string = ''

    public created() {
        this.date = dateFormatter(this.recordModel.createdAt)
    }

    get barTimeClass() {
        return {
            width: `10px`,
            height: `${(this.recordModel.cleaningTime/3600000) * 100 + "px"}`,
            margin: `0 auto`,
            backgroundColor: `#000`,
        }
    }
}
</script>
<style lang="stylus" scoped>
.date_string {
    font-size: 5px
}
</style>