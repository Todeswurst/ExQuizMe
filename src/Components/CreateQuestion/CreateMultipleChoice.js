import React from "react";
import { FormControl, ControlLabel, FormGroup } from "react-bootstrap";
import FieldGroup from './FieldGroup';

export default class CreateMultipleChoice extends React.Component {
  constructor(){
    super();

    this.state = {
      answers: {
        1: {
          text: "",
          correctness: false
        },
        2: {
          text: "",
          correctness: false
        },
        3: {
          text: "",
          correctness: false
        },
        4: {
          text: "",
          correctness: false
        }
      },
      correctnessSet: 1
    }
    
    this.collector = this.collector.bind(this);
  }

  componentWillMount(){
    this.props.reset();
  }

  render() {
    return (
      <div>
			<h1>Multiple Choice</h1>
			<FormGroup controlId="formControlsTextarea" validationState={this.props.questionValidation}>
			  <ControlLabel>Question</ControlLabel>
			  <FormControl componentClass="textarea" placeholder="Please type in your question..." onChange={this.props.question} />
			  <FormControl.Feedback/> 
			</FormGroup>
			<FieldGroup
				id="formControlsText"
				type="text"
				label="First answer option"
				placeholder="Could be correct or wrong"
				questionType="multiplechoice"
				answerID = "1"
				collector={this.collector}
				answerValidation={this.props.answerValidation} 
			/>
			<FieldGroup
				id="formControlsText"
				type="text"
				label="Second answer option"
				placeholder="Could be correct or wrong"
				questionType="multiplechoice"
				answerID = "2"
				collector={this.collector}
				answerValidation={this.props.answerValidation} 
			/>
			<FieldGroup
				id="formControlsText"
				type="text"
				label="Third answer option"
				placeholder="Could be correct or wrong"
				questionType="multiplechoice"
				answerID = "3"
				collector={this.collector}
				answerValidation={this.props.answerValidation} 
			/>
			<FieldGroup
				id="formControlsText"
				type="text"
				label="Fourth answer option"
				placeholder="Could be correct or wrong"
				questionType="multiplechoice"
				answerID = "4"
				collector={this.collector}
				answerValidation={this.props.answerValidation} 
			/>
			<FormGroup controlId="formControlsTextarea" validationState={this.props.explanationValidation}>
			  <ControlLabel>Explanation</ControlLabel>
			  <FormControl componentClass="textarea" placeholder="Please provide a decent explanation for you Question. In order to teach the player the right answers." onChange={this.props.explanation} />
			  <FormControl.Feedback/> 
			</FormGroup>
      </div>
    );
  }

  collector(e){
    const text = e.target.value;
    if(text === "on"){
      const buttonID = e.target.id;
      this.state.answers[buttonID].correctness = true;
      this.state.answers[this.state.correctnessSet].correctness = buttonID !== this.state.correctnessSet ? false : true;
      this.setState({correctnessSet: buttonID})
    } else {
      const textField = e.target.name;
      this.state.answers[textField].text = text;
    }
    this.props.answer(this.state.answers);
  }
}