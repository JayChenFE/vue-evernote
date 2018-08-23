<template>
    <div id="note" class="detail">
        <NoteSidebar></NoteSidebar>
        <div id="note-detail">
            <div class="note-bar">
                <span>创建日期:2天前</span>
                <span>更新日期:1分钟前</span>
                <span>已保存</span>
                <span class="iconfont icon-delete"></span>
                <span class="iconfont icon-fullscreen"></span>
            </div>
            <div class="note-title">
                <input type="text" placeholder="输入标题">
            </div>
            <div class="editor">
                <textarea v-show="true" placeholder="输入内容, 支持markdown语法"></textarea>
                <div class="preview markdown-body" v-html="a" v-show="false"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Auth from '@/apis/auth'
import NoteSidebar from '@/components/NoteSidebar'
export default {
    components: { NoteSidebar },
    name: 'NodeDetail',
    data() {
        return { msg: '笔记详情页' }
    },

    created() {
        Auth.getInfo().then(res => {
            if (!res.isLogin) {
                this.$router.push({ path: '/login' })
            }
        })
    }
}
</script>

<style scoped>
#note {
  display: flex;
  align-items: stretch;
  flex: 1;
  background-color: #fff;
}
</style>
