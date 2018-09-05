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
    setNotes(state, { notes }) {
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
        return Note.getAll({ notebookId }).then(res => {
            commit('setNotes', { notes: res.data })
        })
    },

    addNote({ commit }, { notebookId, title, content }) {
        return Note.addNote({ notebookId }, { title, content })
            .then(res => {
                commit('addNote', { note: res.data })
                Message.success(res.msg)
            })
    },

    updateNote({ commit }, { noteId, title, content }) {
        return Note.updateNote(noteId, { title, content })
            .then(res => {
                commit('updateNote', { noteId, title, content })
                Message.success(res.msg)
            })
    },

    deleteNotebook({ commit }, { noteId }) {
        return Note.deleteNote(noteId)
            .then(res => {
                commit('deleteNote', { noteId })
                Message.success(res.msg)
            })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
