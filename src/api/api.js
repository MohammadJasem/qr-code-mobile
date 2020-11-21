import axios from './axios';

export const login = async (email,password) => {

    try{
        const res = await axios.post('login',{
            email,
            password
        },{
            headers:{
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    }catch(err){
        return err.response.data;
    }
}