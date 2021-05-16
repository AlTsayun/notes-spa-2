import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import React from 'react'
import { executeFetch } from '../../utils/fetchutils'
import { formParamsUrl } from '../../utils/urlutils'
import FilesInput from './FilesInput'
import { wsSend } from "../../utils/wsutils"

import { gql, useQuery, useMutation} from '@apollo/client'

import { GET_NOTE_QUERY } from '../../GraphqlQueries'

function EditNoteForm(props){

    const GET_NOTE_URL = '/api/notes/:id'
    const PUT_NOTE_URL = '/api/notes/:id'

    const history = useHistory()

    const params = useParams()
    console.log(params)

    const [note, setNote] = useState({
        id: params.id,
        title: '',
        status: 'to do',
        completionDate: '2020-10-12',
        text: '',
        files: [],
    })

    props.wsClient.onmessage = (message) => {
        let data = JSON.parse(message.data)
        if (data.intention === 'note'){
            console.log('Received note', data.body)
            setNote(data.body)
        } else {
            props.superWsMessageHandler(message)
        }
    }

    const { loading, error, data, refetch } = useQuery(
            GET_NOTE_QUERY,
        { variables: {id: params.id }}
        )
        console.log('fetched data', data)
    if (!loading){
        console.log('received note:', data.getNote)
        // setNote(data.getNote)
    }


    // async function fetchNote(){
    //     await executeFetch(formParamsUrl(GET_NOTE_URL, {id: note.id}), {method: 'GET'})
    //     .then(response => response.json())
    //     .then(note => {
    //         setNote(note)
    //     })
    // }

    async function sendNote(){
        const formData  = new FormData();
        for(const name in note) {
            formData.append(name, note[name]);
        }
        formData.delete('files')
        let dt = new DataTransfer();
        note.files.forEach(file => {dt.items.add(file)})
        console.log('dt.files', dt.files)
        formData.append('files', dt.files)

        note.id = params.id
        
        // wsSend(props.wsClient, JSON.stringify({ intention: 'update note', body: note }))
        // await executeFetch(formParamsUrl(PUT_NOTE_URL, {id: note.id}), {method: 'PUT', body: formData})
    }

    function handleChange(e){
        console.log(`${e.target.name} has a new value: ${e.target.value}`)
        setNote((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    async function handleFormSubmit(e){
        e.preventDefault()
        console.log('EditNoteForm submitted')
        await sendNote()
        history.push('/')
    }
        
    // useEffect(() => {
    //     wsSend(props.wsClient, JSON.stringify({ intention: 'get note', body: { id: params.id } }))
    //   }, []);
    
    let filesFromChild = []

    console.log('render EditNoteForm', note)
    return ( 
        <div className='edit_note_main d-flex justify-content-center'>
            <form method='POST' enctype='multipart/form-data' id='edit_note_form'>
                    <div className='row'>
                    <div className='col form-group'>
                        <input 
                            className='form-control' 
                            type='text' 
                            name='title' 
                            placeholder='Enter a title' 
                            value={note.title}
                            onChange={handleChange}
                            />
                    </div>
                    </div>
                    
                    <div className='row'>
                        <div className='col form-group'>
                            <div className='d-flex'>
                                <div className='flex-fill btn-group btn-group-toggle' data-toggle='buttons'>
                                <label className={'btn btn-outline-primary ' + ((note.status === 'to do') ? 'active' : '')} >
                                    <input 
                                        type='radio' 
                                        name='status' 
                                        value = 'to do'
                                        checked={note.state === 'to do'}
                                        onChange={handleChange}
                                    />
                                        to do
                                </label>
                                <label className={'btn btn-outline-primary ' + ((note.status === 'in progress') ? 'active' : '')}>
                                    <input
                                        type='radio' 
                                        name='status' 
                                        value = 'in progress'
                                        checked={note.status === 'in progress'}
                                        onChange={ (e) =>{
                                            console.log(filesFromChild)
                                            handleChange(e)
                                        }}
                                    />
                                        in progress
                                </label>
                                <label className={'btn btn-outline-primary ' + ((note.status === 'done') ? 'active' : '')}>
                                    <input 
                                        type='radio' 
                                        name='status'
                                        value='done'
                                        checked={note.status === 'done'}
                                        onChange={handleChange}
                                    />
                                        done
                                </label>
                                </div>
                            </div>
                        </div>
                        <div className='col form-group'>
                            <label className='form-inline d-flex'>
                                Completion date:
                                <input 
                                    className='form-control flex-fill' 
                                    type='date' 
                                    name='completionDate' 
                                    placeholder='Enter a date'
                                    onChange={handleChange}
                                    />
                            </label>
                        </div>
                    </div>
                    
                    <div className='row'>
                        <div className='col form-group'>
                            <textarea 
                                className='form-control' 
                                rows='5' 
                                cols='60' 
                                name='text' 
                                placeholder='Enter a note' 
                                value={note.text}
                                onChange={handleChange}
                                />
                        </div>
                        <div className='col'>
                            <FilesInput 
                            files={[]} 
                            setAddedFiles={addedFiles => {
                                console.log('setAddedFiles', addedFiles)
                                setNote((prev) => ({...prev, files: prev.files.concat(addedFiles)}))
                            }}
                            setRemovedFiles={removedFiles => {
                                console.log('setRemovedFiles', removedFiles)
                                setNote((prev) => ({...prev, files: prev.files.filter(e => !removedFiles.contains(e))}))
                            }}></FilesInput>
                        </div>
                    </div>
                                
                    <div className='d-flex justify-content-center form-group'>
                        <div className='btn-group'>
                            <input 
                                className='form-control btn btn-primary' 
                                type='submit' 
                                value='Save'
                                onClick={handleFormSubmit}
                                />
                            <a className='form-control btn btn-primary' href='/'>Cancel</a>
                        </div>
                    </div>
            
            
            </form>

        </div>
        
    )
}

export default EditNoteForm


// `
// <div class='edit_note_main d-flex justify-content-center'>
//     ${tableForms}
//     <form method='POST' enctype='multipart/form-data' id='edit_note_form' style='max-width: 800px'>
// <!--        <div class='form-group'>-->
//             <div class='form-row'>
//                 <input class='form-control' type='text' name='title'  placeholder='Enter a title' value='${this.note.title}'/>
//             </div>
            
//             <div class='row'>
//                 <div class='col'>
//                     <div class='btn-group form-control' role='group'>
//                         <input type='radio' class='btn-check' id='btnradio1' name='status' value='to do'
//                         ${this.note.status === 'to do' ? 'checked': ''}
//                         >
//                         <label class='btn btn-outline-primary' for='btnradio1'>to do</label>
                        
//                         <input type='radio' class='btn-check'  id='btnradio2' name='status' value='in progress'
//                         ${this.note.status === 'in progress' ? 'checked': ''}
//                         >
//                         <label class='btn btn-outline-primary' for='btnradio2'>in progress</label>
                        
//                         <input type='radio' class='btn-check' id='btnradio3' name='status' value='done'
//                         ${this.note.status === 'done' ? 'checked': ''}
//                         >
//                         <label class='btn btn-outline-primary' for='btnradio3'>done</label>
//                     </div>
//                 </div>
//                 <div class='col'>
//                     <label class='form-control'>
//                         Completion date:
//                         <input type='date' name='completionDate' placeholder='Enter a date' value='${this.note.completionDate}'/>
//                     </label>
//                 </div>
//             </div>
            
//             <div class='row'>
//                 <div class='col'>
//                     <textarea class='form-control' rows='5' cols='60' name='text' placeholder='Enter a note'>${this.note.text}</textarea>
//                 </div>
//                 <div class='col'>
//                     <input class='form-control' type='file' name='files' multiple/>
//                     <div class='form-control d-flex'>
//                         <table class='table flex-fill' id='files_table_id'>
//                             <tbody>
//                                 ${tableBody}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
                        
//             <div class='d-flex justify-content-center'>
//                 <div class='btn-group'>
//                     <input class='form-control btn btn-primary' type='submit'/>
//                     <a class='form-control btn btn-primary' href='/'>Cancel</a>
//                 </div>
//             </div>
    
    
// <!--        </div>-->
//     </form>
// </div>
// `