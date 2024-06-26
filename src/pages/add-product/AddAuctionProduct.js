import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import axios from 'axios'

const AddAuctionProduct = () => {
    const { namenow } = useParams()
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [dataProduct, setDataProduct] = useState([])
    const [dataAuctionNow, setDataAuctionNow] = useState([])

    useEffect(() => {
        !isLogin.status && navigate('/')
    }, [isLogin, navigate])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/game-name-select`)
            .then((response) => {
                if (response.data.status) {
                    setData(response.data.payload)
                }
            })
        axios.get(`${process.env.REACT_APP_API}/read-redeem-code`)
            .then((response) => {
                if (response.data.status) {
                    setDataProduct(response.data.payload)
                }
            })
        axios.get(`${process.env.REACT_APP_API}/read-general-product-name/${namenow}`)
            .then((response) => {
                if (response.data.status) {
                    setDataAuctionNow(response.data.payload[0])
                }
            })
    }, [namenow])

    const [auctionProductList, setAuctionProductList] = useState({
        productId: '', gameName: '',
        name: '', defaultPrice: '',
        defaultBid: '', startTime: '',
        endTime: '', information: '',
        description: ''
    })

    const setAuctionProductProductId = (productId) => {
        dataProduct.map((value) => {
            if (value.product_id === productId.target.value)
                setAuctionProductList({ ...auctionProductList, productId: productId.target.value, name: value.name, description: value.description })
        })
    }

    const setAuctionProductGameName = (gameName) => {
        setAuctionProductList({ ...auctionProductList, gameName: gameName.target.value })
    }

    const setAuctionProductName = (name) => {
        setAuctionProductList({ ...auctionProductList, name: name.target.value })
    }

    const setAuctionProductDefaultPrice = (defaultPrice) => {
        setAuctionProductList({ ...auctionProductList, defaultPrice: defaultPrice.target.value })
    }

    const setAuctionProductDefaultBid = (defaultBid) => {
        setAuctionProductList({ ...auctionProductList, defaultBid: defaultBid.target.value })
    }

    const setAuctionProductStartTime = (startTime) => {
        setAuctionProductList({ ...auctionProductList, startTime: startTime.target.value })
    }

    const setAuctionProductEndTime = (endTime) => {
        setAuctionProductList({ ...auctionProductList, endTime: endTime.target.value })
    }

    const setAuctionProductInformation = (information) => {
        setAuctionProductList({ ...auctionProductList, information: information.target.files[0] })
    }

    const setAuctionProductDescription = (description) => {
        setAuctionProductList({ ...auctionProductList, description: description.target.value })
    }

    const alertSuccess = (title, text, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: text,
            icon: 'success',
            confirmButtonText: confirmButtonText
        })
    }

    const alertError = (title, text, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: text,
            icon: 'error',
            confirmButtonText: confirmButtonText
        })
    }

    const alertWarning = (title, text, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            confirmButtonText: confirmButtonText
        })
    }

    const handleAddAuctionProduct = (event) => {
        event.preventDefault()
        if (namenow === undefined && ((auctionProductList.productId === '') || (auctionProductList.gameName === '') || (auctionProductList.name === '') || (auctionProductList.defaultPrice === '') || (auctionProductList.defaultBid === '') || (auctionProductList.startTime === '') || (auctionProductList.endTime === '') || (auctionProductList.description === ''))) {
            alertWarning('คำเตือน', 'กรุณากรอกข้อมูลให้ครบ', 'ตกลง')
        } else if (namenow !== undefined && ((auctionProductList.defaultPrice === '') || (auctionProductList.defaultBid === '') || (auctionProductList.startTime === '') || (auctionProductList.endTime === '') )) {
            alertWarning('คำเตือน', 'กรุณากรอกข้อมูลให้ครบ', 'ตกลง')
        }
        else {
            const formData = new FormData()
            formData.append('productId', auctionProductList.productId === '' ? dataAuctionNow.product_id : auctionProductList.productId)
            formData.append('gameName', auctionProductList.gameName === '' ? dataAuctionNow.game_name : auctionProductList.gameName)
            formData.append('name', auctionProductList.name === '' ? dataAuctionNow.name : auctionProductList.name)
            formData.append('defaultPrice', auctionProductList.defaultPrice)
            formData.append('defaultBid', auctionProductList.defaultBid)
            formData.append('startTime', auctionProductList.startTime)
            formData.append('endTime', auctionProductList.endTime)
            formData.append('file', auctionProductList.information)
            formData.append('description', auctionProductList.description === '' ? dataAuctionNow.description : auctionProductList.description)
            axios.post(`${process.env.REACT_APP_API}/create-auction-product`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            })
                .then((response) => {
                    if (response.data.status) {
                        alertSuccess('สำเร็จ', response.data.payload, 'ตกลง')
                        navigate('/product-management')
                    } else {
                        alertWarning('คำเตือน', response.data.payload, 'ตกลง')
                    }
                })
                .catch((error) => {
                    alertError('ผิดพลาด', `เพิ่มสินค้าประมูลล้มเหลว`, 'ตกลง')
                })
        }

    }

    return (
        <div>
            <MetaHeader title={`เพิ่มสินค้าประมูล`} />
            <Navigation />
            <TitleBox title={'เพิ่มสินค้าประมูล'} />
            {
                namenow === undefined ?
                    <form onSubmit={handleAddAuctionProduct} className='items-end mx-auto mt-10 mb-10 form-control justify-evenly size-fit'>
                        <div className='flex flex-row items-center justify-end mt-2 size-full'>
                            <span className='mr-10 text-2xl text-nowrap'>ชื่อเกม</span>
                            <select defaultValue='เลือกชื่อเกม' onChange={setAuctionProductGameName} className="select w-80 bg-shadow-grey text-dshadow-black">
                                <option disabled>เลือกชื่อเกม</option>
                                {data.map((game) => <option key={game.game_name}>{game.game_name}</option>)}
                            </select>
                        </div>
                        <div className='flex flex-row items-center justify-end mt-2 size-full'>
                            <span className='mr-10 text-2xl text-nowrap'>รหัสสินค้า</span>
                            <select defaultValue='เลือกรหัสสินค้า' onChange={setAuctionProductProductId} className="select w-80 bg-shadow-grey text-shadow-black">
                                <option disabled >เลือกรหัสสินค้า</option>
                                {
                                    dataProduct.map((value) =>
                                        value.game_name === auctionProductList.gameName &&
                                        <option key={value.product_id}>{value.product_id}</option>)
                                }
                            </select>
                        </div>
                        <div className='flex flex-row items-center justify-end mt-2 size-full'>
                            <span className='mr-10 text-2xl text-nowrap'>ชื่อสินค้า</span>
                            <input value={auctionProductList.name} type={'text'} placeholder='ชื่อสินค้า' onChange={setAuctionProductName} className='input w-80 bg-shadow-grey text-dshadow-black' />
                        </div>

                        <div className='flex flex-row items-center justify-end mt-2 size-full'>
                            <span className='mr-10 text-2xl text-nowrap'>ราคาเริ่มต้น</span>
                            <input value={auctionProductList.defaultPrice} type={'text'} placeholder='ราคาเริ่มต้น' onChange={setAuctionProductDefaultPrice} className='input w-80 bg-shadow-grey text-dshadow-black' />
                        </div>
                        <div className='flex flex-row items-center justify-end mt-2 size-full'>
                            <span className='mr-10 text-2xl text-nowrap'>ประมูลพื้นฐานครั้งละ</span>
                            <input value={auctionProductList.defaultBid} type={'text'} placeholder='ประมูลพื้นฐานครั้งละ' onChange={setAuctionProductDefaultBid} className='input w-80 bg-shadow-grey text-dshadow-black' />
                        </div>
                        <div className='flex flex-row items-center justify-end mt-2 size-full'>
                            <span className='mr-10 text-2xl text-nowrap'>เวลาเริ่มต้น</span>
                            <input type={'datetime-local'} onChange={setAuctionProductStartTime} className='input w-80 bg-shadow-grey text-dshadow-black' />
                        </div>
                        <div className='flex flex-row items-center justify-end mt-2 size-full'>
                            <span className='mr-10 text-2xl text-nowrap'>เวลาสิ้นสุด</span>
                            <input type={'datetime-local'} onChange={setAuctionProductEndTime} className='input w-80 bg-shadow-grey text-dshadow-black' />
                        </div>
                        <div className='flex flex-row items-center justify-end mt-2 size-full'>
                            <span className='mr-10 text-2xl text-nowrap'>รูปภาพ</span>
                            <input type={'file'} onChange={setAuctionProductInformation} className='file-input w-80 bg-shadow-grey text-dshadow-black' />
                        </div>
                        <div className='flex flex-row items-center justify-end mt-2 size-full'>
                            <span className='mr-10 text-2xl text-nowrap'>รายละเอียด</span>
                            <textarea value={auctionProductList.description} type={'text'} placeholder='รายละเอียด' onChange={setAuctionProductDescription} className='textarea w-80 bg-shadow-grey text-dshadow-black' />
                        </div>
                        <div className='flex flex-row items-center mt-2 size-full'>
                            <button type='submit' className='mr-5 border-none btn grow bg-shadow-success hover:bg-shadow-hsuccess text-shadow-white'>ยืนยันการเพิ่มสินค้าประมูล</button>
                            <Link to='/product-management' className='border-none btn grow bg-shadow-error hover:bg-shadow-herror text-shadow-white'>ยกเลิกการเพิ่มสินค้าประมูล</Link>
                        </div>
                    </form> :
                    <form onSubmit={handleAddAuctionProduct} className='items-end mx-auto mt-10 mb-10 form-control justify-evenly size-fit'>
                        <div className='flex flex-row items-center justify-end mt-2 size-full'>
                            <span className='mr-10 text-2xl text-nowrap'>ชื่อเกม</span>
                            <select defaultValue={dataAuctionNow.game_name} onChange={setAuctionProductGameName} className="select w-80 bg-shadow-grey text-dshadow-black">
                                <option>{dataAuctionNow.game_name}</option>
                            </select>
                        </div>
                        <div className='flex flex-row items-center justify-end mt-2 size-full'>
                            <span className='mr-10 text-2xl text-nowrap'>รหัสสินค้า</span>
                            <select defaultValue={dataAuctionNow.product_id} onChange={setAuctionProductProductId} className="select w-80 bg-shadow-grey text-shadow-black">
                                <option>{dataAuctionNow.product_id}</option>
                            </select>
                        </div>
                        <div className='flex flex-row items-center justify-end mt-2 size-full'>
                            <span className='mr-10 text-2xl text-nowrap'>ชื่อสินค้า</span>
                            <input value={dataAuctionNow.name} type={'text'} placeholder='ชื่อสินค้า' onChange={setAuctionProductName} className='input w-80 bg-shadow-grey text-dshadow-black' />
                        </div>

                        <div className='flex flex-row items-center justify-end mt-2 size-full'>
                            <span className='mr-10 text-2xl text-nowrap'>ราคาเริ่มต้น</span>
                            <input value={auctionProductList.defaultPrice} type={'text'} placeholder='ราคาเริ่มต้น' onChange={setAuctionProductDefaultPrice} className='input w-80 bg-shadow-grey text-dshadow-black' />
                        </div>
                        <div className='flex flex-row items-center justify-end mt-2 size-full'>
                            <span className='mr-10 text-2xl text-nowrap'>ประมูลพื้นฐานครั้งละ</span>
                            <input value={auctionProductList.defaultBid} type={'text'} placeholder='ประมูลพื้นฐานครั้งละ' onChange={setAuctionProductDefaultBid} className='input w-80 bg-shadow-grey text-dshadow-black' />
                        </div>
                        <div className='flex flex-row items-center justify-end mt-2 size-full'>
                            <span className='mr-10 text-2xl text-nowrap'>เวลาเริ่มต้น</span>
                            <input type={'datetime-local'} onChange={setAuctionProductStartTime} className='input w-80 bg-shadow-grey text-dshadow-black' />
                        </div>
                        <div className='flex flex-row items-center justify-end mt-2 size-full'>
                            <span className='mr-10 text-2xl text-nowrap'>เวลาสิ้นสุด</span>
                            <input type={'datetime-local'} onChange={setAuctionProductEndTime} className='input w-80 bg-shadow-grey text-dshadow-black' />
                        </div>
                        <div className='flex flex-row items-center justify-end mt-2 size-full'>
                            <span className='mr-10 text-2xl text-nowrap'>รูปภาพ</span>
                            <input type={'file'} onChange={setAuctionProductInformation} className='file-input w-80 bg-shadow-grey text-dshadow-black' />
                        </div>
                        <div className='flex flex-row items-center justify-end mt-2 size-full'>
                            <span className='mr-10 text-2xl text-nowrap'>รายละเอียด</span>
                            <textarea value={dataAuctionNow.description} type={'text'} placeholder='รายละเอียด' onChange={setAuctionProductDescription} className='textarea w-80 bg-shadow-grey text-dshadow-black' />
                        </div>
                        <div className='flex flex-row items-center mt-2 size-full'>
                            <button type='submit' className='mr-5 border-none btn grow bg-shadow-success hover:bg-shadow-hsuccess text-shadow-white'>ยืนยันการเพิ่มสินค้าประมูล</button>
                            <Link to='/product-management' className='border-none btn grow bg-shadow-error hover:bg-shadow-herror text-shadow-white'>ยกเลิกการเพิ่มสินค้าประมูล</Link>
                        </div>
                    </form>
            }

        </div>
    )
}

export default AddAuctionProduct