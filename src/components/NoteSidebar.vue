<template>
    <div class="note-sidebar">
        <el-button size="mini" round class="add-note" @click="addNote">添加笔记</el-button>
        <el-dropdown class="notebook-title" placement="bottom" @command="handleCommand">
            <span class="el-dropdown-link">
                {{currentNotebook.title}}
                <i class="iconfont icon-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="notebook in notebooks" :command="notebook.id" :key="notebook.id">
                    {{notebook.title}}
                </el-dropdown-item>
                <el-dropdown-item command="trash">回收站</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div class="menu">
            <div>更新时间</div>
            <div>标题</div>
        </div>
        <ul class="notes">
            <li v-for="note in notes" :key="note.id">
                <router-link :to="`/note?notebookId=${currentNotebook.id}&noteId=${note.id}`">
                    <span class="date">{{note.updatedAt|friendlyDate}}</span>
                    <span class="title">{{note.title}}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import Notebooks from '@/apis/notebooks'
import Notes from '@/apis/notes'
import Bus from '@/helpers/bus'
import { mapActions, mapGetters } from 'vuex'

export default {

    data() {
        return {}
    },

    computed: {
        ...mapGetters(['notebooks', 'notes', 'currentNote'])
    },

    created() {
        this.getNotebooks()
            .then(_ => {
                this.$store.commit('setCurrentNotebook',
                    { currentNotebookId: this.$route.qurey.notebookId })
                this.getNotes({ notebookId: this.currentNotebookId })
            })
    },

    methods: {
        ...mapActions(['getNotebooks,getNotes']),
        handleCommand(notebookId) {
            if (notebookId === 'trash') {
                return this.$router.push({ path: '/trash' })
            }

            this.$store.commit('setCurrentNotebook', { currentNotebookId: notebookId })
            this.getNotes({ notebookId })
            // 切换到用户选择的笔记本
            this.currentNotebook = this.notebooks.find(notebook => notebook.id === notebookId)
            // 获取切换后笔记本的所有笔记
            Notes.getAll({ notebookId }).then(res => {
                this.notes = res.data
                this.$emit('update:notes', this.notes)
            })
        },
        addNote() {
            Notes.addNote({ notebookId: this.currentNotebook.id })
                .then(res => {
                    this.notes.unshift(res.data)
                })
        }
    }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-sidebar.less);
</style>
