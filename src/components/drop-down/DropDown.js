import { configureStore } from "@reduxjs/toolkit"
import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import Card from "../card/Card"
import axios from "axios"


const DropDown = ({ data }) => {

    const [NewtoOld, setNewtoOld] = useState(0)
    const [OldtoNew, setOldtoNew] = useState(0)
    const [HightoLow, setHightoLow] = useState(0)
    const [LowtoHigh, setLowtoHigh] = useState(0)


    

    return (
        <div className="dropdown dropdown-hover ">
            <div tabIndex={0} role="button" className="m-1 w-52 btn bg-shadow-white border-shadow-pink text-shadow-pink hover:border-shadow-pink/80 hover:bg-shadow-white">เลือกดูสินค้า</div>
            <ul tabIndex={0} className="dropdown-content z-[1] shadow rounded-box shadow-shadow-pink menu w-52">
                <div className="flex items-center p-2 align-middle bg-shadow-white text-shadow-pink hover:text-shadow-white hover:bg-shadow-pink flex-nowrap"
                    
                >
                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">เรียงจาก ใหม่-เก่า</span>
                </div>
                <div className="flex items-center p-2 align-middle bg-shadow-white text-shadow-pink hover:text-shadow-white hover:bg-shadow-pink flex-nowrap">
                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">เรียงจาก เก่า-ใหม่</span>
                </div>
                <div className="flex items-center p-2 align-middle bg-shadow-white text-shadow-pink hover:text-shadow-white hover:bg-shadow-pink flex-nowrap">
                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">เรียงจาก ราคาสูง-ต่ำ</span>
                </div>
                <div className="flex items-center p-2 align-middle bg-shadow-white text-shadow-pink hover:text-shadow-white hover:bg-shadow-pink flex-nowrap">
                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">เรียงจาก ราคาต่ำ-สูง</span>
                </div>
            </ul>
        </div>
    )
}

export default DropDown