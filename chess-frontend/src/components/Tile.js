import React, { Component } from 'react'
import './Tile.css'

export class Tile extends Component {

    render() {
        let classes = "tiles"

        if ((this.props.num)%2 === 0)
            classes += " black-tile"
        else classes += " white-tile"

        if (this.props.highlightFlag)
            classes += " highlight"

        const tile = <img className='tileImg' src={this.props.pieceImgUrl} id={this.props.vCoordinate + this.props.hCoordinate} onClick = {this.props.pieceClicked} alt=" " />

            return(
                <div className={classes} >
                        {tile}
                </div>
            )
    }
}
 
export default Tile
