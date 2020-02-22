import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from '../api/history'
import Navbar from './Layout/Navbar'
import ChallengePage from './Challenge/ChallengePage'
import CreateChallenge from './Challenge/CreateChallenge'
import ManagePage from './Manage/ManagePage'

class App extends React.Component {

    render() {
        return (
            <div>
                <Router history={history}>
                    <Navbar />
                    <div>
                        <Switch>
                            <Route path="/challenges" exact component={ChallengePage} />
                            <Route path="/challenges/new" exact component={CreateChallenge} />
                            <Route path="/manage/challenges" exact component={ManagePage} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default (App);