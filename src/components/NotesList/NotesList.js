import { useState } from "react";
import React from 'react';

function NotesList(){

    //TODO: get and put states to url query
    const [completionDateOrder, setCompletionDateOrder] = useState('oldest')
    const [statusFilter, setStatusFilter] = useState('all')


    //TODO: fetch notes from http://localhost:5000/api/notes 
    const [notes, setNotes] = useState([
        {
            id: 0,
            title: "First note",
            status: "to do",
            completionDate: "2020-12-12",
            text: "",
            files: [],
        },
        {
            id:1,
            title: "Second note",
            status: "to do",
            completionDate: "2021-12-12",
            text: "",
            files: [],
        }
    ])
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
                        <select name="completionDateOrder" onChange={(e) => { setCompletionDateOrder(e.target.value) } } value={completionDateOrder} form="notes_list_form">
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
                        <select name="statusFilter" onChange={(e) => { setStatusFilter(e.target.value) } } value={statusFilter} form="notes_list_form">
                            <option value="all">all</option>
                            <option value="to do">to do</option>
                            <option value="in progress">in progress</option>
                            <option value="done">done</option>
                        </select>
                    </label>
                </th>
                <th>

                </th>
            </tr>
        </thead>
        <tbody>
            
            {notes.map((note) =>
            <tr key={note.id}>
                <td>
                    <a className="link">{note.title}</a>
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

export default NotesList;
