
import React from "react";
import Link from "next/link";
import Axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup"
import Cookies from "js-cookie";
import { AiOutlineMail, AiOutlineLock, AiOutlineInfoCircle, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {useRouter} from "next/router";
import AuthLayout from "../../components/auth"
import { useSelector, useDispatch } from "react-redux";
import { updatePinAuth } from "../../redux/async/updatePin";

export default function SetPin(){
    const [pass, setPass] = React.useState(false)
    const [error, setError] = React.useState(null);
    const router = useRouter()
    const dispatch = useDispatch()
    const token = Cookies.get('token')
    const id = Cookies.get('id')
  
    const pinSchema = Yup.object().shape({
        pin1: Yup.string().required('Required'),
        pin2: Yup.string().required('Required'),
        pin3: Yup.string().required('Required'),
        pin4: Yup.string().required('Required'),
        pin5: Yup.string().required('Required'),
        pin6: Yup.string().required('Required'),
    })

    const checkNumber = (event) => {
        !(/[0-9]/.test(event.key))&& event.preventDefault()
    }
    
    const setPinUser = (props) => {
        const pin = `${props.values.pin1}${props.values.pin2}${props.values.pin3}${props.values.pin4}${props.values.pin5}${props.values.pin6}`
        const valueError = Object.keys(props.errors).length
        if(!valueError){
            try {
                dispatch(updatePinAuth({token, id, pin}))
                router.push('/auth/setPinSuccess')
            } catch (error) { 
                console.log(error);
            }
        }else{
            console.log('Error');
        }
    }

    const handleClickLogin = async (props) => {
        const valueError = Object.keys(props.errors).length
        if(!valueError){
        try {
            const result = await Axios.post("https://fazzpay-9dn2jaz6f-bagusth15.vercel.app/auth/login", props.values)
            setError(null)
            if(result.data.data.pin){
                Cookies.set("token", result.data.data.token)
                Cookies.set("id", result.data.data.id)
                router.push('/home')
            }else{
                router.push('/auth/setPin')
            }
        } catch (error) {
            setError(error.response?.data.msg)
        }
        }else{
            setError('Check login data again')
        }
    }
    return(
        <>
        <AuthLayout title='Page Data'>
            <div className="nv-w-50 d-flex align-items-center justify-content-center">
                <div className="d-flex flex-column gap-5">
                    <span className="nv-c-primary nv-f-h4 nv-weight-800">Secure Your Account, Your Wallet,<br/>and Your Data With 6 Digits PIN<br/>That You Created Yourself.</span>
                    <span className="nv-c-primary nv-f-h8 nv-weight-200">Create 6 digits pin to secure all your money and your data in<br/>FazzPay app. Keep it secret and don’t tell anyone about your<br/>FazzPay account password and the PIN.</span>
                    
                    <Formik
                    initialValues={{pin1: '', pin2: '', pin3: '', pin4: '', pin5: '', pin6: ''}}
                    validationSchema={pinSchema}>
                    {(props)=>
                        <div className="d-flex flex-column justify-content-center nv-w-20 gap-3">
                            <div>
                                <div className="d-flex justify-content-between">
                                    <div className="nv-input nv-input-pin nv-bc-white d-flex">
                                        <input className="nv-f-h8 nv-weight-700 nv-c-primary text-center" maxLength="1" placeholder="_" type="text" name="pin1" onKeyPress={(event) => checkNumber(event)} onChange={props.handleChange} />
                                    </div>
                                    <div className="nv-input nv-input-pin nv-bc-white d-flex">
                                        <input className="nv-f-h8 nv-weight-700 nv-c-primary text-center" maxLength="1" placeholder="_" type="text" name="pin2" onKeyPress={(event) => checkNumber(event)} onChange={props.handleChange} />
                                    </div>
                                    <div className="nv-input nv-input-pin nv-bc-white d-flex">
                                        <input className="nv-f-h8 nv-weight-700 nv-c-primary text-center" maxLength="1" placeholder="_" type="text" name="pin3" onKeyPress={(event) => checkNumber(event)} onChange={props.handleChange} />
                                    </div>
                                    <div className="nv-input nv-input-pin nv-bc-white d-flex">
                                        <input className="nv-f-h8 nv-weight-700 nv-c-primary text-center" maxLength="1" placeholder="_" type="text" name="pin4" onKeyPress={(event) => checkNumber(event)} onChange={props.handleChange} />
                                    </div>
                                    <div className="nv-input nv-input-pin nv-bc-white d-flex">
                                        <input className="nv-f-h8 nv-weight-700 nv-c-primary text-center" maxLength="1" placeholder="_" type="text" name="pin5" onKeyPress={(event) => checkNumber(event)} onChange={props.handleChange} />
                                    </div>
                                    <div className="nv-input nv-input-pin nv-bc-white d-flex">
                                        <input className="nv-f-h8 nv-weight-700 nv-c-primary text-center" maxLength="1" placeholder="_" type="text" name="pin6" onKeyPress={(event) => checkNumber(event)} onChange={props.handleChange} />
                                    </div>
                                </div>
                                <span className="nv-f-h10 text-danger" type="invalid">{Object.keys(props.errors).length? 'Pin cannot be empty':null}</span>
                            </div>
                            <button className='nv-btn nv-btn-fill nv-bc-secondary' onClick={()=> setPinUser(props)}>Continue</button>
                        </div>
                    }
                    </Formik>
                </div>
            </div>
        </AuthLayout>
        </>
    )
}