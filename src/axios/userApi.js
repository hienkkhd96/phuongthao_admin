import axiosClient from "./axiosClient";

const usersApi = {
  getUsers(params) {
    const url = `user`;
    return axiosClient.get(url,{params});
  },
  createUser(data) {
    const url = `user`;
    return axiosClient.post(url,data);
  },
};

export default usersApi