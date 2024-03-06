import { Link } from "react-router-dom"

const DropDown = () => {
    return (
        <div className="dropdown dropdown-hover ">
            <div tabIndex={0} role="button" className="m-1 w-52 btn bg-shadow-white border-shadow-pink text-shadow-pink hover:border-shadow-pink/80 hover:bg-shadow-white">เลือกดูสินค้า</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu w-52">
                <div to="/general-product" className="flex items-center p-2 align-middle bg-shadow-pink/50 text-shadow-pink hover:text-shadow-pink hover:bg-shadow-pink/20 flex-nowrap">
                    
                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">สินค้าใหม่ล่าสุด</span>
                </div>
                <div to="/promotion-product" className="flex items-center p-2 align-middle bg-shadow-pink/50 text-shadow-pink hover:text-shadow-pink hover:bg-shadow-pink/20 flex-nowrap">
                    
                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">สินค้าเก่าสุด</span>
                </div>
                <div to="/auction-product" className="flex items-center p-2 align-middle bg-shadow-pink/50 text-shadow-pink hover:text-shadow-pink hover:bg-shadow-pink/20 flex-nowrap">
                    
                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">สินค้าราคาสูง</span>
                </div>
                <div to="/gacha-product" className="flex items-center p-2 align-middle bg-shadow-pink/50 text-shadow-pink hover:text-shadow-pink hover:bg-shadow-pink/20 flex-nowrap">
                    
                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">สินค้าราคาต่ำ</span>
                </div>
            </ul>
        </div>
    )
}

export default DropDown