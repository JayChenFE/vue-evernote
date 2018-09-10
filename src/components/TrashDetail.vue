<template>
    <div id="trash" class="detail">
        <div class="note-sidebar">
            <h3 class="notebook-title">回收站</h3>
            <div class="menu">
                <div>更新时间</div>
                <div>标题</div>
            </div>
            <ul class="notes">
                <li v-for="note in trashNotes" :key="note.id">
                    <router-link :to="`/trash?noteId=${note.id}`">
                        <span class="date">{{note.updatedAt|friendlyDate}}</span>
                        <span class="title">{{note.title}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="note-detail">
            <div class="note-bar" v-if="currentTrashNote">
                <span>创建日期: {{currentTrashNote.createdAt|friendlyDate}}</span>
                <span> | </span>
                <span>更新日期: {{currentTrashNote.updatedAt|friendlyDate}}</span>
                <span> | </span>
                <span> 所属笔记本:{{belongTo}}</span>
                <a class="btn action" @click="onRevert">恢复</a>
                <a class="btn action" @click="onDelete">彻底删除</a>
            </div>
            <div class="note-title">
                <span>{{currentTrashNote.title}}</span>
            </div>
            <div class="editor">
                <div class="preview markdown-body" v-html="compiledMarkdown"></div>
            </div>
        </div>
    </div>
</template>
<script>
import MarkdownIt from 'markdown-it'
import { mapActions, mapGetters } from 'vuex'

const md = new MarkdownIt()

export default {
    name: 'Login',
    data() {
        return {
            msg: '回收站笔记详情页',
            currentTrashNote: {
                id: 3,
                title: '我',
                content: '## hello'
            },
            belongTo: '我的笔记本',
            trashNotes: [
                {
                    id: 3,
                    title: '我',
                    content: '## hello'
                },
                {
                    id: 4,
                    title: '我',
                    content: '## hello'
                }
            ]
        }
    },

    computed: {
        // ...mapGetters(['notes', 'currentNote', 'currentNoteId']),
        compiledMarkdown() {
            return md.render(this.currentTrashNote.content || '')
        }
    },
    created() {
        this.checkLogin()
    },

    methods: {
        ...mapActions(['checkLogin']),
        onRevert() { },
        onDelete() { }
    }

}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-sidebar.less);
@import url(../assets/css/note-detail.less);
#trash {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
  .note-bar {
    span:last-of-type {
      flex: 1;
    }
    .action {
      margin-right: 10px;
      padding: 2px 4px;
      font-size: 12px;
      &:last-child {
        margin-right: 20px;
      }
    }
  }
  .note-title {
    padding: 10px 20px;
  }
}
</style>
