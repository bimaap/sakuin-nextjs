
import React from "react";
import Link from "next/link";
import Axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup"
import Cookies from "js-cookie";
import { AiOutlineCheck } from "react-icons/ai";
import {useRouter} from "next/router";
import AuthLayout from "../../components/auth"
import { useSelector, useDispatch } from "react-redux";
import { getPinAuth } from "../../redux/async/getPin";

export default function Login(){
  const [pass, setPass] = React.useState(false)
  const [error, setError] = React.useState(null);
  const router = useRouter()
  const dispatch = useDispatch()
  
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

  const handleClickLogin = async (props) => {
    const valueError = Object.keys(props.errors).length
    if(!valueError){
      try {
        const result = await Axios.post("https://fazzpay-9dn2jaz6f-bagusth15.vercel.app/auth/login", props.values)
        setError(null)
        if(result.data.data.pin){
          Cookies.set("token", result.data.data.token)
          Cookies.set("id", result.data.data.id)
          router.push('/home')
        }else{
          router.push('/auth/setPin')
        }
      } catch (error) {
        setError(error.response?.data.msg)
      }
    }else{
      setError('Check login data again')
    }
  }
  return(
    <>
      <AuthLayout title='Page Data'>
        <div className="nv-w-50 d-flex align-items-center justify-content-center">
          <div className="d-flex flex-column gap-5">
            <div className="nv-bc-secondary nv-icon d-flex align-items-center justify-content-center rounded-5"><AiOutlineCheck className="nv-f-h6" /></div>
            <span className="nv-c-primary nv-f-h4 nv-weight-800">Your PIN Was Successfully Created</span>
            <span className="nv-c-primary nv-f-h8 nv-weight-200">Your PIN was successfully created and you can now access<br/>all the features in FazzPay.</span>
            <Link href={'/home'}><button className='nv-btn nv-btn-fill nv-bc-secondary'>Go To Dashboard</button></Link>
          </div>
        </div>
      </AuthLayout>
    </>
  )
}