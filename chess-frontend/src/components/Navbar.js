import React, { Component } from 'react'
import { Redirect, Link, BrowserRouter, Route, Switch} from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import ChallengeForm from './ChallengeForm'
import './style/Navbar.css'
import {clientid} from './chess-config'
import Requests from './Requests'

export class Navbar extends Component{ 
    constructor(props) {
        super(props)
        this.state = {
            GoogleUser: [],
            userSignedIn : false,
            openChallengeForm: false,
            requests: [],
            open_requests_page: false,
        }
        console.log(clientid)
        this.toggleChallengeForm = this.toggleChallengeForm.bind(this)
        this.request_accepted = this.request_accepted.bind(this)
    }
    
    componentDidMount() {
        if (JSON.parse(localStorage.getItem('GoogleUser')) !== null) {
            this.setState({
                GoogleUser: JSON.parse(localStorage.getItem('GoogleUser')),
                userSignedIn: true
            })

            //make the profile status available
            const email =  JSON.parse(localStorage.getItem('GoogleUser')).email
            const url = 'http://localhost:5000/toggleStatus'
                let params = {
                    method: "PUT",
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        email: email,
                        status: "available"
                    })
                }
                
                fetch(url, params)

                //keep on checking if some new game request is there
                this.new_game_request()
            }

        }
        
    componentWillUnmount(){
        clearInterval(this.timer)   
    }

    new_game_request = () => {
        try{

            this.timer = setInterval( ()=>{
                console.log("checking reqs after freq intervals")
                fetch(`http://localhost:5000/player_details/${JSON.parse(localStorage.getItem('GoogleUser')).email}`).then(resp => resp.json()).then(d => {
                    console.log(d['request'].length)
                    this.setState({requests: d['request']})

                    //if someone has accepted our request then move on to start new game using the created game_id
                    if(d['start_match'] != null)
                        this.props.begin_match(d['start_match'])
                })
    
            }, 2000)
        }
        catch(err){

        }
    }

    request_accepted = (sender_email, reciever_email) => {
        fetch(`http://localhost:5000/player_details/${sender_email}`)
        .then(resp => resp.json())
        .then(d => { 
                if(d['status'] === 'available'){
                    console.log("ab krdo match start")
                    this.toggle_requests_page();
                    
                    this.props.togglenewGame(sender_email, reciever_email)
                }
                else if(d['status'] === 'offline')
                    console.log("user not online")
            })
    }
        
    toggleChallengeForm = () => {
        this.setState({openChallengeForm: !this.state.openChallengeForm})
    }

    toggle_requests_page = () => {
        this.setState({open_requests_page: !this.state.open_requests_page})
        console.log(this.state.open_requests_page)
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

                const url = 'http://localhost:5000/newuser'
                let params = {
                    method: "POST",
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        email : response.profileObj["email"],
                        name: response.profileObj["name"],
                        status: "available", // or offline, playing, busy
                        matches : [],
                        request: null
                    })
                }
                
                fetch(url, params)

                localStorage.setItem('GoogleUser', JSON.stringify(response.profileObj))
                this.setState({
                    GoogleUser: response.profileObj,
                    userSignedIn: true
                })

                this.new_game_request()
            }
        }
    }

    logout = (response) => {
        console.log(response)
        const email =  this.state.GoogleUser.email

        localStorage.removeItem('GoogleUser')
        this.setState({
            GoogleUser: [],
            userSignedIn: false
        })

        //make profileStatus offline
        const url = 'http://localhost:5000/toggleStatus'
        let params = {
            method: "PUT",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email: email,
                status: "offline"
            })
        }
        
        fetch(url, params)

        // stop checking new game requests
        clearInterval(this.timer)

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
                            <li className="list-group-item" onClick={this.toggle_requests_page}><Link to="#">Requests <span class="badge bg-secondary">{this.state.requests.length}</span></Link></li>
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
                        <Requests open={this.state.open_requests_page} requests={this.state.requests} request_accepted={this.request_accepted}/>
                    </div>
                </nav>
            )
        }
    }
}

export default Navbar
