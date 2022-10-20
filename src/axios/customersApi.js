import axiosClient from "./axiosClient";

const customersApi = {
  getCustomers(params) {
    const url = `customers`;
    return axiosClient.get(url, { params });
  },
  createCustomer(data) {
    const url = `customers`;
    return axiosClient.post(url, data);
  },
  updateCustomer(data) {
    const url = `customers`;
    return axiosClient.put(url, data);
  },
  deleteCustomer(data) {
    const url = `customers/delete-many`;
    return axiosClient.post(url, data);
  },
};

export default customersApi;
