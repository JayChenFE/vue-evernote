<template>
    <div id="note" class="detail">
        <NoteSidebar :notes.sync="notes"></NoteSidebar>
        <div class="note-detail">
            <div class="empty" v-show="!currentNote.id">请选择笔记</div>
            <div>
                <div class="note-bar" v-show="currentNote.id">
                    <span>创建日期: {{currentNote.createdAt}}</span>
                    <span>更新日期: {{currentNote.updatedAt}}</span>
                    <span class="save">{{currentNote.statusText}}</span>
                    <span class="iconfont icon-fullscreen"></span>
                    <span class="iconfont icon-delete"></span>
                </div>
                <div class="note-title">
                    <input type="text" v-model="currentNote.title" placeholder="输入标题">
                </div>
                <div class="editor">
                    <textarea v-show="true" v-model="currentNote.content" placeholder="输入内容, 支持 markdown 语法"></textarea>
                    <div class="preview markdown-body" v-show="false"></div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import Auth from '@/apis/auth'
import NoteSidebar from '@/components/NoteSidebar'
import Bus from '@/helpers/bus'

export default {
    components: { NoteSidebar },
    name: 'NodeDetail',
    data() {
        return {
            currentNote: {},
            notes: []
        }
    },

    created() {
        Auth.getInfo().then(res => {
            if (!res.isLogin) {
                this.$router.push({ path: '/login' })
            }
        })
        Bus.$once('update:notes', notes => {
            this.currentNote =
                notes.find(note => note.id === this.$router.query.noteId) || {}
        })
    },

    beforeRouteUpdate(to, from, next) {
        this.currentNote =
            this.notes.find(note => note.id === to.query.noteId) || {}
        next()
    }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-detail.less);
#note {
  display: flex;
  align-items: stretch;
  flex: 1;
  background-color: #fff;
}
</style>
