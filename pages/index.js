
import React from "react";
import { AiOutlinePhone, AiOutlineUnlock, AiOutlineDownload } from "react-icons/ai";
import Head from "next/head"
import Link from "next/link"
import Image from "next/image";
import airbnb from "../public/images/airbnb.png";
import canon from "../public/images/canon.png";
import dell from "../public/images/dell.png";
import dropbox from "../public/images/dropbox.png";
import hm from "../public/images/hm.png";
import microsoft from "../public/images/microsoft.png";
import phone from "../public/images/phone.png";
import user1 from "../public/images/user-1.png";
import user2 from "../public/images/user-2.png";
import user3 from "../public/images/user-3.png";

export default function LandingPage(){
  return(
    <>
      <Head>
        <title>Langing Page</title>
      </Head>
      <header className="d-flex align-items-center justify-content-center px-4 nv-bc-primary nv-h-25">
        <div className="nv-control-header-landing-page">
          <span className="nv-logo">sakuin</span>
          <div className="d-flex align-items-center gap-3">
            <Link href={'/login'}><button className="nv-c-secondary nv-btn">Login</button></Link>
            <Link href={'/register'}><button className="nv-bc-secondary nv-btn nv-c-black">Sign Up</button></Link>
          </div>
        </div>
      </header>

      <section className="d-flex flex-column nv-bc-primary nv-h-75 align-items-center justify-content-center gap-5">
        <span className="nv-weight-700 nv-f-h1 nv-c-secondary text-center">Awesome App<br/>For Saving Time.</span>
        <span className="nv-weight-400 nv-f-h7 nv-c-secondary text-center">We bring you a mobile app for banking problems that<br/>oftenly wasting much of your times.</span>
        <Link href={'/register'}><button className="nv-btn nv-c-black nv-bc-secondary ">Try It Free</button></Link>
      </section>

      <section className="nv-control-height-fit nv-h-100 nv-bc-white d-flex align-items-center justify-content-center flex-column gap-5">
        <span className="nv-weight-700 nv-f-h1 nv-c-primary text-center"><span className="nv-c-secondary">Why</span> Choose FazzPay?</span>
        <span className="nv-weight-400 nv-f-h7 nv-c-primary text-center">We have some great features from the application and it’s totally free<br/>to use by all users around the world.</span>
        <div className="d-flex gap-3 nv-control-card-landing-page">
          <div className="nv-card nv-card-landing-page nv-bc-grey d-flex align-items-center justify-content-center flex-column gap-3">
            <div className="nv-control-icon nv-bc-primary d-flex align-items-center justify-content-center"><AiOutlinePhone className="nv-f-h4 nv-c-secondary" /></div>
            <span className="nv-f-h6 nv-weight-700 nv-c-primary">24/7 Support</span>
            <span className="text-center nv-f-h8 nv-weight-400 nv-c-black">We have 24/7 contact support so you<br/>can contact us whenever you want<br/>and we will respond it.</span>
          </div>
          <div className="nv-card nv-card-landing-page nv-bc-grey d-flex align-items-center justify-content-center flex-column gap-3">
            <div className="nv-control-icon nv-bc-primary d-flex align-items-center justify-content-center"><AiOutlineUnlock className="nv-f-h4 nv-c-secondary" /></div>
            <span className="nv-f-h6 nv-weight-700 nv-c-primary">Data Privacy</span>
            <span className="text-center nv-f-h8 nv-weight-400 nv-c-black">We make sure your data is safe in our<br/>database and we will encrypt any<br/>data you submitted to us.</span>
          </div>
          <div className="nv-card nv-card-landing-page nv-bc-grey d-flex align-items-center justify-content-center flex-column gap-3">
            <div className="nv-control-icon nv-bc-primary d-flex align-items-center justify-content-center"><AiOutlineDownload className="nv-f-h4 nv-c-secondary" /></div>
            <span className="nv-f-h6 nv-weight-700 nv-c-primary">Easy Download</span>
            <span className="text-center nv-f-h8 nv-weight-400 nv-c-black">Zwallet is 100% totally free to use it’s<br/>now available on Google Play Store<br/>and App Store.</span>
          </div>
        </div>
      </section>

      <section className="nv-partners-landing-page nv-h-25 d-flex align-items-center justify-content-center gap-3 nv-bc-primary">
        <Image src={airbnb} alt='partner' />
        <Image src={canon} alt='partner' />
        <Image src={dell} alt='partner' />
        <Image src={dropbox} alt='partner' />
        <Image src={hm} alt='partner' />
        <Image src={microsoft} alt='partner' />
      </section>

      <section className="nv-h-75 d-flex flex-column align-items-center justify-content-center gap-5">
        <div className="nv-card nv-card-amount-landing-page px-3 nv-bc-grey d-flex align-items-center justify-content-center nv-c-primary nv-f-h2 nv-weight-800">Rp. 390.736.500</div>
        <span className="nv-f-h2 nv-weight-700 text-center"><span className="nv-c-secondary">Money</span> has Been Transfered.</span>
        <span className="text-center nv-f-h8 nv-weight-400">That amount of money has been transfered from all users. We still<br/>counting and going strong!</span>
      </section>

      <section className="nv-bc-primary nv-h-100 d-flex align-items-center gap-4 justify-content-center">
        <div className="nv-image-phone">
          <Image src={phone} alt='phone' />
        </div>
        <div className="nv-control-width-fit d-flex justify-content-center flex-column gap-4">
          <span className="nv-f-h2 nv-weight-700 nv-c-grey">All The <span className="nv-c-secondary">Great</span><br/>FazzPay Features.</span>
          <div className="nv-card nv-card-feature-landing-page nv-bc-white d-flex flex-column justify-content-center p-4 nv-c-primary">
            <div>
              <span className="nv-c-secondary nv-f-h6 nv-weight-700">1. </span>
              <span className="nv-c-primary nv-f-h6 nv-weight-700">Small Fee</span>
            </div>
            <span>We only charge 5% of every success transaction done in FazzPay app.</span>
          </div>
          <div className="nv-card nv-card-feature-landing-page nv-bc-white d-flex flex-column justify-content-center p-4 nv-c-primary">
            <div>
              <span className="nv-c-secondary nv-f-h6 nv-weight-700">2. </span>
              <span className="nv-c-primary nv-f-h6 nv-weight-700">Data Secured</span>
            </div>
            <span>All your data is secured properly in our system and it’s encrypted.</span>
          </div>
          <div className="nv-card nv-card-feature-landing-page nv-bc-white d-flex flex-column justify-content-center p-4 nv-c-primary">
            <div>
              <span className="nv-c-secondary nv-f-h6 nv-weight-700">3. </span>
              <span className="nv-c-primary nv-f-h6 nv-weight-700">User Friendly</span>
            </div>
            <span>FazzPay come up with modern and sleek design and not complicated.</span>
          </div>
        </div>
      </section>

      <section className="nv-control-height-fit nv-h-75 d-flex flex-column align-items-center justify-content-center gap-4">
        <span className="nv-f-h2 nv-weight-700 nv-c-primary text-center">What Users are <span className="nv-c-secondary">Saying.</span></span>
        <span className="text-center nv-f-h8 nv-weight-400">We have some great features from the application and it’s totally free<br/>to use by all users around the world.</span>
        <div className="nv-control-card-landing-page d-flex gap-3">
          <div className="nv-card nv-card-landing-page nv-bc-grey d-flex align-items-center justify-content-center flex-column gap-3">
            <Image src={user1} alt='user' />
            <span className="nv-f-h6 nv-weight-700 nv-c-primary">Sherina Chaw</span>
            <span className="text-center nv-f-h8 nv-weight-400 nv-c-black">“I use this app since 2 years ago and<br/>this is the best app that I’ve ever use<br/>in my entire life”</span>
          </div>
          <div className="nv-card nv-card-landing-page nv-bc-grey d-flex align-items-center justify-content-center flex-column gap-3">
            <Image src={user2} alt='user' />
            <span className="nv-f-h6 nv-weight-700 nv-c-primary">Jessica Mera</span>
            <span className="text-center nv-f-h8 nv-weight-400 nv-c-black">“I use Zwallet to manage all financial<br/>needs. It’s super easy to use and it’s<br/>100% free app”</span>
          </div>
          <div className="nv-card nv-card-landing-page nv-bc-grey d-flex align-items-center justify-content-center flex-column gap-3">
            <Image src={user3} alt='user' />
            <span className="nv-f-h6 nv-weight-700 nv-c-primary">Robert Chandler</span>
            <span className="text-center nv-f-h8 nv-weight-400 nv-c-black">“Since I’m using this app, I’m not<br/>going to move to another similar app.<br/>Thank you Zwallet!”</span>
          </div>
        </div>
      </section>

      <footer className="nv-bc-primary nv-h-25 d-flex justify-content-center align-items-center px-4">
        <div className="nv-control-footer-landing-page d-flex flex-column gap-3">
          <span className="nv-logo">sakuin</span>
          <span className="nv-c-grey nv-f-h8 nv-weight-200">Simplify financial needs and saving<br/>much time in banking needs with<br/>one single app.</span>
          <div className="nv-line nv-bc-grey" />
          <div className="d-flex justify-content-between">
            <span className="nv-c-grey nv-f-h8 nv-weight-200">2020 FazzPay. All right reserved.</span>
            <div className="d-flex gap-3">
              <span className="nv-c-grey nv-f-h8 nv-weight-200">+62 5637 8882 9901</span>
              <span className="nv-c-grey nv-f-h8 nv-weight-200">contact@fazzpay.com</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}