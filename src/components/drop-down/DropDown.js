import { configureStore } from "@reduxjs/toolkit"
import { useState, useEffect, useCallback} from "react"
import { Link } from "react-router-dom"
import Card from "../card/Card"
import axios from "axios"



const DropDown = ({ data,select }) => {
    
    
    const [NewtoOld, setNewtoOld] = useState([])
    const [OldtoNew, setOldtoNew] = useState(0)
    const [HightoLow, setHightoLow] = useState(0)
    const [LowtoHigh, setLowtoHigh] = useState(0)


    const handleNewToOld = () => {
        if (data.length != 0) {
            axios.get(`${process.env.REACT_APP_API}/read-general-product-new-to-old`)
                .then((response) => {
                    if (response.status) {
                        setNewtoOld(response.data.payload)
                    }
                })
                .catch((error) => { })
        }
        return <div>{select(NewtoOld)}</div>
    }

    const handleOldToNew = () => {
        if (data.length != 0) {
            axios.get(`${process.env.REACT_APP_API}/read-general-product-new-to-old`)
                .then((response) => {
                    if (response.status) {
                        setOldtoNew(response.data.payload)
                    }
                })
                .catch((error) => { })
        }
        return <div>{select(OldtoNew)}</div>
    }
    
    const handleHighToLow = () => {
        if (data.length != 0) {
            axios.get(`${process.env.REACT_APP_API}/read-general-product-new-to-old`)
                .then((response) => {
                    if (response.status) {
                        setHightoLow(response.data.payload)
                    }
                })
                .catch((error) => { })
        }
        return <div>{select(HightoLow)}</div>
    }
    
    const handleLowToHigh = () => {
        if (data.length != 0) {
            axios.get(`${process.env.REACT_APP_API}/read-general-product-new-to-old`)
                .then((response) => {
                    if (response.status) {
                        setLowtoHigh(response.data.payload)
                    }
                })
                .catch((error) => { })
        }
        return <div>{select(LowtoHigh)}</div>
    }

    return (
        <div className="dropdown dropdown-hover ">
            <div tabIndex={0} role="button" className="m-1 w-52 btn bg-shadow-white border-shadow-pink text-shadow-pink hover:border-shadow-pink/80 hover:bg-shadow-white">เลือกดูสินค้า</div>
            <ul tabIndex={0} className="dropdown-content z-[1] shadow rounded-box shadow-shadow-pink menu w-52">
                <div className="flex items-center p-2 align-middle bg-shadow-white text-shadow-pink hover:text-shadow-white hover:bg-shadow-pink flex-nowrap"
                    onClick={handleNewToOld}
                >
                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">เรียงจาก ใหม่-เก่า</span>
                </div>
                <div className="flex items-center p-2 align-middle bg-shadow-white text-shadow-pink hover:text-shadow-white hover:bg-shadow-pink flex-nowrap"
                    onClick={handleOldToNew}
                >
                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">เรียงจาก เก่า-ใหม่</span>
                </div>
                <div className="flex items-center p-2 align-middle bg-shadow-white text-shadow-pink hover:text-shadow-white hover:bg-shadow-pink flex-nowrap"
                    onClick={handleHighToLow}
                >
                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">เรียงจาก ราคาสูง-ต่ำ</span>
                </div>
                <div className="flex items-center p-2 align-middle bg-shadow-white text-shadow-pink hover:text-shadow-white hover:bg-shadow-pink flex-nowrap"
                    onClick={handleLowToHigh}
                >
                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">เรียงจาก ราคาต่ำ-สูง</span>
                </div>
            </ul>
        </div>
    )
}

export default DropDown