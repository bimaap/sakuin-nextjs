
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Modal } from 'react-bootstrap'
import { Formik } from "formik";
import * as Yup from "yup"
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
                    <div className="flex-fill nv-card nv-bc-grey p-4 d-flex">
                        <div className="d-flex flex-column gap-4 w-100">
                            <div className="d-flex flex-column gap-3">
                                <span className="nv-f-h7 nv-weight-700">Personal Information</span>
                                <span className="nv-c-primary nv-f-h9 nv-weight-400">We got your personal information from the sign up<br/>proccess. If you want to make changes on<br/>your information, contact our support.</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center nv-card nv-bc-white px-3 py-2 rounded">
                                <div className="d-flex gap-2 flex-column">
                                    <span className="nv-f-h10 nv-c-primary">First Name</span>
                                    <span className="nv-f-h9 nv-c-primary nv-weight-700">{dataProfile?.firstName}</span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center nv-card nv-bc-white px-3 py-2 rounded">
                                <div className="d-flex gap-2 flex-column">
                                    <span className="nv-f-h10 nv-c-primary">Last Name</span>
                                    <span className="nv-f-h9 nv-c-primary nv-weight-700">{dataProfile?.lastName}</span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center nv-card nv-bc-white px-3 py-2 rounded">
                                <div className="d-flex gap-2 flex-column">
                                    <span className="nv-f-h10 nv-c-primary">Verified E-mail</span>
                                    <span className="nv-f-h9 nv-c-primary nv-weight-700">{dataProfile?.email}</span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center nv-card nv-bc-white px-3 py-2 rounded">
                                <div className="d-flex gap-2 flex-column">
                                    <span className="nv-f-h10 nv-c-primary">Phone Number</span>
                                    <span className="nv-f-h9 nv-c-primary nv-weight-700">{dataProfile.noTelp? dataProfile.noTelp:'-'}</span>
                                </div>
                                <Link href={'/dashboard/managePhone'}>
                                    <span className="nv-c-secondary nv-pointer nv-f-h10 nv-weight-700">Manage</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </DashboardLayout>
        </>
    )
}