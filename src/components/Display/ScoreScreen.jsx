import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

class ScoreScreen extends Component {

    calcWPM = (words, time) => {
        let mins = ((time / 1000) / 60) % 60;
        let value = (words / mins).toFixed(0);
        return value;
    }

    calcAccuracy = (incorrectCharacters, totalCharacters) => {
        let value = (((totalCharacters - incorrectCharacters) / totalCharacters) * 100).toFixed(2);
        return value + "%";
    }

    formatTime = (time) => {
        let formattedTime = "";
        let sec = Math.round((time / 1000) % 60);
        let min = Math.floor((time / 1000) / 60) % 60;
        if (min < 10) {
            formattedTime += "0" + min;
        }
        else {
            formattedTime += "" + min;
        }
        formattedTime += ":";
        if (sec < 10) {
            formattedTime += "0" + sec;
        }
        else {
            formattedTime += "" + sec;
        }
        return formattedTime;
    }

    render() {
        let words = this.props.wordsTyped;
        let time = this.props.elapsedTime;
        let incorrectCharacters = this.props.incorrectCharacters;
        let totalCharacters = this.props.totalCharacters;

        let wpm = this.calcWPM(words, time);
        let accuracy = this.calcAccuracy(incorrectCharacters, totalCharacters);
        let formattedTime = this.formatTime(time);

        return (
            <Modal show={this.props.show}>
                <Modal.Body>
                    <Row style={{ paddingTop: "5px", paddingBottom: "5px", justifyContent: "center" }}>
                        <div style={{ fontWeight: "bold", fontSize: "40px" }}>{formattedTime}</div>
                    </Row>
                    <Row style={{ paddingTop: "5px", paddingBottom: "5px", justifyContent: "center" }}>
                        <div>{wpm} WPM</div>
                    </Row>
                    <Row style={{ paddingTop: "5px", paddingBottom: "5px", justifyContent: "center" }}>
                        <div >{accuracy}</div>
                    </Row>
                    <Row style={{ paddingTop: "20px", paddingBottom: "5px", justifyContent: "center" }}>
                        <Button onClick={this.props.retry}>Retry</Button>
                    </Row>
                </Modal.Body>
            </Modal >
        );
    }
}

export default ScoreScreen;