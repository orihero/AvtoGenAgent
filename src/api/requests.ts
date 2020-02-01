import axios from 'axios';

const tempToken =
  '$2y$10$1DiytpaACWq4AqZ.Wlo6DOKkNy3X9TwwJ5mIyPk0kchPI6ARFGW2e';

export const URL = 'http://api.avtogen.qwertygroup.uz/';

export let configureAxios = storeInstance => {
  axios.interceptors.request.use(req => {
    console.warn(storeInstance.getState());
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
    showProfile: () => axios.get(`${URL}/profile/showCompany`),
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
  },
};

export default request;
