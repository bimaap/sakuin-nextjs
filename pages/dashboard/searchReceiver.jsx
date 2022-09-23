
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Formik } from "formik";
import default_image from "../../public/images/default.jpg";
import DashboardLayout from '../../components/dashboard'
import { AiOutlineLeft, AiOutlineRight, AiOutlineSearch } from "react-icons/ai";

import { useSelector, useDispatch } from "react-redux";
import { getAllUsersAuth } from "../../redux/async/getAllUsers";

export default function Home(){
    const router = useRouter()
    const token = Cookies.get('token')
    const dispatch = useDispatch()
    const { page, search } = router.query

    React.useEffect(()=>{
        if(!token){
            router.push('/login')
        }else{
            dispatch(getAllUsersAuth({token, page: page? page:1, limit: 8, search: search? search:'', sort: 'firstName'}))
        }
    }, [page, search])

    const dataAllUsers = useSelector((state) => state.getAllUsers.data);

    const onClickReceiver = (receiverId) => {
        Cookies.set("receiverId", receiverId)
        router.push(`/dashboard/transfer?id=${receiverId}`)
    }

    return(
        <>
            <DashboardLayout>
                <main className="flex-fill d-flex flex-column gap-4">
                    <div className="flex-fill nv-card nv-bc-grey p-4">
                        <div className="d-flex flex-column gap-4">
                            <div className="d-flex justify-content-between">
                                <span className="nv-f-h7 nv-weight-700">Search Receiver</span>
                            </div>
                            <Formik
                                initialValues={{search: ''}}>
                                {(props)=>
                                    <div className="d-flex gap-2 align-items-center">
                                        <div className="nv-input nv-bc-white">
                                            <input className="nv-f-h8 nv-weight-700 nv-c-primary" placeholder="Search" type='text' name="search" onChange={props.handleChange} />
                                        </div>
                                        <button className="nv-btn nv-fit-content px-2 nv-bc-secondary" onClick={()=> router.push(`/dashboard/searchReceiver?page=1&search=${props.values.search}`)}><AiOutlineSearch className="nv-f-h6" /></button>
                                    </div>
                                }
                            </Formik>
                            <div className="d-flex flex-column gap-3 nv-h-60">
                                {dataAllUsers.data?.length? dataAllUsers.data.map(e=>{
                                    return(
                                        // <Link onClick={() => Cookies.set("receiverId", e.id)} href={{ pathname: '/dashboard/transfer', query: { id: e.id} }}>
                                            <div className="d-flex justify-content-between align-items-center nv-card nv-bc-white p-2 rounded" onClick={()=>onClickReceiver(e.id)}>
                                                <div className="d-flex gap-2">
                                                    {e.image? <Image className="rounded-3" src={`https://res.cloudinary.com/dd1uwz8eu/image/upload/v1653276449/${e.image}`} width={40} height={40} alt='user' />:<Image className="rounded-3" src={default_image} width={40} height={40} alt='user' />}
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <span className="nv-f-h9 nv-c-primary nv-weight-700">{e.firstName} {e.lastName}</span>
                                                        <span className="nv-f-h10 nv-c-primary">{e.noTelp? e.noTelp:'-'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        // </Link>
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
                                <button className="nv-btn nv-fit-content nv-fit-content-h px-1 nv-bc-secondary" onClick={()=> page>1&&router.push(`/dashboard/searchReceiver?page=${Number(page)-1}&search=${search}`)}><AiOutlineLeft /></button>
                                <span>{dataAllUsers.pagination?.page}</span>
                                <button className="nv-btn nv-fit-content nv-fit-content-h px-1 nv-bc-secondary" onClick={()=> page<dataAllUsers.pagination?.totalPage&&router.push(`/dashboard/searchReceiver?page=${Number(page)+1}&search=${search}`)}><AiOutlineRight /></button>
                            </div>
                        </div>
                    </div>
                </main>
            </DashboardLayout>
        </>
    )
}