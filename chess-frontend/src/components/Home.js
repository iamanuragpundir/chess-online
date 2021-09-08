import React, { Component } from 'react'
import Board from './Board';
import Navbar from './Navbar';
export class Home extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <Board pieces={this.props.pieces}/>
            </div>
        )
    }
}

export default Home
