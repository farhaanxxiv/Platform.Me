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
import { BackgroundLines } from '@/components/home/BackgroundLines';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';
import GridLayout from 'react-grid-layout';
import BentoImage from '@/components/app/navbars/BentoElements/Image';
import BentoSocial from '@/components/app/navbars/BentoElements/BentoSocial';
import BentoHeadingParagraph from '@/components/app/navbars/BentoElements/BentoHeadingParagraph';

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


  const ResponsiveGridLayout = WidthProvider(GridLayout);

  const paragraphLayout = {
    "id": "bento-1732289856963-y1TAk",
    "type": "heading_paragraph",
    "heading": "",
    "paragraph": "",
    "button_link": "",
    "button_text": "",
    "layout": {
      "desktop": {
        "w": 7,
        "h": 6,
        "x": 0,
        "y": 60,
        "i": "bento-1732289856963-y1TAk",
        "minW": 1,
        "maxW": 12,
        "minH": 1,
        "maxH": 100000,
        "moved": false,
        "static": false,
        "isDraggable": true,
        "isResizable": "",
        "resizeHandles": [
          "s",
          "w",
          "e",
          "n"
        ],
        "isBounded": true
      },
      "mobile": {
        "w": 7,
        "h": 6,
        "x": 0,
        "y": 9999,
        "i": "bento-1732289856963-y1TAk",
        "moved": false,
        "static": false,
        "minW": 1,
        "maxW": 12,
        "minH": 1,
        "maxH": 100000,
        "isBounded": true,
        "isDraggable": true,
        "isResizable": "",
        "resizeHandles": [
          "s",
          "w",
          "e",
          "n"
        ]
      }
    }
  }

  const instagramLayout = {
    "layout": {
      "desktop": {
        "w": 6,
        "h": 4,
        "x": 0,
        "y": 28,
        "i": "bento-1723046823616-LgL0q",
        "minW": 1,
        "maxW": 12,
        "minH": 1,
        "maxH": 100000,
        "moved": false,
        "static": false,
        "isDraggable": true,
        "isResizable": "",
        "resizeHandles": [
          "s",
          "w",
          "e",
          "n",
          "sw",
          "nw",
          "se",
          "ne"
        ],
        "isBounded": true
      },
      "mobile": {
        "h": 4,
        "resizeHandles": [
          "s",
          "w",
          "e",
          "n",
          "sw",
          "nw",
          "se",
          "ne"
        ],
        "static": false,
        "i": "bento-1723046823616-LgL0q",
        "maxW": 12,
        "minH": 1,
        "moved": false,
        "isBounded": true,
        "minW": 1,
        "isResizable": "",
        "maxH": 100000,
        "w": 4,
        "y": 33,
        "isDraggable": true,
        "x": 0
      }
    },
    "social_media": "instagram",
    "type": "social",
    "id": "bento-1723046823616-LgL0q",
    "link": "https://www.instagram.com/xxiv.agency"
  }

  const imageLayout = {
    "layout": {
      "mobile": {
        "minW": 1,
        "x": 0,
        "y": 2,
        "h": 6,
        "i": "bento-1720270097744-SnVZg",
        "isDraggable": true,
        "isResizable": true,
        "resizeHandles": [
          "s",
          "w",
          "e",
          "n",
          "sw",
          "nw",
          "se",
          "ne"
        ],
        "static": false,
        "maxW": 12,
        "moved": false,
        "w": 7,
        "minH": 1,
        "maxH": 100000,
        "isBounded": true
      },
      "desktop": {
        "w": 4,
        "h": 14,
        "x": 8,
        "y": 0,
        "i": "bento-1720270097744-SnVZg",
        "minW": 1,
        "maxW": 12,
        "minH": 1,
        "maxH": 100000,
        "moved": false,
        "static": false,
        "isDraggable": true,
        "isResizable": true,
        "resizeHandles": [
          "s",
          "w",
          "e",
          "n",
          "sw",
          "nw",
          "se",
          "ne"
        ],
        "isBounded": true
      }
    },
    "src": "https://firebasestorage.googleapis.com/v0/b/platform-me-58583.appspot.com/o/BentoImages%2Fm0rvaklu-49cpx?alt=media&token=41331bca-107f-4f2c-bd88-da14ce275a3a",
    "cover": "cover",
    "id": "bento-1720270097744-SnVZg",
    "type": "image"
  }

  const [layout, setLayout] = useState([
    { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 }
  ]);


  return (


    <>
      <HomeHeader />
      {/* <BackgroundLines /> */}

      <section className='text-center md:text-left bg-black text-white  relative overflow-hidden'>

        {/* <svg className='opacity-[0.1] absolute -top-[100%] md:-top-[60%] left-0 rotate-[-180deg]' width="598" height="764" viewBox="0 0 598 764" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M597.754 7.28092C489.053 -9.28692 256.037 0.134947 193.576 170.365C115.5 383.153 309.856 553.552 1.21313 762.398" stroke="black" stroke-width="3" />
        </svg>

        <svg className='opacity-[0.1] absolute -bottom-[90%] md:-bottom-[60%] right-0 rotate-[-180deg]' width="598" height="764" viewBox="0 0 598 764" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M597.754 7.28092C489.053 -9.28692 256.037 0.134947 193.576 170.365C115.5 383.153 309.856 553.552 1.21313 762.398" stroke="black" stroke-width="3" />
        </svg> */}
        {/* absolute  -translate-x-1/2 -translate-y-1/2 */}

        <div className='grid md:grid-cols-2 gap-12 relative'>
          <div className='absolute inset-x-0 -top-20 flex items-start justify-center h-screen w-full overflow-hidden blur-3xl left-1/2 -translate-x-1/2'>
            <svg viewBox="0 0 6039 6264" fill="none" xmlns="http://www.w3.org/2000/svg" class="opacity-20 max-h-[60%] mt-[-100px]"><path d="M3866.32 4124.5L5487.32 5048L6038.32 4780.5L5324.82 4287.5L0.815676 0L2367.32 3119.5L3995.82 6263.5H4619.82L3866.32 4124.5Z" fill="#ffffff"></path></svg>
          </div>

          <div className=' top-1/2 left-1/2 w-full '>

            <h1 className='mt-6 md:mt-0 flex gradient-border-container-1 mb-4 w-fit mx-auto md:mx-0'>
              <span className=''>Platform.Me</span>
            </h1>
            <h2 className=" text-blackstroke-2 text-4xl md:text-6xl font-extrabold ">
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
                            {userData == null ? 'Create Page' : 'Open Editor'}
                          </Button>

                          <Button className='font-bold' variant='default' onClick={() => auth.signOut()}>
                            Logout
                          </Button>
                        </div>
                      }
                    </>
                    :
                    <div className='mt-8'>
                      <h3 className='font-semibold text-sm md:text-xl '>Instant Sign Up To Start Building Your Page</h3>
                      <Button variant='secondary' className='mt-4 text-sm md:text-md' onClick={() => { signInWithFirebase() }}><FaGoogle /> &nbsp;&nbsp; Sign In With Google  </Button>
                      <p className='text-xs mt-2'>*No Credit Card Required</p>
                    </div>
              }


            </div>

          </div>
          <div className='h-fit my-auto'>
            <Image
              width={1600}
              height={900}
              className='w-full object-cover block my-auto h-fit'
              src={'/assets/images/hero-image.png'}
            />
            {/* <LiteYouTubeEmbed
              id="yqWX86uT5jM"
              title="Coming Soon"
            /> */}
          </div>
        </div>
        {/* <div className='absolute block animate-arrow-bounce bottom-16 left-1/2 -translate-x-1/2'><BiDownArrowAlt className='block' size={40} /></div> */}

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
        <p className='text-center text-sm md:text-left md:text-md lg:text-lg mt-6 font-light'>You can create a page for yourself where you can showcase <b> yourself</b> /<b> your business</b> /<b> your portfolio</b> by sharing your page&apos;s link.
          <br />
          <br />
          If you need a page for yourself ASAP, <b>Platform.Me</b> is here
        </p>
        <ResponsiveGridLayout
          className={`layout mx-auto transition px-0 rounded-xl md:border-2 border-[#303030] overflow-hidden`}
          layout={layout}
          onLayoutChange={(newLayout) => setLayout(newLayout)}
          cols={12}
          rowHeight={30}
          draggableHandle=".draggable"
          draggableCancel='.bento-edit-btn'
          resizeHandles={['s', 'w', 'e', 'n']}
        >
          <div
            id={imageLayout.id}
            key={imageLayout.id}
            data-grid={bentoGrid}
            className={`border border-black draggable`} >
            <div className='scale-[0.96] w-full h-full'>
              <BentoImage img={imageLayout} />
            </div>
          </div>
          <div
            id={instagramLayout.id}
            key={instagramLayout.id}
            data-grid={bentoGrid}
            className={`border border-black draggable`} >
            <div className='scale-[0.96] w-full h-full'>
              <BentoSocial social={instagramLayout} />
            </div>
          </div>
          <div
            id={paragraphLayout.layout.mobile.id}
            key={paragraphLayout.layout.mobile.id}
            data-grid={paragraphLayout.layout.desktop}
            className={`border border-black draggable`} >
            <div className='scale-[0.96] w-full h-full'>
              <BentoHeadingParagraph section={paragraphLayout} />
            </div>
          </div>

        </ResponsiveGridLayout >


      </section>

      <section className='bg-black shadow-[inset_0px_50px_50px_-50px_#303030] text-white'>
        <h2 className='font-semibold text-3xl md:text-5xl md:text-center leading-normal'>What Can It Be Used For ?  </h2>
        <p className='md:text-center text-sm md:text-md lg:text-lg mt-3 md:mt-6 font-medium'>You can build these<span className='bg-black text-white py-1'> instantly</span></p>
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
        <div>
          <ul className="list-disc mt-4">
            <li className='text-lg mt-6 font-medium'>

              Easy Drag & Drop Layout
              <p className='text-[#d0d0d0] text-sm'>
                Easily customize your website with our intuitive drag and drop interface.
              </p>

            </li>

            <li className='text-lg mt-6 font-medium'>Completely Free
              <p className='text-[#d0d0d0] text-sm'>
                Our platform is 100% free to use, no hidden fees or subscriptions.

              </p>

            </li>
            <li className='text-lg mt-6 font-medium'>Need Not Worry About Page Going Down if Inactive
              <p className='text-[#d0d0d0] text-sm'>
                Our platform ensures your website stays up and running, even when you&apos;re not actively using it.
              </p>
            </li>
          </ul>
        </div>
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
