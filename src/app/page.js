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
import { FaBookOpen, FaConnectdevelop, FaGoogle, FaGraduationCap, FaPlus } from 'react-icons/fa';
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
import { LoadingSpinner } from "@/components/ui/spinner";
import { TbNorthStar } from "react-icons/tb";

export default function Home() {

  return (
    <AuthProvider>
      <LayoutManagerProvider>
        <HomeComponent />
      </LayoutManagerProvider>
    </AuthProvider>
  )
}

import { MdStorefront } from "react-icons/md";
import { GiMusicalNotes } from "react-icons/gi";

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

  const useCases = [
    {
      icon: PiSuitcase,
      title: 'Validate Your Business Idea',
      description: 'Quickly create a professional landing page to test market interest and collect early customer feedback.'
    },
    {
      icon: BiCodeAlt,
      title: 'Developer Portfolio',
      description: 'Showcase your projects, skills, and professional journey with a stunning, easy-to-update portfolio.'
    },
    {
      icon: RiCamera3Line,
      title: 'Photography Showcase',
      description: 'Create a visually stunning gallery to display your photography work and attract potential clients.'
    },
    {
      icon: BsSunglasses,
      title: 'Model & Creative Portfolio',
      description: 'Build a professional portfolio to highlight your visual work and personal brand.'
    },
    {
      icon: CgFileAdd,
      title: 'Lead Generation',
      description: 'Design high-converting landing pages with integrated forms to capture and nurture potential leads.'
    },
    {
      icon: IoShareSocialOutline,
      title: 'Centralized Link Hub',
      description: 'Create a single page to share all your social media, contact, and professional links.'
    },
    {
      icon: FaGraduationCap,
      title: 'Online Course Landing',
      description: 'Promote your educational content, workshops, and online courses with a professional page.'
    },
    {
      icon: MdStorefront,
      title: 'Small Business Website',
      description: 'Establish an online presence with a simple, elegant website for local businesses and startups.'
    },
    {
      icon: FaBookOpen,
      title: 'Personal Blog/Writer Portfolio',
      description: 'Publish your writing, showcase your work, and build your personal brand as a content creator.'
    },
    {
      icon: GiMusicalNotes,
      title: 'Artist & Musician Profiles',
      description: 'Design a professional site to showcase your music, tour dates, and connect with fans.'
    },
    {
      icon: FaConnectdevelop,
      title: 'Freelancer Professional Page',
      description: 'Create a comprehensive profile highlighting your services, skills, and professional achievements.'
    },
    {
      icon: FaPlus,
      title: 'And More...',
      description: 'Create a comprehensive profile highlighting your services, skills, and professional achievements.'
    }
  ];

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

      <section style={background} className='h-[90vh] md:h-[100vh] pt-[6rem] first text-center   bg-white text-black  relative overflow-hidden'>

        <div style={patternStyle} className="h-[90vh] md:h-[100vh]  w-full absolute top-1/2 left-0 right-0 -translate-y-1/2 z-0 "></div>


        <div className='w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid  gap-6 '>


          <div className=' w-fit mx-auto space-y-6 md:space-y-8 relative h-fit'>


            <div className="space-y-10 md:space-y-12 gap-x-4 text-blackstroke-2">

              <h2 className="w-fit mx-auto text-5xl md:text-7xl font-semibold md:font-normal"> <span className="relative font-heading italic">&nbsp;&nbsp;&nbsp;Fastest
                <div className="absolute -left-5 lg:-left-2 top-2 md:top-6 translate-y-4 lg:translate-y-3 translate-x-2 w-6 h-6 md:h-8 flex flex-col justify-evenly">
                  <div className="animate-move-left-right odd:animate-move-left-right-odd h-0.5 w-full bg-pastel-purple"></div>
                  <div className="animate-move-left-right odd:animate-move-left-right-odd h-0.5 w-full bg-emerald-500"></div>
                  <div className="animate-move-left-right odd:animate-move-left-right-odd h-0.5 w-full bg-[#ffbfa3]"></div>
                  <div className="animate-move-left-right odd:animate-move-left-right-odd h-0.5 w-full bg-[#9ce3ff]"></div>
                </div>
              </span><br className="md:" /> No-Code<br /> <span className="hidden md:inline font-heading">Website</span>  <p className="inline-block border-2 border-dotted border-black leading-[1] md:leading-[0.8] mt-2 md:mt-0 p-2 md:p-0 md:pb-1 bg-pastel-yellow font-heading relative"> <span className="font-heading md:hidden"> Website</span> <br className="md:hidden" />Builder <LuMousePointer fill="black" className="w-7 md:w-10 absolute -bottom-5 -right-4 md:-bottom-12 md:-right-8" /></p></h2>

              <p className="w-[90%] mx-auto md:w-full font-semibold text-lg leading-relaxed">Create stunning <span className="bg-pastel-green text-black px-1"> websites</span>, <span className="bg-pastel-cream text-black px-1">portfolios</span>, <span className="bg-pastel-purple text-black px-1"> stores</span>, and <span className="bg-orange-300 text-black px-1"> blogs</span> - <span className="bg-pastel-blue "> all in one place</span></p>
              {/* <div className=' relative text-lg md:text-xl  font-semibold before: [&_*]:!font-inherit w-fit mx-auto font-heading'>The best way to Launch
                <TextTransition className=' block md:mt-0 w-fit mx-auto rounded-full font-medium px-2 text-2xl translate-y-1' springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition>
              </div> */}

            </div>
            <Link className="block" href={'#home-login'}>
              <Button>Get Started</Button>
            </Link>
          </div>

        </div>
        <div className='absolute block animate-arrow-bounce bottom-16 left-1/2 -translate-x-1/2'><BiDownArrowAlt className='block' size={40} /></div>

      </section >

      <section className='bg-pastel-blue text-black border-black relative'>
        <div className='grid md:grid-cols-5 gap-x-6 gap-y-6'>
          <div className="h-fit my-auto md:col-span-3">
            <h2 className='text-center md:text-left  text-3xl md:text-5xl  leading-normal font-semibold'>
              What Is&nbsp;
              <span className='font-inherit block md:inline px-4 relative  mx-auto w-fit'>
                <span aria-hidden='true' className='font-inherit absolute w-full block left-1/2 -translate-x-1/2 inset-0 -rotate-1 bg-black '>
                </span>
                <span className='font-inherit  invert z-[10]'>Platform.Me ?</span>
              </span>

            </h2>
            <p className='text-center text-sm md:text-left md:text-md lg:text-lg mt-6 font-medium'>
              Platform.Me is your personal space on the web where you can showcase who you are, what you do, or what you create. Whether you&apos;re an entrepreneur, a creative professional, or someone who wants a unique online presence, Platform.Me helps you build a stunning page in minutes.
            </p>

          </div>


          <div className="absolute bottom-full md:bottom-[120%]" id="home-login"></div>
          <div className="w-fit mx-auto text-center h-fit my-auto  md:col-span-2">
            {(!loading && user != null && !fetchingUserLoader) || (!loading && user == null) &&
              <>
                <p className="font-semibold text-2xl"> {user != null && !fetchingUserLoader ? 'Continue Building' : 'Start Creating Today'} </p>
                <Image
                  width={100}
                  height={200}
                  src={'/assets/images/arrow.png'}
                  className="w-4 block mx-auto"
                />
              </>
            }

            <div className=' w-fit mx-auto h-fit my-auto border-2 border-black p-4 rounded bg-white'>
              {
                loading ?

                  <p className="flex gap-x-2"><LoadingSpinner /> Loading Auth  </p>
                  :
                  user != null ?
                    <>
                      {fetchingUserLoader ?
                        <p className="flex gap-x-2"><LoadingSpinner />Fetching User</p>
                        :
                        <>

                          <div className='flex flex-col gap-2 w-fit h-fit'>
                            <p className='text-xs flex '><FaUser size={15} />&nbsp;<b>{user.email}</b></p>

                            <Link href='/app' className='block w-full' >
                              <Button className=' font-bold w-full' variant='default'>
                                {userData == null ? 'Create Page' : 'Open Editor'}
                              </Button>                          </Link>

                            <Button className='font-bold bg-white border-2 border-black' variant='secondary' onClick={() => auth.signOut()}>
                              Logout
                            </Button>
                          </div>
                        </>
                      }
                    </>
                    :
                    <div className=' h-fit w-fit mx-auto flex flex-col justify-center text-center'>
                      {/* <p className='font-semibold text-lg md:text-xl '>Easy Sign Up</p> */}
                      <Button variant='default' className=' mx-auto w-fit mt-1 md:mt-2 text-base md:text-md' onClick={() => { signInWithFirebase() }}><FaGoogle /> &nbsp;&nbsp; Sign In With Google  </Button>
                      <p className='text-xs mt-2'>*No Credit Card Required</p>
                    </div>
              }


            </div>
            {/* <div className='flex flex-wrap gap-3 justify-center md:justify-left'>
            <p className='text-sm md:text-lg shadow-[2px_2px_black] select-none hover:bg-black hover:text-white transition whitespace-nowrap h-fit bg-white rounded-md p-1 px-2 w-fit border border-black '>Highlight Your Achievements</p>
            <p className='text-sm md:text-lg shadow-[2px_2px_black] select-none hover:bg-black hover:text-white transition whitespace-nowrap h-fit bg-white rounded-md p-1 px-2 w-fit border border-black '>Showcase Your Business Offerings</p>
            <p className='text-sm md:text-lg shadow-[2px_2px_black] select-none hover:bg-black hover:text-white transition whitespace-nowrap h-fit bg-white rounded-md p-1 px-2 w-fit border border-black '>Create a Professional Portfolio</p>
            <p className='text-sm md:text-lg shadow-[2px_2px_black] select-none hover:bg-black hover:text-white transition whitespace-nowrap h-fit bg-white rounded-md p-1 px-2 w-fit border border-black '>Share Contact Details with Ease</p>
            <p className='text-sm md:text-lg shadow-[2px_2px_black] select-none hover:bg-black hover:text-white transition whitespace-nowrap h-fit bg-white rounded-md p-1 px-2 w-fit border border-black '>Express Your Unique Style</p>
          </div> */}
          </div>

          <div className="md:col-span-5 mt-8">
            <Image
              height={700}
              width={1200}
              src='/assets/images/hero-tp.png'
              className="block mx-auto md:w-1/2"
            />
          </div>
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

      <section className="bg-[#f7f3ef] border-t border-b border-black">

        <div className="grid gap-y-10  md:grid-cols-2 md:gap-x-16 lg:gap-x-4 mt-10 gap-4  max-w-full">
          <div className="h-fit my-auto">
            <span className="bg-pastel-yellow w-fit py-0.5 rounded-full px-3 border border-black flex gap-x-2 "> <TbNorthStar size={20} className=" my-auto" />Unleash Your Creativity</span>
            <h2 className="text-3xl md:text-5xl font-semibold mt-4">Websites created with Platform.me</h2>
          </div>

          <div className="max-w-[85dvw] md:w-[80%] mx-auto md:ml-auto">
            <Carousel className="bg-white border border-black rounded w-full min-w-full px-4 md:px-0">
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
                        {/* <FaArrowRight size={25} className="z-30 -rotate-45 absolute bottom-4 right-4" /> */}

                        <Image
                          height={700}
                          width={1200}
                          src='/assets/images/sleek-store.png'
                          className="aspect-video object-center object-cover rounded"
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

      <section className='bg-pastel-green text-black border-black'>
        <h2 className='font-semibold text-3xl md:text-5xl md:text-center leading-normal'>What Can It Be Used For ?  </h2>
        <p className='md:text-center text-base md:text-md lg:text-lg mt-3 md:mt-6 font-medium'>You can build these <span className='bg-black text-white  px-1'>instantly</span></p>
        <div className='flex flex-wrap md:justify-center gap-3 mt-12'>
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className='hover:cursor-default bg-white flex items-start gap-2 text-black p-1 px-2 rounded-md border border-[#404040] hover:shadow-lg transition-all duration-300'
            >
              <useCase.icon className='block my-auto text-xl flex-shrink-0' />
              <p className='font-normal text-base '>{useCase.title}</p>
              {/* <p className='text-sm text-gray-600'>{useCase.description}</p> */}
            </div>
          ))}
        </div>

      </section >

      <section className="overflow-visible">
        <div className="grid lg:grid-cols-3 gap-y-6 gap-x-6 h-full">
          <div className="relative shrink-0 h-full min-h-full">
            <h2 className="underline decoration-pastel-blue h-fit sticky top-20 left-0 text-3xl md:text-5xl font-semibold">What&apos;s Included?</h2>
          </div>
          <div className="space-y-4 col-span-2">

            {/* E-Commerce Section */}
            <div className="shadow-[5px_5px_#e2c6ff] sticky top-16 lg:top-0 lg:relative border border-black p-8 bg-[#fafafa] space-y-5">
              <h2 className="text-2xl md:text-4xl font-semibold">E-Commerce</h2>
              <p>
                Build and manage your online store effortlessly with powerful tools designed for modern businesses.
              </p>

              <div className="space-y-2">
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Add Products</p>
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Product/Search Analytics</p>
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Customers can enquire through WhatsApp/E-Mail</p>
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Inventory Management</p>
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Payment Gateway Integration</p>
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Weekly Reports</p>
              </div>

              <Image
                height={200}
                width={100}
                className="border bg-pastel-purple p-2 absolute w-[4rem] md:w-[6rem] top-0 !mt-0 right-0"
                src='/assets/images/e-commerce.png'
              />
            </div>

            {/* Theme Customization Section */}
            <div className="shadow-[5px_5px_#ffd3c0] sticky top-20 lg:top-0 lg:relative border border-black p-8 bg-[#fafafa] space-y-5">
              <h2 className="text-2xl md:text-4xl font-semibold">Theme Customization</h2>
              <p className="mt-2">
                Personalize your website’s look and feel to match your brand identity with ease.
              </p>

              <div className="space-y-2">
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Add Your Brand Colors</p>
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Choose from Pre-made Themes</p>
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Font and Typography Control</p>
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Customize Home and Product Pages</p>
              </div>

              <Image
                height={200}
                width={100}
                className="bg-pastel-cream p-2 absolute w-[4rem] md:w-[6rem] top-0 !mt-0 right-0"
                src='/assets/images/games.png'
              />
            </div>

            {/* No-Code Section */}
            <div className="shadow-[5px_5px_#f1ee83] sticky top-24 lg:top-0 lg:relative border border-black p-8 bg-[#fafafa] space-y-5">
              <h2 className="text-2xl md:text-4xl font-semibold">No-Code Builder</h2>
              <p className="mt-2">
                Empower yourself to create stunning websites without writing a single line of code.
              </p>

              <div className="space-y-2">
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Drag and Drop Elements</p>
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Add Forms, Images, Videos, and More</p>
                <p className="flex gap-x-2 text-sm md:text-base"><FaArrowRight size={15} className="block translate-y-1" />Real-time Preview of Changes</p>
              </div>

              <Image
                height={200}
                width={100}
                className="bg-pastel-yellow p-2 absolute w-[4rem] md:w-[6rem] top-0 !mt-0 right-0"
                src='/assets/images/drag-and-dropp.png'
              />
            </div>

          </div>
        </div>
      </section>

      <section className='bg-pastel-skin border border-black text-black'>
        <h2 className='font-bold text-3xl md:text-5xl text-center leading-normal'>
          Powerful Features, Seamless Experience.
        </h2>
        <p className="text-center mt-3 md:mt-6 font-normal">Explore the tools designed to simplify website creation, ensure reliability, and enhance flexibility across all devices.</p>
        <div className="mt-8 md:mt-16">
          <div className="grid lg:grid-cols-8 gap-6 lg:gap-8">
            <div className='bg-white  text-lg font-medium lg:col-span-5'>

              <h3 className="text-2xl border border-black md:text-3xl bg-[#202020] text-white py-2 pb-3 px-3 font-semibold"> Easy Drag & Drop Layout</h3>
              <div className="px-3 border border-black">
                <p className='my-4 mb-3 text-black text-base md:text-base font-semibold'>
                  Easily customize your website with our intuitive drag and drop interface.
                </p>
                <video className=" bg-white  w-full aspect-video border-black" src="/assets/videos/drag-n-drop.mp4" loop autoPlay muted playsInline></video>
              </div>
            </div>
            <div className='bg-white h-fit  text-lg  font-medium lg:col-span-3'>

              <h3 className="text-2xl border border-black md:text-3xl bg-[#202020] text-white py-2 pb-3 px-3 font-semibold">
                Need Not Worry About Page Going Down if Inactive
              </h3>
              <div className="px-3 border border-black">
                <p className='my-4 mb-3 text-black text-base md:text-base font-semibold'>
                  Our platform ensures your website stays up and running, even when you&apos;re not actively using it.

                </p>
                <Image src="/assets/images/uptime-2.png" width={500} height={500} className="w-[40%] h-fit block mx-auto py-12" />
              </div>
            </div>
            <div className='bg-white text-lg  font-medium lg:col-span-4'>

              <h3 className="text-2xl border border-black md:text-3xl bg-[#202020] text-white py-2 pb-3 px-3 font-semibold">
                Optional mobile and desktops layouts
              </h3>
              <div className="px-3 border border-black">
                <p className='my-4 mb-3 text-black text-base md:text-base font-semibold'>
                  Preview and adjust your design for different screen sizes in a single click.
                </p>
                <video className=" bg-white  w-full aspect-video border-black" src="/assets/videos/responsive.mp4" loop autoPlay muted playsInline></video>
              </div>
            </div>


          </div>
        </div>
      </section >

      {/* <section className="flex flex-col md:flex-row shrink-0 gap-x-6 gap-y-6">
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
      </section> */}
      <HomeFooter />

    </>

  );
}

function HomeHeader() {
  return (

    <section className=' fixed mix-blend-difference  text-white  top-0 left-0 right-0 py-4 z-[9999] '>

      <div className='flex gap-x-2 align-middle'>

        <Image
          width={30}
          height={30}
          src='/assets/logos/logo-secondary.png'
        />
        <p className="font-semibold my-auto">Platform.Me</p>
      </div>

    </section>

  )
}

function HomeFooter() {
  return (

    <section className='  text-white  bg-[#151515] space-y-12'>

      <div className="grid lg:grid-cols-5 gap-y-12">
        <h2 className=" lg:col-span-3 font-semibold text-4xl"> Helping you build powerful websites effortlessly</h2>
        <div className="h-fit my-auto lg:col-span-2">
          <Link className="text-lg" href={'#home-login'}>
            Get Started
          </Link>
        </div>
      </div>
      <div className="h-0.5 bg-white w-full"></div>
      <div className="grid lg:grid-cols-5 gap-y-12">

        <div className='flex gap-x-2 align-middle lg:col-span-3'>

          <Image
            width={70}
            height={70}
            src='/assets/logos/logo-secondary.png'
          />
          <p className="font-semibold text-3xl my-auto">Platform.Me</p>
        </div>
        <div className="lg:col-span-2 h-fit my-auto">
          <p className="text-lg">© Platform.Me 2024</p>
        </div>
      </div>
    </section>

  )
}
