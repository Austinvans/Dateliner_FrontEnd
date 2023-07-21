import http from "../http-common";

  const getAll = () => {
    return http.get("/objectsByTimeliners");
  };
  const get = id => {
    return http.get(`/objectsByTimeliner/${id}`);
  };
  const create = data => {
    return http.post("/objectsByTimeliner", data);
  };
  const update = (id1, id2, data) => {
    return http.put(`/objectsByTimeliner/${id1}/${id2}`, data);
  };
  const remove = (id1, id2) => {
    return http.delete(`/objectsByTimeliner/${id1}/${id2}`);
  };
  const remove_timeliner = (id) => {
    return http.delete(`/objectsByTimeliner/${id}`);
  };
  const removeAll = () => {
    return http.delete(`/objectsByTimeliner`);
  };
  const findByName = name => {
    return http.get(`/objectsByTimeliner?name=${name}`);
  };
  const ObjectsByTimelinerService = {
    getAll,
    get,
    create,
    update,
    remove,
    remove_timeliner,
    removeAll,
    findByName
  };
  export default ObjectsByTimelinerService;  