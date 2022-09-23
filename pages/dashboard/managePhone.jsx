
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Image from "next/image";
import { Formik } from "formik";
import * as Yup from "yup"
import default_image from "../../public/images/default.jpg";
import DashboardLayout from '../../components/dashboard'
import { AiOutlinePhone, AiOutlineRight, AiOutlineSearch } from "react-icons/ai";
import { BiUserPin, BiPencil } from "react-icons/bi";

import { useSelector, useDispatch } from "react-redux";
import { getUserAuth } from "../../redux/async/getUser";
import { updateProfileAuth } from "../../redux/async/updateProfile";

export default function Home(){
    const router = useRouter()
    const token = Cookies.get('token')
    const dispatch = useDispatch()
    const id = Cookies.get('id')
    const dataUser = useSelector((state) => state.getUser.data);
    const dataProfile = useSelector((state) => state.getProfile.data);

    React.useEffect(()=>{
        if(!token){
            router.push('/login')
        }else{
            // dispatch(getUserAuth({token, id}))
        }
    }, [])

    const editSchema = Yup.object().shape({
        noTelp: Yup.number().required('Required')
    })

    const editPhoneProfile = (props) => {
        const valueError = Object.keys(props.errors).length
        const noTelp = props.values.noTelp

        if(!valueError){
            try {
                dispatch(updateProfileAuth([{token, id}, {noTelp}]))
                router.push('/dashboard/profile')
            } catch (error) {
                console.log(error);
            }
        }else{
            console.log('error');
        }
    }

    const checkNumber = (event) => {
        !(/[0-9]/.test(event.key))&& event.preventDefault()
    }

    return(
        <>
            <DashboardLayout>
                <main className="flex-fill d-flex flex-column gap-4">
                    <div className="flex-fill nv-card nv-bc-grey p-4">
                        <div className="d-flex flex-column gap-4">
                            <div className="d-flex justify-content-between">
                                <span className="nv-f-h7 nv-weight-700">Edit Phone Number</span>
                            </div>
                            <span className="saku-h5">Add at least one phone number for the transfer<br/>ID so you can start transfering your money to<br/>another user.</span>
                            <Formik
                                initialValues={{noTelp: ''}}
                                validationSchema={editSchema}>
                                {(props)=>
                                <>
                                <div className="d-flex flex-column gap-3 nv-h-60">
                                    <div className="h-100 d-flex flex-column gap-3 align-items-center justify-content-center">
                                        <div className="d-flex flex-column gap-4">
                                            <div>
                                                <div className="d-flex gap-2 align-items-center">
                                                    <div className="nv-input nv-bc-white">
                                                        <div className="nv-input-icon nv-bc-secondary"><AiOutlinePhone className="nv-f-h6" /></div>
                                                        <input className="nv-f-h8 nv-weight-700 nv-c-primary" placeholder="Enter your phone number" type='text' name="noTelp" onChange={props.handleChange} onKeyPress={(event) => checkNumber(event)} />
                                                    </div>
                                                </div>
                                                <span className="nv-f-h10 text-danger" type="invalid">{props.errors.noTelp}</span>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <button className="nv-btn nv-bc-secondary" onClick={()=> editPhoneProfile(props)}>Edit</button>
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