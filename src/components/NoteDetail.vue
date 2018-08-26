<template>
    <div id="note" class="detail">
        <NoteSidebar :notes.sync="notes"></NoteSidebar>
        <div class="note-detail">
            <div class="note-empty" v-show="!currentNote.id">请选择笔记</div>
            <div class="note-detail-ct" v-show="currentNote.id">
                <div class="note-bar">
                    <span>创建日期: {{currentNote.createdAt|friendlyDate}}</span>
                    <span>更新日期: {{currentNote.updatedAt|friendlyDate}}</span>
                    <span class="save">{{statusText}}</span>
                    <span class="iconfont icon-fullscreen" @click="isShowPreview=!isShowPreview"></span>
                    <span class="iconfont icon-delete" @click="deleteNote"></span>
                </div>
                <div class="note-title">
                    <input type="text" v-model="currentNote.title" @input="updateNote" @keydown="statusText='输入中...'" placeholder="输入标题">
                </div>
                <div class="editor">
                    <textarea v-show="!isShowPreview" v-model="currentNote.content" @input="updateNote" @keydown="statusText='输入中...'" placeholder="输入内容, 支持 markdown 语法">
                    </textarea>
                    <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Auth from '@/apis/auth'
import Notes from '@/apis/notes'
import NoteSidebar from '@/components/NoteSidebar'
import Bus from '@/helpers/bus'
import _ from 'loadsh'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

export default {
    components: { NoteSidebar },
    name: 'NodeDetail',
    data() {
        return {
            currentNote: {},
            notes: [],
            statusText: '笔记未更新',
            isShowPreview: false
        }
    },

    computed: {
        previewContent() {
            return md.render(this.currentNote.content || '')
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
                notes.find(note => note.id.toString() === this.$route.query.noteId) || {}
        })
    },

    methods: {
        updateNote: _.debounce(function() {
            const { title, content } = this.currentNote
            Notes.updateNote({ noteId: this.currentNote.id }, { title, content })
                .then(data => {
                    this.statusText = '已保存'
                }).catch(data => {
                    this.statusText = '保存出错'
                })
        }, 300),

        deleteNote() {
            Notes.deleteNote({ noteId: this.currentNote.id })
                .then(data => {
                    this.$message.success(data.msg)
                    this.notes.splice(this.notes.indexOf(this.currentNote), 1)
                    this.$router.replace({ path: '/note' })
                })
        }

    },

    beforeRouteUpdate(to, from, next) {
        this.currentNote =
            this.notes.find(note => note.id.toString() === to.query.noteId) || {}
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
