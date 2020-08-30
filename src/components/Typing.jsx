import React, { Component } from 'react';
import TextDisplay from './Display/TextDisplay';
import { LETTERSTATUS } from './Enums.ts';
import ScoreScreen from './Display/ScoreScreen';

class Typing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTextRaw: "How has your day been going?",
            currentText: {
                letters: [
                ]
            },
            wordCount: 0,
            currentIndex: 0,
            startTime: 0,
            endTime: 0,
            hasFinished: false
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleOnKeyDown, false);
        this.convertRawToCurrentText();
    }

    convertRawToCurrentText = () => {
        let newLetters = []
        this.state.currentTextRaw.split('').forEach(c => {
            let newLetter = {
                letter: c,
                status: LETTERSTATUS.Active
            }
            newLetters.push(newLetter);
        });
        this.setState({
            currentText: {
                letters: newLetters
            }
        });
    }

    updateStatusAtIndex = (index, status) => {
        let items = [...this.state.currentText.letters];
        // 2. Make a shallow copy of the item you want to mutate
        let item = { ...items[index] };
        // 3. Replace the property you're intested in
        item.status = status;
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        items[index] = item;
        // 5. Set the state to our new copy
        this.setState({
            currentText: {
                letters: items
            }
        });
    }

    handleOnKeyDown = (event) => {
        if (this.state.hasFinished) {
            return;
        }
        if (this.state.startTime === 0) {
            this.setState({ startTime: performance.now() });
        }

        let key = event.key;
        let keyCode = event.keyCode;
        let index = this.state.currentIndex;
        let text = this.state.currentTextRaw;
        let wordCount = this.state.wordCount;

        if (keyCode === 8 && index > 0) {
            index--;
            if (keyCode === 32) {
                wordCount--;
            }
            this.updateStatusAtIndex(index, LETTERSTATUS.Active);
        }
        else {
            if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 186 && keyCode <= 192) || keyCode === 32) {
                //Correct Key
                if (key === text.charAt(index)) {
                    if (keyCode === 32) {
                        wordCount++;
                    }
                    this.updateStatusAtIndex(index, LETTERSTATUS.Correct);
                }
                //Incorrect Key
                else {
                    this.updateStatusAtIndex(index, LETTERSTATUS.Incorrect);
                }
                index++;
            }
        }
        if (index >= text.length) {
            wordCount++;
            let incorrect = this.calcIncorrectCharacters();
            this.setState({
                endTime: performance.now(),
                incorrectCharacters: incorrect,
                wordCount: wordCount
            }, () => { this.setState({ hasFinished: true }) });
        }
        this.setState({
            currentIndex: index,
            wordCount: wordCount
        });
    }

    retry = () => {
        this.reset();
        return false;
    }

    calcIncorrectCharacters = () => {
        let count = 0;
        this.state.currentText.letters.forEach(l => {
            if (l.status === LETTERSTATUS.Incorrect) {
                count++;
            }
        });
        return count;
    }

    reset = () => {
        //Pick A new Sentence
        let newSentence = "Hahahaha";
        this.setState({
            currentTextRaw: newSentence,
            startTime: 0,
            endTime: 0,
            wordCount: 0,
            currentIndex: 0,
            hasFinished: false
        }, () => this.convertRawToCurrentText());
    }

    render() {
        return (
            <React.Fragment>
                <main className="container-fluid h-100">
                    <div id="text-display-row" className="row bg-secondary h-100">
                        <div className="container text-center">
                            <div id="text-container" className="container">
                                <TextDisplay
                                    displayText={this.state.currentText.letters}
                                    index={this.state.currentIndex}
                                />
                                <ScoreScreen
                                    wordsTyped={this.state.wordCount}
                                    elapsedTime={this.state.endTime - this.state.startTime}
                                    incorrectCharacters={this.state.incorrectCharacters}
                                    totalCharacters={this.state.currentTextRaw.length}
                                    show={this.state.hasFinished}
                                    retry={this.retry}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default Typing;