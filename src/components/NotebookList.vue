<template>
<div id="notebook-list">
  <header>
    <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i>新建笔记本</a>
  </header>
  <main>
    <div class="layout">
      <h3>笔记本列表({{notebooks.length}})</h3>
      <div class="book-list">
        <router-link v-for="notebook in notebooks" :key="notebook.id" to="note/1" class="notebook">
          <div>
            <span class="iconfont icon-notebook"></span> {{notebook.title}}
            <span>{{notebook.noteCounts||0}}</span>
            <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
            <span class="action" @click.stop.prevent="OnEdit(notebook)">编辑</span>
            <span class="date">{{notebook.createdAt|friendlyDate}}</span>
          </div>
        </router-link>
      </div>
    </div>
  </main>
</div>
</template>

<script>
import Auth from '@/apis/auth'
import Notebooks from '@/apis/notebooks'
export default {
  name: 'notebookList',
  data() {
    return {
      notebooks: []
    }
  },

  created() {
    Auth.getInfo().then(res => {
      if (!res.isLogin) {
        this.$router.push({ path: '/login' })
      }
    })

    Notebooks.getAll().then(res => {
      this.notebooks = res.data
    })
  },

  methods: {
    onCreate() {
      const title = window.prompt('新建笔记本')

      if (title.trim() === '') {
        alert('标题不能为空')
        return
      }

      Notebooks.addNotebook({ title }).then(res => {
        console.log(res.data)
        this.notebooks = [res.data, ...this.notebooks]
      })
    },

    onEdit(notebook) {
      const title = window.prompt('编辑笔记本', notebook.title)

      if (title.trim() === '') {
        alert('标题不能为空')
        return
      }

      Notebooks.updateNotebook(notebook.id, { title }).then(res => {
        notebook.title = title
      })
    },

    onDelete(notebook) {
      const confirm = window.confirm(`是否删除 ${notebook.title} `)

      if (!confirm) {
        return
      }

      Notebooks.deleteNotebook(notebook.id).then(res => {
        this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>
