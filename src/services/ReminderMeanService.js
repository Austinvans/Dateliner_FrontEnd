import http from "../http-common";

const getAll = () => {
    return http.get("/remindermeans");
  };
  const get = id => {
    return http.get(`/remindermeans/${id}`);
  };
  const create = data => {
    return http.post("/remindermeans", data);
  };
  const update = (id, data) => {
    return http.put(`/remindermeans/${id}`, data);
  };
  const remove = id => {
    return http.delete(`/remindermeans/${id}`);
  };
  const removeAll = () => {
    return http.delete(`/remindermeans`);
  };
  const findById = id => {
    return http.get(`/remindermeans?id=${id}`);
  };
  const ReminderMeanService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findById
  };
  export default ReminderMeanService;