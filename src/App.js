import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
import Table from "./components/Table/Table";
import Adverts from "./components/Adverts/Adverts";

class App extends Component {

    render() {
        return (
            <div className="container">
                <Switch>
                <Route path="/add" component={Adverts}/>
                <Route path="/" exact component={Table}/>
                </Switch>
            </div>
        );
    }
}

export default App;