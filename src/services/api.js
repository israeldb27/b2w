import { create } from 'apisauce';

const api = create({
    baseURL: 'http://app-bff-v2-americanas.b2w.io',
});


api.addResponseTransform(response => {
    if (!response.ok) 
    throw response;
});

export default api;
