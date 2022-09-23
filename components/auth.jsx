
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Phone from "../public/images/phone.png";

export default function Login(props){
  return(
    <>
      <header className="nv-auth-header d-flex align-items-center px-5 position-absolute nv-w-100">
        <Link href={'/'}><span className="nv-logo">sakuin</span></Link>
      </header>
      <section className="d-flex nv-h-100">
        <div className="nv-bc-primary nv-w-50 d-flex flex-column align-items-center justify-content-center">
          <div className="nv-auth-image-phone">
            <Image src={Phone} alt='phone' />
          </div>
          <div className="d-flex flex-column gap-3">
            <span className="nv-c-secondary nv-f-h4 nv-weight-800">App that Covering Banking Needs.</span>
            <span className="nv-c-grey nv-f-h8 nv-weight-200">FazzPay is an application that focussing in banking needs for all users<br/>in the world. Always updated and always following world trends.<br/>5000+ users registered in FazzPay everyday with worldwide<br/>users coverage.</span>
          </div>
        </div>
        <div className="nv-w-50 d-flex align-items-center justify-content-center">
          {props.children}
        </div>
      </section>
    </>
  )
}