
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Modal } from 'react-bootstrap'
import Axios from "axios";
import * as Yup from "yup"
import { Formik } from "formik";
import Link from "next/link";
import Image from "next/image";
import default_image from "../public/images/default.jpg";
import { AiOutlineBell, AiOutlineAppstore, AiOutlineArrowUp, AiOutlinePlus, AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { BiMoney } from "react-icons/bi";

import { useSelector, useDispatch } from "react-redux";
import { getProfileAuth } from "../redux/async/getProfile";

function MyVerticallyCenteredModal(props) {
    const token = Cookies.get('token')
    const topupSchema = Yup.object().shape({
        amount: Yup.number().min(1000, 'Minimal topup 1000').max(5000000, 'Maximal topup 5000000').required('Required')
    })

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const handleClickTopup = async (props) => {
        const valueError = Object.keys(props.errors).length
        
        if(!valueError){
            const authAxios = Axios.create({
                baseURL: 'https://fazzpay-9dn2jaz6f-bagusth15.vercel.app/',
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })

            try {
                const result = await authAxios.post("https://fazzpay-9dn2jaz6f-bagusth15.vercel.app/transaction/top-up", props.values)
                openInNewTab(`${result.data.data.redirectUrl}`)
                window.location.href = `/home`
            } catch (error) {
                console.log(error);
            }
        }else{
            console.log('error');
        }
    }

    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Formik
                initialValues={{amount: ''}}
                validationSchema={topupSchema}>
                {(props)=>
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Top Up
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="d-flex flex-column gap-3">
                            <span className="saku-h5">Enter the amount of money,<br/>and click submit</span>
                            <div className='d-flex gap-2 justify-content-between'>
                                <div className="d-flex flex-column justify-content-center">
                                    <div className="nv-input nv-bc-white d-flex w-100">
                                        <div className="nv-input-icon nv-bc-grey"><BiMoney className="nv-f-h6" /></div>
                                        <input className="nv-f-h8 nv-weight-700 nv-c-primary" placeholder="Top Up" type="text" name="amount" onChange={props.handleChange} onKeyPress={(event) => checkNumber(event)} />
                                    </div>
                                    <span className="nv-f-h10 text-danger" type="invalid">{props.errors.amount}</span>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="d-flex border-0">
                            <button className='nv-btn nv-btn-fill nv-bc-secondary' onClick={()=> props.values.amount&&handleClickTopup(props)}>Continue</button>
                        </Modal.Footer>
                    </>
            }</Formik>
        </Modal>
    );
}

const checkNumber = (event) => {
    !(/[0-9]/.test(event.key))&& event.preventDefault()
}

export default function Home(props){
    const router = useRouter()
    const [modalShow, setModalShow] = React.useState(false)
    const token = Cookies.get('token')
    const id = Cookies.get('id')
    const dispatch = useDispatch()
    
    
    React.useEffect(()=>{
        if(!token){
            router.push('/login')
        }else{
            dispatch(getProfileAuth({token, id}))
        }
    }, [router, dispatch, token, id])
    const dataProfile = useSelector((state) => state.getProfile.data);

    const onLogout = async () => {
        const authAxios = Axios.create({
            baseURL: 'https://fazzpay-9dn2jaz6f-bagusth15.vercel.app/',
            headers : {
                Authorization: `Bearer ${token}`
            }
        })

        try {
            const result = await authAxios.post("https://fazzpay-9dn2jaz6f-bagusth15.vercel.app/auth/logout")
            Cookies.remove('token')
            Cookies.remove('id')
            Cookies.remove('receiverId')
            router.push('/')
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            <header className="d-flex align-items-center justify-content-center nv-h-10 px-4 nv-bc-primary">
                <div className="d-flex justify-content-between nv-w-75">
                    <span className="nv-logo">sakuin</span>
                    <div className="d-flex align-items-center gap-3">
                        {dataProfile.image? <Image className="rounded-3" src={`https://res.cloudinary.com/dd1uwz8eu/image/upload/v1653276449/${dataProfile.image}`} width={40} height={40} alt='user' />:<Image className="rounded-3" src={default_image} width={40} height={40} alt='user' />}
                        <div className="d-flex flex-column">
                            <span className="nv-c-grey nv-f-h8 nv-weight-700">{`${dataProfile.firstName} ${dataProfile.lastName}`}</span>
                            <span className="nv-c-grey nv-f-h10">{dataProfile.noTelp? dataProfile.noTelp:'-'}</span>    
                        </div>
                        <AiOutlineBell className="nv-f-h5 nv-c-grey" />
                    </div>
                </div>
            </header>
            <section className="d-flex align-items-center justify-content-center p-4 nv-bc-white nv-h-90">
                <div className="nv-w-75 nv-h-fill d-flex gap-4">
                    <div className="nv-w-20 nv-h-fill nv-bc-grey nv-card p-4">
                        <div className="d-flex flex-column gap-5">
                            <Link href={'/home'}>
                                <div className="d-flex align-items-center gap-2 nv-pointer">
                                    <AiOutlineAppstore className="nv-f-h6 nv-c-primary" />
                                    <span className="nv-f-h9 nv-weight-700 nv-c-primary">Dashboard</span>
                                </div>
                            </Link>
                            <Link href={'/searchReceiver?page=1&search='}>
                                <div className="d-flex align-items-center gap-2">
                                    <AiOutlineArrowUp className="nv-f-h6 nv-c-primary" />
                                    <span className="nv-f-h9 nv-weight-700 nv-c-primary">Transfer</span>
                                </div>
                            </Link>
                            <div className="d-flex align-items-center gap-2">
                                <AiOutlinePlus className="nv-f-h6 nv-c-primary" />
                                <span className="nv-f-h9 nv-weight-700 nv-c-primary" onClick={() => setModalShow(true)}>Top Up</span>
                            </div>
                            <Link href={'/dashboard/profile'}>
                                <div className="d-flex align-items-center gap-2">
                                    <AiOutlineUser className="nv-f-h6 nv-c-primary" />
                                    <span className="nv-f-h9 nv-weight-700 nv-c-primary">Profile</span>
                                </div>
                            </Link>
                            <div className="d-flex align-items-center gap-2">
                                <AiOutlineLogout className="nv-f-h6 nv-c-primary" />
                                <span className="nv-f-h9 nv-weight-700 nv-c-primary" onClick={() => onLogout()}>Logout</span>
                            </div>
                        </div>
                    </div>
                    {props.children}
                </div>
            </section>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}