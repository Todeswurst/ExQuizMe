import React from "react";
import { Navbar } from 'react-bootstrap';

export default class PseudoNav extends React.Component {
 
 
	render() {
		return (
			<div>
				<Navbar inverse>
					<Navbar.Header>
						<Navbar.Text>
							ExQuizMe
						</Navbar.Text>
					</Navbar.Header>
				</Navbar>
			</div>
		);
	}
}