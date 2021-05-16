
import { gql } from '@apollo/client'

export const ADD_NOTE_MUTATION = gql`mutation ADD_NOTE_MUTATION { addNote { id } }`
export const GET_NOTES_QUERY = gql`query GET_NOTES_QUERY($statusFilter: String!) {
        getNotes(statusFilter: $statusFilter) {
            id,
            title,
            status,
            completionDate,
            text
        }
    }`
export const GET_NOTE_QUERY = gql`query GET_NOTE_QUERY($id: String!) {
        getNote(id: $id) {
            id,
            title,
            status,
            completionDate,
            text
        }
    }`
export const UPDATE_NOTE_MUTATION = gql`query UPDATE_NOTE_MUTATION($id: String!, $title: String!, $status: String!, $completionDate: String!, $text: String!) {
        updateNote(id: $id, title: $title, status: $status, completionDate: $completionDate, text: $text)
    }`
export const DELETE_NOTE_MUTATION = gql`mutation DELETE_NOTE_MUTATION($noteId: String!) { deleteNote(id: $noteId) }`