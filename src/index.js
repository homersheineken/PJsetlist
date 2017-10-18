import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route} from 'react-router-dom';

//COMPONENTS
import Home from './components/home';
import Concert from './components/concert';
import Song from './components/song';
import RefreshData from './components/refreshdata'
import RefreshSongs from './components/refreshsongs'

const App = () => {

    return(
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/refreshdata" component={RefreshData}/>
                    <Route exact path="/refreshsongs" component={RefreshSongs}/>

                    <Route path="/concert/:concertid" component={Concert}/>
                    <Route path="/songs/:songid" component={Song}/>

                </div>
            </BrowserRouter>
        )
}

ReactDOM.render(<App />, document.getElementById('root'));

