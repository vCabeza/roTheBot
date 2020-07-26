import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

export default class Ro extends Component {
	render() {
		const imageSrc = '/ro-avatar.png';
		return (
			<div className="mini">
				<Image fluid src={window.location.origin + imageSrc} alt={imageSrc} />
			</div>
		);
	}
}
