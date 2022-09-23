import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from 'axios';

export const getProfileAuth = createAsyncThunk("transfer/profile", async (props) => {
    const result = {};

    const authAxios = Axios.create({
        baseURL: 'https://fazzpay-9dn2jaz6f-bagusth15.vercel.app/',
        headers : {
            Authorization: `Bearer ${props.token}`
        }
    })

    try {
        const {data} = await authAxios.get(`https://fazzpay-9dn2jaz6f-bagusth15.vercel.app/user/profile/${props.id}`);
        return data.data
    } catch (error) {
        result.error = error
        return result
    }
});