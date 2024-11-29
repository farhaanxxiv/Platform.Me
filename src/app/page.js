'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useAtom } from 'jotai'
import { LuMousePointer } from "react-icons/lu";

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
import Link from 'next/link';
import { TbJewishStar } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa6";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
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

  const features = [{
    "heading": 'E-Commerce',
    "paragraph": 'Nulla dolore sunt aliquip amet aliqua qui ipsum velit quis consequat.',
    "bullets": [
      'Add Products',
      'Customers can enquire through Whatsapp/E-Mail',
      'Product/Search Analytics',
      'Inventory Management',
      'Payment Gateway Integration',
      'Weekly Reports'
    ]

  },
  {
    "heading": 'Theme Customization',
    "paragraph": 'Dolor pariatur minim commodo proident adipisicing est laboris ipsum sint minim consequat ipsum.',
    "bullets": [
      'Add Products',
      'Customers can enquire through Whatsapp/E-Mail',
      'Product/Search Analytics',
      'Inventory Management',
      'Payment Gateway Integration',
      'Weekly Reports'
    ]

  }]


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

  const TEXTS = ['Business 🏢', 'Portfolio 🗄️', 'Ads 💹', 'Website 💻'];

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


  const primaryColor = '#ffffff'
  const secondaryColor = '#bbecff'
  const alpha = 40
  const background = {
    background: `radial-gradient(circle at 50% 0%, ${secondaryColor}${alpha},${primaryColor},${primaryColor})`
  }

  const gridBG = {
    backgroundColor: '#ffffff',
    opacity: 1,
    backgroundImage: `
      linear-gradient(#f1f1f1 3.1px, transparent 3.1px), 
      linear-gradient(to right, #f1f1f1 3.1px, #ffffff 3.1px)
    `,
    backgroundSize: '62px 62px',
  }

  const gradientStyle = {
    background: 'rgb(241,238,131)',
    background: 'linear-gradient(90deg, rgba(241,238,131,1) 0%, rgba(255,211,192,1) 21%, rgba(220,254,188,1) 42%, rgba(187,236,255,1) 62%, rgba(226,198,255,1) 86%)',
    filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#f1ee83",endColorstr="#e2c6ff",GradientType=1)',

  }

  const patternStyle = {
    backgroundColor: '#ffffff',
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000000' fill-opacity='0.16' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E\")",
  };


  return (

    <>
      <HomeHeader />
      {/* <BackgroundLines /> */}

      <section style={background} className='h-[100vh] pt-[6rem] first text-center   bg-white text-black  relative overflow-hidden'>

        <div style={patternStyle} className="h-[100vh]  w-full absolute top-1/2 left-0 right-0 -translate-y-1/2 z-0 "></div>
        {/* <svg className='opacity-[0.1] absolute -top-[100%] md:-top-[60%] left-0 rotate-[-180deg]' width="598" height="764" viewBox="0 0 598 764" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M597.754 7.28092C489.053 -9.28692 256.037 0.134947 193.576 170.365C115.5 383.153 309.856 553.552 1.21313 762.398" stroke="black" stroke-width="3" />
        </svg>

        <svg className='opacity-[0.1] absolute -bottom-[90%] md:-bottom-[60%] right-0 rotate-[-180deg]' width="598" height="764" viewBox="0 0 598 764" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M597.754 7.28092C489.053 -9.28692 256.037 0.134947 193.576 170.365C115.5 383.153 309.856 553.552 1.21313 762.398" stroke="black" stroke-width="3" />
        </svg> */}
        {/* absolute  -translate-x-1/2 -translate-y-1/2 */}

        <div className='w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid  gap-6 '>
          {/* <div className='absolute inset-x-0 -top-20 flex items-start justify-center h-screen w-full overflow-hidden blur-3xl left-1/2 -translate-x-1/2'>
            <svg viewBox="0 0 6039 6264" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20 max-h-[60%] mt-[-100px]"><path d="M3866.32 4124.5L5487.32 5048L6038.32 4780.5L5324.82 4287.5L0.815676 0L2367.32 3119.5L3995.82 6263.5H4619.82L3866.32 4124.5Z" fill="#ffffff"></path></svg>
          </div> */}

          <div className=' w-fit mx-auto space-y-6 md:space-y-8 relative h-fit'>

            {/* <h1 className='md:mt-0 flex bg-pastel-yellow px-3 py-1 rounded-full border-2 border-black font-semibold text-xs mb-4 w-fit mx-auto md:mx-0'>
              <span className='text-black'>Platform.Me</span>
            </h1> */}
            <div className="space-y-10 md:space-y-12 gap-x-4 text-blackstroke-2">

              <h2 className="w-fit mx-auto text-5xl md:text-7xl font-semibold md:font-normal"> <span className="relative font-heading italic">&nbsp;&nbsp;&nbsp;Fastest
                <div className="absolute -left-5 lg:-left-2 top-2 md:top-6 translate-y-2 lg:translate-y-1.5 translate-x-2 w-6 h-6 md:h-8 flex flex-col justify-evenly">
                  <div className="animate-move-left-right odd:animate-move-left-right-odd h-0.5 w-full bg-pastel-purple"></div>
                  <div className="animate-move-left-right odd:animate-move-left-right-odd h-0.5 w-full bg-emerald-500"></div>
                  <div className="animate-move-left-right odd:animate-move-left-right-odd h-0.5 w-full bg-[#ffbfa3]"></div>
                  <div className="animate-move-left-right odd:animate-move-left-right-odd h-0.5 w-full bg-[#9ce3ff]"></div>
                </div>
              </span><br className="md:" /> No-Code<br /> <span className="hidden md:inline font-heading">Website</span>  <p className="inline-block border-2 border-dotted border-black leading-[1] md:leading-[0.8] mt-2 md:mt-0 p-2 md:p-0 md:pb-1 bg-pastel-yellow font-heading relative"> <span className="font-heading md:hidden"> Website</span> <br className="md:hidden" />Builder <LuMousePointer fill="black" className="w-7 md:w-10 absolute -bottom-5 -right-4 md:-bottom-12 md:-right-8" /></p></h2>
              {/* <br /> */}
              {/* <h3 className='font-inherit font-base'> 60 Seconds</h3> */}
              <div className=' relative text-lg md:text-xl  font-semibold before: [&_*]:!font-inherit w-fit mx-auto font-heading'>The best way to Launch
                <TextTransition className=' block md:mt-0 w-fit mx-auto rounded-full font-medium px-2 text-2xl translate-y-1' springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition>
              </div>
            </div>

            <div className=' w-fit mx-auto '>

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

                          <Link href='/app' className='block w-full' >
                            <Button className=' font-bold w-full' variant='default'>
                              {userData == null ? 'Create Page' : 'Open Editor'}
                            </Button>                          </Link>

                          <Button className='font-bold bg-white border-2 border-black' variant='secondary' onClick={() => auth.signOut()}>
                            Logout
                          </Button>
                        </div>
                      }
                    </>
                    :
                    <div className='mt-8'>
                      <h3 className='font-semibold text-lg md:text-xl '>Sign Up Now & Start Building Your Page</h3>
                      <Button variant='default' className='mt-4 text-sm md:text-md' onClick={() => { signInWithFirebase() }}><FaGoogle /> &nbsp;&nbsp; Sign In With Google  </Button>
                      <p className='text-xs mt-2'>*No Credit Card Required</p>
                    </div>
              }


            </div>

          </div>
          <div className='h-fit my-auto'>


          </div>
        </div>

      </section >

      <section className='bg-pastel-blue text-black border-2 border-black'>
        <div className='grid md:grid-cols-2 gap-x-6 gap-y-6'>
          <div className="h-fit my-auto">
            <h2 className='text-center md:text-left  text-3xl md:text-5xl  leading-normal font-semibold'>
              What Is&nbsp;
              <span className='font-inherit block md:inline px-4 relative  mx-auto w-fit'>
                <span aria-hidden='true' className='font-inherit absolute w-full block left-1/2 -translate-x-1/2 inset-0 -rotate-1 bg-black '>
                </span>
                <span className='font-inherit  invert z-[10]'>Platform.Me ?</span>
              </span>

            </h2>


          </div>
          <div>
            {/* <Image
              width={1600}
              height={900}
              // style={gridBG}
              className='w-[80%] rounded-3xl object-cover block my-auto h-fit'
              src={'/assets/images/hero-tp.png'}
            /> */}
            <p className='text-center text-sm md:text-left md:text-md lg:text-lg mt-6 font-medium'>
              Platform.Me is your personal space on the web where you can showcase who you are, what you do, or what you create. Whether you&apos;re an entrepreneur, a creative professional, or someone who wants a unique online presence, Platform.Me helps you build a stunning page in minutes.
            </p>
          </div>
          {/* <div className='flex flex-wrap gap-3 justify-center md:justify-left'>
            <p className='text-sm md:text-lg shadow-[2px_2px_black] select-none hover:bg-black hover:text-white transition whitespace-nowrap h-fit bg-white rounded-md p-1 px-2 w-fit border border-black '>Highlight Your Achievements</p>
            <p className='text-sm md:text-lg shadow-[2px_2px_black] select-none hover:bg-black hover:text-white transition whitespace-nowrap h-fit bg-white rounded-md p-1 px-2 w-fit border border-black '>Showcase Your Business Offerings</p>
            <p className='text-sm md:text-lg shadow-[2px_2px_black] select-none hover:bg-black hover:text-white transition whitespace-nowrap h-fit bg-white rounded-md p-1 px-2 w-fit border border-black '>Create a Professional Portfolio</p>
            <p className='text-sm md:text-lg shadow-[2px_2px_black] select-none hover:bg-black hover:text-white transition whitespace-nowrap h-fit bg-white rounded-md p-1 px-2 w-fit border border-black '>Share Contact Details with Ease</p>
            <p className='text-sm md:text-lg shadow-[2px_2px_black] select-none hover:bg-black hover:text-white transition whitespace-nowrap h-fit bg-white rounded-md p-1 px-2 w-fit border border-black '>Express Your Unique Style</p>
          </div> */}

        </div>
        {/* <ResponsiveGridLayout
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

        </ResponsiveGridLayout > */}


      </section>

      <section className="bg-white">

        <div className="grid gap-y-10  md:grid-cols-2 md:gap-x-12 lg:gap-x-4 mt-10 gap-4  max-w-full">
          <div className="h-fit my-auto">
            <h2 className="text-3xl md:text-5xl font-semibold">Websites created with Platform.me</h2>
          </div>

          <div className="max-w-[85dvw] md:max-w-full mx-auto">
            <Carousel className="bg-pastel-green w-full min-w-full px-4 md:px-0">
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className=''>
                    <Link className="group overflow-hidden rounded-lg" href={'https://www.google.com'} target="_blank">
                      <div className="relative  p-4  pt-8 rounded-lg  border-[#c0c0c0] ">
                        <div className="group-hover:md:top-0  border-black backdrop-blur-md transition-all absolute top-[105%] left-0 right-0 bottom-0 w-full h-full z-20  rounded-lg">
                          <div className="w-full h-full relative">
                            <div className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                              <Button className="font-semibold text-white">Open Website</Button>
                            </div>
                          </div>
                        </div>
                        <FaArrowRight size={25} className="z-30 -rotate-45 absolute top-4 right-4" />

                        <Image
                          height={700}
                          width={1200}
                          src='/assets/images/hero-tp.png'
                        />
                        <p className="text-center mt-3 font-semibold text-sm bg-white text-black p-1 px-3 rounded w-fit mx-auto">Local Fashion Store</p>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
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
          <div className='bg-black flex gap-2 text-white p-4 py-2 rounded-xl w-fit border border-[#404040]'>
            <TbJewishStar className='my-auto' />
            <p className='font-medium'>Wish List</p>
          </div>
        </div>

      </section >

      <section className="overflow-visible">
        <div className="grid lg:grid-cols-3 gap-y-6 gap-x-6 h-full">
          <div className="relative shrink-0 h-full min-h-full">
            <h2 className="underline decoration-pastel-blue h-fit sticky top-20 left-0 text-3xl md:text-5xl font-semibold">What&apos;s Included?</h2>
          </div>
          <div className="space-y-4 col-span-2">

            <div className="sticky top-16 lg:relative border border-black p-8 bg-pastel-green space-y-5">
              <h2 className="text-2xl md:text-4xl font-semibold">E-Commerce</h2>
              <p className="">
                Dolor pariatur minim commodo proident adipisicing est laboris ipsum sint minim consequat ipsum.
              </p>

              <div className="space-y-2 ">
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Add Products</p>
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Product/Search Analytics</p>
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Customers can enquire through Whatsapp/E-Mail</p>
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Inventory Management</p>
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Payment Gateway Integration</p>
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Weekly Reports</p>
              </div>

              <Image
                height={200}
                width={100}
                className="absolute w-[4rem] md:w-[8rem] bottom-0 right-0"
                src='/assets/images/e-commerce.png'
              />

            </div>

            <div className="sticky top-20 lg:relative border border-black p-8 bg-pastel-cream space-y-5">
              <h2 className="text-2xl md:text-4xl font-semibold">Theme Customization</h2>
              <p className="mt-2">
                Dolor pariatur minim commodo proident adipisicing est laboris ipsum sint minim consequat ipsum.
              </p>

              <div className="space-y-2 ">
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Add your Brand Colors</p>
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Choose from Themes</p>
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Font and Typography Control</p>
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Home and Product Pages</p>
              </div>

              <Image
                height={200}
                width={100}
                className="absolute w-[3rem] md:w-[6rem] bottom-0 right-0"
                src='/assets/images/theme.png'
              />
            </div>

            <div className="sticky top-24 lg:relative border border-black p-8 bg-pastel-purple space-y-5">
              <h2 className="text-2xl md:text-4xl font-semibold">No-code</h2>
              <p className="mt-2">
                Dolor pariatur minim commodo proident adipisicing est laboris ipsum sint minim consequat ipsum.
              </p>

              <div className="space-y-2 ">
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Drag and Drop Elements</p>
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Elements like Forms, Images, Videos and more</p>
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Real-time Preview</p>
              </div>
              <Image
                height={200}
                width={100}
                className="absolute w-[4rem] md:w-[6rem] bottom-0 right-0"
                src='/assets/images/drag-and-drop.png'
              />
            </div>

          </div>

        </div>
      </section>

      <section className='bg-pastel-purple border-2 border-black text-black'>
        <h2 className='font-bold text-3xl md:text-5xl md:text-center leading-normal'>What makes us different?</h2>
        <div className="mt-0 md:mt-12">
          <div className="mt-4 grid lg:grid-cols-8 gap-6 lg:gap-12">
            <div className='text-lg mt-6 font-medium space-y-4 lg:col-span-4'>

              <h3 className="text-2xl md:text-3xl font-semibold  decoration-pastel-blue"> Easy Drag & Drop Layout</h3>
              <p className='text-black text-sm md:text-base'>
                Easily customize your website with our intuitive drag and drop interface.
              </p>
              <video className="border-2 bg-[#d1a6ff] p-3 w-full aspect-video border-black" src="/assets/videos/drag-n-drop.mp4" loop autoPlay muted playsInline></video>

            </div>
            <div className='text-lg mt-6 font-medium space-y-4 lg:col-span-4'>

              <h3 className="text-2xl md:text-3xl font-semibold ">Optional mobile and desktops layouts</h3>
              <p className='text-black text-sm md:text-base'>
                Preview and adjust your design for different screen sizes in a single click.
              </p>
              <video className="border-2 bg-[#d1a6ff] p-3 w-full aspect-video border-black" src="/assets/videos/responsive.mp4" loop autoPlay muted playsInline></video>

            </div>
            <div className='text-lg mt-6 font-medium space-y-4 lg:col-span-4'>

              <h3 className="text-2xl md:text-3xl font-semibold underline decoration-pastel-purple">Need Not Worry About Page Going Down if Inactive</h3>
              <p className='text-black text-sm md:text-base'>
                Our platform ensures your website stays up and running, even when you&apos;re not actively using it.
              </p>
              <Image src="/assets/images/uptime-2.png" width={500} height={500} className="w-[40%] h-fit block mx-auto py-12" />
            </div>

          </div>
        </div>
      </section >

      <section className="flex flex-col md:flex-row shrink-0 gap-x-6 gap-y-6">
        <h2 className="text-3xl md:text-5xl font-semibold"> FAQ&apos;S</h2>
        <Accordion type="single" collapsible className="-mt-3 w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </>

  );
}

function HomeHeader() {
  return (

    <section className=' fixed  text-black  top-0 left-0 right-0 py-4 z-[9999] backdrop-blur-lg'>

      <div className='flex gap-x-2 align-middle'>

        <Image
          width={30}
          height={30}
          src='/assets/logos/logo-primary.png'
        />
        <p className="font-semibold my-auto">Platform.Me</p>
      </div>

    </section>

  )
}
