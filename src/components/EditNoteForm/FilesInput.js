import React, { useState, useRef } from 'react'

function FilesInput(props){
    
    const initialFiles = useRef(props.files).current
    console.log('initialFiles', initialFiles)
    const addedFiles = useRef([])
    const [removedFiles, setRemovedFiles] = useState([])

    const handleFileSelect = e => {
        addedFiles.current = [...e.target.files]
        console.log('added files', addedFiles.current)
        props.setAddedFiles(addedFiles.current)
    }

    const handleFileRemove = (e, file) => {
        props.setRemovedFiles([...removedFiles, file])
        setRemovedFiles(prev => [...prev, file])
    }

    console.log('render FilesInput')
    return (
        <div className="form-group">
            <input 
                className='form-control' 
                type='file' 
                name='files' 
                multiple
                onChange={handleFileSelect}
                />
            <div className='d-flex'>
                <table className='table flex-fill' id='files_table_id'>
                    <tbody> 
                        {initialFiles.filter(e => !removedFiles.includes(e)).map((file) => 
                            (        
                            <tr>
                                <td>
                                    <a>
                                        {file.name}
                                    </a>
                                </td>
                                <td>
                                    <div>
                                        <button className='btn btn-outline-danger' onClick={e => handleFileRemove(e, file)}>
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    )
}
export default FilesInput