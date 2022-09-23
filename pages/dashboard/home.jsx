
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Image from "next/image";
import default_image from "../../public/images/default.jpg";
import graphic from "../../public/images/graphic.png";
import { AiOutlineArrowUp, AiOutlinePlus, AiOutlineArrowDown } from "react-icons/ai";
import Link from "next/link";
import DashboardLayout from '../../components/dashboard'

import { useSelector, useDispatch } from "react-redux";
import { getProfileAuth } from "../../redux/async/getProfile";
import { getTransactionsAuth } from "../../redux/async/getTransactions";

export default function Home(){
    const router = useRouter()
    const token = Cookies.get('token')
    const id = Cookies.get('id')
    const dispatch = useDispatch()

    React.useEffect(()=>{
        if(!token){
            router.push('/login')
        }else{
            dispatch(getProfileAuth({token, id}))
            dispatch(getTransactionsAuth({token, page:'1', limit:'5', filter:'MONTH'}))
        }
    }, [])
    const dataProfile = useSelector((state) => state.getProfile.data);
    const dataTransactions = useSelector((state) => state.getTransactions.data);

    return(
        <>
            <DashboardLayout>
                <main className="flex-fill d-flex flex-column gap-4">
                    <div className="nv-card d-flex justify-content-between nv-bc-primary nv-h-25 p-4">
                        <div className="d-flex flex-column justify-content-between">
                            <span className="nv-c-grey nv-f-h8">Balance</span>
                            <span className="nv-c-secondary nv-f-h2 nv-weight-700">Rp{dataProfile.balance}</span>
                            <span className="nv-c-grey nv-f-h8">{dataProfile.noTelp? dataProfile.noTelp:'-'}</span>
                        </div>
                        <div className="d-flex flex-column justify-content-center gap-4">
                            <button className="nv-btn nv-bc-secondary d-flex gap-1 align-items-center justify-content-center">
                                <AiOutlineArrowUp className="nv-f-h6 nv-c-primary" />
                                <span className="nv-c-primary">Transfer</span>
                            </button>
                            <button className="nv-btn nv-bc-secondary d-flex gap-1 align-items-center justify-content-center">
                                <AiOutlinePlus className="nv-f-h6 nv-c-primary" />
                                <span className="nv-c-primary">Top Up</span>
                            </button>
                        </div>
                    </div>
                    <div className="d-flex gap-4 flex-fill">
                        <div className="flex-fill nv-card nv-bc-grey p-4">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex flex-column">
                                    <AiOutlineArrowDown className="nv-f-h5 nv-c-secondary" />
                                    <span className="nv-f-h9">Income</span>
                                    <span className="nv-f-h7 nv-weight-700">Rp2.120.000</span>
                                </div>
                                <div className="d-flex flex-column">
                                    <AiOutlineArrowUp className="nv-f-h5 text-danger" />
                                    <span className="nv-f-h9">Expense</span>
                                    <span className="nv-f-h7 nv-weight-700">Rp1.560.000</span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <Image className="rounded-3" src={graphic} alt='user' />
                            </div>
                        </div>
                        <div className="nv-w-25 nv-card nv-bc-grey p-4">
                            <div className="d-flex flex-column gap-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="nv-f-h7 nv-weight-700">Transaction History</span>
                                    <Link href={'/transactionHistory?page=1'}>
                                        <span className="nv-f-h9 nv-c-secondary nv-weight-700 nv-pointer">See all</span>
                                    </Link>
                                </div>
                                <div className="d-flex flex-column gap-3">
                                    {dataTransactions?.data?.length? dataTransactions.data.map(e=>{
                                        return(
                                            <div className="d-flex justify-content-between align-items-center nv-card nv-bc-white p-2 rounded">
                                                <div className="d-flex gap-2">
                                                    {e.image? <Image className="rounded-3" src={`https://res.cloudinary.com/dd1uwz8eu/image/upload/v1653276449/${e.image}`} width={40} height={40} alt='user' />:<Image className="rounded-3" src={default_image} width={40} height={40} alt='user' />}
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <span className="nv-f-h9 nv-c-primary nv-weight-700">{e.fullName}</span>
                                                        <span className="nv-f-h10 nv-c-primary">{e.type==='topup'?'Topup':e.type==='send'?'Sending':'Accept'} {e.status==='pending'&&'(Pending)'}</span>
                                                    </div>
                                                </div>
                                                <span className={`nv-weight-700 ${e.type==='topup'?'text-primary':e.type==='send'?'text-danger':'nv-c-secondary'}`}>{e.type==='topup'?'+':e.type==='send'?'-':'+'} Rp{e.amount}</span>
                                            </div>
                                        )
                                    }):
                                        <div className="d-flex justify-content-between align-items-center nv-card nv-bc-white p-2 rounded">
                                            <div className="d-flex gap-2">
                                                <span className="nv-f-h9 nv-c-primary nv-weight-700">Empty</span>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </DashboardLayout>
        </>
    )
}