import axios from 'axios';

const tempToken =
    '$2y$10$1DiytpaACWq4AqZ.Wlo6DOKkNy3X9TwwJ5mIyPk0kchPI6ARFGW2e';

export const URL = 'https://api.avtogen.uz';

export let configureAxios = storeInstance => {
    axios.interceptors.request.use(req => {
        req.headers = {
            Authorization: `Bearer ${storeInstance.getState().user.token}`,
        };
        return req;
    });
};

let formData = (rawData) => {
    let form = new FormData();
    Object.keys(rawData).forEach(key => {
        form.append(key, rawData[key]);
    });
    return form;
};

let request = {
    profile: {
        showProfile: () => axios.get(`${URL}/profile/show`),
        showCompany: () => axios.get(`${URL}/profile/showCompany`),
        setFcmToken: (data: object) => axios.post(`${URL}/profile/setFcmToken`, formData(data))
    },
    auth: {
        login: (credentials: object) =>
            axios.post(`${URL}/auth/login`, formData(credentials)),
        verifyCode: (id: number, credentials: object) =>
            axios.put(`${URL}/auth/login-verify/${id}`, credentials),
    },
    user: {
        updateUser: (credentials: any) =>
            axios.post(`${URL}/profile/update`, formData(credentials)),
        show: () => axios.get(`${URL}/profile/show`),
    },
    services: {
        getAll: () => axios.get(`${URL}/hand/services`)
    },
    handbook: {
        getCarTypes: () => axios.get(`${URL}/hand/car-types`)
    },
    booking: {
        getAllOrders: (status: string) => axios.get(`${URL}/booking/agent-books?status=${status}`),
        create: (data: object) => axios.post(`${URL}/booking/agent-book`, formData(data)),
        accept: (id: number) => axios.get(`${URL}/booking/accept-book/${id}`),
        reject: (id: number) => axios.get(`${URL}/booking/reject-book/${id}`),
        setStatus: (id: number, status: any) => axios.post(`${URL}/booking/set-status-book`, formData({
            booking_id: id,
            status
        }))
    },
};

export default request;
