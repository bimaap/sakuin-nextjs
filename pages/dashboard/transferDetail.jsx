
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Image from "next/image";
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

function ModalTransfer(props) {
    const router = useRouter()
    const token = Cookies.get('token')
    const dispatch = useDispatch()
    const dataPin = useSelector((state) => state.getPin.data);
    const { amount, balanceLeft, notes } = router.query
    const receiverId = Cookies.get('receiverId')

    const pinSchema = Yup.object().shape({
        pin1: Yup.string().required('Required'),
        pin2: Yup.string().required('Required'),
        pin3: Yup.string().required('Required'),
        pin4: Yup.string().required('Required'),
        pin5: Yup.string().required('Required'),
        pin6: Yup.string().required('Required'),
    })

    const checkNumber = (event) => {
        !(/[0-9]/.test(event.key))&& event.preventDefault()
    }

    if(dataPin.length !== 0){
        if(!dataPin.error){
            Cookies.remove('transfer')
            Cookies.set("amount", amount)
            Cookies.set("notes", notes)
            window.location.href = `/dashboard/transferSuccess?amount=${amount}&balanceLeft=${balanceLeft}&notes=${notes}`
        }
    }

    const checkPin = (data) => {
        const pin = `${data.values.pin1}${data.values.pin2}${data.values.pin3}${data.values.pin4}${data.values.pin5}${data.values.pin6}`
        const valueError = Object.keys(data.errors).length
        if(!valueError){
            dispatch(getPinAuth({token, pin}))
        }else{
            console.log('Error');
        }
    }
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Formik
                initialValues={{pin1: '', pin2: '', pin3: '', pin4: '', pin5: '', pin6: ''}}
                validationSchema={pinSchema}>
                {(props)=>
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Enter PIN to Transfer
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="d-flex flex-column gap-3">
                            <span className="saku-h5">Enter your 6 digits PIN for confirmation to continue transferring money.</span>
                            <div className='d-flex gap-2 justify-content-between'>
                                <div className="d-flex flex-column justify-content-center w-100">
                                    <div className="d-flex justify-content-between">
                                        <div className="nv-input nv-input-pin nv-bc-white d-flex">
                                            <input className="nv-f-h8 nv-weight-700 nv-c-primary text-center" maxlength="1" placeholder="_" type="text" name="pin1" onChange={props.handleChange} onKeyPress={(event) => checkNumber(event)} />
                                        </div>
                                        <div className="nv-input nv-input-pin nv-bc-white d-flex">
                                            <input className="nv-f-h8 nv-weight-700 nv-c-primary text-center" maxlength="1" placeholder="_" type="text" name="pin2" onChange={props.handleChange} onKeyPress={(event) => checkNumber(event)} />
                                        </div>
                                        <div className="nv-input nv-input-pin nv-bc-white d-flex">
                                            <input className="nv-f-h8 nv-weight-700 nv-c-primary text-center" maxlength="1" placeholder="_" type="text" name="pin3" onChange={props.handleChange} onKeyPress={(event) => checkNumber(event)} />
                                        </div>
                                        <div className="nv-input nv-input-pin nv-bc-white d-flex">
                                            <input className="nv-f-h8 nv-weight-700 nv-c-primary text-center" maxlength="1" placeholder="_" type="text" name="pin4" onChange={props.handleChange} onKeyPress={(event) => checkNumber(event)} />
                                        </div>
                                        <div className="nv-input nv-input-pin nv-bc-white d-flex">
                                            <input className="nv-f-h8 nv-weight-700 nv-c-primary text-center" maxlength="1" placeholder="_" type="text" name="pin5" onChange={props.handleChange} onKeyPress={(event) => checkNumber(event)} />
                                        </div>
                                        <div className="nv-input nv-input-pin nv-bc-white d-flex">
                                            <input className="nv-f-h8 nv-weight-700 nv-c-primary text-center" maxlength="1" placeholder="_" type="text" name="pin6" onChange={props.handleChange} onKeyPress={(event) => checkNumber(event)} />
                                        </div>
                                    </div>
                                    <span className="nv-f-h10 text-danger" type="invalid">{Object.keys(props.errors).length? 'Pin cannot be empty':dataPin.error? dataPin.error?.response.data.msg:null}</span>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="d-flex border-0">
                            <button className='nv-btn nv-btn-fill nv-bc-secondary' onClick={()=> props.values.pin1&&checkPin(props)}>Continue</button>
                        </Modal.Footer>
                    </>
            }</Formik>
        </Modal>
    );
}

export default function Home(){
    const router = useRouter()
    const token = Cookies.get('token')
    const id = Cookies.get('receiverId')
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = React.useState(false)
    const { amount, balanceLeft, notes } = router.query
    const timeStamp = Date.now()
    const date = timeConverter(timeStamp)
    const dataUser = useSelector((state) => state.getUser.data);
    const dataPin = useSelector((state) => state.getPin.data);

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
                    <div className="flex-fill nv-card nv-bc-grey p-4">
                        <div className="d-flex flex-column gap-4">
                            <div className="d-flex justify-content-between">
                                <span className="nv-f-h7 nv-weight-700">Transfer Money</span>
                            </div>
                            <div className="d-flex flex-column gap-3 nv-h-60">
                                <div className="d-flex justify-content-between align-items-center nv-card nv-bc-white p-2 rounded">
                                    <div className="d-flex gap-2">
                                        {dataUser?.image? <Image className="rounded-3" src={`https://res.cloudinary.com/dd1uwz8eu/image/upload/v1653276449/${dataUser.image}`} width={40} height={40} alt='user' />:<Image className="rounded-3" src={default_image} width={40} height={40} alt='user' />}
                                        <div className="d-flex flex-column justify-content-center">
                                            <span className="nv-f-h9 nv-c-primary nv-weight-700">{dataUser?.firstName} {dataUser?.lastName}</span>
                                            <span className="nv-f-h10 nv-c-primary">{dataUser?.noTelp? dataUser.noTelp:'-'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span className="nv-f-h7 nv-weight-700">Details</span>
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
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="nv-btn nv-bc-secondary" onClick={() => setModalShow(true)}>Continue</button>
                            </div>
                        </div>
                    </div>
                </main>
            </DashboardLayout>
            <ModalTransfer
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}