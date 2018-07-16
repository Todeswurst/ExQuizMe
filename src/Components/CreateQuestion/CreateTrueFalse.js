import React from "react";
import { FormControl, ControlLabel, FormGroup, Radio} from "react-bootstrap";

export default class CreateTrueFalse extends React.Component {
  constructor(){
    super();

    this.state = {
      question: false,
      answers: [],
      explanation: false
		}
  }

  componentWillMount(){
    this.props.reset();
  }
 
  render() {
    return (
      <div>
        <h1>True or False</h1>
        <FormGroup controlId="formControlsQuestionText" validationState={this.props.questionValidation}>
          <ControlLabel>Question</ControlLabel>
          <FormControl componentClass="textarea" placeholder="Please type in your question..." onChange={this.props.question} />
          <FormControl.Feedback/> 
          </FormGroup>
          <FormGroup controlId="formControlsRadio" onChange={this.props.answer} validationState={this.props.answerValidation}>
          <ControlLabel>Correctness</ControlLabel>{' '}
          <Radio name="radioGroup" inline>
          True
          </Radio>{' '}
          <Radio name="radioGroup" inline>
          False
          </Radio>
          </FormGroup>
          
          <FormGroup controlId="formControlsExplanation" validationState={this.props.explanationValidation}>
          <ControlLabel>Explanation</ControlLabel>
          <FormControl componentClass="textarea" placeholder="Please provide a decent explanation for you Question. In order to teach the player the right answers." onChange={this.props.explanation}/>
          <FormControl.Feedback/>
          </FormGroup>
      </div>
    );
  }
}