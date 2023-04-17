import axios from 'axios';

//* Create an Axios Instance so we'll only need to change the url once.
const instance = axios.create({
    // baseURL: 'https://api.mfchess.com:443'
    baseURL: 'http://localhost:3002'
})

export default instance;
