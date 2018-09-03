import Note from '@/apis/notes'
import { Message } from 'element-ui'

const state = {
    notes: [],
    currentNote: {}
}

const getters = {
    notebooks: state => state.notebooks
}

const mutations = {
    setNotebooks(state, payload) {
        state.notebooks = payload.notebooks
    },

    addNotebook(state, payload) {
        state.notebooks.unshift(payload.notebook)
    },

    updateNotebook(state, payload) {
        const notebook = state.notebooks.find(notebook =>
            notebook.id === payload.notebookId) || {}
        notebook.title = payload.title
    },

    deleteNotebook(state, payload) {
        state.notebooks = state.notebooks.filter(notebook => notebook.id !== payload.notebookId)
    }
}

const actions = {
    getNotebooks({ commit }) {
        Notebooks.getAll().then(res => {
            commit('setNotebooks', { notebooks: res.data })
        })
    },

    addNotebook({ commit }, payload) {
        Notebooks.addNotebook({ title: payload.title })
            .then(res => {
                commit('addNotebook', { notebook: res.data })
                Message.success(res.Message)
            })
    },

    updateNotebook({ commit }, payload) {
        const { notebookId, title } = payload
        Notebooks.updateNotebook(notebookId, { title })
            .then(res => {
                commit('updateNotebook', { notebookId, title })
                Message.success(res.Message)
            })
    },

    deleteNotebook({ commit }, { notebookId }) {
        Notebooks.deleteNotebook(notebookId)
            .then(res => {
                commit('deleteNotebook', { notebookId })
                Message.success(res.Message)
            })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
