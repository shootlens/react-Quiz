import React, {component}  from 'react';
import { QuizData } from './QuizData'
import './styles.css'

export class Quiz extends component {


    constructor(props) {
        super(props)

        this.state = {
            userAnswer: null,
            currentIndex:0,
            options: [],
            quizEnd: false,
            score: 0,
            disabled: true 
        }
    }



    loadQuiz = () => {
        const {currentIndex} = this.state;
        this.setState(() => {
            return{
                question: QuizData[currentIndex].question,
                options: QuizData[currentIndex].options,
                answer: QuizData[currentIndex].answer
            }
        })

    }

    nextQuestionHandler = () => {
        const {userAnswer, answer, score} = this.state
        this.setState({
            currentIndex: this.state.currentIndex + 1
        })
    
        if(userAnswer === answer){
            this.setState({
                score: score + 1
            })
        }
    }

    componentDidMount(){
        this.loadQuiz ();
    }

    checkAnswer = answer => {
        this.setState({
            userAnswer: answer,
            disabled: false
        })
    }

    componentDidUpdate(prevProps, prevState){
        const{currentIndex} = this.state;
        if(this.state.currentIndex !== prevState.currentIndex){
            this.setState(() => {
                return {
                    disabled: true,
                    question: QuizData[currentIndex].question,
                    options : QuizData[currentIndex].options,
                    answer: QuizData[currentIndex].answer          
                }
            });
    
        }
    }
    finishHandler =() =>{
        if(this.state.currentIndex === QuizData.length -1){
            this.setState({
                quizEnd:true
            })
        }
    }
    render() {
        const{question, options, currentIndex, userAnswer, quizEnd} = this.state

        if(quizEnd) {
            return (
                <div>
                    <h1>Excellent.. Final score is {this.state.score}points</h1>
                    <p>The Correct Answer for Quiz are</p>
                    <ul>
                        {QuizData.map((item, index) => (
                            <li className= 'options'
                            key={index}>
                                {item.answer}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return (
            <div>
                <h2>{question}</h2>
                <span>{'Question ${currentIndex +1} of ${QuizData.length}'}</span>
                {
                    options.map(option =>
                        <p key = {option.Id}  className = {'options ${userAnswer === option? "selected" : null}'}
                        onClick = {() => this.checkAnswer(option)}
                        >
                            {option}
                        </p>
                    )
                }

                {currentIndex === QuizData.length-1 &&
                <button disabled = {this.state.disabled} onClick={this.nextQuestionHandler}>
                    Next Question
                </button>}
                {currentIndex === QuizData.length-1 &&
                <button onClick={this.finishHandler}
                disabled = {this.state.disabled}>
                    Finish
                </button>}


            </div>
        )
    }
}

export default Quiz
