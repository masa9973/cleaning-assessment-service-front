<template>
    <div class="app_container">
        <div class="wrapper">
            <nuxt />
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({
    components: {},
})
export default class DefaultLayout extends Vue {}
</script>
<style lang="stylus" scoped>
.app_container {
    background-color: $backgroundColor;
    background-image: url('https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=678&q=80');
    background-size: cover;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .wrapper {
        width: 500px;
        box-shadow: 0 0 20px 0 $shadowColor;
        border-radius: 20px;
        background-color: $transparentWhite;

        @media only screen and (max-width: $spSize) {
            width: 90%;
        }
    }
}
</style>