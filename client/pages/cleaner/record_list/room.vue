<template>
    <div class="record_list_associated_with_room">
        <div>ここに部屋に紐づく清掃記録を表示する</div>
        <link-button :to="{ name: 'cleaner-record_list-user' }"
            >自分の清掃一覧を見る
        </link-button>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LinkButton from '@/components/Atom/LinkButton.vue'
@Component({
    layout: 'cleaner',
    components: {
        LinkButton,
    },
})
export default class RoomRecordList extends Vue {}
</script>
