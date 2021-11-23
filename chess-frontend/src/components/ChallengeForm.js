import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, browserHistory } from 'react-router-dom';
import './style/ChallengeForm.css'
export class Challengeform extends Component {
    constructor(props){
        super(props)
        this.state = {
            opponents_gmail : null,
            white_piece : true,
            black_piece : false,
            make_live : false
        }
    }
    startMatch = () => {
        // check if the provided gmail id is in the database or not, 
        // if yes check if that player is available or not, 
        // if available, send request for a match

        const url = `http://localhost:5000/player_details/${this.state.opponents_gmail}`
        fetch(url).then(resp => resp.json()).then(d => {
            if(d.status === "available")  {
                //send request to the player
                console.log('sending req', this.state.white_piece, this.state.black_piece)

                const request = {
                    sender: JSON.parse(localStorage.getItem('GoogleUser')).email,
                    req_to: this.state.opponents_gmail,
                    sender_color: (this.state.white_piece) ? "white" : "black" ,
                    make_live: this.state.make_live
                }

                let params = {
                    method: "PUT",
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(request)
                }

                fetch('http://localhost:5000/send_request', params)

                //close the challenge form
                this.props.toggleChallengeForm()
            }
            else return 
        })
    }
    render() {
        if (this.props.open)
            return (
                <div>
                    <form id="challengeForm"method="POST" action="javascript:void(0);">
                        <div className="form-group">
                            <label htmlFor="opponentsgmail">opponent's gmail</label>
                            <input type="email" className="form-control" id="opponentsgmail" aria-describedby="emailHelp" required 
                                onChange = {(e)=>{
                                    this.setState({opponents_gmail : e.target.value})
                                    }} 
                            />
                        </div>
                        <br/>
                        <div>
                            <input className="form-check-input" type="radio" name="pieces" id="whitepieces"             value="whitepieces" defaultChecked 
                                onChange = { ()=> {this.setState({white_piece: !this.state.white_piece, black_piece: !this.state.black_piece})}}
                            />
                            <label className ="form-check-label" htmlFor="whitepieces">
                            &nbsp;White
                            </label> &nbsp;&nbsp;
                            <input className="form-check-input" type="radio" name="pieces" id="blackpieces"     value="blackpieces" 
                                onChange = { ()=> {this.setState({white_piece: !this.state.white_piece, black_piece: !this.state.black_piece})}}
                            /> 
                            <label className ="form-check-label" htmlFor="blackpieces">
                            &nbsp;Black
                            </label>
                        </div>
                        <br />
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="makelive" 
                                onChange = { ()=> {this.setState({make_live: !this.state.make_live})}}
                            />
                            <label className="form-check-label" htmlFor="exampleCheck1">Make live</label><br />
                            <small id="emailHelp" className="form-text text-muted">Anyone with your gmail id can watch your match till its live.</small>
                        </div>
                        <button onClick = {this.startMatch} className="btn btn-success btn-sm">Request match</button>
                        <button onClick={this.props.toggleChallengeForm} id="cancel" className="btn btn-light btn-sm">Cancel</button>
                    </form>
                </div>
            )
        else
            return (<></>)
    }
}

export default Challengeform
