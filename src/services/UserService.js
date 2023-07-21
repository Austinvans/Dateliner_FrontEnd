import axios from 'axios'

const API_URL = 'http://localhost:8080/dateliner'

const options = {
    headers: {
        'Content-Type': 'application/json',
    }
};

const create = data => {
    return axios.post(`${API_URL}/user`, data, options);
};

const UserService = {
    create
};

export default UserService