import logo from './logo.svg';
import './App.css';
import {
    Switch,
    Route,
    Link,
    Redirect,
    useHistory
} from "react-router-dom";
import NotesList from './components/NotesList/NotesList';
import { executeFetch } from './utils/fetchutils';
import { wsSend } from './utils/wsutils';
import EditNoteForm from './components/EditNoteForm/EditNoteForm';
import LogIn from './components/Authentification/LogIn';
import SignUp from './components/Authentification/SignUp';

import { w3cwebsocket as W3CWebSocket } from 'websocket';

const wsClient = new W3CWebSocket('ws://127.0.0.1:8000')
wsClient.onopen = (message) => {
    console.log('wsClient is opened')
}
wsClient.onmessage = (message) =>{console.log('Message received by ws:', message.data)}
function App() {

    const POST_NOTE_URL = '/api/notes'

    
    const superWsMessageHandler = (message) => {
        let data = JSON.parse(message.data)
        if (data.intention === 'added note'){
            history.push(`/editNote/${data.body.id}`)
        }
    }
    wsClient.onmessage = superWsMessageHandler
        
    let history = useHistory()
    async function createNote() {
        wsSend(wsClient, JSON.stringify({intention: 'add note', message: {}}))
    }

    console.log('render App')
    return (
        <div className="App">
            <header>
                <nav className="App-header navbar navbar-expand bg-light">
                    <div className="navbar-brand">
                        {/* <img src="/static/assets/images/notes-icon.png" style="width:40px;"> */}
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/" onClick={async (e) => {
                                e.preventDefault()
                                history.push("/")
                            }}>Start page</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/" onClick={async (e) => {
                                e.preventDefault()
                                await createNote()
                            }}>Create note</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about" onClick={async (e) => {
                                e.preventDefault()
                                history.push("/about")
                            }}>About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/login" onClick={async (e) => {
                                e.preventDefault()
                                history.push("/login")
                            }}>Log in</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/signup" onClick={async (e) => {
                                e.preventDefault()
                                history.push("/signup")
                            }}>Sign up</a>
                        </li>
                    </ul>
                </nav>
            </header>

            <main className='main'>
                <Switch>
                    <Route path='/editNote/:id' render={(props) => <EditNoteForm wsClient={wsClient} superWsMessageHandler={superWsMessageHandler} {...props} /> } />
                    <Route exact path='/' render={(props) => <NotesList wsClient={wsClient} superWsMessageHandler={superWsMessageHandler} {...props} /> } />
                    <Route exact path='/login' component={LogIn} />
                    <Route exact path='/signup' component={SignUp} />
                    {/* TODO: redirect to error page */}
                    <Redirect to='/' />
                </Switch>
            </main>
            <footer className="bg-light">© 2021 Booba</footer>
        </div>

    );
}

export default App;
