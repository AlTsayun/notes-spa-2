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

function App() {

    const POST_NOTE_URL = 'http://localhost:5000/api/notes'


    let history = useHistory()
    async function createNote() {
        await executeFetch(POST_NOTE_URL, {method: 'POST'})
        .then(response => response.json())
        .then(note => {history.push(`/edit_note/${note.id}`)})
    }


    return (
    <div className="App">
        <header>
            <nav className="App-header navbar navbar-expand bg-light">
                <div className="navbar-brand">
                    {/* <img src="/static/assets/images/notes-icon.png" style="width:40px;"> */}
                </div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Start page</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={async () => {await createNote()}}>Create note</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/about">About</a>
                    </li>
                </ul>
            </nav>
        </header>

        <main className='main'>
            <Switch>
                <Route path='/editNote/:noteId' component={NotesList} />
                <Route exact path='/' component={NotesList} />
                {/* TODO: redirect to error page */}
                <Redirect to='/' />
            </Switch>
        </main>

{/*       <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
        Edit <code>src/App.js</code> and save to reload.
    </p>
    <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
    >
        Learn React
    </a>
    </header> */}

        <footer className="bg-light">© 2021 Booba</footer>
    </div>

    );
}

export default App;
