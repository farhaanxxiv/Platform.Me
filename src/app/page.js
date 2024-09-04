'use client'

import { useAtom } from 'jotai'
import { RiCamera3Line } from "react-icons/ri";
import { BsSunglasses } from "react-icons/bs";
import { BiCodeAlt, BiDownArrowAlt, BiSolidDownArrow } from "react-icons/bi";
import { PiSuitcase } from "react-icons/pi";
import { CgFileAdd } from "react-icons/cg";
import { IoShareSocialOutline } from "react-icons/io5";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { PageCreationProvider } from "@/providers/PageCreationContext";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { userCompany, user_company } from '@/states/user_state';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react"
import PageUtils from '@/utils/PageUtils';
import { FaGoogle } from 'react-icons/fa';
import { AuthContextProvider, AuthProvider, useAuth } from '@/providers/AuthProvider';
import { signInWithPopup } from 'firebase/auth';
import { auth } from './layout';
import { GoogleAuthProvider } from "firebase/auth";
import User from '@/firebase/User';
import useAsync from '@/hooks/useAsync';
import { LayoutManagerProvider, useLayoutManager } from '@/providers/LayoutManager';
import TextTransition, { presets } from 'react-text-transition';
import { FaUser } from "react-icons/fa";
import Image from 'next/image';

export default function Home() {

  return (
    <AuthProvider>
      <LayoutManagerProvider>
        <HomeComponent />
      </LayoutManagerProvider>
    </AuthProvider>
  )
}

function HomeComponent() {

  const router = useRouter()
  const { userData, setUserData } = useLayoutManager()
  const { user, loading } = useAuth()
  const [websiteName, setWebsiteName] = useAtom(user_company)
  const [fetchingUserLoader, setFetchingUserLoader] = useState(true)


  function signInWithFirebase() {

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const uid = user.uid
        fetchUserData(uid)

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  async function fetchUserData(uid) {
    const fetchedUser = await User.isUser(uid)
    setUserData(fetchedUser)
    setFetchingUserLoader(false)
  }

  useEffect(() => {
    if (user != null) {
      fetchUserData(user.uid)
    }
  }, [user])

  const TEXTS = ['Business', 'Portfolio', 'Ads', 'Website'];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      2000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);



  return (


    <>
      <HomeHeader />

      <section className='text-center md:text-left bg-black text-white h-[100dvh] relative overflow-hidden'>

        {/* <svg className='opacity-[0.1] absolute -top-[100%] md:-top-[60%] left-0 rotate-[-180deg]' width="598" height="764" viewBox="0 0 598 764" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M597.754 7.28092C489.053 -9.28692 256.037 0.134947 193.576 170.365C115.5 383.153 309.856 553.552 1.21313 762.398" stroke="black" stroke-width="3" />
        </svg>

        <svg className='opacity-[0.1] absolute -bottom-[90%] md:-bottom-[60%] right-0 rotate-[-180deg]' width="598" height="764" viewBox="0 0 598 764" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M597.754 7.28092C489.053 -9.28692 256.037 0.134947 193.576 170.365C115.5 383.153 309.856 553.552 1.21313 762.398" stroke="black" stroke-width="3" />
        </svg> */}
        {/* absolute  -translate-x-1/2 -translate-y-1/2 */}

        <div className='grid md:grid-cols-2 gap-12 '>
          <div className=' top-1/2 left-1/2 w-full '>

            <p className='flex gradient-border-container-1 mb-4 w-fit mx-auto md:mx-0'>
       
              <h1 className=' h-fit my-auto font-light text-xl'></h1>
              <span className=''>Platform.Me</span>
            </p>
            <h2 className=" leading-tight text-blackstroke-2 text-4xl md:text-6xl font-light ">
              Create Your Page In
              <br />
              <span className='font-light'> 60 Seconds</span>
            </h2>
            <h3 className='mt-6 md:flex'>The best way to Launch
              <TextTransition className='mt-2 md:mt-0 w-fit mx-auto md:mx-0  rounded-full font-semibold px-2 text-2xl -translate-y-1.5' springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition>
            </h3>


            <div className='mt-4 w-fit mx-auto md:mx-0 '>

              {
                loading ?
                  <p>Loading Auth</p>
                  :
                  user != null ?
                    <>
                      {fetchingUserLoader ?
                        <p>Fetching User</p>
                        :
                        <div className='flex flex-col gap-2 w-fit'>
                          <p className='text-xs flex '><FaUser size={15} />&nbsp;<b>{user.email}</b></p>
                          <Button className='font-bold' variant='secondary' onClick={() => router.push('/app')}>
                            {userData == null ? ' Create Page' : 'Open Editor'}
                          </Button>
                          <Button className='font-bold' variant='default' onClick={() => router.push('/app')}>
                            Logout
                          </Button>
                        </div>
                      }
                    </>
                    :
                    <div className=''>
                      <h3 className='font-semibold text-lg md:text-3xl w-1/2 mx-auto'>Sign Up Now To Start Building Your Page</h3>
                      <Button className='mt-6 text-sm md:text-lg' onClick={() => { signInWithFirebase() }}><FaGoogle /> &nbsp;&nbsp; Sign In With Google  </Button>
                      <p className='text-xs mt-2'>*No Credit Card Required</p>
                    </div>
              }

              {


              }
            </div>

          </div>
          <div className='h-fit my-auto'>
            <LiteYouTubeEmbed
              id="yqWX86uT5jM"
              title="Coming Soon"
            />
          </div>
        </div>
        <div className='absolute block animate-arrow-bounce bottom-16 left-1/2 -translate-x-1/2'><BiDownArrowAlt className='block' size={40} /></div>

      </section >

      <section className='bg-black text-white '>
        <h2 className='text-center md:text-left  text-3xl md:text-5xl  leading-normal font-semibold'>
          What Is&nbsp;

          <span className='block md:inline px-4 relative  mx-auto w-fit'>
            <span aria-hidden='true' className='absolute w-full block left-1/2 -translate-x-1/2 inset-0 -rotate-1 bg-white '>
            </span>
            <span className=' invert z-[10]'>Platform.Me ?</span>
          </span>

        </h2>
        <p className='text-center md:text-left text-lg md:text-lg mt-6 font-light'>You can create a page for yourself where you can showcase <b> yourself</b> /<b> your business</b> /<b> your portfolio</b> by sharing your page&apos;s link.
          <br />
          <br />
          If you need a page for yourself ASAP, <b>Platform.Me</b> is here
        </p>
      </section>

      <section className='bg-black shadow-[inset_0px_50px_50px_-50px_#303030] text-white'>
      <h2 className='font-semibold text-3xl md:text-5xl md:text-center leading-normal'>What Can It Be Used For ?  </h2>
        <p className='md:text-center text-lg md:text-xl mt-6 font-medium'>You can build these <span className='bg-black text-white px-2 py-1'> instantly</span></p>
        <div className='flex flex-wrap md:justify-center gap-3 mt-12'>
          <div className='bg-black flex gap-2 text-white p-4 py-2 rounded-xl w-fit border border-[#404040]'>
            <PiSuitcase className='my-auto' />
            <p className='font-medium'>Validate Your New Business Idea</p>
          </div>

          <div className='bg-black flex gap-2 text-white p-4 py-2 rounded-xl w-fit border border-[#404040]'>
            <BiCodeAlt className='my-auto' />
            <p className='font-medium'>Developer Portfolio</p>
          </div>

          <div className='bg-black flex gap-2 text-white p-4 py-2 rounded-xl w-fit border border-[#404040]'>
            <RiCamera3Line className='my-auto' />
            <p className='font-medium'>To Showcase Your Photography</p>
          </div>

          <div className='bg-black flex gap-2 text-white p-4 py-2 rounded-xl w-fit border border-[#404040]'>
            <BsSunglasses className='my-auto' />
            <p className='font-medium'>Model Portfolio</p>
          </div>

          <div className='bg-black flex gap-2 text-white p-4 py-2 rounded-xl w-fit border border-[#404040]'>
            <CgFileAdd className='my-auto' />
            <p className='font-medium'>Lead Generation (Coming Soon)</p>
          </div>
          <div className='bg-black flex gap-2 text-white p-4 py-2 rounded-xl w-fit border border-[#404040]'>
            <IoShareSocialOutline className='my-auto' />
            <p className='font-medium'>Share Social Media Links</p>
          </div>

        </div>

      </section >

      <section className='bg-black text-white'>
        <h2 className='font-bold text-3xl md:text-5xl md:text-center leading-normal'>Why Us ? </h2>
        <ul className="list-disc mt-4">
          <div className="grid md:grid-cols-2 md:gap-y-2">
            <li className='text-lg md:text-xl mt-6 font-medium'>Easy Drag & Drop Layout</li>
            <li className='text-lg md:text-xl mt-6 font-medium'>Completely Free</li>
            <li className='text-lg md:text-xl mt-6 font-medium'>Need Not Worry About Page Going Down if Inactive</li>
          </div>
        </ul>
      </section >
    </>

  );
}

function HomeHeader() {
  return (

    <section className='mix-blend-difference fixed  text-white  top-0 left-0 right-0 py-4 z-[9999]'>

      <div className='flex gap-x-2 align-middle'>

        <Image
          width={30}
          height={30}
          src='/assets/logos/logo-secondary.png'
        />
      </div>

    </section>

  )
}
