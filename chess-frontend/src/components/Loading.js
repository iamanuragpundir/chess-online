import React, { Component } from 'react'

export class Loading extends Component {
    render() {
        return (
            <button class="btn btn-primary" type="button" disabled>
                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Loading...
            </button>
        )
    }
}

export default Loading
