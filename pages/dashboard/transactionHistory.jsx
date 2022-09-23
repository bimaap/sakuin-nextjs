
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Image from "next/image";
import default_image from "../../public/images/default.jpg";
import DashboardLayout from '../../components/dashboard'
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { useSelector, useDispatch } from "react-redux";
import { getTransactionsAuth } from "../../redux/async/getTransactions";

export default function Home(){
    const router = useRouter()
    const token = Cookies.get('token')
    const dispatch = useDispatch()
    const { page } = router.query

    React.useEffect(()=>{
        if(!token){
            router.push('/login')
        }else{
            dispatch(getTransactionsAuth({token, page: page? page:1, limit: 8, filter: 'MONTH'}))
        }
    }, [page])

    const dataTransactions = useSelector((state) => state.getTransactions.data);

    return(
        <>
            <DashboardLayout>
                <main className="flex-fill d-flex flex-column gap-4">
                    <div className="flex-fill nv-card nv-bc-grey p-4">
                        <div className="d-flex flex-column gap-4">
                            <div className="d-flex justify-content-between">
                                <span className="nv-f-h7 nv-weight-700">Transaction History</span>
                                <select name="filter">
                                    <option value="week">Week</option>
                                    <option value="month">Month</option>
                                    <option value="year">Year</option>
                                </select>
                            </div>
                            <div className="d-flex flex-column gap-3 nv-h-60">
                                {dataTransactions.data?.length? dataTransactions.data.map(e=>{
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
                            <div className="d-flex justify-content-center align-items-center gap-3">
                                <button className="nv-btn nv-fit-content nv-fit-content-h px-1 nv-bc-secondary" onClick={()=> page>1&&router.push(`/dashboard/transactionHistory?page=${Number(page)-1}`)}><AiOutlineLeft /></button>
                                <span>{dataTransactions.pagination?.page}</span>
                                <button className="nv-btn nv-fit-content nv-fit-content-h px-1 nv-bc-secondary" onClick={()=> page<dataTransactions.pagination?.totalPage&&router.push(`/dashboard/transactionHistory?page=${Number(page)+1}`)}><AiOutlineRight /></button>
                            </div>
                        </div>
                    </div>
                </main>
            </DashboardLayout>
        </>
    )
}