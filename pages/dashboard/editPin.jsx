
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Image from "next/image";
import { Formik } from "formik";
import Axios from "axios";
import * as Yup from "yup"
import default_image from "../../public/images/default.jpg";
import DashboardLayout from '../../components/dashboard'
import { AiOutlineLeft, AiOutlineRight, AiOutlineSearch } from "react-icons/ai";
import { BiUserPin, BiPencil } from "react-icons/bi";

import { useSelector, useDispatch } from "react-redux";
import { getUserAuth } from "../../redux/async/getUser";
import { updateProfileAuth } from "../../redux/async/updateProfile";
import { updatePinAuth } from "../../redux/async/updatePin";

export default function Home(){
    const router = useRouter()
    const token = Cookies.get('token')
    const dispatch = useDispatch()
    const id = Cookies.get('id')
    // const dataUser = useSelector((state) => state.getUser.data);
    // const dataProfile = useSelector((state) => state.getProfile.data);

    React.useEffect(()=>{
        if(!token){
            router.push('/login')
        }else{
            // dispatch(getUserAuth({token, id}))
        }
    }, [])

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

    const editPin = (data) => {
        const pin = `${data.values.pin1}${data.values.pin2}${data.values.pin3}${data.values.pin4}${data.values.pin5}${data.values.pin6}`
        const valueError = Object.keys(data.errors).length
        if(!valueError){
            dispatch(updatePinAuth({token, id, pin}))
            router.push('/home')
        }else{
            console.log('Error');
        }
    }

    return(
        <>
            <DashboardLayout>
                <main className="flex-fill d-flex flex-column gap-4">
                    <div className="flex-fill nv-card nv-bc-grey p-4">
                        <div className="d-flex flex-column gap-4">
                            <div className="d-flex justify-content-between">
                                <span className="nv-f-h7 nv-weight-700">Change PIN</span>
                            </div>
                            <span className="saku-h5">Enter your current 6 digits Zwallet PIN below to<br/>continue to the next steps.</span>
                            <Formik
                                initialValues={{pin1: '', pin2: '', pin3: '', pin4: '', pin5: '', pin6: ''}}
                                validationSchema={pinSchema}>
                                {(props)=>
                                <>
                                <div className="d-flex flex-column gap-3 nv-h-60">
                                    <div className="h-100 d-flex flex-column gap-3 align-items-center justify-content-center">
                                        <div className="d-flex flex-column justify-content-center w-50 nv-card nv-bc-white p-4 gap-3">
                                            <div className="d-flex justify-content-between">
                                                <div className="nv-input nv-input-pin nv-bc-grey d-flex">
                                                    <input className="nv-f-h8 nv-weight-700 nv-c-primary text-center" maxlength="1" placeholder="_" type="text" name="pin1" onChange={props.handleChange} onKeyPress={(event) => checkNumber(event)} />
                                                </div>
                                                <div className="nv-input nv-input-pin nv-bc-grey d-flex">
                                                    <input className="nv-f-h8 nv-weight-700 nv-c-primary text-center" maxlength="1" placeholder="_" type="text" name="pin2" onChange={props.handleChange} onKeyPress={(event) => checkNumber(event)} />
                                                </div>
                                                <div className="nv-input nv-input-pin nv-bc-grey d-flex">
                                                    <input className="nv-f-h8 nv-weight-700 nv-c-primary text-center" maxlength="1" placeholder="_" type="text" name="pin3" onChange={props.handleChange} onKeyPress={(event) => checkNumber(event)} />
                                                </div>
                                                <div className="nv-input nv-input-pin nv-bc-grey d-flex">
                                                    <input className="nv-f-h8 nv-weight-700 nv-c-primary text-center" maxlength="1" placeholder="_" type="text" name="pin4" onChange={props.handleChange} onKeyPress={(event) => checkNumber(event)} />
                                                </div>
                                                <div className="nv-input nv-input-pin nv-bc-grey d-flex">
                                                    <input className="nv-f-h8 nv-weight-700 nv-c-primary text-center" maxlength="1" placeholder="_" type="text" name="pin5" onChange={props.handleChange} onKeyPress={(event) => checkNumber(event)} />
                                                </div>
                                                <div className="nv-input nv-input-pin nv-bc-grey d-flex">
                                                    <input className="nv-f-h8 nv-weight-700 nv-c-primary text-center" maxlength="1" placeholder="_" type="text" name="pin6" onChange={props.handleChange} onKeyPress={(event) => checkNumber(event)} />
                                                </div>
                                            </div>
                                            <span className="nv-f-h10 text-danger" type="invalid">{Object.keys(props.errors).length? 'Pin cannot be empty':null}</span>
                                            <div className="d-flex justify-content-end">
                                                <button className="nv-btn nv-bc-secondary nv-btn-fill" onClick={()=> editPin(props)}>Continue</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </>
                            }</Formik>
                        </div>
                    </div>
                </main>
            </DashboardLayout>
        </>
    )
}