import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, browserHistory } from 'react-router-dom';
import './style/ChallengeForm.css'
export class Challengeform extends Component {
    startMatch = () => {
        <Link to='/Game' activeClassName='active'>Game</Link>
    }
    render() {
        if (this.props.open)
            return (
                <div>
                    <form id="challengeForm" action="/Game">
                        <div className="form-group">
                            <label htmlFor="opponentsgmail">opponent's gmail</label>
                            <input type="email" className="form-control" id="opponentsgmail" aria-describedby="emailHelp" />
                        </div>
                        <br/>
                        <div>
                            <input className="form-check-input" type="radio" name="pieces" id="whitepieces" value="whitepieces" defaultChecked />
                            <label className ="form-check-label" htmlFor="whitepieces">
                            &nbsp;White
                            </label> &nbsp;&nbsp;
                            <input className="form-check-input" type="radio" name="pieces" id="blackpieces" value="blackpieces" /> 
                            <label className ="form-check-label" htmlFor="blackpieces">
                            &nbsp;Black
                            </label>
                        </div>
                        <br />
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="makelive" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Make live</label><br />
                            <small id="emailHelp" className="form-text text-muted">Anyone with your gmail id can watch your match till its live.</small>
                        </div>
                        <button onClick={this.startMatch} className="btn btn-success btn-sm">Request match</button>
                        <button onClick={this.props.toggleChallengeForm} id="cancel" className="btn btn-light btn-sm">Cancel</button>
                    </form>
                </div>
            )
        else
            return (<></>)
    }
}

export default Challengeform
