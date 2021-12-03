import React, { Component } from 'react'
import Board from './Board';
import Navbar from './Navbar';
import Game from './Game';
export default class Home extends Component{
    constructor(props){
        super(props)
    }
    render(){

        return (
            <div>
                <Navbar togglenewGame={this.props.togglenewGame}/>
                <div>
                    <h3>Here we will share highlights of last played matched...</h3>
                </div>
                {/* <Board pieces={this.props.pieces} /> */}
                {/* <Game pieces={this.props.pieces} /> */}
            </div>
        )
    }
}
