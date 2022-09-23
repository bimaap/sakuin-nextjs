
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Image from "next/image";
import { Formik } from "formik";
import Axios from "axios";
import * as Yup from "yup"
import default_image from "../../public/images/default.jpg";
import DashboardLayout from '../../components/dashboard'
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiUserPin, BiPencil } from "react-icons/bi";

import { useSelector, useDispatch } from "react-redux";
import { getUserAuth } from "../../redux/async/getUser";
import { updatePasswordAuth } from "../../redux/async/updatePassword";

export default function Home(){
    const router = useRouter()
    const token = Cookies.get('token')
    const [pass, setPass] = React.useState(false)
    const [pass2, setPass2] = React.useState(false)
    const [pass3, setPass3] = React.useState(false)
    const dispatch = useDispatch()
    const id = Cookies.get('id')

    const updatePassword = useSelector((state) => state.updatePassword.data);

    React.useEffect(()=>{
        if(!token){
            router.push('/login')
        }else{
            // dispatch(getUserAuth({token, id}))
        }
    }, [])

    const editPasswordSchema = Yup.object().shape({
        oldPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
        newPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
        confirmPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    })

    if(updatePassword.length !== 0){
        if(!updatePassword.error){
            window.location.href = `/home`
        }
    }

    const editPassword = (props) => {
        const valueError = Object.keys(props.errors).length

        if(!valueError){
            try {
                dispatch(updatePasswordAuth([{token, id}, props.values]))
            } catch (error) {
                console.log(error);
            }
        }else{
            console.log('error');
        }
    }

    return(
        <>
            <DashboardLayout>
                <main className="flex-fill d-flex flex-column gap-4">
                    <div className="flex-fill nv-card nv-bc-grey p-4">
                        <div className="d-flex flex-column gap-4">
                            <div className="d-flex justify-content-between">
                                <span className="nv-f-h7 nv-weight-700">Change Password</span>
                            </div>
                            <span className="saku-h5">You must enter your current password and then<br/>type your new password twice.</span>
                            <Formik
                                initialValues={{oldPassword: '', newPassword: '', confirmPassword: ''}}
                                validationSchema={editPasswordSchema}>
                                {(props)=>
                                <>
                                <div className="d-flex flex-column gap-3 nv-h-60">
                                    <div className="h-100 d-flex flex-column gap-3 align-items-center justify-content-center">
                                        <div className="d-flex flex-column gap-4">
                                            <div>
                                                <div className="nv-input nv-bc-white">
                                                    <div className="nv-input-icon nv-bc-secondary"><AiOutlineLock className="nv-f-h6" /></div>
                                                    <input className="nv-f-h8 nv-weight-700 nv-c-primary" placeholder="Password" type={pass? 'text':'password'} name="oldPassword" onChange={props.handleChange} />
                                                    <div onClick={() => setPass(!pass)} className="nv-input-icon-info nv-pointer">{pass? <AiOutlineEye className="nv-f-h6" />:<AiOutlineEyeInvisible className="nv-f-h6" />}</div>
                                                </div>
                                                <span className="nv-f-h10 text-danger" type="invalid">{props.errors.oldPassword}</span>
                                            </div>
                                            <div>
                                                <div className="nv-input nv-bc-white">
                                                    <div className="nv-input-icon nv-bc-secondary"><AiOutlineLock className="nv-f-h6" /></div>
                                                    <input className="nv-f-h8 nv-weight-700 nv-c-primary" placeholder="Password" type={pass2? 'text':'password'} name="newPassword" onChange={props.handleChange} />
                                                    <div onClick={() => setPass2(!pass2)} className="nv-input-icon-info nv-pointer">{pass2? <AiOutlineEye className="nv-f-h6" />:<AiOutlineEyeInvisible className="nv-f-h6" />}</div>
                                                </div>
                                                <span className="nv-f-h10 text-danger" type="invalid">{props.errors.newPassword}</span>
                                            </div>
                                            <div>
                                                <div className="nv-input nv-bc-white">
                                                    <div className="nv-input-icon nv-bc-secondary"><AiOutlineLock className="nv-f-h6" /></div>
                                                    <input className="nv-f-h8 nv-weight-700 nv-c-primary" placeholder="Password" type={pass3? 'text':'password'} name="confirmPassword" onChange={props.handleChange} />
                                                    <div onClick={() => setPass3(!pass3)} className="nv-input-icon-info nv-pointer">{pass3? <AiOutlineEye className="nv-f-h6" />:<AiOutlineEyeInvisible className="nv-f-h6" />}</div>
                                                </div>
                                                <span className="nv-f-h10 text-danger" type="invalid">{props.errors.confirmPassword}</span>
                                            </div>
                                        </div>
                                        <span className="nv-f-h10 text-danger" type="invalid">{props.values.newPassword !== props.values.confirmPassword? 'New Password is not the same as Confirm password':updatePassword.error?updatePassword.error?.response.data.msg:null}</span>
                                        <div className="d-flex justify-content-end">
                                            <button className="nv-btn nv-bc-secondary" onClick={()=> props.values.newPassword === props.values.confirmPassword&&editPassword(props)}>Edit</button>
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