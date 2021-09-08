import React, {Component} from 'react';
import "./style/Board.css";
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
        // this.removeMovesMakingKingDie = this.removeMovesMakingKingDie.bind(this)
        this.ifKingCanBeKilled = this.ifKingCanBeKilled.bind(this)
        this.legalMoves = this.legalMoves.bind(this)
        this.invertBoard = this.invertBoard.bind(this)

        //TODO fetch the latest board by sending this via functional req to App.js,
        // and then it will send a req to server to fetch the latest board and update the Board accordingly
    }

    validDestinationTiles= []

    matrixFormatToChessFormatString = (srcY, srcX)=>{
        srcY = srcY.toString();
        srcX = String.fromCharCode(96 + parseInt(srcX))
        return srcY+srcX
    }
    ifOpponent = (srcY, srcX, curY, curX, localBoard) =>{
        const chessIndexSrc = this.matrixFormatToChessFormatString(srcY, srcX)
        const srcColor = localBoard[chessIndexSrc][localBoard[chessIndexSrc].length-5]   //  assets/images/pieces/knightB.png

        const chessIndexCur = this.matrixFormatToChessFormatString(curY, curX)
        const curColor = localBoard[chessIndexCur][localBoard[chessIndexCur].length-5]   //  assets/images/pieces/knightB.png empty.png

        // console.log(srcColor, curColor)
        if(curColor !== 'y' && srcColor !== curColor)   return true
        return false
    }

    highlightAllLeft = (tempY, tempX, srcY, srcX, localBoard)=>{
        while(tempX-1 > 0){

            //some piece is present at this location, check if its opponent's piece or our own
            if( localBoard[this.matrixFormatToChessFormatString(tempY, tempX-1)] !== "assets/images/pieces/empty.png"){
                // console.log("Here some is sitting")

                //if its opponenets piece then add it to the highlight list as move can be made here after eleminating it.
                if(this.ifOpponent(srcY, srcX, tempY, tempX-1, localBoard))
                    this.validDestinationTiles.push((tempY).toString() + (tempX-1).toString())            

                break;
            }

            this.validDestinationTiles.push(tempY.toString() + (tempX-1).toString())
            tempX--;
        }
    }

    highlightAllRight = (tempY, tempX, srcY, srcX, localBoard)=>{
        while(tempX+1 < 9){

            //some piece is present at this location, check if its opponent's piece or our own
            if( localBoard[this.matrixFormatToChessFormatString(tempY, tempX+1)] !== "assets/images/pieces/empty.png"){

                //if its opponenets piece then add it to the highkight list as move can be made here after eleminating it.
                if(this.ifOpponent(srcY, srcX, tempY, tempX+1, localBoard))
                    this.validDestinationTiles.push((tempY).toString() + (tempX+1).toString())            

                break;
            }

            this.validDestinationTiles.push(tempY.toString() + (tempX+1).toString())
            tempX++;
        }
    }

    highlightAllTop = (tempY, tempX, srcY, srcX, localBoard)=>{
        while(tempY-1 > 0){

            //some piece is present at this location, check if its opponent's piece or our own
            if( localBoard[this.matrixFormatToChessFormatString(tempY-1, tempX)] !== "assets/images/pieces/empty.png"){

                //if its opponenets piece then add it to the highkight list as move can be made here after eleminating it.
                if(this.ifOpponent(srcY, srcX, tempY-1, tempX, localBoard))
                    this.validDestinationTiles.push((tempY-1).toString() + (tempX).toString())            

                break;
            }

            this.validDestinationTiles.push((tempY-1).toString() + tempX.toString())
            tempY--;
        }
    }

    highlightAllBottom = (tempY, tempX, srcY, srcX, localBoard)=>{
        while(tempY+1 < 9){

            //some piece is present at this location, check if its opponent's piece or our own
            if( localBoard[this.matrixFormatToChessFormatString(tempY+1, tempX)] !== "assets/images/pieces/empty.png"){

                //if its opponenets piece then add it to the highkight list as move can be made here after eleminating it.
                if(this.ifOpponent(srcY, srcX, tempY+1, tempX, localBoard))
                    this.validDestinationTiles.push((tempY+1).toString() + (tempX).toString())            

                break;
            }

            this.validDestinationTiles.push((tempY+1).toString() + tempX.toString())
            tempY++;
        }
    }
    
    highlightAllDiagonallyTopLeft  = (tempY, tempX, srcY, srcX, localBoard)=>{
        while(tempY-1 > 0 && tempX-1 > 0){
            //some piece is present at this location, check if its opponent's piece or our own
            if( localBoard[this.matrixFormatToChessFormatString(tempY-1, tempX-1)] !== "assets/images/pieces/empty.png"){


                //if its opponenets piece then add it to the highkight list as move can be made here after eleminating it.
                if(this.ifOpponent(srcY, srcX, tempY-1, tempX-1, localBoard))
                    this.validDestinationTiles.push((tempY-1).toString() + (tempX-1).toString())            

                break;
            }
            this.validDestinationTiles.push((tempY-1).toString() + (tempX-1).toString())
            tempY--;tempX--;
        }
    }
    
    highlightAllDiagonallyTopRight  = (tempY, tempX, srcY, srcX, localBoard)=>{
        while(tempY-1 > 0 && tempX+1 < 9){

            //some piece is present at this location, check if its opponent's piece or our own
            if( localBoard[this.matrixFormatToChessFormatString(tempY-1, tempX+1)] !== "assets/images/pieces/empty.png"){


                //if its opponenets piece then add it to the highkight list as move can be made here after eleminating it.
                if(this.ifOpponent(srcY, srcX, tempY-1, tempX+1, localBoard))
                    this.validDestinationTiles.push((tempY-1).toString() + (tempX+1).toString())            

                break;
            }

            this.validDestinationTiles.push((tempY-1).toString() + (tempX+1).toString())
            tempY--;tempX++;
        }
    }

    highlightAllDiagonallyBottomLeft  = (tempY, tempX, srcY, srcX, localBoard)=>{
        while(tempY+1 < 9 && tempX-1 > 0){

            //some piece is present at this location, check if its opponent's piece or our own
            if( localBoard[this.matrixFormatToChessFormatString(tempY+1, tempX-1)] !== "assets/images/pieces/empty.png"){


                //if its opponenets piece then add it to the highkight list as move can be made here after eleminating it.
                if(this.ifOpponent(srcY, srcX, tempY+1, tempX-1, localBoard))
                    this.validDestinationTiles.push((tempY+1).toString() + (tempX-1).toString())            

                break;
            }

            this.validDestinationTiles.push((tempY+1).toString() + (tempX-1).toString())
            tempY++;tempX--;
        }
    }
    
    highlightAllDiagonallyBottomRight  = (tempY, tempX, srcY, srcX, localBoard)=>{
        while(tempY+1 < 9 && tempX+1 < 9){

            //some piece is present at this location, check if its opponent's piece or our own
            if( localBoard[this.matrixFormatToChessFormatString(tempY+1, tempX+1)] !== "assets/images/pieces/empty.png"){

                //if its opponenets piece then add it to the highkight list as move can be made here after eleminating it.
                if(this.ifOpponent(srcY, srcX, tempY+1, tempX+1, localBoard))
                    this.validDestinationTiles.push((tempY+1).toString() + (tempX+1).toString())            

                break;
            }

            this.validDestinationTiles.push((tempY+1).toString() + (tempX+1).toString())
            tempY++;tempX++;
        }
    }

    highlightValidDestinationTiles = (pieceName, pieceId, localBoard) => {
        console.log("highlightValidDestinations starts")
        this.validDestinationTiles = []
        if(localBoard[pieceId].includes('empty'))   return 
        //console.log(pieceName, pieceId)
        const piecePosY = parseInt(pieceId[0])  
        const piecePosX = pieceId[1].charCodeAt() - 96    // 1-indexed thatsy 96
        
        // console.log("getting basic valid moves of ", localBoard[pieceId])

        switch (pieceName) {
            case 'king': // can move one step in any direction

                //up-down left-right movements ===========================================

                if ( piecePosY-1 > 0 && (localBoard[this.matrixFormatToChessFormatString(piecePosY-1, piecePosX)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY-1, piecePosX, localBoard) ) )    
                    this.validDestinationTiles.push((piecePosY-1).toString() + piecePosX.toString())
                
                if ( piecePosY+1 < 9 && (localBoard[this.matrixFormatToChessFormatString(piecePosY+1, piecePosX)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY+1, piecePosX, localBoard) ) )    
                    this.validDestinationTiles.push((piecePosY+1).toString() + piecePosX.toString())
            
                if ( piecePosX-1 > 0 && (localBoard[this.matrixFormatToChessFormatString(piecePosY, piecePosX-1)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY, piecePosX-1, localBoard) ) )    
                    this.validDestinationTiles.push(piecePosY.toString() + (piecePosX-1).toString())
            
                if ( piecePosX+1 < 9 && (localBoard[this.matrixFormatToChessFormatString(piecePosY, piecePosX+1)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY, piecePosX+1, localBoard) ) )    
                    this.validDestinationTiles.push(piecePosY.toString() + (piecePosX+1).toString())
                
                //diagonnal movements below===================================================

                if ( piecePosY-1 > 0 && piecePosX-1 > 0 && (localBoard[this.matrixFormatToChessFormatString(piecePosY-1, piecePosX-1)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY-1, piecePosX-1, localBoard) ) )    
                    this.validDestinationTiles.push((piecePosY-1).toString() + (piecePosX-1).toString())
                
                if ( piecePosY+1 < 9 && piecePosX+1 < 9 && (localBoard[this.matrixFormatToChessFormatString(piecePosY+1, piecePosX+1)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY+1, piecePosX+1, localBoard) ) )    
                    this.validDestinationTiles.push((piecePosY+1).toString() + (piecePosX+1).toString())
            
                if ( piecePosY+1 < 9 && piecePosX-1 > 0 && (localBoard[this.matrixFormatToChessFormatString(piecePosY+1, piecePosX-1)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY+1, piecePosX-1, localBoard) ) )    
                    this.validDestinationTiles.push((piecePosY+1).toString() + (piecePosX-1).toString())
            
                if ( piecePosY-1 > 0 && piecePosX+1 < 9 && (localBoard[this.matrixFormatToChessFormatString(piecePosY-1, piecePosX+1)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY-1, piecePosX+1, localBoard) ) )    
                    this.validDestinationTiles.push((piecePosY-1).toString() + (piecePosX+1).toString())

                break;
                
            case 'queen':
                this.highlightAllLeft(piecePosY, piecePosX, piecePosY, piecePosX, localBoard)
                this.highlightAllRight(piecePosY, piecePosX, piecePosY, piecePosX, localBoard)
                this.highlightAllTop(piecePosY, piecePosX, piecePosY, piecePosX, localBoard)
                this.highlightAllBottom(piecePosY, piecePosX, piecePosY, piecePosX, localBoard)
                this.highlightAllDiagonallyTopLeft(piecePosY, piecePosX, piecePosY, piecePosX, localBoard)
                this.highlightAllDiagonallyTopRight(piecePosY, piecePosX, piecePosY, piecePosX, localBoard)
                this.highlightAllDiagonallyBottomLeft(piecePosY, piecePosX, piecePosY, piecePosX, localBoard)
                this.highlightAllDiagonallyBottomRight(piecePosY, piecePosX, piecePosY, piecePosX, localBoard)
                break;

            case 'rook':
                this.highlightAllLeft(piecePosY, piecePosX, piecePosY, piecePosX, localBoard)
                this.highlightAllRight(piecePosY, piecePosX, piecePosY, piecePosX, localBoard)
                this.highlightAllTop(piecePosY, piecePosX, piecePosY, piecePosX, localBoard)
                this.highlightAllBottom(piecePosY, piecePosX, piecePosY, piecePosX, localBoard)
                break;

            case 'bishop':
                this.highlightAllDiagonallyTopLeft(piecePosY, piecePosX, piecePosY, piecePosX, localBoard)
                this.highlightAllDiagonallyTopRight(piecePosY, piecePosX, piecePosY, piecePosX, localBoard)
                this.highlightAllDiagonallyBottomLeft(piecePosY, piecePosX, piecePosY, piecePosX, localBoard)
                this.highlightAllDiagonallyBottomRight(piecePosY, piecePosX, piecePosY, piecePosX, localBoard)
                break;

            case 'knight':
                //left-up
                if (piecePosX-2 > 0 && piecePosY-1 > 0 && (localBoard[this.matrixFormatToChessFormatString(piecePosY-1, piecePosX-2)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY-1, piecePosX-2, localBoard)) )    
                    this.validDestinationTiles.push((piecePosY-1).toString() + (piecePosX-2).toString())
                //left-down
                if (piecePosX-2 > 0 && piecePosY+1 < 9 && (localBoard[this.matrixFormatToChessFormatString(piecePosY+1, piecePosX-2)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY+1, piecePosX-2, localBoard) ))
                    this.validDestinationTiles.push((piecePosY+1).toString() + (piecePosX-2).toString())
                //right-up
                if (piecePosX+2 < 9 && piecePosY-1 > 0 && (localBoard[this.matrixFormatToChessFormatString(piecePosY-1, piecePosX+2)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY-1, piecePosX+2, localBoard) ))
                    this.validDestinationTiles.push((piecePosY-1).toString() + (piecePosX+2).toString())
                //left-down
                if (piecePosX+2 < 9 && piecePosY+1 < 9 && (localBoard[this.matrixFormatToChessFormatString(piecePosY+1, piecePosX+2)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY+1, piecePosX+2, localBoard) ))
                    this.validDestinationTiles.push((piecePosY+1).toString() + (piecePosX+2).toString())
                //up-left
                if (piecePosX-1 > 0 && piecePosY-2 > 0 && (localBoard[this.matrixFormatToChessFormatString(piecePosY-2, piecePosX-1)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY-2, piecePosX-1, localBoard) ))
                    this.validDestinationTiles.push((piecePosY-2).toString() + (piecePosX-1).toString())
                //up-right
                if (piecePosX+1 < 9 && piecePosY-2 > 0 && (localBoard[this.matrixFormatToChessFormatString(piecePosY-2, piecePosX+1)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY-2, piecePosX+1, localBoard) ))
                    this.validDestinationTiles.push((piecePosY-2).toString() + (piecePosX+1).toString())
                //down-left
                if (piecePosX-1 > 0 && piecePosY+2 < 9 && (localBoard[this.matrixFormatToChessFormatString(piecePosY+2, piecePosX-1)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY+2, piecePosX-1, localBoard) ))
                    this.validDestinationTiles.push((piecePosY+2).toString() + (piecePosX-1).toString())
                //down-right
                if (piecePosX+1 < 9 && piecePosY+2 < 9 && (localBoard[this.matrixFormatToChessFormatString(piecePosY+2, piecePosX+1)] === "assets/images/pieces/empty.png" || this.ifOpponent(piecePosY, piecePosX, piecePosY+2, piecePosX+1, localBoard) ))
                    this.validDestinationTiles.push((piecePosY+2).toString() + (piecePosX+1).toString())
                break;

            case 'pawn':
                //up-byOne
                if (piecePosY-1 > 0 && localBoard[this.matrixFormatToChessFormatString(piecePosY-1, piecePosX)] === "assets/images/pieces/empty.png"){
                    this.validDestinationTiles.push((piecePosY-1).toString() + (piecePosX).toString())

                    //up-byTwo
                    if (piecePosY-2 > 0 && localBoard[this.matrixFormatToChessFormatString(piecePosY-2, piecePosX)] === "assets/images/pieces/empty.png")
                    this.validDestinationTiles.push((piecePosY-2).toString() + (piecePosX).toString())
                }
                    
                
                //opponent at left-diagonal
                if(piecePosY-1 > 0 && piecePosX-1 > 0 && this.ifOpponent(piecePosY, piecePosX, piecePosY-1, piecePosX-1, localBoard))
                    this.validDestinationTiles.push((piecePosY-1).toString() + (piecePosX-1).toString())
                //opponent at right-diagonal
                if(piecePosY-1 > 0 && piecePosX+1 < 9 && this.ifOpponent(piecePosY, piecePosX, piecePosY-1, piecePosX+1, localBoard))
                    this.validDestinationTiles.push((piecePosY-1).toString() + (piecePosX+1).toString())
                break;

            default:
            console.log(' ');
        }

        console.log("highlightValidDestinations ends")
        return  this.validDestinationTiles
    } 

    invertBoard = (pieces) => {
        const haxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        const vaxis = ['1', '2', '3', '4', '5', '6', '7', '8']

            //row-wise inversion
        for (let i = 0; i < 4; i++) {
            let invertedVIndex = (8 - parseInt(vaxis[i]) + 1).toString();
            for (let j = 0; j < 8; j++) {
            let tempImgUrl = pieces[vaxis[i] + haxis[j]];
            pieces[vaxis[i] + haxis[j]] = pieces[invertedVIndex + haxis[j]];
            pieces[invertedVIndex + haxis[j]] = tempImgUrl;
            }
        }
        //column-wise inversion
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 4; j++) {
            let invertedHIndex = String.fromCharCode(96 + 8 - (haxis[j].charCodeAt() - 96) + 1);
            let tempImgUrl = pieces[vaxis[i] + invertedHIndex];
            pieces[vaxis[i] + invertedHIndex] = pieces[vaxis[i] + haxis[j]];
            pieces[vaxis[i] + haxis[j]] = tempImgUrl;
            }
        }

        return pieces
    }

    ifKingCanBeKilled = (tempBoard, targetColor) => {
        console.log("IfKingCanBeKilled starts")
        let king_will_be_killed = false
        const vAxis = ['1', '2', '3', '4', '5', '6', '7', '8']
        const hAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

        for(let i=0; i<8; i++){
            for(let j = 0; j<8; j++){

                //avoid checking tile having no piece on it
                if(tempBoard[vAxis[i] + hAxis[j]].includes('empty'))    continue

                const currentTileColor = tempBoard[vAxis[i] + hAxis[j]][tempBoard[vAxis[i] + hAxis[j]].length - 5]
                if(currentTileColor != targetColor){ //means this is an opponent piece
                    // check if its basic valid moves includes king of colrOfActualSelectedTile
                    const pieceId = vAxis[i]+hAxis[j]
                    const pieceImgUrl = tempBoard[pieceId]   //  assets/images/pieces/knightB.png
                    const pieceWithExtension = pieceImgUrl.split('/')[pieceImgUrl.split('/').length-1]    //knightB.png
                    const pieceName = pieceWithExtension.substr(0, pieceWithExtension.length-5)    //knight

                    this.highlightValidDestinationTiles(pieceName, pieceId, tempBoard)
                    
                    // check if validDestinationTiles have king of colrOfActualSelectedTile
                    this.validDestinationTiles.forEach((e) => {

                        const index = this.matrixFormatToChessFormatString(e[0], e[1])

                        // console.log(index, tempBoard[index])
                        // console.log(tempBoard)
                        if(tempBoard[index].includes(`king${targetColor}`)){ 
                            // console.log("Yes king wud have been killed")
                            king_will_be_killed = true
                        }
                    })
                }
                
            }
            if(king_will_be_killed) break
        }
        console.log("IfKingCanBeKilled ends")
        return king_will_be_killed
    }

    // removeMovesMakingKingDie = (move, pieceId, tempBoard) => {

    //     console.log("removeMoveMakesKingDie called for ", pieceId)
    //     const colrOfActualSelectedTile = tempBoard[pieceId][tempBoard[pieceId].length - 5]

    //     // let tempBoard = Object.assign({}, this.props.pieces)
    //     tempBoard[this.matrixFormatToChessFormatString(move[0], move[1])] = tempBoard[pieceId]
    //     tempBoard[pieceId] = "assets/images/pieces/empty.png"
    //     return this.ifKingCanBeKilled(tempBoard, colrOfActualSelectedTile)

        
    // }

    legalMoves = (pieceId, tempBoard) => {
        console.log("legalMoves starts")
        let movesToRemove = []
        const tempValidTiles = Object.assign([], this.validDestinationTiles)
        const ownColor = tempBoard[pieceId][tempBoard[pieceId].length - 5]
        // let tempBoard = Object.assign({}, this.props.pieces)

        tempValidTiles.forEach(move => {
            let localBoard = Object.assign({}, tempBoard)
            localBoard[this.matrixFormatToChessFormatString(move[0], move[1])] = localBoard[pieceId]
            localBoard[pieceId] = "assets/images/pieces/empty.png"
            let invertedBoard = this.invertBoard(localBoard)
            if( this.ifKingCanBeKilled(invertedBoard, ownColor))
                movesToRemove.push(move)
        })

        // console.log(movesToRemove)
        //remove all the invalid moves from the this.validDestinationTiles
        let safeValidDestination = []
        for(let i=0; i<tempValidTiles.length; i++){
            let toRemove = false
            for(let  j=0; j<movesToRemove.length; j++)
                if(tempValidTiles[i] === movesToRemove[j])  toRemove = true
            
            if(!toRemove)   safeValidDestination.push(tempValidTiles[i])
        }

        console.log("legalMoves ends")
        this.validDestinationTiles = safeValidDestination      
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

            let localBoard = Object.assign({}, this.props.pieces)
            this.highlightValidDestinationTiles(pieceName, pieceId, localBoard)
            

            // cant move anywhere from this piece
            if(this.validDestinationTiles.length == 0)  return

            //now remove all those moves that can land the king into dead zone
            //if there remains no move after this filter than its a CHECK-MATE       

            this.legalMoves(pieceId, localBoard)

            // there is no move from current piece that do not make the king killed by the opponent on his turn
            if(this.validDestinationTiles.length == 0){
                this.setState({sourceTileId: null, pieceSelected: false})
                return
            }

            this.setState({sourceTileId: pieceId, pieceSelected: true})

            //include the current piece also as dest, as the same can be clicked by player to cancel the move from this piece
            this.validDestinationTiles.push([pieceId[0], (pieceId[1].charCodeAt() - 96).toString()])

            
            
            this.validDestinationTiles.forEach((e)=>{
                //convert the i,j indexes in the returned list as per 1a, 2b format
                const chessIndY = e[0]
                const chessIndX = String.fromCharCode(96 + parseInt(e[1]))

                //this is the way to update objects 
                this.setState(prevState => {
                    // the tileHighlightFlag object tells which object needs to be highlighted
                    let tilesHighlightFlag = { ...prevState.tilesHighlightFlag };  
                    tilesHighlightFlag[chessIndY+chessIndX] = true
                    return { tilesHighlightFlag }; 
                  })
                
            })

        }

        // what if the pieceSelected is true, means now we have selected the destination tile, to where the move is to be made
            //validate the move and send the ids back to App.js iff valid else give a warning and revert back to normal board
        else{
            const sourceTileId = this.state.sourceTileId
            let tempValidTiles = Object.assign([], this.validDestinationTiles)

            //you click on the same selected tile, so get back to normal
            if(this.state.sourceTileId === pieceId){
                
                // console.log("clicked same tile")
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
                
                this.setState({sourceTileId: null, pieceSelected: false})
                
                const ownColor = this.props.pieces[sourceTileId][this.props.pieces[sourceTileId].length - 5]
                let tempBoard = Object.assign({}, this.props.pieces)
                tempBoard[pieceId] = tempBoard[sourceTileId]
                tempBoard[sourceTileId] = "assets/images/pieces/empty.png"

                const colorToTarget = (ownColor === 'B') ? 'W' : "B"
                let checked = false
                let checkmated = false

                if(this.ifKingCanBeKilled(tempBoard, colorToTarget)){
                    checked  = true
                    console.log("CHECKED")
                    checkmated = true

                    //check if checkmated, i.e no legal move of the opponent after your move
                    let invertedBoard = Object.assign({}, tempBoard)
                    invertedBoard = this.invertBoard(invertedBoard)

                    const vAxis = ['1', '2', '3', '4', '5', '6', '7', '8']
                    const hAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

                    for(let i=0; i<8; i++){
                        for(let j=0; j<8; j++){

                            const pieceId = vAxis[i]+hAxis[j]
                            const pieceImgUrl = invertedBoard[pieceId]   //  assets/images/pieces/knightB.png
                            const pieceWithExtension = pieceImgUrl.split('/')[pieceImgUrl.split('/').length-1]    //knightB.png
                            const pieceName = pieceWithExtension.substr(0, pieceWithExtension.length-5)    //knight
                            const pieceColor = pieceImgUrl[pieceImgUrl.length-5]
                            
                            if(pieceColor === colorToTarget){
                                this.highlightValidDestinationTiles(pieceName, pieceId, invertedBoard)
                                this.legalMoves(pieceId, invertedBoard)
                                if(this.validDestinationTiles.length > 0){
                                    console.log(pieceId, ": legal moves: ", this.validDestinationTiles.length)
                                    checkmated = false
                                    break;
                                }
                                    
                            }
                        }
                        if(!checkmated) break
                    }
                }
                    
                if(checkmated)
                    console.log("checkmated!")

                let checkedColor = null
                let checkmatedColor = null
                if(checked) checkedColor = (colorToTarget === 'W') ? "white" : "black"
                if(checkmated) checkmatedColor = (colorToTarget === 'W') ? "white" : "black"

                tempValidTiles.forEach((e)=>{
                    //convert the i,j indexes in the returned list as per 1a, 2b format
                    const chessIndY = e[0]
                    const chessIndX = String.fromCharCode(96 + parseInt(e[1]))
                    
                    // console.log(chessIndY+chessIndX, pieceId)
                    if(pieceId === chessIndY+chessIndX){
                        console.log("move made")
                        this.props.validMoveMade(sourceTileId, pieceId, checkedColor, checkmatedColor)
                        return 
                    }
                })

            }

            // make every highlight off
            tempValidTiles.forEach((e)=>{
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

            //check if the current move made is CHECK or not
            
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
            <div >
                <div id="board" className="container my-3">
                    {board}
                </div>
            </div>
            
        )
    }
}
export default Board
