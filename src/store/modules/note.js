import Note from '@/apis/notes'
import { Message } from 'element-ui'

const state = {
    notes: [],
    currentNote: {}
}

const getters = {
    notes: state => state.notes
}

const mutations = {
    setNote(state, { notes }) {
        state.notes = notes
    },

    addNote(state, { note }) {
        state.notes.unshift(note)
    },

    updateNote(state, { noteId, title, content }) {
        const note = state.notes.find(note =>
            note.id === noteId) || {}
        note.title = title
        note.content = content
    },

    deleteNote(state, { noteId }) {
        state.notes = state.notes.filter(note => note.id !== noteId)
    }
}

const actions = {
    getNotes({ commit }, { notebookId }) {
        Note.getAll(notebookId).then(res => {
            commit('setNotes', { notes: res.data })
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
