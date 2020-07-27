import { SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS, CLEAN_CHAT } from './types';
import answers from '../answers.json';

function sayHello(dispatch) {
	const answer = [];
	answer.push(answers.find((answer) => answer.id === 0));
	answer.push(answers.find((answer) => answer.id === 1));
	dispatch({ type: SEND_MESSAGE_SUCCESS, payload: answer });
}

export const cleanChat = () => (dispatch) => {
	dispatch({ type: CLEAN_CHAT });
};

export const sendMessage = (message) => (dispatch) => {
	dispatch({ type: SEND_MESSAGE_REQUEST, payload: message });

	if (message.toUpperCase().indexOf('HOLA') !== -1) {
		sayHello(dispatch);
		return null;
	}

	if (message.toUpperCase().indexOf('NOTICIA') !== -1) {
		const answer = [];
		answer.push(answers.find((answer) => answer.id === 11));
		answer.push(answers.find((answer) => answer.id === 12));
		dispatch({ type: SEND_MESSAGE_SUCCESS, payload: answer });
		return null;
	}

	const rand = Math.floor(Math.random() * 10 + 2);
	const answer = [answers.find((answer) => answer.id === rand)];
	dispatch({ type: SEND_MESSAGE_SUCCESS, payload: answer });
};

export const initialMessages = () => (dispatch) => {
	sayHello(dispatch);
};
