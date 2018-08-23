<template>
    <div class="note-sidebar">
        <el-button size="mini" round class="add-note">添加笔记</el-button>
        <el-dropdown class="notebook-title" placement="bottom" @command="handleCommand">
            <span class="el-dropdown-link">
                我的笔记本
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
                <router-link :to="`/note?noteId=${note.id}`">
                    <span class="date">{{note.createdAt|friendlyDate}}</span>
                    <span class="title">{{note.title}}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            notebooks: [
                { id: 1, title: 'hello1' },
                { id: 2, title: 'hello2' },
                { id: 3, title: 'hello3' }
            ],
            notes: [
                { id: 1, title: 'note1', createdAt: '2018-08-22T02:13:33.142Z' },
                { id: 2, title: 'note2', createdAt: '2018-06-22T02:13:33.142Z' }
            ]
        }
    },

    methods: {
        handleCommand(command) {
            this.$message('click on item ' + command)
        }
    }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-sidebar.less);

</style>
