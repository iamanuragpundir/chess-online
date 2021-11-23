import React, { Component } from 'react'
import './style/Requests.css'
export class Requests extends Component {
    render() {
        if(this.props.open)
            return (
                <div id="requests_page">
                    {
                        this.props.requests.map(e => {
                            return (
                                <div>
                                    {e.sender}&nbsp;&nbsp;<button className="btn btn-sm btn-success" onClick={()=>this.props.request_accepted(e.sender)}>Accept</button>
                                </div>
                            )
                        })
                    }
                </div>
            )
        else
            return (<></>)
    }
}

export default Requests
