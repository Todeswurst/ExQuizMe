import React from "react";
import { ControlLabel, FormGroup, HelpBlock, FormControl, Grid, Row, Col} from "react-bootstrap";
import Correctness from './Correctness';

export default class FieldGroup extends React.Component {

    render(){
        return (
			<Grid>
				<Row>
					<FormGroup controlId={this.props.id} validationState={this.props.answerValidation}>
						<ControlLabel>{this.props.label}</ControlLabel>
						<Row>
						<Col xs={9} sm={10} lg={11}>
						<FormControl name={this.props.answerID} componentClass={this.props.text} placeholder={this.props.placeholder} onChange={this.props.collector}/>
						{this.props.help && <HelpBlock>{this.props.help}</HelpBlock>}
						</Col>
						<Col xs={3} sm={2} lg={1}>
							<FormGroup validationState={this.props.answerValidation}>
								<Correctness questionType={this.props.questionType} collector={this.props.collector} answerID={this.props.answerID}/>
							</FormGroup>
						</Col>
						</Row>
					</FormGroup>
				</Row>
			</Grid>
        );
    }
}