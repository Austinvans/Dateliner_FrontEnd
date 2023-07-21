import http from "../http-common";

  const getAll = () => {
    return http.get("/timeliners");
  };
  const get = id => {
    return http.get(`/timeliners/${id}`);
  };
  const create = data => {
    return http.post("/timeliner", data);
  };
  const update = (id, data) => {
    return http.put(`/timeliner/${id}`, data);
  };
  const changeStatus = (id) => {
    return http.patch(`/timeliner/${id}`);
  };
  const remove = id => {
    return http.delete(`/timeliner/${id}`);
  };
  const removeAll = () => {
    return http.delete(`/timeliner`);
  };
  const findByName = name => {
    return http.get(`/timeliner?name=${name}`);
  };
  const getAllExpiredStatus = () => {
    return http.get("/timeliner/status/expired");
  };
  
  const TimelinerService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName,
    changeStatus,
    getAllExpiredStatus
  };
  export default TimelinerService;
    