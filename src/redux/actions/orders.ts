import { ORDERS_LOADED } from "../types";

export const ordersLoaded = (payload) => ({
    type: ORDERS_LOADED,
    payload
})
