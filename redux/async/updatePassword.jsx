import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from 'axios';

export const updatePasswordAuth = createAsyncThunk("update/password", async (props) => {
    const result = {};

    const authAxios = Axios.create({
        baseURL: 'https://fazzpay-9dn2jaz6f-bagusth15.vercel.app/',
        headers : {
            Authorization: `Bearer ${props[0].token}`
        }
    })
    
    try {
        const {data} = await authAxios.patch(`https://fazzpay-9dn2jaz6f-bagusth15.vercel.app/user/password/${props[0].id}`, props[1]);
        return data.data
    } catch (error) {
        result.error = error
        return result
    }
});