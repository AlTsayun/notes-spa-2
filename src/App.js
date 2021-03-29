import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import NotesList from './components/NotesList/NotesList';

function App() {
  return (
    <div className="App">
        <header>
            <nav className="App-header navbar navbar-expand bg-light">
                <div className="navbar-brand">
                    {/* <img src="/static/assets/images/notes-icon.png" style="width:40px;"> */}
                </div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/" data-link>Start page</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/create_note" data-link>Create note</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/about" data-link>About</a>
                    </li>
                </ul>
            </nav>
        </header>

        <main className='main'>
            <Router>
                <Switch>
                    <Route path='/editNote/:noteId' component={NotesList} />
                    <Route exact path='/' component={NotesList} />
                    <Redirect to='/' />
                </Switch>
            </Router>
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

        <footer>© 2021 Booba</footer>
    </div>

  );
}

export default App;
