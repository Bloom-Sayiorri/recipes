import React from "react";
import image1 from "../image1.jpg";
import { BsEnvelopePaper, BsTelephoneInbound } from 'react-icons/bs'
import {
   FaMapMarkerAlt, FaMobileAlt, FaFacebookF, FaInstagram, FaTwitter
  }from 'react-icons/fa'

function About() {
  return (
    <div className="container mx-auto mt-8 mb-8 grid md-w-3/4 grid-cols-1 md:grid-cols-2 w-3/4">
      <div className="bg-white drop-shadow-2xl shadow-md rounded-md p-6 flex flex-col gap-10 w-full">
        <div>
          <h1 className="text-2xl font-bold mb-4">
            <div className= "flex flex-col justify-center items-center" >
            <span className="text-orange-600">Contact Info</span>
            </div>
        </h1>
        </div>
        <div>
        <div>
            <div className="flex items-center gap-2 mb-8">
                <div><FaMapMarkerAlt size={26} className="text-orange-500"/></div>
                <p>Ngong' Road Lane</p>
                <p>P.O. BOX 233, NAIROBI</p>
            </div>
            <div className="flex items-center gap-2 my-8">
                <div><BsEnvelopePaper size={26} className="text-orange-500"/></div>
                <p>recipeshare@gmail.com</p>
            </div>
            <div className="flex items-center gap-2 my-8">
                <div><BsTelephoneInbound size={26} className="text-orange-500"/></div>
                <p>001 200000000000</p>
            </div>
            <div className="flex items-center gap-2 my-8">
                <div><FaMobileAlt size={26} className="text-orange-500"/></div>
                <p>+2547 42064943</p>
            </div>
            <div className="flex gap-12 justify-end mt-72 ">
              <div className="flex gap-2 items-center">
                <FaFacebookF size={32} className="text-blue-700"/>Facebook
              </div>
              <div className="flex gap-2 items-center">
                <FaInstagram size={32} className="text-purple-500"/>Instagram
              </div>
              <div className="flex gap-2 items-center">
                <FaTwitter size={32} className="text-sky-400"/>Twitter
              </div>
            </div>
        </div>
        </div>
      </div>
        <img src={image1} alt="Recipe" className="w-full h-full object-cover" />
    </div>
  );
}

export default About;

