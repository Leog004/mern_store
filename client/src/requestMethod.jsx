import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api';
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjQxYjdiOWViZjRlNjNiOTU2MGMxZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NjU5NjM4NywiZXhwIjoxNjQ2ODU1NTg3fQ.ShBs-RyTny45UEWixhzJ1jAExmSIEuZRIchXKSA9lAw";

export const publicRequest = axios.create({
    baseURL: BASE_URL
});


export const UserRequest = axios.create({
    baseURL: BASE_URL,
    header: {
        token: `Bearer ${TOKEN}`
    }
});
