/**
 * insightsReducer.js
 * Created by Kevin Li 3/19/18
 */

export const initialState = {
    display: true
};

const insightsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_INSIGHTS': {
            return Object.assign({}, state, {
                display: true
            });
        }
        case 'HIDE_INSIGHTS': {
            return Object.assign({}, state, {
                display: false
            });
        }
        default:
            return state;
    }
};

export default insightsReducer;
