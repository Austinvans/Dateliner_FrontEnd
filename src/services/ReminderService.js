import http from "../http-common";

const getAll = () => {
    return http.get("/reminders");
  };
  const get = id => {
    return http.get(`/reminders/${id}`);
  };
  const create = data => {
    return http.post("/reminders", data);
  };
  const sendEmail = data => {
    return http.post("/send-email", data);
  };
  const sendSms = data => {
    return http.post("/sms", data);
  };
  const update = (id, data) => {
    return http.put(`/reminders/${id}`, data);
  };
  const remove = id => {
    return http.delete(`/reminders/${id}`);
  };
  const removeAll = () => {
    return http.delete(`/reminders`);
  };
  const findById = id => {
    return http.get(`/reminders?id=${id}`);
  };
  const ReminderService = {
    getAll,
    get,
    create,
    sendEmail,
    sendSms,
    update,
    remove,
    removeAll,
    findById
  };
  export default ReminderService;