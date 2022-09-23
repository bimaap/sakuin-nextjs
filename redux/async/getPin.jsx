import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from 'axios';

export const getPinAuth = createAsyncThunk("get/pin", async (props) => {
    const result = {};

    const authAxios = Axios.create({
        baseURL: 'https://fazzpay-9dn2jaz6f-bagusth15.vercel.app/',
        headers : {
            Authorization: `Bearer ${props.token}`
        }
    })
    
    try {
        const {data} = await authAxios.get(`https://fazzpay-9dn2jaz6f-bagusth15.vercel.app/user/pin?pin=${props.pin? props.pin:0}`);
        return data.data
    } catch (error) {
        result.error = error
        return result
    }
});