import axios from "axios"



const DropDown = ({ data,type,setData }) => {


    const handleNewToOld = () => {
        if (type === 'general' && data.length !== 0) {
            axios.get(`${process.env.REACT_APP_API}/read-general-product-new-to-old`)
                .then((response) => {
                    if (response.status) {
                        setData(response.data.payload)
                    }
                })
                .catch((error) => { })
        }else if (type === 'auction' && data.length !== 0) {
            axios.get(`${process.env.REACT_APP_API}/read-auction-product-new-to-old`)
                .then((response) => {
                    if (response.status) {
                        setData(response.data.payload)
                    }
                })
                .catch((error) => { })
        }else if (type === 'promotion' && data.length !== 0) {
            axios.get(`${process.env.REACT_APP_API}/read-promotion-product-new-to-old`)
                .then((response) => {
                    if (response.status) {
                        setData(response.data.payload)
                    }
                })
                .catch((error) => { })
        }else if (type === 'gacha' && data.length !== 0) {
            axios.get(`${process.env.REACT_APP_API}/read-gacha-product-new-to-old`)
                .then((response) => {
                    if (response.status) {
                        setData(response.data.payload)
                    }
                })
                .catch((error) => { })
        }
    }

    const handleOldToNew = () => {
        if (type === 'general' && data.length !== 0) {
            axios.get(`${process.env.REACT_APP_API}/read-general-product-old-to-new`)
                .then((response) => {
                    if (response.status) {
                        setData(response.data.payload)
                    }
                })
                .catch((error) => { })
        }else if (type === 'auction' && data.length !== 0) {
            axios.get(`${process.env.REACT_APP_API}/read-auction-product-old-to-new`)
                .then((response) => {
                    if (response.status) {
                        setData(response.data.payload)
                    }
                })
                .catch((error) => { })
        }else if (type === 'promotion' && data.length !== 0) {
            axios.get(`${process.env.REACT_APP_API}/read-promotion-product-old-to-new`)
                .then((response) => {
                    if (response.status) {
                        setData(response.data.payload)
                    }
                })
                .catch((error) => { })
        }else if (type === 'gacha' && data.length !== 0) {
            axios.get(`${process.env.REACT_APP_API}/read-gacha-product-old-to-new`)
                .then((response) => {
                    if (response.status) {
                        setData(response.data.payload)
                    }
                })
                .catch((error) => { })
        }
    }
    
    const handleHighToLow = () => {
        if (type === 'general' && data.length !== 0) {
            axios.get(`${process.env.REACT_APP_API}/read-general-product-expensive-to-cheap`)
                .then((response) => {
                    if (response.status) {
                        setData(response.data.payload)
                    }
                })
                .catch((error) => { })
        }else if (type === 'auction' && data.length !== 0) {
            axios.get(`${process.env.REACT_APP_API}/read-auction-product-expensive-to-cheap`)
                .then((response) => {
                    if (response.status) {
                        setData(response.data.payload)
                    }
                })
                .catch((error) => { })
        }else if (type === 'promotion' && data.length !== 0) {
            axios.get(`${process.env.REACT_APP_API}/read-promotion-product-expensive-to-cheap`)
                .then((response) => {
                    if (response.status) {
                        setData(response.data.payload)
                    }
                })
                .catch((error) => { })
        }else if (type === 'gacha' && data.length !== 0) {
            axios.get(`${process.env.REACT_APP_API}/read-gacha-product-expensive-to-cheap`)
                .then((response) => {
                    if (response.status) {
                        setData(response.data.payload)
                    }
                })
                .catch((error) => { })
        }
    }
    
    const handleLowToHigh = () => {
        if (type === 'general' && data.length !== 0) {
            axios.get(`${process.env.REACT_APP_API}/read-general-product-cheap-to-expensive`)
                .then((response) => {
                    if (response.status) {
                        setData(response.data.payload)
                    }
                })
                .catch((error) => { })
        }else if (type === 'auction' && data.length !== 0) {
            axios.get(`${process.env.REACT_APP_API}/read-auction-product-cheap-to-expensive`)
                .then((response) => {
                    if (response.status) {
                        setData(response.data.payload)
                    }
                })
                .catch((error) => { })
        }else if (type === 'promotion' && data.length !== 0) {
            axios.get(`${process.env.REACT_APP_API}/read-promotion-product-cheap-to-expensive`)
                .then((response) => {
                    if (response.status) {
                        setData(response.data.payload)
                    }
                })
                .catch((error) => { })
        }else if (type === 'gacha' && data.length !== 0) {
            axios.get(`${process.env.REACT_APP_API}/read-gacha-product-cheap-to-expensive`)
                .then((response) => {
                    if (response.status) {
                        setData(response.data.payload)
                    }
                })
                .catch((error) => { })
        }
    }

    return (
        <div className="dropdown dropdown-hover ">
            <div tabIndex={0} role="button" className="m-1 w-52 btn bg-shadow-white border-shadow-pink text-shadow-pink hover:border-shadow-pink/80 hover:bg-shadow-white">เลือกดูสินค้า</div>
            <ul tabIndex={0} className="dropdown-content z-[1] shadow rounded-box shadow-shadow-pink menu w-52">
                <div className="flex items-center p-2 align-middle btn bg-shadow-white text-shadow-pink hover:text-shadow-white hover:bg-shadow-pink flex-nowrap"
                    onClick={handleNewToOld}
                >
                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">เรียงจาก ใหม่-เก่า</span>
                </div>
                <div className="flex items-center p-2 align-middle btn bg-shadow-white text-shadow-pink hover:text-shadow-white hover:bg-shadow-pink flex-nowrap"
                    onClick={handleOldToNew}
                >
                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">เรียงจาก เก่า-ใหม่</span>
                </div>
                <div className="flex items-center p-2 align-middle btn bg-shadow-white text-shadow-pink hover:text-shadow-white hover:bg-shadow-pink flex-nowrap"
                    onClick={handleHighToLow}
                >
                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">เรียงจาก ราคาสูง-ต่ำ</span>
                </div>
                <div className="flex items-center p-2 align-middle btn bg-shadow-white text-shadow-pink hover:text-shadow-white hover:bg-shadow-pink flex-nowrap"
                    onClick={handleLowToHigh}
                >
                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">เรียงจาก ราคาต่ำ-สูง</span>
                </div>
            </ul>
        </div>
    )
}

export default DropDown