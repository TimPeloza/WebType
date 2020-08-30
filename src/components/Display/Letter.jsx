import React, { Component } from 'react';
import { LETTERSTATUS } from '../Enums.ts';

class Letter extends Component {

    determineClass = () => {
        let status = this.props.status;
        switch (status) {
            case LETTERSTATUS.Correct:
                return "character correct-character"
            case LETTERSTATUS.Incorrect:
                return "character incorrect-character"
            default:
                return "character active-character"
        }
    }

    render() {
        if (this.props.letter === " ") {
            return (
                <span className={this.determineClass()}>&nbsp;</span>
            );
        }
        return (
            <span className={this.determineClass()}>{this.props.letter}</span>
        );
    }
}

export default Letter;