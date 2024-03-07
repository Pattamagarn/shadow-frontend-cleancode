import { useState,useEffect } from "react"


const DropDown = () => {

    const [filterNew,setFilterNew] = ([])
    const [filterOld,setFilterOld] = ([])
    const [filterMax,setFilterMax] = ([])
    const [filterMin,setFilterMin] = ([])
    
    const filterDataNew = () => {
        // console.log('new')
    }
    
    return (
        <div className="dropdown dropdown-hover ">
            <div tabIndex={0} role="button" className="m-1 w-52 btn bg-shadow-white border-shadow-pink text-shadow-pink hover:border-shadow-pink/80 hover:bg-shadow-white">เลือกดูสินค้า</div>
            <ul tabIndex={0} className="dropdown-content z-[1] shadow rounded-box shadow-shadow-pink menu w-52">
                <div className="flex items-center p-2 align-middle bg-shadow-white text-shadow-pink hover:text-shadow-white hover:bg-shadow-pink flex-nowrap"
                    onClick={filterDataNew}
                >
                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">สินค้าใหม่ล่าสุด</span>
                </div>
                <div  className="flex items-center p-2 align-middle bg-shadow-white text-shadow-pink hover:text-shadow-white hover:bg-shadow-pink flex-nowrap">
                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">สินค้าเก่าสุด</span>
                </div>
                <div  className="flex items-center p-2 align-middle bg-shadow-white text-shadow-pink hover:text-shadow-white hover:bg-shadow-pink flex-nowrap">
                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">สินค้าราคาสูง</span>
                </div>
                <div className="flex items-center p-2 align-middle bg-shadow-white text-shadow-pink hover:text-shadow-white hover:bg-shadow-pink flex-nowrap">
                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">สินค้าราคาต่ำ</span>
                </div>
            </ul>
        </div>
    )
}

export default DropDown