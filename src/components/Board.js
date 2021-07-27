import React, {Component} from 'react';
import "./Board.css";
import Tile from './Tile'

export class Board extends Component {
    render() {
        const hAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        const vAxis = ['1', '2', '3', '4', '5', '6', '7', '8']
        let board = []
        
        for(let i=0; i<vAxis.length; i++){
            for(let j=0; j<hAxis.length; j++){
                board.push(<Tile num={j+i+2} pieceImgUrl={this.props.pieces[vAxis[i] + hAxis[j]]}/>)
            }
        }
        return (
            <div id="board">
                {board}
            </div>
        )
    }
}
export default Board
