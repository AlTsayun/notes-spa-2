import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import React from 'react'
import { executeFetch } from "../../utils/fetchutils"
import { formParamsUrl } from "../../utils/urlutils"


function NotesList(props){

    const DELETE_NOTE_URL = '/api/notes/:id'
    const GET_NOTES_URL = '/api/notes'

    
    const history = useHistory()

    const params = new URLSearchParams(history.location.search)

    const completionDateOrder =
        Object.is(params.get("completionDateOrder"), null) ? 'not sorted' : params.get("completionDateOrder")
    const statusFilter =
        Object.is(params.get("statusFilter"), null) ? 'all' : params.get("statusFilter")

    const [notes, setNotes] = useState([])

    async function fetchNotes(){
        console.log('Notes are being fetched')

        const params = new URLSearchParams()
        if (statusFilter !== 'all'){
            params.set("statusFilter", statusFilter)
        }
        
        await executeFetch(GET_NOTES_URL + '?' + params.toString(), {method: 'GET'})
        .then(response => response.json())
        .then(notes => {

            if (completionDateOrder === 'newest'){
                notes.sort((noteA, noteB) => 
                    -noteA.completionDate.localeCompare(noteB.completionDate)
                )
            }else if (completionDateOrder ==='oldest'){
                notes.sort((noteA, noteB) => 
                    noteA.completionDate.localeCompare(noteB.completionDate)
                )
            }
            setNotes(notes)
        })
        .catch(e => {
            console.log("Go to authorization")
            if (e.response.status == 403) {
                history.push('/login')
            }
        })
    }
    
    useEffect(() => {
        fetchNotes()
      }, [statusFilter]);

    async function deleteNote(id) {
        await executeFetch(formParamsUrl(DELETE_NOTE_URL, {id: id}), {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(() =>{
            setNotes((prev) => {
                return prev.filter(note => note.id !== id)
            })
        })
    }

    console.log('render NotesList')
    return (
<div>
    <form method="GET" id="notes_list_form"></form>

    <table className="table table-hover">
        <thead>
            <tr>    
                <th className="col-8">
                    Title
                </th>
                <th className="col-2">
                    <label>
                        Date
                        <br/>
                        <select name="completionDateOrder" value={completionDateOrder} onChange={(e) => { 
                            const params = new URLSearchParams(history.location.search)
                            if (e.target.value === 'not sorted'){
                                params.delete("completionDateOrder")
                            } else {
                                params.set("completionDateOrder", e.target.value)
                            }
                            history.push({search: params.toString()})
                        }} form="notes_list_form">
                            <option value="not sorted">not sorted</option>
                            <option value="newest">newest</option>
                            <option value="oldest">oldest</option>
                        </select>
                    </label>
                </th>
                <th className="col-2">
                    <label>
                        Status
                        <br/>
                        <select name="statusFilter" value={statusFilter} onChange={(e) => { 
                                const params = new URLSearchParams(history.location.search)
                                if (e.target.value === 'all'){
                                    params.delete("statusFilter")
                                } else {
                                    params.set("statusFilter", e.target.value)
                                }
                                history.push({search: params.toString()})

                            } } form="notes_list_form">
                            <option value="all">all</option>
                            <option value="to do">to do</option>
                            <option value="in progress">in progress</option>
                            <option value="done">done</option>
                        </select>
                    </label>
                </th>
                <th>
                    <button className="btn btn-outline-danger" onClick={ () =>{
                        const params = new URLSearchParams(history.location.search)
                        params.delete("completionDateOrder")
                        params.delete("statusFilter")
                        history.push({search: params.toString()})
                    }
                    }>clear</button>
                </th>
            </tr>
        </thead>
        <tbody>
            
            {notes.map((note) =>
            <tr key={note.id}>
                <td onClick={(e) => {history.push("/editNote/" + note.id)}}>
                    <a className="link">
                        {note.title}
                    </a>
                </td>
            
                <td>{note.completionDate}</td>
                <td>{note.status}</td>
            
                <td>
                    <button className="btn btn-danger" onClick={async () => {await deleteNote(note.id)}} >
                        delete
                    </button>
                </td>
            </tr>
            )}
        </tbody>
    </table>
</div>
    );
}

export default NotesList;