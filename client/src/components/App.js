import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from '../api/history'
import Navbar from './Layout/Navbar'
import ChallengePage from './Challenge/ChallengePage'
import CreateChallenge from './Challenge/CreateChallenge'
import ManagePage from './Manage/ManagePage'
import StatusMenu from './UserMenu/StatusMenu'
import HomePage from './Home/HomePage'
import ChallengeShow from './Challenge/ChallengeShow'

class App extends React.Component {

    render() {
        return (
            <div>
                <Router history={history}>
                    <Navbar />
                    <div>
                        <Switch>
                            <Route path="/" exact component={HomePage} />
                            <Route path="/challenges" exact component={ChallengePage} />
                            <Route path="/challenges/:id/show" exact component={ChallengeShow} />                          
                            <Route path="/challenges/new" exact component={CreateChallenge} />
                            <Route path="/manage/challenges" exact component={ManagePage} />
                            <Route path="/status/:userId" exact component={StatusMenu} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default (App);