'use client'

import { useAtom } from 'jotai'

import { SectionIcon } from "@radix-ui/react-icons";
import Image from "next/image";
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


  return (


    <>
      <section>

        <h2 className="text-black text-4xl font-semibold text-center">Create Your Website In 60 Seconds</h2>

        <div className='mt-12 text-center'>

          {
            loading ?
              <p>Loading Auth</p>
              :
              user != null ?
                <>
                  {fetchingUserLoader ?
                    <p>Fetching User</p>
                    :

                    <Button onClick={() => router.push('/app')}>
                      {userData == null ? ' Create Page' : 'Continue Creating'}
                    </Button>

                  }
                </>
                :
                <div className=''>
                  <h3 className='font-semibold text-3xl'>Sign Up Now To Start Building Your Page</h3>
                  <Button className='mt-4' onClick={() => { signInWithFirebase() }}><FaGoogle /> &nbsp;&nbsp; Sign In With Google  </Button>

                </div>
          }

          {


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
