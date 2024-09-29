import { combineReducers } from 'redux';

// Example reducer (you can add your actual reducers here)
const initialState = {
    user: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'CLEAR_USER':
            return { ...state, user: null };
        default:
            return state;
    }
};

// Combine all reducers (you can add more reducers here)
const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;
