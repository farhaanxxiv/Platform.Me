'use client'

import { useAtom } from 'jotai'

import { SectionIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect } from "react";
import { PageCreationProvider } from "@/providers/PageCreationContext";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { userCompany, user_company } from '@/states/user_state';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react"
import { signIn } from 'next-auth/react';
import PageUtils from '@/utils/PageUtils';
import { FaGoogle } from 'react-icons/fa';

export default function Home() {

  const router = useRouter()
  const { data: session, status } = useSession();

  const [websiteName, setWebsiteName] = useAtom(user_company)

  const WebsiteNameSchema = Yup.object().shape({
    page_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('*Required')
  });

  const savedWebsiteData = localStorage.getItem('page_data');


  const formik = useFormik({
    initialValues: {
      page_name: ''
    },
    validationSchema: WebsiteNameSchema,
    onSubmit: values => {
      setWebsiteName(values.page_name)
      PageUtils.setPageName(values.page_name)
      try {
        router.push('/app')

      } catch (e) {
        console.log(e)
      }
    },
  });




  return (
    <>
      <section>

        <h2 className="text-black text-4xl font-semibold text-center">Create Your Website In 60 Seconds</h2>

        <div className='mt-12 text-center'>
          {
            savedWebsiteData ? <Button onClick={() => router.push('/app')}>Continue Building {JSON.parse(savedWebsiteData).page_name}</Button>
              :
              <div className=''>
                <h3 className='font-semibold text-3xl'>Sign Up Now To Start Building Your Page</h3>
                <Button className='mt-4' onClick={() => { signIn('google') }}><FaGoogle /> &nbsp;&nbsp; Sign In With Google  </Button>
              </div>
            // <form onSubmit={formik.handleSubmit}>
            //   <div className="flex gap-4 mt-4">
            //     <Input id="page_name"
            //       name="page_name"
            //       onChange={formik.handleChange}
            //       value={formik.values.page_name}
            //       type="text"
            //       placeholder="Enter Your Website Name" />
            //     <Button variant="outline" type='submit'>Submit</Button>
            //   </div>
            //   {formik.errors.page_name && formik.touched.page_name ? <div className="text-[red] text-xs mt-2">{formik.errors.page_name}</div> : null}

            // </form>
          }
        </div>
      </section >


      <section>
        <h2>Start Your Thing Today, without having to worry about having everything. We have it all at one place.</h2>
      </section>

      <section>
        <h2 className="text-3xl font-semibold">It has everything you require to start your website</h2>
        <ul className="list-disc mt-4">
          <div className="pl-4">
            <li>Page Analaytics (No.of Unique Visitors, )</li>
            <li>Easy Form Builder (With Analytics for Each Form)</li>
            <li>Create the website using Bento Layouts (For Both Desktop And Mobile)</li>
          </div>
        </ul>
      </section >

    </>
  );
}
