
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Image from "next/image";
import { Modal } from 'react-bootstrap'
import { Formik } from "formik";
import * as Yup from "yup"
import Link from "next/link";
import default_image from "../../public/images/default.jpg";
import DashboardLayout from '../../components/dashboard'
import { AiOutlineLeft, AiOutlineRight, AiOutlineSearch } from "react-icons/ai";
import { BiMoney, BiPencil } from "react-icons/bi";

import { useSelector, useDispatch } from "react-redux";
import { getUserAuth } from "../../redux/async/getUser";
import { getPinAuth } from "../../redux/async/getPin";
import { postTrnasferAuth } from "../../redux/async/postTransfer";

function timeConverter(UNIX_timestamp){
    const dateTime = new Date(UNIX_timestamp).toISOString().slice(0, 19).replace('T', ' ').split(' ')
    const date = dateTime[0].split('-')
    const time = dateTime[1].split(':')
    const month = [null, 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    return {year: date[0], month: month[Number(date[1].split('')[1])], day: date[2], hour: Number(time[0])+7, minute: time[1]}
}

export default function Home(){
    const router = useRouter()
    const token = Cookies.get('token')
    const id = Cookies.get('receiverId')
    const dispatch = useDispatch()
    const timeStamp = Date.now()
    const date = timeConverter(timeStamp)
    const dataUser = useSelector((state) => state.getUser.data);
    const dataPin = useSelector((state) => state.getPin.data);
    const dataProfile = useSelector((state) => state.getProfile.data);

    React.useEffect(()=>{
        if(!token){
            router.push('/login')
        }else{
            dispatch(getUserAuth({token, id}))
        }
    }, [])

    return(
        <>
            <DashboardLayout>
                <main className="flex-fill d-flex flex-column gap-4">
                    <div className="flex-fill nv-card nv-bc-grey p-4 d-flex align-items-center justify-content-center">
                        <div className="d-flex flex-column align-items-center gap-4 w-50">
                            <div className="d-flex flex-column align-items-center gap-1">
                                {dataProfile.image? <Image className="rounded-3" src={`https://res.cloudinary.com/dd1uwz8eu/image/upload/v1653276449/${dataProfile.image}`} width={70} height={70} alt='user' />:<Image className="rounded-3" src={default_image} width={70} height={70} alt='user' />}
                                <Link href={'/dashboard/editProfile'}>
                                    <div className="d-flex gap-1 align-items-center nv-pointer">
                                        <BiPencil />
                                        <span className="nv-f-h9 nv-weight-700">Edit</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="d-flex flex-column align-items-center">
                                <span className="nv-f-h6 nv-weight-700">{`${dataProfile.firstName} ${dataProfile.lastName}`}</span>
                                <span className="nv-f-h9 nv-weight-400">{`${dataProfile.noTelp? dataProfile.noTelp:'-'}`}</span>
                            </div>

                            <div className="d-flex flex-column align-items-center gap-4 nv-w-fill">
                                <Link href={'/dashboard/personalInformation'}>
                                    <button className="nv-btn nv-btn-fill nv-bc-secondary d-flex align-items-center px-3 justify-content-between">
                                        <span>Personal Information</span>
                                        <AiOutlineRight />
                                    </button>
                                </Link>
                                <Link href={'/dashboard/editPassword'}>
                                    <button className="nv-btn nv-btn-fill nv-bc-secondary d-flex align-items-center px-3 justify-content-between">
                                        <span>Change Password</span>
                                        <AiOutlineRight />
                                    </button>
                                </Link>
                                <Link href={'/dashboard/editPin'}>
                                    <button className="nv-btn nv-btn-fill nv-bc-secondary d-flex align-items-center px-3 justify-content-between">
                                        <span>Change PIN</span>
                                        <AiOutlineRight />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </DashboardLayout>
        </>
    )
}