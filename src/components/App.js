import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navbar, Image } from 'react-bootstrap';

import Chat from './ro/Chat';
import * as actions from '../actions';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { isChatHidden: true, chatClicked: false };

		this.chatVisibilityHandler = this.chatVisibilityHandler.bind(this);
	}

	componentDidMount() {
		this.props.initialMessages();
	}

	chatVisibilityHandler() {
		this.setState({
			isChatHidden: !this.state.isChatHidden,
			chatClicked: true,
		});
	}

	render() {
		const imageSrc = '/ro-avatar.png';
		const chat = this.state.isChatHidden ? (
			<div className='mini'>
				{this.state.chatClicked ? null : (
					<a
						href='#'
						className='presentation-text'
						onClick={() => this.chatVisibilityHandler()}>
						<div className='message-sent message'>
							<div className='conversation-message'>
								HOLA, SOY RO, ¿NECESITAS AYUDA?
							</div>
						</div>
					</a>
				)}

				<a href='#' onClick={() => this.chatVisibilityHandler()}>
					<Image fluid src={window.location.origin + imageSrc} alt={imageSrc} />
				</a>
			</div>
		) : (
			<Chat chatVisibilityHandler={this.chatVisibilityHandler}></Chat>
		);

		return (
			<div className='App'>
				<header className='App-header'></header>
				<Navbar className='header-container' sticky='top' variant='dark'>
					<Navbar.Brand>Ro The Bot</Navbar.Brand>
				</Navbar>
				{chat}
			</div>
		);
	}
}

App.propTypes = {
	bot: PropTypes.object,
};

const mapStateToProps = (state) => {
	return { bot: state.messages };
};

export default connect(mapStateToProps, actions)(App);
