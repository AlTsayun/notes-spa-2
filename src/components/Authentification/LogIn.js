import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { executeFetch } from '../../utils/fetchutils'

function LogIn(props){

    const INCORRECT_INPUT_ELEMENT = <p>Wrong credentials!</p>

    const [userInfo, setUserInfo] = useState({username:'', password:''})

    const history = useHistory()
    const [inputState, setInputState] = useState('')

    const POST_LOGIN_URL = '/api/login'

    function handleChange(e){
        // console.log(`${e.target.name} has a new value: ${e.target.value}`)
        setUserInfo((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    async function fetchLogIn(){
        
        console.log('fetched')
        await executeFetch(POST_LOGIN_URL, {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'POST', 
            
            credentials: 'same-origin',
            body: JSON.stringify({username: userInfo.username, password: userInfo.password})
        })
        .then(_ => {
            history.goBack()
        })
        .catch(e => {
            if (e.response.status === 401){
                setInputState(INCORRECT_INPUT_ELEMENT)
            }
        })
    }
    console.log('render LogIn')

    return (
    <div className='login_main d-flex justify-content-center'>
    <form method='POST' id='login_form'>
        <div className='col form-group'>
            <label>
                Username
                <input 
                    className='form-control' 
                    type="text"
                    placeholder="Enter Username" 
                    name="username" 
                    required
                    onChange={handleChange}
                    ></input>
            </label>
        </div>

        <div className='col form-group'>
            <label>
                Password
                <input
                    className='form-control'
                    type="password" 
                    placeholder="Enter Password" 
                    name="password" 
                    required
                    onChange={handleChange}
                    ></input>
            </label>

        </div>
            {inputState}
        <div className='col form-group'>
            <input 
                className='form-control btn btn-primary' 
                type='submit' 
                value='Log in'
                onClick={async (e) => {
                    e.preventDefault()
                    await fetchLogIn()
                }}
                />
        </div>
    </form>
</div>
    )
}

export default LogIn