import { SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from '../actions/types';

const initialState = {
	messages: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SEND_MESSAGE_REQUEST:
			return {
				...state,
				messages: [
					...state.messages,
					{
						text: action.payload,
						sender: true,
					},
				],
			};
		case SEND_MESSAGE_SUCCESS:
			try {
				return {
					...state,
					messages: [...state.messages, ...action.payload],
				};
			} catch (e) {
				console.log(e);
			}
			break;

		default:
			return state;
	}
}
