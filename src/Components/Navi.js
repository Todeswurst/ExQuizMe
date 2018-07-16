import React from "react";
import { Link } from "react-router-dom";
import { Glyphicon, Navbar, Nav, NavItem } from 'react-bootstrap';

export default class Navi extends React.Component {
 
 
	render() {
		const homeLink = `/${this.props.match.params.id}`;
		return (
			<div>
				<Navbar inverse collapseOnSelect>
				<Navbar.Toggle />
					<Navbar.Header>
						<Navbar.Text>
							ExQuizMe
						</Navbar.Text>
					</Navbar.Header>
					<Navbar.Collapse>
					<Nav>
						<NavItem componentClass={Link} eventKey={1} href={homeLink} to={homeLink}>
							<Glyphicon glyph="home" />
						</NavItem>
					</Nav>
					<Nav pullRight>
						<NavItem componentClass={Link} eventKey={1} href="/" to="/">
							<Glyphicon glyph="inbox" /> Create a new Quiz
						</NavItem>
					</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}