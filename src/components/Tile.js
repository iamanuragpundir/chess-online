import React, { Component } from 'react'
import './Tile.css'

export class Tile extends Component {
    render() {
        if ((this.props.num)%2 === 0){
            const tile = (this.props.pieceImgUrl !== null) ?  <img src={this.props.pieceImgUrl} width="60px" height="60px" alt="no image" /> : ''
            
            return(
                <div className="tile black-tile">
                    {tile}
                </div>
            )
        }
            
            
        else{
            const tile = (this.props.pieceImgUrl !== null) ?  <img src={this.props.pieceImgUrl} width="60px" height="60px" alt="no image" /> : ''

            return(
                <div className="tile white-tile">
                        {tile}
                </div>
            )
        }
    }
}
 
export default Tile
