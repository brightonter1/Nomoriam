import React from 'react'
import MariamLogo from '../../asset/mariam.jpg'
import SocialMediaAuth from './SocialMediaAuth'
import { Link } from 'react-router-dom'

class Header extends React.Component {
    render() {
        return (
            <div className="ui secondary stackable menu">
                <div className="item"><img src={MariamLogo} alt="" /></div>
                <Link to="/" className="item">Home</Link>
                <Link to="/challenges" className="item">Challenges</Link>
                <Link to="/leaderboard" className="item">Leaderboard</Link>
                <SocialMediaAuth />
            </div>
        )
    }
}

export default Header