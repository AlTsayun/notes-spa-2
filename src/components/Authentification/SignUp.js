import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { executeFetch } from '../../utils/fetchutils'

function SignUp(props){

    const [userInfo, setUserInfo] = useState({username:'', password:''})
    const [stayLoggedIn, setstayLoggedIn] = useState(true)

    const history = useHistory();

    const POST_SIGNUP_URL = '/api/signup'
    const POST_LOGIN_URL = '/api/login'

    function handleUserInfoChange(e){
        e.preventDefault()
        // console.log(`${e.target.name} has a new value: ${e.target.value}`)
        setUserInfo((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    function handleStayLoggedInChange(e){
        console.log(`${e.target.name} has a new value: ${e.target.checked}`)
        setstayLoggedIn(e.target.checked)
    }

    async function fetchSignUp(){
        executeFetch(POST_SIGNUP_URL, {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'POST', 
            body: JSON.stringify({username: userInfo.username, password: userInfo.password})
        })
        .then(response => response.json())
        .then(async user => {
            console.log('Created user:', user)
            if (stayLoggedIn){
                console.log('executing logging')
                await executeFetch(POST_LOGIN_URL, {
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    credentials: 'same-origin',
                    withCredentials: true,
                    method: 'POST', 
                    body: JSON.stringify({username: userInfo.username, password: userInfo.password})
                })
            }
        })
        .then(_ => {
            history.goBack()
        })
    }

    console.log('render SignUp')
    return (
    <div className='signup_main d-flex justify-content-center'>
    <form method='POST' id='signup_form'>
        <div className='col form-group'>
            <label>
                Username
                <input 
                    className='form-control' 
                    type='text'
                    placeholder='Enter Username' 
                    name='username' 
                    required
                    onChange={handleUserInfoChange}
                    ></input>
            </label>
        </div>

        <div className='col form-group'>
            <label>
                Password
                <input
                    className='form-control'
                    type='password' 
                    placeholder='Enter Password' 
                    name='password' 
                    required
                    onChange={handleUserInfoChange}
                    ></input>
            </label>

        </div>

        <div className='col form-group'>
        <div className='form-check'>
            <label className='form-check-label'>
                <input 
                    className='form-check-input' 
                    type='checkbox' 
                    name='stayLoggedIn'
                    checked={stayLoggedIn}
                    onChange={handleStayLoggedInChange}
                    />
                stay logged in
            </label>
        </div>
        </div>

        <div className='col form-group'>
            <input 
                className='form-control btn btn-primary' 
                type='submit' 
                value='Sign up'
                onClick={async (e) => {
                    e.preventDefault()
                    await fetchSignUp()
                }}
                />
        </div>
    </form>
</div>
)
}

export default SignUp