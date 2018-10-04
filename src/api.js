import axios from 'axios';

const BASE_URL = 
    'https://api.backendless.com/53FB6874-BEE0-9546-FFCA-1F3DEE56BE00/73E38E38-C5C9-45B2-FFB5-D05A6E16A600';
const config = {
    baseURL: BASE_URL,
    withCredentials: false
};
const apiRequest = axios.create(config);
const userSchema = (obj) => {
    return {
        name: obj.name || '',
        email: obj.email || '',
        password: obj.password || ''
    }
}
const Users = {
    getCount: () => apiRequest.get('/data/Users/count'),
    getList: (params) => apiRequest.get('/data/Users', {
        params: {
            ...params,
            sortBy: 'created desc'
        }
    }),
    getById: (id) => apiRequest.get('/data/Users/' + id),
    add: (user) => apiRequest.post('/data/Users', userSchema(user)),
    update: (id, update) => apiRequest.put('/data/Users/'+id, userSchema(update)),
    remove: (id) => apiRequest.delete('/data/Users/' + id),
}

export default {
    Users
}