import axios from 'axios';

const tempToken =
  '$2y$10$1DiytpaACWq4AqZ.Wlo6DOKkNy3X9TwwJ5mIyPk0kchPI6ARFGW2e';

export const URL = 'http://api.avtogen.qwertygroup.uz/';

let request = {
  profile: {
    showProfile: (token = tempToken) =>
      axios.get(`${URL}/profile/showCompany`, {
        headers: {Authorization: `Bearer ${token}`},
      }),
  },
};

export default request;
