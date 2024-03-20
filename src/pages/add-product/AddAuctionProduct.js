import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import axios from 'axios'

const AddAuctionProduct = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()
    const [data,setData] = useState([])

    useEffect(() => {
        !isLogin.status && navigate('/')
    }, [isLogin, navigate])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/game-name-select`)
        .then((response) => {
            if(response.data.status) {
                setData(response.data.payload)
            }
        })
    },[])

    const [auctionProductList, setAuctionProductList] = useState({
        productId:'', gameName:'',
        name:'', defaultPrice:'',
        defaultBid:'', startTime: '',
        endTime: '', information: '',
        description: ''
    })

    const setAuctionProductProductId = (productId) => {
        setAuctionProductList({...auctionProductList, productId:productId.target.value})
    }

    const setAuctionProductGameName = (gameName) => {
        setAuctionProductList({...auctionProductList, gameName:gameName.target.value})
    }

    const setAuctionProductName = (name) => {
        setAuctionProductList({...auctionProductList, name:name.target.value})
    }

    const setAuctionProductDefaultPrice = (defaultPrice) => {
        setAuctionProductList({...auctionProductList, defaultPrice:defaultPrice.target.value})
    }

    const setAuctionProductDefaultBid = (defaultBid) => {
        setAuctionProductList({...auctionProductList, defaultBid:defaultBid.target.value})
    }

    const setAuctionProductStartTime = (startTime) => {
        setAuctionProductList({...auctionProductList, startTime:startTime.target.value})
    }

    const setAuctionProductEndTime = (endTime) => {
        setAuctionProductList({...auctionProductList, endTime:endTime.target.value})
    }

    const setAuctionProductInformation = (information) => {
        setAuctionProductList({...auctionProductList, information:information.target.files[0]})
    }

    const setAuctionProductDescription = (description) => {
        setAuctionProductList({...auctionProductList, description:description.target.value})
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
        const formData = new FormData()
        formData.append('productId', auctionProductList.productId)
        formData.append('gameName', auctionProductList.gameName)
        formData.append('name', auctionProductList.name)
        formData.append('defaultPrice', auctionProductList.defaultPrice)
        formData.append('defaultBid', auctionProductList.defaultBid)
        formData.append('startTime', auctionProductList.startTime)
        formData.append('endTime', auctionProductList.endTime)
        formData.append('file', auctionProductList.information)
        formData.append('description', auctionProductList.description)
        axios.post(`${process.env.REACT_APP_API}/create-auction-product`, formData, {
            headers: {'Content-Type': 'multipart/form-data'},
            withCredentials: true
        })
        .then((response) => {
            if(response.data.status){
                alertSuccess('สำเร็จ', response.data.payload, 'ตกลง')
                navigate('/product-management')
            }else{
                alertWarning('คำเตือน', response.data.payload, 'ตกลง')
            }
        })
        .catch((error) => {
            alertError('ผิดพลาด', `เพิ่มสินค้าประมูลล้มเหลว`, 'ตกลง')
        })
    }

    return (
        <div>
            <MetaHeader title={`เพิ่มสินค้าประมูล`} />
            <Navigation />
            <TitleBox title={'เพิ่มสินค้าประมูล'} />
            <form onSubmit={handleAddAuctionProduct} className='items-end mx-auto mt-10 mb-10 form-control justify-evenly size-fit'>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>รหัสสินค้า</span>
                    <input value={auctionProductList.productId} type={'text'} placeholder='รหัสสินค้า' onChange={setAuctionProductProductId} className='input w-80 bg-shadow-grey text-dshadow-black'/>
                </div>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>ชื่อสินค้า</span>
                    <input value={auctionProductList.name} type={'text'} placeholder='ชื่อสินค้า' onChange={setAuctionProductName} className='input w-80 bg-shadow-grey text-dshadow-black'/>
                </div>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>ชื่อเกม</span>
                    <select defaultValue='เลือกชื่อเกม' onChange={setAuctionProductGameName} className="select w-80 bg-shadow-grey text-dshadow-black">
                        <option disabled>เลือกชื่อเกม</option>
                        {data.map((game) => <option key={game.game_name}>{game.game_name}</option>)}
                    </select>
                </div>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>ราคาเริ่มต้น</span>
                    <input value={auctionProductList.defaultPrice} type={'text'} placeholder='ราคาเริ่มต้น' onChange={setAuctionProductDefaultPrice} className='input w-80 bg-shadow-grey text-dshadow-black'/>
                </div>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>ประมูลพื้นฐานครั้งละ</span>
                    <input value={auctionProductList.defaultBid} type={'text'} placeholder='ประมูลพื้นฐานครั้งละ' onChange={setAuctionProductDefaultBid} className='input w-80 bg-shadow-grey text-dshadow-black'/>
                </div>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>เวลาเริ่มต้น</span>
                    <input type={'datetime-local'} onChange={setAuctionProductStartTime} className='input w-80 bg-shadow-grey text-dshadow-black'/>
                </div>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>เวลาสิ้นสุด</span>
                    <input type={'datetime-local'} onChange={setAuctionProductEndTime} className='input w-80 bg-shadow-grey text-dshadow-black'/>
                </div>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>รูปภาพ</span>
                    <input type={'file'} onChange={setAuctionProductInformation} className='file-input w-80 bg-shadow-grey text-dshadow-black'/>
                </div>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>รายละเอียด</span>
                    <textarea value={auctionProductList.description} type={'text'} placeholder='รายละเอียด' onChange={setAuctionProductDescription} className='textarea w-80 bg-shadow-grey text-dshadow-black'/>
                </div>
                <div className='flex flex-row items-center mt-2 size-full'>
                    <button type='submit' className='mr-5 border-none btn grow bg-shadow-success hover:bg-shadow-hsuccess text-shadow-white'>ยืนยันการเพิ่มสินค้าประมูล</button>
                    <Link to='/product-management' className='border-none btn grow bg-shadow-error hover:bg-shadow-herror text-shadow-white'>ยกเลิกการเพิ่มสินค้าประมูล</Link>
                </div>
            </form>
        </div>
    )
}

export default AddAuctionProduct