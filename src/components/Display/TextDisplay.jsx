import React, { Component } from 'react';
import Letter from './Letter';
import { LETTERSTATUS } from '../Enums.ts';

class TextDisplay extends Component {

    determineText = () => {
        let newText = [];
        let currentIndex = this.props.index;
        let lowBound = currentIndex - 15;
        let highBound = currentIndex + 15;
        for (let i = lowBound; i < highBound; i++) {
            if (i < 0 || i >= this.props.displayText.length) {
                newText.push(<Letter key={i} letter="&nbsp;" status={LETTERSTATUS.Active} />);
            }
            else {
                let cLetter = this.props.displayText[i].letter;
                let cStatus = this.props.displayText[i].status;
                newText.push(<Letter key={i} letter={cLetter} status={cStatus} />);
            }
        }
        return newText;
    }

    render() {
        return (
            <React.Fragment>
                <div id="text">{this.determineText()}</div>
                <div className="pointer">^</div>
            </React.Fragment>
        );
    }
}

export default TextDisplay;
