import React, {Component} from 'react';
import Question from './question/Question';
import Answer from './answer/Answer';
import './QuizMain.css';
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";  
import {Button,ButtonToolbar} from 'react-bootstrap';
import {Modal,Row,Col,Form} from 'react-bootstrap';
import validator from 'validator';
import Input from 'react-validation/build/input';

export default class Quiz extends Component {

    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
      }
    

    
    // initiating the local state
    state = {
        quiestions: {
            1: 'Which programming language is called a descriptive language?',
            2: 'What is not a javascript framework?',
            3: 'What is the inner join?' 
        },
        answers: {
            1: {
                1: 'C#',
                2: 'Javascript',
                3: 'html'
            },
            2: {
                1: '.net',
                2: 'React',
                3: 'Angular'
            },
            3: {
                1: 'AUB',
                2: 'A∩B',
                3: 'A/B'
            }
          
        },
        correctAnswers: {
            1: '3',
            2: '1',
            3: '2',
       
        },
        correctAnswer: 0,
        clickedAnswer: 0,
        step: 1,
        score: 0,
        questinscount :3,
        show:false,
        fields: {},
        errors: {}
     
    }


    showModal = e => {
        this.setState({
          show: true
        });
      };
      hideModal = e => {
        this.setState({
          show: false
        });
      };
    

    // the method that checks the correct answer
    checkAnswer = answer => {
        const { correctAnswers, step, score } = this.state;
        if(answer === correctAnswers[step]){
            this.setState({
                score: score + 1,
                correctAnswer: correctAnswers[step],
                clickedAnswer: answer
            });
        }else{
            this.setState({
                correctAnswer: 0,
                clickedAnswer: answer
            });
        }
    }





    // method to move to the next question
    nextStep = (step) => {
        this.setState({
            step: step + 1,
            correctAnswer: 0,
            clickedAnswer: 0
        });
    }
    onSubmit(e) {
        e.preventDefault();
        var addQuestionValue = this.addQuestionValue;
        var answear1Value = this.answear1Value;
        var answear2Value = this.answear2Value;
        var answear3Value = this.answear3Value;
        var correctAnswearValue = this.correctAnswearValue;
        this.state.questinscount+=1;
        this.setState({
            quiestions: {
               ...this.state.quiestions,
               [this.state.questinscount]: addQuestionValue.value
            }
          });

          this.setState({
            answers : {
               ...this.state.answers,
               [this.state.questinscount]:  {
                1: answear1Value.value,
                2: answear2Value.value,
                3: answear3Value.value
            },
            }
          });

          this.setState({
            correctAnswers : {
               ...this.state.correctAnswers,
               [this.state.questinscount]: correctAnswearValue.value
            }
          });
          console.log('Az answear hossza : ' + this.state.answers.length);
          console.log(this.state.quiestions)
          this.hideModal();
          alert("Question Added ! ")
    }

    

    render(){
        let { quiestions, answers, correctAnswer, clickedAnswer, step, score } = this.state;
        return( 
            <div className="Content">
                {step <= Object.keys(quiestions).length ? 
                    (<>
                        <Question
                            question={quiestions[step]}
                        />
                        <Answer
                            answer={answers[step]}
                            step={step}
                            checkAnswer={this.checkAnswer}
                            correctAnswer={correctAnswer}
                            clickedAnswer={clickedAnswer}
                        />
                           <h5>Click the correct answear, or if you want to add a question, press the button.  </h5>
                        <button type="button" onClick={this.showModal} className="btn btn-primary">Add Question</button>
                    

                        <Modal show={this.state.show} >
                            <Modal.Header closeButton onClick={this.hideModal}>
                            <Modal.Title>Add a question for the quizz !</Modal.Title>
                            </Modal.Header>
                            <Modal.Body> 
                                <Form className="form-horizontal"  >
                             <Form.Control type="text" className="form-control" ref={(c) => this.addQuestionValue = c} name="addQuestionValue" placeholder='Question description: ' />    <br/>    
                            <input type="text" className="form-control" ref={(c) => this.answear1Value = c} name="answear1Value" placeholder='First answear : ' />    <br/>    
                            <input type="text" className="form-control" ref={(c) => this.answear2Value = c} name="answear2Value" placeholder='Second answear :  ' />    <br/>    
                            <input type="text" className="form-control" ref={(c) => this.answear3Value = c} name="answear3Value" placeholder='Third answear :' />   <br/>    
                              <input type="text" className="form-control" ref={(c) => this.correctAnswearValue = c} name="correctAnswearValue" placeholder='Give me the Correct Answear number ' />   
                        </Form>
                        </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={this.hideModal} >
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.onSubmit} >
                                Save Changes
                            </Button>
                            </Modal.Footer>
                     </Modal>

                        <button
                        className="NextStep"
                        disabled={
                            clickedAnswer && Object.keys(quiestions).length >= step
                            ? false : true
                        }
                        onClick={() => this.nextStep(step)}>Next</button>
                    </>) : (
                        <div className="finalPage">
                            <h1>You have completed the quiz!</h1>
                            <p>Your score is: {score} of {Object.keys(quiestions).length}</p>
                            <p>Thank you!</p>

                        </div>
                   
                    )
                 
                }
               


            </div>
        );
 
         }
}
