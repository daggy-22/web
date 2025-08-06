import { NextResponse } from "next/server";

const registrationPaths = [
  {
    id: 1,
    title: "Register via Website",
    description: "Visit our website, fill in your details, and complete KYC to get started.",
    buttonText: "Register",
    link: "/register",
  },
  {
    id: 2,
    title: "Visit a Partner Merchant",
    description: "No smartphone? No problem. Visit a nearby Kifiya Partner Merchant to register and complete your KYC in-person with assistance from the merchant.",
    buttonText: "Search for merchant",
    link: "#",
  },
  {
    id: 3,
    title: "Download the App",
    description: "Download the Kifiya Customer App on your smartphone, complete the registration and KYC process, and apply for financing.",
    buttonText: "Download App",
    link: "#",
  },
];

export async function GET() {
  return NextResponse.json(registrationPaths);
}
