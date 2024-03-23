import axios from "axios"



const DropDown = ({ data,type,setData }) => {


    const setSelectOptions = (options) => {
        if(options.target.value === 'เรียงสินค้าใหม่ - เก่า'){
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
        else if(options.target.value === 'เรียงสินค้าเก่า - ใหม่'){
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
        else if(options.target.value === 'เรียงราคาสูง - ต่ำ'){
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
        else if(options.target.value === 'เรียงราคาต่ำ - สูง'){
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
    }
    
    

    return (
        <div className="dropdown dropdown-hover ">
            <select className="m-1 text-md select w-52 btn bg-shadow-white border-shadow-pink text-shadow-pink hover:border-shadow-pink/80 hover:bg-shadow-white" onChange={setSelectOptions}>
                <option className="flex items-center p-2 align-middle text-md btn bg-shadow-white text-shadow-pink hover:text-shadow-white hover:bg-shadow-pink" >เรียงสินค้าใหม่ - เก่า</option>
                <option className="flex items-center p-2 align-middle text-md btn bg-shadow-white text-shadow-pink hover:text-shadow-white hover:bg-shadow-pink" >เรียงสินค้าเก่า - ใหม่</option>
                <option className="flex items-center p-2 align-middle text-md btn bg-shadow-white text-shadow-pink hover:text-shadow-white hover:bg-shadow-pink" >เรียงราคาสูง - ต่ำ</option>
                <option className="flex items-center p-2 align-middle text-md btn bg-shadow-white text-shadow-pink hover:text-shadow-white hover:bg-shadow-pink" >เรียงราคาต่ำ - สูง</option>
                
            </select>
            
        </div>
    )
}

export default DropDown