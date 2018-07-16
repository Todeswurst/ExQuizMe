import React from "react";
import { Glyphicon } from "react-bootstrap";
import { Grid, Row, Col } from 'react-bootstrap';

export default class Footer extends React.Component {
 
 
  render() {
    return (
	<Grid>
		<Row>
			<br />
			<br />
		</Row>
		<Row>
			<Col xs={3} sm={5} md={5} />
			<Col xs={7} sm={3} md={2}>
				<h4><Glyphicon glyph="copyright-mark" /> Futurebook</h4>
			</Col>
			<Col xs={2} sm={4} md={5}>
			</Col>
		
		</Row>
	</Grid>
    );
  }
}