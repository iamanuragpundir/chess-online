import React, {Component} from 'react';
import "./Board.css";
import Tile from './Tile'

export class Board extends Component {

    constructor(props){
        super(props)
        this.state = {pieceSelected: false, sourceTileId: null, pieceMoved: false, tilesHighlightFlag: {
            '1a': false, '1b': false, '1c': false, '1d': false, '1e': false, '1f': false, '1g': false, '1h': false, '2a': false, '2b': false, '2c': false, '2d': false, '2e': false, '2f': false, '2g': false, '2h': false, '3a': false, '3b': false, '3c': false, '3d': false, '3e': false, '3f': false, '3g': false, '3h': false, '4a': false, '4b': false, '4c': false, '4d': false, '4e': false, '4f': false, '4g': false, '4h': false, '5a': false, '5b': false, '5c': false, '5d': false, '5e': false, '5f': false, '5g': false, '5h': false, '6a': false, '6b': false, '6c': false, '6d': false, '6e': false, '6f': false, '6g': false, '6h': false, '7a': false, '7b': false, '7c': false, '7d': false, '7e': false, '7f': false, '7g': false, '7h': false, '8a': false, '8b': false, '8c': false, '8d': false, '8e': false, '8f': false, '8g': false, '8h': false}
        }
        this.pieceClicked = this.pieceClicked.bind(this)
        this.highlightAllLeft = this.highlightAllLeft.bind(this)
        this.highlightAllRight = this.highlightAllRight.bind(this)
        this.highlightAllTop = this.highlightAllTop.bind(this)
        this.highlightAllBottom = this.highlightAllBottom.bind(this)
        this.highlightAllDiagonallyTopLeft = this.highlightAllDiagonallyTopLeft.bind(this)
        this.highlightAllDiagonallyTopRight = this.highlightAllDiagonallyTopRight.bind(this)
        this.highlightAllDiagonallyBottomLeft = this.highlightAllDiagonallyBottomLeft.bind(this)
        this.highlightAllDiagonallyBottomRight = this.highlightAllDiagonallyBottomRight.bind(this)
        this.highlightValidDestinationTiles = this.highlightValidDestinationTiles.bind(this);
        this.ifOpponent = this.ifOpponent.bind(this)
        this.matrixFormatToChessFormatString = this.matrixFormatToChessFormatString.bind(this) 

        //TODO fetch the latest board by sending this via functional req to App.js,
        // and then it will send a req to server to fetch the latest board and update the Board accordingly
    }

    validDestinationTiles= []

    matrixFormatToChessFormatString = (srcY, srcX)=>{
        srcY = srcY.toString();
        srcX = String.fromCharCode(96 + parseInt(srcX))
        return srcY+srcX
    }
    ifOpponent = (srcY, srcX, curY, curX) =>{
        const chessIndexSrc = this.matrixFormatToChessFormatString(srcY, srcX)
        const srcColor = this.props.pieces[chessIndexSrc][this.props.pieces[chessIndexSrc].length-5]   //  assets/images/pieces/knightB.png

        const chessIndexCur = this.matrixFormatToChessFormatString(curY, curX)
        const curColor = this.props.pieces[chessIndexCur][this.props.pieces[chessIndexCur].length-5]   //  assets/images/pieces/knightB.png empty.png

        console.log(srcColor, curColor)
        if(curColor !== 'y' && srcColor !== curColor)   return true
        return false
    }

    highlightAllLeft = (tempY, tempX, srcY, srcX)=>{
        while(tempX-1 > 0){

            //some piece is present at this location, check if its opponent's piece or our own
            if( this.props.pieces[this.matrixFormatToChessFormatString(tempY, tempX-1)] !== "assets/images/pieces/empty.png"){
                console.log("Hn yaha pe kuch toh h")

                //if its opponenets piece then add it to the highkight list as move can be made here after eleminating it.
                if(this.ifOpponent(srcY, srcX, tempY, tempX-1))
                    this.validDestinationTiles.push((tempY).toString() + (tempX-1).toString())            

                break;
            }

            this.validDestinationTiles.push(tempY.toString() + (tempX-1).toString())
            tempX--;
        }
    }

    highlightAllRight = (tempY, tempX, srcY, srcX)=>{
        while(tempX+1 < 9){

            //some piece is present at this location, check if its opponent's piece or our own
            if( this.props.pieces[this.matrixFormatToChessFormatString(tempY, tempX+1)] !== "assets/images/pieces/empty.png"){
                console.log("Hn yaha pe kuch toh h")

                //if its opponenets piece then add it to the highkight list as move can be made here after eleminating it.
                if(this.ifOpponent(srcY, srcX, tempY, tempX+1))
                    this.validDestinationTiles.push((tempY).toString() + (tempX+1).toString())            

                break;
            }

            this.validDestinationTiles.push(tempY.toString() + (tempX+1).toString())
            tempX++;
        }
    }

    highlightAllTop = (tempY, tempX, srcY, srcX)=>{
        while(tempY-1 > 0){

            //some piece is present at this location, check if its opponent's piece or our own
            if( this.props.pieces[this.matrixFormatToChessFormatString(tempY-1, tempX)] !== "assets/images/pieces/empty.png"){
                console.log("Hn yaha pe kuch toh h")

                //if its opponenets piece then add it to the highkight list as move can be made here after eleminating it.
                if(this.ifOpponent(srcY, srcX, tempY-1, tempX))
                    this.validDestinationTiles.push((tempY-1).toString() + (tempX).toString())            

                break;
            }

            this.validDestinationTiles.push((tempY-1).toString() + tempX.toString())
            tempY--;
        }
    }

    highlightAllBottom = (tempY, tempX, srcY, srcX)=>{
        while(tempY+1 < 9){

            //some piece is present at this location, check if its opponent's piece or our own
            if( this.props.pieces[this.matrixFormatToChessFormatString(tempY+1, tempX)] !== "assets/images/pieces/empty.png"){
                console.log("Hn yaha pe kuch toh h")

                //if its opponenets piece then add it to the highkight list as move can be made here after eleminating it.
                if(this.ifOpponent(srcY, srcX, tempY+1, tempX))
                    this.validDestinationTiles.push((tempY+1).toString() + (tempX).toString())            

                break;
            }

            this.validDestinationTiles.push((tempY+1).toString() + tempX.toString())
            tempY++;
        }
    }
    
    highlightAllDiagonallyTopLeft  = (tempY, tempX, srcY, srcX)=>{
        while(tempY-1 > 0 && tempX-1 > 0){
            //some piece is present at this location, check if its opponent's piece or our own
            if( this.props.pieces[this.matrixFormatToChessFormatString(tempY-1, tempX-1)] !== "assets/images/pieces/empty.png"){
                console.log("Hn yaha pe kuch toh h")

                //if its opponenets piece then add it to the highkight list as move can be made here after eleminating it.
                if(this.ifOpponent(srcY, srcX, tempY-1, tempX-1))
                    this.validDestinationTiles.push((tempY-1).toString() + (tempX-1).toString())            

                break;
            }
            this.validDestinationTiles.push((tempY-1).toString() + (tempX-1).toString())
            tempY--;tempX--;
        }
    }
    
    highlightAllDiagonallyTopRight  = (tempY, tempX, srcY, srcX)=>{
        while(tempY-1 > 0 && tempX+1 < 9){

            //some piece is present at this location, check if its opponent's piece or our own
            if( this.props.pieces[this.matrixFormatToChessFormatString(tempY-1, tempX+1)] !== "assets/images/pieces/empty.png"){
                console.log("Hn yaha pe kuch toh h")

                //if its opponenets piece then add it to the highkight list as move can be made here after eleminating it.
                if(this.ifOpponent(srcY, srcX, tempY-1, tempX+1))
                    this.validDestinationTiles.push((tempY-1).toString() + (tempX+1).toString())            

                break;
            }

            this.validDestinationTiles.push((tempY-1).toString() + (tempX+1).toString())
            tempY--;tempX++;
        }
    }

    highlightAllDiagonallyBottomLeft  = (tempY, tempX, srcY, srcX)=>{
        while(tempY+1 < 9 && tempX-1 > 0){

            //some piece is present at this location, check if its opponent's piece or our own
            if( this.props.pieces[this.matrixFormatToChessFormatString(tempY+1, tempX-1)] !== "assets/images/pieces/empty.png"){
                console.log("Hn yaha pe kuch toh h")

                //if its opponenets piece then add it to the highkight list as move can be made here after eleminating it.
                if(this.ifOpponent(srcY, srcX, tempY+1, tempX-1))
                    this.validDestinationTiles.push((tempY+1).toString() + (tempX-1).toString())            

                break;
            }

            this.validDestinationTiles.push((tempY+1).toString() + (tempX-1).toString())
            tempY++;tempX--;
        }
    }
    
    highlightAllDiagonallyBottomRight  = (tempY, tempX, srcY, srcX)=>{
        while(tempY+1 < 9 && tempX+1 < 9){

            //some piece is present at this location, check if its opponent's piece or our own
            if( this.props.pieces[this.matrixFormatToChessFormatString(tempY+1, tempX+1)] !== "assets/images/pieces/empty.png"){
                // console.log("Hn yaha pe kuch toh h")

                //if its opponenets piece then add it to the highkight list as move can be made here after eleminating it.
                if(this.ifOpponent(srcY, srcX, tempY+1, tempX+1))
                    this.validDestinationTiles.push((tempY+1).toString() + (tempX+1).toString())            

                break;
            }

            this.validDestinationTiles.push((tempY+1).toString() + (tempX+1).toString())
            tempY++;tempX++;
        }
    }

    highlightValidDestinationTiles = (pieceName, pieceId) => {
        //console.log(pieceName, pieceId)
        const piecePosY = parseInt(pieceId[0])  
        const piecePosX = pieceId[1].charCodeAt() - 96    // 1-indexed thatsy 96
        
        // console.log(piecePosY, piecePosX, pieceName)

        switch (pieceName) {
            case 'king': // can move one step in any direction

                //up-down left-right movements ===========================================

                if ( piecePosY-1 > 0 && (this.props.pieces[this.matrixFormatToChessFormatString(piecePosY-1, piecePosX)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY-1, piecePosX) ) )    
                    this.validDestinationTiles.push((piecePosY-1).toString() + piecePosX.toString())
                
                if ( piecePosY+1 < 9 && (this.props.pieces[this.matrixFormatToChessFormatString(piecePosY+1, piecePosX)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY+1, piecePosX) ) )    
                    this.validDestinationTiles.push((piecePosY+1).toString() + piecePosX.toString())
            
                if ( piecePosX-1 > 0 && (this.props.pieces[this.matrixFormatToChessFormatString(piecePosY, piecePosX-1)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY, piecePosX-1) ) )    
                    this.validDestinationTiles.push(piecePosY.toString() + (piecePosX-1).toString())
            
                if ( piecePosX+1 < 9 && (this.props.pieces[this.matrixFormatToChessFormatString(piecePosY, piecePosX+1)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY, piecePosX+1) ) )    
                    this.validDestinationTiles.push(piecePosY.toString() + (piecePosX+1).toString())
                
                //diagonnal movements below===================================================

                if ( piecePosY-1 > 0 && piecePosX-1 > 0 && (this.props.pieces[this.matrixFormatToChessFormatString(piecePosY-1, piecePosX-1)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY-1, piecePosX-1) ) )    
                    this.validDestinationTiles.push((piecePosY-1).toString() + (piecePosX-1).toString())
                
                if ( piecePosY+1 < 9 && piecePosX+1 < 9 && (this.props.pieces[this.matrixFormatToChessFormatString(piecePosY+1, piecePosX+1)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY+1, piecePosX+1) ) )    
                    this.validDestinationTiles.push((piecePosY+1).toString() + (piecePosX+1).toString())
            
                if ( piecePosY+1 < 9 && piecePosX-1 > 0 && (this.props.pieces[this.matrixFormatToChessFormatString(piecePosY+1, piecePosX-1)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY+1, piecePosX-1) ) )    
                    this.validDestinationTiles.push((piecePosY+1).toString() + (piecePosX-1).toString())
            
                if ( piecePosY-1 > 0 && piecePosX+1 < 9 && (this.props.pieces[this.matrixFormatToChessFormatString(piecePosY-1, piecePosX+1)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY-1, piecePosX+1) ) )    
                    this.validDestinationTiles.push((piecePosY-1).toString() + (piecePosX+1).toString())

                break;
                
            case 'queen':
                this.highlightAllLeft(piecePosY, piecePosX, piecePosY, piecePosX)
                this.highlightAllRight(piecePosY, piecePosX, piecePosY, piecePosX)
                this.highlightAllTop(piecePosY, piecePosX, piecePosY, piecePosX)
                this.highlightAllBottom(piecePosY, piecePosX, piecePosY, piecePosX)
                this.highlightAllDiagonallyTopLeft(piecePosY, piecePosX, piecePosY, piecePosX)
                this.highlightAllDiagonallyTopRight(piecePosY, piecePosX, piecePosY, piecePosX)
                this.highlightAllDiagonallyBottomLeft(piecePosY, piecePosX, piecePosY, piecePosX)
                this.highlightAllDiagonallyBottomRight(piecePosY, piecePosX, piecePosY, piecePosX)
                break;

            case 'rook':
                this.highlightAllLeft(piecePosY, piecePosX, piecePosY, piecePosX)
                this.highlightAllRight(piecePosY, piecePosX, piecePosY, piecePosX)
                this.highlightAllTop(piecePosY, piecePosX, piecePosY, piecePosX)
                this.highlightAllBottom(piecePosY, piecePosX, piecePosY, piecePosX)
                break;

            case 'bishop':
                this.highlightAllDiagonallyTopLeft(piecePosY, piecePosX, piecePosY, piecePosX)
                this.highlightAllDiagonallyTopRight(piecePosY, piecePosX, piecePosY, piecePosX)
                this.highlightAllDiagonallyBottomLeft(piecePosY, piecePosX, piecePosY, piecePosX)
                this.highlightAllDiagonallyBottomRight(piecePosY, piecePosX, piecePosY, piecePosX)
                break;

            case 'knight':
                //left-up
                if (piecePosX-2 > 0 && piecePosY-1 > 0 && (this.props.pieces[this.matrixFormatToChessFormatString(piecePosY-1, piecePosX-2)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY-1, piecePosX-2)) )    
                    this.validDestinationTiles.push((piecePosY-1).toString() + (piecePosX-2).toString())
                //left-down
                if (piecePosX-2 > 0 && piecePosY+1 < 9 && (this.props.pieces[this.matrixFormatToChessFormatString(piecePosY+1, piecePosX-2)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY+1, piecePosX-2) ))
                    this.validDestinationTiles.push((piecePosY+1).toString() + (piecePosX-2).toString())
                //right-up
                if (piecePosX+2 < 9 && piecePosY-1 > 0 && (this.props.pieces[this.matrixFormatToChessFormatString(piecePosY-1, piecePosX+2)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY-1, piecePosX+2) ))
                    this.validDestinationTiles.push((piecePosY-1).toString() + (piecePosX+2).toString())
                //left-down
                if (piecePosX+2 < 9 && piecePosY+1 < 9 && (this.props.pieces[this.matrixFormatToChessFormatString(piecePosY+1, piecePosX+2)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY+1, piecePosX+2) ))
                    this.validDestinationTiles.push((piecePosY+1).toString() + (piecePosX+2).toString())
                //up-left
                if (piecePosX-1 > 0 && piecePosY-2 > 0 && (this.props.pieces[this.matrixFormatToChessFormatString(piecePosY-2, piecePosX-1)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY-2, piecePosX-1) ))
                    this.validDestinationTiles.push((piecePosY-2).toString() + (piecePosX-1).toString())
                //up-right
                if (piecePosX+1 < 9 && piecePosY-2 > 0 && (this.props.pieces[this.matrixFormatToChessFormatString(piecePosY-2, piecePosX+1)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY-2, piecePosX+1) ))
                    this.validDestinationTiles.push((piecePosY-2).toString() + (piecePosX+1).toString())
                //down-left
                if (piecePosX-1 > 0 && piecePosY+2 < 9 && (this.props.pieces[this.matrixFormatToChessFormatString(piecePosY+2, piecePosX-1)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY+2, piecePosX-1) ))
                    this.validDestinationTiles.push((piecePosY+2).toString() + (piecePosX-1).toString())
                //down-right
                if (piecePosX+1 < 9 && piecePosY+2 < 9 && (this.props.pieces[this.matrixFormatToChessFormatString(piecePosY+2, piecePosX+1)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY+2, piecePosX+1) ))
                    this.validDestinationTiles.push((piecePosY+2).toString() + (piecePosX+1).toString())
                break;

            case 'pawn':
                //up-byOne
                if (piecePosY-1 > 0 && this.props.pieces[this.matrixFormatToChessFormatString(piecePosY-1, piecePosX)] === "assets/images/pieces/empty.png")
                    this.validDestinationTiles.push((piecePosY-1).toString() + (piecePosX).toString())
                //up-byTwo
                if (piecePosY-2 > 0 && this.props.pieces[this.matrixFormatToChessFormatString(piecePosY-2, piecePosX)] === "assets/images/pieces/empty.png")
                    this.validDestinationTiles.push((piecePosY-2).toString() + (piecePosX).toString())
                //opponent at left-diagonal
                if(piecePosY-1 > 0 && piecePosX-1 > 0 && this.ifOpponent(piecePosY, piecePosX, piecePosY-1, piecePosX-1))
                    this.validDestinationTiles.push((piecePosY-1).toString() + (piecePosX-1).toString())
                //opponent at right-diagonal
                if(piecePosY-1 > 0 && piecePosX+1 < 9 && this.ifOpponent(piecePosY, piecePosX, piecePosY-1, piecePosX+1))
                    this.validDestinationTiles.push((piecePosY-1).toString() + (piecePosX+1).toString())
                break;

            default:
            console.log(' ');
        }

        
        return  this.validDestinationTiles
    } 

    pieceClicked = (e) => {
        //check if a pieceSelected is false, then this is the selection of the piece that will be moved
        // we highlight all the valid tile where the move can be made
        // if the player clicks on the selected tile itself we abort the process of moving and get to normal board
        
        const pieceId = e.target.id
        const pieceImgUrl = this.props.pieces[pieceId]   //  assets/images/pieces/knightB.png
        const pieceWithExtension = pieceImgUrl.split('/')[pieceImgUrl.split('/').length-1]    //knightB.png
        const pieceName = pieceWithExtension.substr(0, pieceWithExtension.length-5)    //knight

        if (this.state.pieceSelected === false){

            //give all the options this piece can go to by making the bgcolor same
            // we need to know the type of the piece selected to highlight the valid moves
                // this you can check with the pieces prop sent by App.js    

            //also one condition, player who turn is now, has selected the tile &&
            if(pieceName === "empt")    return;

            this.validDestinationTiles = this.highlightValidDestinationTiles(pieceName, pieceId)
            this.validDestinationTiles.push([pieceId[0], (pieceId[1].charCodeAt() - 96).toString()])

            this.validDestinationTiles.forEach((e)=>{
                //convert the i,j indexes in the returned list as per 1a, 2b format
                const chessIndY = e[0]
                const chessIndX = String.fromCharCode(96 + parseInt(e[1]))

                //this is the way to update objects 
                this.setState(prevState => {
                    let tilesHighlightFlag = { ...prevState.tilesHighlightFlag };  
                    tilesHighlightFlag[chessIndY+chessIndX] = true
                    return { tilesHighlightFlag }; 
                  })
                
            })

            this.setState({sourceTileId: pieceId, pieceSelected: true})
        }

        // what if the pieceSelected is true, means now we have selected the destination tile, to where the move is to be made
            //validate the move and send the ids back to App.js iff valid else give a warning and revert back to normal board
        else{
            //you click on the same selected tile, so get back to normal
            if(this.state.sourceTileId === pieceId){
                
                console.log("clicked same tile")
                //remove the highlight from sourceId tile
                this.setState(prevState => {
                    let tilesHighlightFlag = { ...prevState.tilesHighlightFlag };  
                    tilesHighlightFlag[[pieceId]] = false
                    return { tilesHighlightFlag }; 
                  }, ()=>{
                    this.setState({sourceTileId: null, pieceSelected: false})
                  })
            }

            else{ //check if the chosed tile is a valid destiination
                // console.log("selected dest, lets check if it was the valid one")

                this.validDestinationTiles.forEach((e)=>{
                    //convert the i,j indexes in the returned list as per 1a, 2b format
                    const chessIndY = e[0]
                    const chessIndX = String.fromCharCode(96 + parseInt(e[1]))
                    
                    // console.log(chessIndY+chessIndX, pieceId)
                    if(pieceId === chessIndY+chessIndX){
                        console.log("move made")
                        this.props.validMoveMade(this.state.sourceTileId, pieceId)
                        return 
                    }
                })
            }

            // console.log("After doing a move, move can valid or invalid")
            // make every highlight off
            //make 
            this.validDestinationTiles.forEach((e)=>{
                //convert the i,j indexes in the returned list as per 1a, 2b format
                const chessIndY = e[0]
                const chessIndX = String.fromCharCode(96 + parseInt(e[1]))

                //this is the way to update objects 
                this.setState(prevState => {
                    let tilesHighlightFlag = { ...prevState.tilesHighlightFlag };  
                    tilesHighlightFlag[chessIndY+chessIndX] = false
                    return { tilesHighlightFlag }; 
                  })
            })

            this.setState({sourceTileId: null, pieceSelected: false})
            this.validDestinationTiles = []
        }
    }

    render() {
        const vAxis = ['1', '2', '3', '4', '5', '6', '7', '8']
        const hAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
       
        let board = []
        
        for(let i=0; i<vAxis.length; i++){
            for(let j=0; j<hAxis.length; j++){
                
                board.push(<Tile num={j+i+2} vCoordinate={vAxis[i]} hCoordinate={hAxis[j]} pieceImgUrl={this.props.pieces[vAxis[i] + hAxis[j]]} pieceClicked={this.pieceClicked} highlightFlag={this.state.tilesHighlightFlag[vAxis[i]+hAxis[j]]} />)

                
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
