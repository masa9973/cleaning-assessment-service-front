<template>
    <div>
        <div>
            managerのためのトップページです。ここにアサイン済みの清掃を一覧で表示したいです
        </div>
        <div class="this_will_be_footer">
            <nuxt-link
                :to="{
                    name: 'manager-unscored_record_list',
                }"
            >
                <button>評価を開始する</button>
            </nuxt-link>
            <nuxt-link
                :to="{
                    name: 'manager-record_list',
                }"
            >
                <button>評価を開始する</button>
            </nuxt-link>
        </div>
    </div>
</template>