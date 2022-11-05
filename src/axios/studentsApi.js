import axiosClient from "./axiosClient";

const studentsApi = {
  getStudents(params) {
    const url = `students`;
    return axiosClient.get(url, { params });
  },
  createStudent(data) {
    const url = `students`;
    return axiosClient.post(url, data);
  },
  updateStudents(data) {
    const url = `students`;
    return axiosClient.put(url, data);
  },
  deleteStudents(data) {
    const url = `students/delete-many`;
    return axiosClient.post(url, data);
  },
};

export default studentsApi;
