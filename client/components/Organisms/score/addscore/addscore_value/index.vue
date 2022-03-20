<template>
    <div class="add_score_item_container">
        <div class="score_item_name">{{ scoreItemModel.scoreItemName }}</div>
        <div class="app_input_container">
            <select v-model="scoreValue" :disabled="ifSelect" @change="changeScoreValue">
                <option disabled value=""></option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
            </select>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { RecordModel, ScoreItemModel, ScoreModel } from 'cleaning-assessment-service-abr'
@Component({
    components: {
    },
})
export default class AddScoreValue extends Vue {
    @Prop({ required: true }) scoreItemModel!: ScoreItemModel
    @Prop({ required: true }) recordModel!: RecordModel
    public scores: ScoreModel[] = []
    public scoreValue: number = 0
    public blancScore: ScoreModel | null = null
    public ifPushButton: boolean = false
    public ifSelect: boolean = false

    public async created() {
        this.ifSelect = false
        this.blancScore = await this.scoreItemModel.createNewScore(this.recordModel.recordID)
    }

    public changeScoreValue() {
        this.ifSelect = true
        this.$emit('changeScoreValue', this.scoreValue)
    }
}
</script>
<style lang="stylus" scoped>
.add_score_item_container {
    display: flex;
    padding-bottom: 5px;
    justify-content: space-evenly

    .score_item_name {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .app_input_container {
        padding: 3px;
    }
}
</style>