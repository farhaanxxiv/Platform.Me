import { NextResponse } from "next/server";
import { db } from "@/app/layout";
import { collection, getDocs, query, where } from "firebase/firestore";
import Layout from "@/firebase/Layout";


// To handle a GET request to /api
export async function GET(request, { params }) {
  // Do whatever you want

  const { slug } = params

  const pagesRef = collection(db, "Pages");
  const pageQuery = query(pagesRef, where("slug", "==", slug));
  const querySnapshot = await getDocs(pageQuery);

  if (querySnapshot.empty) {
    return NextResponse.json('No Such User', { status: 404 });
  }

  let pageData;
  querySnapshot.forEach(doc => {
    pageData = doc.data();
  });
  console.log('pageData :', pageData);

  const opLayout = Layout.replaceTrueWithFalse(pageData.layout);
  const opPage = pageData.page
  const opUserId = pageData.page_id

  const data = {
    layout: opLayout,
    page: opPage,
    userId: opUserId
  }

  return NextResponse.json(data, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}