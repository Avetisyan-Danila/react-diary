export const INITIAL_STATE = {
	isValid: {
		title: true,
		date: true
	},
	values: {
		title: undefined,
		date: undefined
	},
	isFormReadyToSubmit: false
};

export function formReducer(state, action) {
	switch (action.type) {
	case 'RESET_VALIDITY':
		return {...state, isValid: INITIAL_STATE.isValid};
	case 'SUBMIT': {
		const titleValidity = action.payload.title?.trim().length;
		const dateValidity = action.payload.date;

		return {
			values: action.payload,
			isValid: {
				title: titleValidity,
				date: dateValidity
			},
			isFormReadyToSubmit: titleValidity && dateValidity
		};
	}
	}
}