<template>
    <div>
        <div>レコードの数だけ棒を作成</div>
        <div class="chart_item_container">
            <div class="date">
                <div class="bar"></div>
                <div>{{ today }}</div>
            </div>
            <div class="date">
                <div class="bar"></div>
                <div>{{ yesterday }}</div>
            </div>
            <div class="date">
                <div class="bar"></div>
                <div>{{ twoDaysAgo }}</div>
            </div>
            <div>
                <div :style="styleObject">あああ</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
// recordをpropとして受け取って、cleaningTimeの値によってdivの大きさを変えられるようにする
import { Component, Vue } from 'nuxt-property-decorator'
import { dateFormatter, RecordModel, UserModel } from 'stage3-abr'
import { userInteractor } from '~/api'
@Component({})
export default class TimeChart extends Vue {
    public currentUser: UserModel | null = null
    public records: RecordModel[] = []
    public today: string = ''
    public yesterday: string = ''
    public twoDaysAgo: string = ''
    public score: number = 5

    public async created() {
        this.currentUser = await userInteractor.fetchMyUserModel()
        this.records = await this.currentUser!.fetchScoredRecords()

        // グラフを動的に動かしたい
        const bar = document.getElementsByClassName(
            'bar'
        ) as HTMLCollectionOf<HTMLElement>
        // ここスコアの配列
        const data = [100]
        console.log(bar)
        for (let i = 0; i < bar.length; i++) {
            bar[i].style.height = data[i] + 'px'
        }

        // 下の軸を取得、日付の配列を渡せばいい。
        const day = 86400000
        this.today = dateFormatter(new Date().getTime())
        this.yesterday = dateFormatter(new Date().getTime() - day * 1)
        this.twoDaysAgo = dateFormatter(new Date().getTime() - day * 2)
    }
    
    get styleObject() {
        return {
            color: 'red',
            fontSize: '13px',
            height: `100px`,
            width: `${this.score * 10 + 'px'}`,
        }
    }
}
</script>
<style lang="stylus" scoped>
.chart_item_container {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    align-items: flex-end;
}

.date {
    margin: 0 auto;
}

.bar {
    width: 20px;
    height: 100px;
    margin: 0 auto;
    background-color: #000;
}

.one {
    width: 20px;
    height: 10px;
    margin: 0 auto;
    background-color: #000;
}

.two {
    width: 20px;
    height: 20px;
    margin: 0 auto;
    background-color: #000;
}
</style>
