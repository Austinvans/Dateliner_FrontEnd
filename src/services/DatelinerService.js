import http from "../http-common";

  const getAll = () => {
    return http.get("/dateliners");
  };
  const get = id => {
    return http.get(`/dateliners/${id}`);
  };
  const create = data => {
    return http.post("/dateliners", data);
  };
  const update = (id, data) => {
    return http.put(`/dateliners/${id}`, data);
  };
  const remove = id => {
    return http.delete(`/dateliners/${id}`);
  };
  const removeAll = () => {
    return http.delete(`/dateliners`);
  };
  const findById = id => {
    return http.get(`/dateliners?id=${id}`);
  };
  const DatelinerService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findById
  };
  export default DatelinerService;  