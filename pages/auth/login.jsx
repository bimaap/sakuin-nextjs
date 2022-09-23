
import React from "react";
import Link from "next/link";
import Axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup"
import Cookies from "js-cookie";
import { AiOutlineMail, AiOutlineLock, AiOutlineInfoCircle, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {useRouter} from "next/router";
import AuthLayout from "../../components/auth"
import { useSelector, useDispatch } from "react-redux";

export default function Login(){
  const [pass, setPass] = React.useState(false)
  const [error, setError] = React.useState(null);
  const router = useRouter()
  const dispatch = useDispatch()
  
  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address format').required('Required'),
    password: Yup.string().required('Required')
  })

  const handleClickLogin = async (props) => {
    const valueError = Object.keys(props.errors).length
    if(!valueError){
      try {
        const result = await Axios.post("https://fazzpay-9dn2jaz6f-bagusth15.vercel.app/auth/login", props.values)
        setError(null)
        Cookies.set("token", result.data.data.token)
        Cookies.set("id", result.data.data.id)
        if(result.data.data.pin){
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
            <span className="nv-c-primary nv-f-h4 nv-weight-800">Start Accessing Banking Needs<br/>With All Devices and All Platforms<br/>With 30.000+ Users</span>
            <span className="nv-c-primary nv-f-h8 nv-weight-200">Transfering money is eassier than ever, you can access<br/>FazzPay wherever you are. Desktop, laptop, mobile phone?<br/>we cover all of that for you!</span>

            <Formik
              initialValues={{email: '', password: ''}}
              validationSchema={loginSchema}>
              {(props)=>
                <div className="d-flex flex-column gap-4 nv-fit-content">
                  <div>
                    <div className="nv-input nv-bc-white">
                      <div className="nv-input-icon nv-bc-grey"><AiOutlineMail className="nv-f-h6" /></div>
                      <input className="nv-f-h8 nv-weight-700 nv-c-primary" placeholder="E-mail" type="text" name="email" onChange={props.handleChange} />
                      {false && <div className="nv-input-icon-info"><AiOutlineInfoCircle className="nv-f-h6" /></div>}
                    </div>
                    <span className="nv-f-h10 text-danger" type="invalid">{props.errors.email}</span>
                  </div>
                  <div>
                    <div className="nv-input nv-bc-white">
                      <div className="nv-input-icon nv-bc-grey"><AiOutlineLock className="nv-f-h6" /></div>
                      <input className="nv-f-h8 nv-weight-700 nv-c-primary" placeholder="Password" type={pass? 'text':'password'} name="password" onChange={props.handleChange} />
                      <div onClick={() => setPass(!pass)} className="nv-input-icon-info nv-pointer">{pass? <AiOutlineEye className="nv-f-h6" />:<AiOutlineEyeInvisible className="nv-f-h6" />}</div>
                    </div>
                    <span className="nv-f-h10 text-danger" type="invalid">{props.errors.password}</span>
                  </div>
                  <div className="d-flex justify-content-end"><span className="nv-c-secondary nv-f-h9 nv-pointer">Forgot password?</span></div>
                  
                  <div className="d-flex justify-content-center"><span className="nv-f-h10 text-danger">{error}</span></div>
                  <button className="nv-btn-fill nv-bc-secondary" onClick={() => handleClickLogin(props)}>Login</button>
                  <div className="d-flex justify-content-center"><span className="nv-c-primary nv-f-h9">Don’t have an account? Let’s <Link href={'/register'}><span className="nv-c-secondary nv-pointer">Sign Up</span></Link></span></div>
                </div>
              }
            </Formik>
          </div>
        </div>
      </AuthLayout>
    </>
  )
}