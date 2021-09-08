import React, { Component } from 'react'
import "./style/MessageBar.css";

export class MessageBar extends Component {
    render() {
        if(this.props.messageBar !== "null")
            return (
                    <div className="messageBar">
                        <span className="spanMessage">{this.props.messageBar}</span>
                    </div>
                )
        else
            return (
                <div className="messageBar">
                    <span className="spanMessage"></span>
                </div>
            )
    }
}

export default MessageBar
