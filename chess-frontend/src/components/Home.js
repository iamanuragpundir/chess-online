import React, { Component } from 'react'
import Board from './Board';
import Navbar from './Navbar';

export default function Home(props){
    return (
        <div>
            <Navbar />
            <Board pieces={props.pieces}/>
        </div>
    )
}
