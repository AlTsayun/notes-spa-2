import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import React from 'react'
import { executeFetch } from "../../utils/fetchutils"

function EditNoteForm(props){
    const GET_NOTE_URL = 'http://localhost:5000/api/notes/:id'
    const GET_NOTES_URL = 'http://localhost:5000/api/notes'

    
    const history = useHistory()

    // const params = new URLSearchParams(history.location.search)

    // const completionDateOrder =
    //     Object.is(params.get("completionDateOrder"), null) ? 'not sorted' : params.get("completionDateOrder")
    // const statusFilter =
    //     Object.is(params.get("statusFilter"), null) ? 'all' : params.get("statusFilter")

    const [notes, setNotes] = useState(
        [
            // {
            //     id: 0,
            //     title: "First note",
            //     status: "to do",
            //     completionDate: "2020-12-12",
            //     text: "",
            //     files: [],
            // },
            // {
            //     id:1,
            //     title: "Second note",
            //     status: "to do",
            //     completionDate: "2021-12-12",
            //     text: "",
            //     files: [],
            // }
        ]
    )
    

    useEffect(async() => {

        await executeFetch(GET_NOTE_URL, {method: 'GET'})
        .then(response => response.json())
        .then(note => setNote(note))
        
    }, [])


    // function updateNotes(){
    //     //TODO: fetch notes from http://localhost:5000/api/notes
    //     let fetchMethod = 'get'
    //     let url = GET_NOTES_URL
    //     fetch(GET_NOTES_URL, {
    //         method: fetchMethod,
    //      }).then((response) => {
    //         console.log(url, `(${fetchMethod}) responded with status`, response.status)

    //         if (!response.ok){
    //             if (response.status === 404){
    //                 // view.redirectUrl =  '/404' + urlutils.formQueryString({notFoundUrl: view.params.url})
    //             } else if (response.status === 403) {
    //                 console.log('caught 403')
    //             } else {
    //                 throw new Error("bad response")
    //             }
    //         } else {
    //             return response.json()
    //         }
    //     })
    //     .then(data => {console.log(data)})
    //     // .catch(errorHandler)
    //     .catch(e =>{
    //         console.log('Caught error', e)
    //         // throw e
    //     })
    //     let notes = []
    //     setNotes(notes)
    // }
    // updateNotes()

    // function removeNote(id){
    //     fetch('', {
    //         method: 'delete'
    //      });
    // }

    console.log('render')
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
                    <button className="btn btn-outline-danger" >clear</button>
                </th>
            </tr>
        </thead>
        <tbody>
            
            {notes.map((note) =>
            <tr key={note.id}>
                <td>
                    <a className="link" href={"/edit_note/" + note.id}>{note.title}</a>
                </td>
            
                <td>{note.completionDate}</td>
                <td>{note.status}</td>
            
                <td>
                    <button className="btn btn-danger" >delete</button>
                </td>
            </tr>
            )}
        </tbody>
    </table>
</div>
    );
}

export default EditNoteForm