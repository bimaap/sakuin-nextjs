
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Image from "next/image";
import default_image from "../../public/images/default.jpg";
import DashboardLayout from '../../components/dashboard'
import { AiOutlineCheck } from "react-icons/ai";

import { useSelector, useDispatch } from "react-redux";
import { getUserAuth } from "../../redux/async/getUser";
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
    const receiverId = Cookies.get('receiverId')
    const transfer = Cookies.get('transfer')
    const amountCookies = Cookies.get('amount')
    const notesCookies = Cookies.get('notes')
    const dispatch = useDispatch()
    const { amount, balanceLeft, notes } = router.query
    const timeStamp = Date.now()
    const date = timeConverter(timeStamp)
    const dataUser = useSelector((state) => state.getUser.data);

    React.useEffect(()=>{
        if(!token){
            router.push('/login')
        }else{
            dispatch(getUserAuth({token, id}))
        }
    }, [])

    const transferDone = () =>{
        const amount = amountCookies
        const notes = notesCookies
        if(!transfer){
            dispatch(postTrnasferAuth({token, amount, notes, receiverId}))
        }else{
            console.log('gak bisa transfer');
        }
        Cookies.set("transfer", 'done')
        Cookies.remove('amount')
        Cookies.remove('notes')
        Cookies.remove('receiverId')
        router.push('/home')
    }

    return(
        <>
            <DashboardLayout>
                <main className="flex-fill d-flex flex-column gap-4">
                    <div className="flex-fill nv-card nv-bc-grey p-4">
                        <div className="d-flex flex-column gap-4">
                            <div className="d-flex flex-column gap-3 nv-h-60">
                                <div className="d-flex flex-column align-items-center">
                                    <div className="nv-bc-secondary nv-icon d-flex align-items-center justify-content-center rounded-5"><AiOutlineCheck className="nv-f-h6" /></div>
                                    <span className="nv-f-h7 nv-weight-700">Transfer Success</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center nv-card nv-bc-white px-3 py-2 rounded">
                                    <div className="d-flex gap-2 flex-column">
                                        <span className="nv-f-h9 nv-c-primary nv-weight-700">Amount</span>
                                        <span className="nv-f-h10 nv-c-primary">Rp{amount}</span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center nv-card nv-bc-white px-3 py-2 rounded">
                                    <div className="d-flex gap-2 flex-column">
                                        <span className="nv-f-h9 nv-c-primary nv-weight-700">Balance Left</span>
                                        <span className="nv-f-h10 nv-c-primary">Rp{balanceLeft}</span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center nv-card nv-bc-white px-3 py-2 rounded">
                                    <div className="d-flex gap-2 flex-column">
                                        <span className="nv-f-h9 nv-c-primary nv-weight-700">Date & Time</span>
                                        <span className="nv-f-h10 nv-c-primary">{date.month} {date.day}, {date.year} - {date.hour}.{date.minute}</span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center nv-card nv-bc-white px-3 py-2 rounded">
                                    <div className="d-flex gap-2 flex-column">
                                        <span className="nv-f-h9 nv-c-primary nv-weight-700">Notes</span>
                                        <span className="nv-f-h10 nv-c-primary">{notes? notes:'-'}</span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span className="nv-f-h7 nv-weight-700">Transfer to</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center nv-card nv-bc-white p-2 rounded">
                                    <div className="d-flex gap-2">
                                        {dataUser?.image? <Image className="rounded-3" src={`https://res.cloudinary.com/dd1uwz8eu/image/upload/v1653276449/${dataUser.image}`} width={40} height={40} alt='user' />:<Image className="rounded-3" src={default_image} width={40} height={40} alt='user' />}
                                        <div className="d-flex flex-column justify-content-center">
                                            <span className="nv-f-h9 nv-c-primary nv-weight-700">{dataUser?.firstName} {dataUser?.lastName}</span>
                                            <span className="nv-f-h10 nv-c-primary">{dataUser?.noTelp? dataUser.noTelp:'-'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="nv-btn nv-bc-secondary" onClick={() => transferDone()}>Back to Home</button>
                            </div>
                        </div>
                    </div>
                </main>
            </DashboardLayout>
        </>
    )
}