<template>
    <div class="add_score_item_container">
        <div class="score_item_name">{{ scoreItemModel.scoreItemName }}</div>
        <div class="app_input_container">
            <input v-model="scoreValue" />
        </div>
        <div class="button_container">
            <button :disabled="!scoreValue ||  ifPushButton" @click="register">登録</button>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { RecordModel, ScoreItemModel, ScoreModel } from 'stage3-abr'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
// import AppInput from '@/components/Atom/AppInput.vue'
@Component({
    components: {
        // AppInput,
    },
})
export default class AddScoreValue extends Vue {
    @Prop({ required: true }) scoreItemModel!: ScoreItemModel
    @Prop({ required: true }) recordModel!: RecordModel
    public scores: ScoreModel[] = []
    public scoreValue: number = 0
    public blancScore: ScoreModel | null = null
    public ifPushButton: boolean = false

    public async created() {}

    @AsyncLoadingAndErrorHandle()
    public async register() {
        this.blancScore = await this.scoreItemModel.createNewScore(
            this.recordModel.recordID
        )
        this.blancScore.score = this.scoreValue
        this.blancScore.register()
        this.ifPushButton = true
    }
}
</script>
<style lang="stylus" scoped>
.add_score_item_container {
    display: flex;
    padding-bottom: 5px;

    .score_item_name {
        display: flex
        justify-content: center;
        align-items: center;
        width: 35%;
    }

    .app_input_container {
        padding: 3px;
    }
}
</style>