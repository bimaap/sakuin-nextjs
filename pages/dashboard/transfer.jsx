
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Image from "next/image";
import { Formik } from "formik";
import * as Yup from "yup"
import default_image from "../../public/images/default.jpg";
import DashboardLayout from '../../components/dashboard'
import { AiOutlineLeft, AiOutlineRight, AiOutlineSearch } from "react-icons/ai";
import { BiMoney, BiPencil } from "react-icons/bi";

import { useSelector, useDispatch } from "react-redux";
import { getUserAuth } from "../../redux/async/getUser";

export default function Home(){
    const router = useRouter()
    const token = Cookies.get('token')
    const dispatch = useDispatch()
    const id = router.query.id?router.query.id:Cookies.get('receiverId')
    const dataUser = useSelector((state) => state.getUser.data);
    const dataProfile = useSelector((state) => state.getProfile.data);

    React.useEffect(()=>{
        if(!token){
            router.push('/login')
        }else{
            dispatch(getUserAuth({token, id}))
        }
    }, [])

    const checkNumber = (event) => {
        !(/[0-9]/.test(event.key))&& event.preventDefault()
    }

    const transferSchema = Yup.object().shape({
        amount: Yup.number().min(1000, 'Minimal topup 1000').max(Number(dataProfile?.balance), 'Not enough money').required('Required')
    })

    const continueTransfer = (props) => {
        const valueError = Object.keys(props.errors).length
        if(!valueError){
            try {
                router.push(`/dashboard/transferDetail?amount=${props.values.amount}&balanceLeft=${Number(dataProfile.balance)-Number(props.values.amount)}&notes=${props.values.notes}`)
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
                                <span className="nv-f-h7 nv-weight-700">Transfer Money</span>
                            </div>
                            <Formik
                                initialValues={{amount: '', notes: ''}}
                                validationSchema={transferSchema}>
                                {(props)=>
                                <>
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
                                    <span>Type the amount you want to transfer and then<br/>press continue to the next steps.</span>
                                        <div className="h-100 d-flex align-items-center justify-content-center">
                                            <div className="d-flex flex-column gap-4">
                                                <div>
                                                    <span className="nv-f-h8 nv-weight-700">Rp{dataProfile?.balance} Available</span>
                                                    <div className="d-flex gap-2 align-items-center">
                                                        <div className="nv-input nv-bc-white">
                                                            <div className="nv-input-icon nv-bc-secondary"><BiMoney className="nv-f-h6" /></div>
                                                            <input className="nv-f-h8 nv-weight-700 nv-c-primary" placeholder="0.00" type='text' name="amount" onChange={props.handleChange} onKeyPress={(event) => checkNumber(event)} />
                                                        </div>
                                                    </div>
                                                    <span className="nv-f-h10 text-danger" type="invalid">{props.errors.amount}</span>
                                                </div>
                                                <div className="d-flex gap-2 align-items-center">
                                                    <div className="nv-input nv-bc-white">
                                                        <div className="nv-input-icon nv-bc-secondary"><BiPencil className="nv-f-h6" /></div>
                                                        <input className="nv-f-h8 nv-weight-700 nv-c-primary" placeholder="Add some notes" type='text' name="notes" onChange={props.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button className="nv-btn nv-bc-secondary" onClick={()=> props.values.amount&&continueTransfer(props)}>Continue</button>
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