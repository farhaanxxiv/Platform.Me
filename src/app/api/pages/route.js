import { NextResponse } from "next/server";
import { db } from "@/app/layout";
import { collection, getDocs, query, where } from "firebase/firestore";


// To handle a GET request to /api
export async function GET(request) {

  const querySnapshot = await getDocs(collection(db, "Pages"));
  const allSlugs = [];

  if (querySnapshot.empty) {
    return NextResponse.json({ message: "No Pages Found" }, { status: 404 });

  }

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.slug) {
      allSlugs.push(data);
    }
  });

  return NextResponse.json(allSlugs, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}