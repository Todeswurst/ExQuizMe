import React from "react";
import {Radio, Checkbox, FormGroup, Row, Col} from "react-bootstrap";

export default class Correctness extends React.Component {
    constructor(){
        super();

        this.renderMultipleAnswer = this.renderMultipleAnswer.bind(this);
        this.renderMultipleChoice = this.renderMultipleChoice.bind(this);
    }

    render(){
        switch(this.props.questionType){
            case "multipleanswer":
                return this.renderMultipleAnswer();
            case "multiplechoice":
                return this.renderMultipleChoice(); 
            default:
                console.log("Unknown question type.");
        }
    }

    renderMultipleAnswer(){
        return (
            <FormGroup>
            <Row>
            <Col>
            <Checkbox name="radioGroup" onChange={this.props.collector} id={this.props.answerID}>
            Correct
            </Checkbox>
            </Col>
            </Row>
            </FormGroup>
        );
    }

    renderMultipleChoice(){
        return (
            <FormGroup>
            <Row>
            <Col>
            <Radio name="checkbox" onChange={this.props.collector} id={this.props.answerID}>
            Correct
            </Radio>
            </Col>
            </Row>
            </FormGroup>
        );
    }
}