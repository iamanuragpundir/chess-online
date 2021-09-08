import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import ChallengeForm from './ChallengeForm'
import './style/Navbar.css'
import {clientid} from './chess-config'

export class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            GoogleUser: [],
            userSignedIn: false,
            openChallengeForm: false
        }
        console.log(clientid)
        this.toggleChallengeForm = this.toggleChallengeForm.bind(this)
    }

    componentDidMount() {
        if (JSON.parse(localStorage.getItem('GoogleUser')) !== null) {
            this.setState({
                GoogleUser: JSON.parse(localStorage.getItem('GoogleUser')),
                userSignedIn: true
            })
        }


    }
    responseGoogle = (response) => {
        
        console.log(response)
        
        if(response.error) {
            console.log(response.error)
            return
        }

        if (response.profileObj !== null) {
            if (localStorage.getItem('GoogleUser') === null) {
                //local storage null means either we are on new broswer or the user is signing in with a new gmail
                //check in db if we have account with this gmail-id, if not create a new player document
                localStorage.setItem('GoogleUser', JSON.stringify(response.profileObj))
                this.setState({
                    GoogleUser: response.profileObj,
                    userSignedIn: true
                })
            }
        }
    }

    logout = (response) => {
        console.log(response)
        localStorage.removeItem('GoogleUser')
        this.setState({
            GoogleUser: [],
            userSignedIn: false
        })
    }

    toggleChallengeForm = () => {
        this.setState({openChallengeForm: !this.state.openChallengeForm})
    }

    render() {
        if (!this.state.userSignedIn) {
            return (
                <nav className="navbar mb-0" >
                    <h3>chess-online</h3>
                    <div id="login">

                        <GoogleLogin
                            clientId={clientid}
                            render={renderProps => (
                                <img src="assets/images/profile-logo.png" style={{ width: 35 }} onClick={renderProps.onClick} disabled={renderProps.disabled}></img>
                            )}
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            isSignedIn={true}
                            cookiePolicy={'single_host_origin'}
                        />

                    </div>
                </nav>
            )
        }
        else {
            return (
                <nav className="navbar mb-0" >
                    <h3><Link to="/">chess-online</Link></h3>
                    <div id="login">
                        <ul className="list-group list-group-horizontal">
                            <li className="list-group-item" onClick={this.toggleChallengeForm}>Challenge</li>
                            <li className="list-group-item"><Link to="/History">History</Link></li>
                            <li className="list-group-item"><Link to="/Live" >Live!</Link></li>
                            <li className="list-group-item">
                                <GoogleLogout
                                    clientId={clientid}
                                    
                                    render={renderProps => (
                                        <a href="#" onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</a>
                                    )}
                                    onLogoutSuccess={this.logout}
                                />
                            </li>
                        </ul>
                        <ChallengeForm open={this.state.openChallengeForm} toggleChallengeForm={this.toggleChallengeForm}/>
                    </div>
                </nav>
            )
        }
    }
}

export default Navbar
