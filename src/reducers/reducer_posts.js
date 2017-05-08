import { FETCH_POSTS, FETCH_POST } from '../actions/index.js';

function mapKeys(array, key) {
    return array.reduce((x, y) => {
        const obj = x;

        obj[y[key]] = y;

        return obj;
    },{});
};

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_POST:
            return {...state, [action.payload.data.id]: action.payload.data };
        case FETCH_POSTS:
            return mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}