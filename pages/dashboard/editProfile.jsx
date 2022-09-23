
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
    }, [router, token])

    const editSchema = Yup.object().shape({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
    })

    const editProfile = (props) => {
        const valueError = Object.keys(props.errors).length
        const firstName = props.values.firstName
        const lastName = props.values.lastName

        if(!valueError){
            try {
                dispatch(updateProfileAuth([{token, id}, {firstName, lastName}]))
                router.push('/dashboard/profile')
            } catch (error) {
                console.log(error);
            }
        }else{
            console.log('error');
        }
    }

    const editPhotoProfile = async (props) => {
        const data = new FormData()
        data.append('image', props)

        try {
            const result = await Axios.patch(`https://fazzpay-9dn2jaz6f-bagusth15.vercel.app/user/image/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'content-type': 'multipart/form-data'
                }
            })
            window.location.href = '/dashboard/editProfile'
          } catch (error) { 
            console.log(error);
          }
    }

    return(
        <>
            <DashboardLayout>
                <main className="flex-fill d-flex flex-column gap-4">
                    <div className="flex-fill nv-card nv-bc-grey p-4">
                        <div className="d-flex flex-column gap-4">
                            <div className="d-flex justify-content-between">
                                <span className="nv-f-h7 nv-weight-700">Edit Profile</span>
                            </div>
                            <Formik
                                initialValues={{firstName: '', lastName: ''}}
                                validationSchema={editSchema}>
                                {(props)=>
                                <>
                                <div className="d-flex flex-column gap-3 nv-h-60">
                                    <div className="h-100 d-flex flex-column gap-3 align-items-center justify-content-center">
                                        <div className="d-flex flex-column gap-4">
                                            <div>
                                                {dataProfile.image? <Image className="rounded-3" src={`https://res.cloudinary.com/dd1uwz8eu/image/upload/v1653276449/${dataProfile.image}`} width={70} height={70} alt='user' />:<Image className="rounded-3" src={default_image} width={70} height={70} alt='user' />}
                                            </div>
                                            <input type={'file'} onChange={((e)=> editPhotoProfile(e.target.files[0]))} />
                                            <div>
                                                <div className="d-flex gap-2 align-items-center">
                                                    <div className="nv-input nv-bc-white">
                                                        <div className="nv-input-icon nv-bc-secondary"><BiUserPin className="nv-f-h6" /></div>
                                                        <input className="nv-f-h8 nv-weight-700 nv-c-primary" placeholder="First Name" type='text' name="firstName" onChange={props.handleChange} />
                                                    </div>
                                                </div>
                                                <span className="nv-f-h10 text-danger" type="invalid">{props.errors.firstName}</span>
                                            </div>
                                            <div>
                                                <div className="d-flex gap-2 align-items-center">
                                                    <div className="nv-input nv-bc-white">
                                                        <div className="nv-input-icon nv-bc-secondary"><BiUserPin className="nv-f-h6" /></div>
                                                        <input className="nv-f-h8 nv-weight-700 nv-c-primary" placeholder="Last Name" type='text' name="lastName" onChange={props.handleChange} />
                                                    </div>
                                                </div>
                                                <span className="nv-f-h10 text-danger" type="invalid">{props.errors.lastName}</span>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <button className="nv-btn nv-bc-secondary" onClick={()=> editProfile(props)}>Edit</button>
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