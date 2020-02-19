import React from 'react'
import { connect } from 'react-redux'
import { SignIn, SignOut } from '../../store/actions/authAction'
import firebase from '../../api/firebase'
class SocialMediaAuth extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.SignIn(user.uid)
            }
        })
    }

    onSignIn = (social) => {
        this.props.SignIn(social)
    }

    onSignOut = () => {
        this.props.SignOut()
    }

    render() {
        if (this.props.isSignedIn) {
            return (
                <div className="right menu">
                    <div className="item">
                        <img src={this.props.photoURL} className="ui avatar image" alt=""/>
                        <span>{this.props.name}</span>
                    </div>
                    <div className="item">
                        <button className="ui facebook button" onClick={(e) => this.onSignOut()}>
                            <i aria-hidden="true" className="logout icon"></i>
                            Log out
                        </button>
                    </div>

                
                </div>
            )
        }
        return (
            <div className="right menu">
                <div className="item">
                    <button className="ui google plus button" onClick={(e) => this.onSignIn('google.com')}>
                        <i aria-hidden="true" className="google plus icon"></i>
                        Google Plus
                    </button></div>
                <div className="item">
                    <button className="ui facebook button" onClick={(e) => this.onSignIn('facebook.com')}>
                        <i aria-hidden="true" className="facebook icon"></i>
                        Facebook
                        </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn,
        userId: state.auth.userId,
        name: state.auth.name,
        photoURL: state.auth.photoURL
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        SignIn: (social) => dispatch(SignIn(social)),
        SignOut: () => dispatch(SignOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialMediaAuth)