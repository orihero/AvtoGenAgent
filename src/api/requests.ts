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

let formData = rawData => {
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
    setFcmToken: (data) => axios.post(`${URL}/profile/setFcmToken`, formData(data))
  },
  auth: {
    login: credentials =>
      axios.post(`${URL}/auth/login`, formData(credentials)),
    verifyCode: (id, credentials) =>
      axios.put(`${URL}/auth/login-verify/${id}`, credentials),
  },
  user: {
    updateUser: credentials =>
      axios.post(`${URL}/profile/update`, formData(credentials)),
    show: () => axios.get(`${URL}/profile/show`),
  },
  booking: {
    getAllOrders: status =>
      axios.get(`${URL}/booking/agent-books?status=${status}`),
    accept: (id) => axios.get(`${URL}/booking/accept-book/${id}`),
    reject: (id) => axios.get(`${URL}/booking/reject-book/${id}`),
  },
};

export default request;
