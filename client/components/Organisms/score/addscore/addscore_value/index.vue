<template>
    <div>
        <div>ここでスコア登録してregisterまでしたい</div>
        <div>{{ scoreItemID }}</div>
        <input />
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ScoreItemModel } from 'stage3-abr'
@Component({
})
export default class AddScoreValue extends Vue {
    @Prop({ required: true }) item!: ScoreItemModel

    get scoreItemName() {
        return this.item.scoreItemName
    }
}
</script>
