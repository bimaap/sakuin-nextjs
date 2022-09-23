import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from 'axios';

export const updatePinAuth = createAsyncThunk("update/pin", async (props) => {
    const result = {};

    const authAxios = Axios.create({
        baseURL: 'https://fazzpay-9dn2jaz6f-bagusth15.vercel.app/',
        headers : {
            Authorization: `Bearer ${props.token}`
        }
    })
    
    try {
        const values = {pin: props.pin}
        const {data} = await authAxios.patch(`https://fazzpay-9dn2jaz6f-bagusth15.vercel.app/user/pin/${props.id}`, values);
        return data.data
    } catch (error) {
        result.error = error
        console.log(error);
        return result
    }
});