import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from 'axios';

export const getTransactionsAuth = createAsyncThunk("transaction/history", async (props) => {
    const result = {};

    const authAxios = Axios.create({
        baseURL: 'https://fazzpay-9dn2jaz6f-bagusth15.vercel.app/',
        headers : {
            Authorization: `Bearer ${props.token}`
        }
    })

    try {
        const {data} = await authAxios.get(`https://fazzpay-9dn2jaz6f-bagusth15.vercel.app/transaction/history`, {params: {page: props.page, limit: props.limit, filter: props.filter}});
        return data
    } catch (error) {
        result.error = error
        return result
    }
});