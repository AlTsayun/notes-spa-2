
import { gql } from '@apollo/client'

export const ADD_NOTE_MUTATION = gql`mutation ADD_NOTE_MUTATION { addNote { id } }`
export const GET_NOTES_QUERY = gql`query GET_NOTES_QUERY($statusFilter: String!, $completionDateOrder: String!) {
        getNotes(statusFilter: $statusFilter, completionDateOrder: $completionDateOrder) {
            id,
            title,
            status,
            completionDate,
            text,
            files
        }
    }`
export const GET_NOTE_QUERY = gql`query GET_NOTE_QUERY($id: String!) {
        getNote(id: $id) {
            id,
            title,
            status,
            completionDate,
            text,
            files
        }
    }`
export const UPDATE_NOTE_MUTATION = gql`mutation UPDATE_NOTE_MUTATION($id: String!, $title: String!, $status: String!, $completionDate: String!, $text: String!, $files: [String!]) {
        updateNote(id: $id, title: $title, status: $status, completionDate: $completionDate, text: $text, files: $files)
    }`
export const DELETE_NOTE_MUTATION = gql`mutation DELETE_NOTE_MUTATION($noteId: String!) { deleteNote(id: $noteId) }`