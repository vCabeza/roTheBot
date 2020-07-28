import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navbar, Image, Button, Form, Col, Dropdown } from 'react-bootstrap';
import { FaWindowMinimize, FaBars, FaPaperPlane } from 'react-icons/fa';

import ChatCard from './ChatCard';
import * as actions from '../../actions';

class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = { message: '' };
	}

	componentDidMount() {
		this.scrollToBottom();
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}

	scrollToBottom = () => {
		this.messagesEnd.scrollIntoView();
	};

	onChangeHandler = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		this.setState({
			[name]: value,
		});
	};

	sendMessage = (e, message) => {
		if (message !== '') {
			this.props.sendMessage(message);
		}

		this.setState({
			message: '',
		});

		e.preventDefault();
	};

	render() {
		const imageSrc = '/ro-avatar.png';
		const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
			<a
				className='white'
				href=''
				ref={ref}
				onClick={(e) => {
					e.preventDefault();
					onClick(e);
				}}>
				{children}
			</a>
		));

		return (
			<div className='chat-container'>
				<Navbar className='header-container' sticky='top' variant='dark'>
					<Navbar.Brand
						onClick={() => this.props.chatVisibilityHandler()}
						href='#'>
						<FaWindowMinimize className='align-bottom' />
					</Navbar.Brand>
					<Navbar.Brand>
						<Image
							className='header-image'
							fluid
							src={process.env.PUBLIC_URL + imageSrc}
							alt={imageSrc}
						/>{' '}
						<label className='align-bottom'>Ro</label>
					</Navbar.Brand>
					<Navbar.Collapse className='justify-content-end'>
						<Dropdown alignRight={true}>
							<Dropdown.Toggle as={CustomToggle}>
								<FaBars style={{ height: '2em', width: '2em' }} />,
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item onClick={() => this.props.cleanChat()}>
									Limpiar conversación
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Navbar.Collapse>
				</Navbar>
				<div className='messages-container'>
					{this.props.bot.messages.map((message, index) =>
						message.isCard ? (
							<ChatCard key={index} cardList={message.cardList}></ChatCard>
						) : (
							<div
								key={index}
								className={
									message.sender
										? 'message-sent message'
										: 'message-recived message'
								}>
								<div className='conversation-message'>{message.text}</div>
							</div>
						)
					)}

					<div
						style={{ float: 'left', clear: 'both' }}
						ref={(el) => {
							this.messagesEnd = el;
						}}></div>
				</div>
				<div className='footer-container'>
					<div className='recomendations-container'>
						<Button
							className='yellow-button'
							variant='outline-primary'
							onClick={(e) => this.sendMessage(e, 'Hola')}>
							{' '}
							Hola
						</Button>
						<Button
							className='yellow-button'
							variant='outline-primary'
							onClick={(e) => this.sendMessage(e, 'Noticias')}>
							{' '}
							Noticias
						</Button>
					</div>
					<Form onSubmit={(e) => this.sendMessage(e, this.state.message)}>
						<Form.Row>
							<Col style={{ padding: '0px 0px 0px 5px' }} xs='10'>
								<Form.Control
									className='form-input'
									type='text'
									placeholder='Escribe un mensaje...'
									name='message'
									value={this.state.message}
									onChange={this.onChangeHandler}
									autoComplete='off'
								/>
							</Col>
							<Col style={{ padding: '0px' }} xs='2'>
								<a
									href='#'
									className='send-button'
									onClick={(e) => this.sendMessage(e, this.state.message)}>
									<FaPaperPlane />
								</a>
							</Col>
						</Form.Row>
					</Form>
				</div>
			</div>
		);
	}
}

Chat.propTypes = {
	bot: PropTypes.object,
	chatVisibilityHandler: PropTypes.func,
};

const mapStateToProps = (state) => {
	return { bot: state.messages };
};

export default connect(mapStateToProps, actions)(Chat);
