import http from "../http-common";

  const getAll = () => {
    return http.get("/datelinerByTimeliners");
  };
  const get = id => {
    return http.get(`/datelinerByTimeliner/${id}`);
  };
  const getContract = id => {
    return http.get(`/pdf/timeliners/{id}`);
  };
  const create = data => {
    return http.post("/datelinerByTimeliner", data);
  };
  const update = (id1, id2, data) => {
    return http.put(`/datelinerByTimeliner/${id1}/${id2}`, data);
  };
  const changeStatusToDone = (id1, id2) => {
    return http.patch(`/datelinerByTimeliner/done/${id1}/${id2}`);
  };
  const getBill = (id1, id2) => {
    return http.get(`/pdf/timeliners/${id1}/${id2}`);
  };
  const remove = (id1, id2) => {
    return http.delete(`/datelinerByTimeliner/${id1}/${id2}`);
  };
  const remove_timeliner = (id) => {
    return http.delete(`/datelinerByTimeliner/${id}`);
  };
  const removeAll = () => {
    return http.delete(`/datelinerByTimeliner`);
  };
  const findByName = name => {
    return http.get(`/datelinerByTimeliner?name=${name}`);
  };
  const DatelinerByTimelinerService = {
    getAll,
    get,
    create,
    update,
    remove,
    remove_timeliner,
    removeAll,
    findByName,
    getContract,
    getBill,
    changeStatusToDone
  };
  export default DatelinerByTimelinerService;  