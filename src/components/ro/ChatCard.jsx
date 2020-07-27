import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Carousel } from 'react-bootstrap';

class ChatCard extends Component {
	render() {
		return (
			<Card
				className='message-recived message'
				style={{ width: '18rem', height: '400px' }}>
				<Carousel controls={false}>
					{this.props.cardList.map((card, index) => (
						<Carousel.Item key={index}>
							{card.cardImg ? (
								<Card.Img
									variant='top'
									src={card.cardImg}
									style={{ width: '100%' }}
								/>
							) : null}

							<Card.Body style={{ margin: '0 0 25px 0', heigth: '100px' }}>
								<Card.Title style={{ fontSize: '1rem' }}>
									{card.cardTitle}
								</Card.Title>
								<Card.Text style={{ fontSize: '.60rem' }}>
									{card.cardText}
								</Card.Text>
								{card.cardUrl ? (
									<Button href={card.cardUrl} className='yellow-button-card'>
										{card.cardButton}
									</Button>
								) : null}
							</Card.Body>
						</Carousel.Item>
					))}
				</Carousel>
			</Card>
		);
	}
}

ChatCard.propTypes = {
	cardList: PropTypes.array,
};

export default ChatCard;
