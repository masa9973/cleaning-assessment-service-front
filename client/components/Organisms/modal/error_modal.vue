<template>
    <div
        class="
            w-screen
            h-screen
            bg-black/30
            absolute
            top-0
            left-0
            flex
            justify-center
            items-center
        "
        @click="close()"
    >
        <div class="bg-white p-12 rounded-lg">
            {{ message }}
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'
@Component({})
export default class ErrorModal extends Vue {
    @Prop({ required: true }) error: any
    public message: string = ''

    created() {
        if (this.error === 'Incorrect Mail or Pass') {
            this.message = 'メアドかパスワードが違うかも👀'
        } else {
            this.message = this.error
        }
    }

    @Emit('close')
    close() {}
}
</script>