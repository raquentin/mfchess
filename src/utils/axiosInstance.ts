import axios from 'axios';

//* Create an Axios Instance so we'll only need to change the url once.
const instance = axios.create({
    baseURL: 'https://86.48.25.224/:3002'
})

export default instance;