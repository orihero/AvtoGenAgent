import { ORDERS_LOADED } from './../types';
const initialState = {
    new: [],
    current: []
}

export const orders = (state = initialState, { type, payload }) => {
    switch (type) {
        case ORDERS_LOADED: {
            let { name, data } = payload;
            return { ...state, [name]: data }
        }
        default:
            return state
    }
}
