import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useState,useEffect } from 'react'
import { Link,useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import axios from 'axios'

const EditAuctionProduct = () => {
    const { uuid } = useParams()
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()
    const [data,setData] = useState([])
    const [dataAuction,setDataAuction] = useState([])

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 1 && navigate('/')
    }, [isLogin, navigate])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/game-name-select`)
        .then((response) => {
            if(response.data.status) {
                setData(response.data.payload)
            }
        })
    },[])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/read-auction-product-uuid/${uuid}`)
        .then((response) => {
            if (response.data.status) {
                setDataAuction(response.data.payload[0])
            }
        })
        .catch((error) => {
            console.log(error)
        })
        
    },[uuid])

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
        navigate('/product-management')
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

    const handleEditAuctionProduct = (event) => {
        event.preventDefault()
        if(typeof(auctionProductList.information) === 'object'){
            const formData = new FormData()
            formData.append('file', auctionProductList.information)
            formData.append('name', auctionProductList.name !== '' ? auctionProductList.name : dataAuction.name)
            formData.append('game_name', auctionProductList.gameName !== '' ? auctionProductList.gameName : dataAuction.game_name)
            formData.append('default_price', auctionProductList.defaultPrice !== '' ? auctionProductList.defaultPrice : dataAuction.default_price)
            formData.append('default_bid', auctionProductList.defaultBid !== '' ? auctionProductList.defaultBid : dataAuction.default_bid)
            formData.append('start_time', auctionProductList.startTime !== '' ? auctionProductList.startTime : dataAuction.start_time)
            formData.append('end_time', auctionProductList.endTime !== '' ? auctionProductList.endTime : dataAuction.end_time)
            formData.append('description', auctionProductList.description !== '' ? auctionProductList.description : dataAuction.description)
            axios.patch(`${process.env.REACT_APP_API}/update-auction-product-image/${uuid}`, formData, {
                headers: {'Content-Type': 'multipart/form-data'},
                withCredentials: true
            })
            .then((response) => {
                if(response.data.status){
                    alertSuccess("สำเร็จ",response.data.payload,'success')
                }
                else {
                    alertError('ผิดพลาด',response.data.payload,'error')
                }
            })
            .catch((error) => {
                alertError('ผิดพลาด','แก้ไขสินค้าประมูลล้มเหลว','error')
            })
        }else{
            axios.patch(`${process.env.REACT_APP_API}/update-auction-product/${uuid}`, {  
                name: auctionProductList.name !== '' ? auctionProductList.name : dataAuction.name,
                game_name: auctionProductList.gameName !== '' ? auctionProductList.gameName : dataAuction.game_name,
                default_price : auctionProductList.defaultPrice !== '' ? auctionProductList.defaultPrice : dataAuction.default_price,
                default_bid : auctionProductList.defaultBid !== '' ? auctionProductList.defaultBid : dataAuction.default_bid,
                start_time : auctionProductList.startTime !== '' ? auctionProductList.startTime : dataAuction.start_time,
                end_time : auctionProductList.endTime !== '' ? auctionProductList.endTime : dataAuction.end_time,
                information: auctionProductList.information !== '' ? auctionProductList.information : dataAuction.information,
                description: auctionProductList.description !== '' ? auctionProductList.description : dataAuction.description
            }).then((response) => {
                if (response.data.status) {
                    alertSuccess("สำเร็จ", response.data.payload, 'success')
                }
                else {
                    alertError('ผิดพลาด', response.data.payload, 'error')
                }
            })
            .catch((error) => {
                alertError('ผิดพลาด', 'แก้ไขสินค้าประมูลล้มเหลว', 'error')
            })
        }
    }
    
    return (
        <div>
            <MetaHeader title={`แก้ไขสินค้าประมูล`} />
            <Navigation />
            <TitleBox title={'แก้ไขสินค้าประมูล'} />
            <form onSubmit={handleEditAuctionProduct} className='items-end mx-auto mt-10 mb-10 form-control justify-evenly size-fit'>
            <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>ชื่อเกม</span>
                    <select defaultValue={dataAuction.game_name} onChange={setAuctionProductGameName} className="select w-80 bg-shadow-grey text-dshadow-black">
                        <option disabled>เลือกชื่อเกม</option>
                        {data.map((game) => <option key={game.game_name}>{game.game_name}</option>)}
                    </select>
                </div>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>รหัสสินค้า</span>
                    <input type={'text'} defaultValue={dataAuction.product_id} placeholder='รหัสสินค้า' onChange={setAuctionProductProductId} className='input w-80 bg-shadow-grey text-dshadow-black'/>
                </div>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>ชื่อสินค้า</span>
                    <input type={'text'} defaultValue={dataAuction.name} placeholder='ชื่อสินค้า' onChange={setAuctionProductName} className='input w-80 bg-shadow-grey text-dshadow-black'/>
                </div>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>ราคาเริ่มต้น</span>
                    <input type={'text'} defaultValue={dataAuction.default_price} placeholder='ราคาเริ่มต้น' onChange={setAuctionProductDefaultPrice} className='input w-80 bg-shadow-grey text-dshadow-black'/>
                </div>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>ประมูลพื้นฐานครั้งละ</span>
                    <input type={'text'} defaultValue={dataAuction.default_bid} placeholder='ประมูลพื้นฐานครั้งละ' onChange={setAuctionProductDefaultBid} className='input w-80 bg-shadow-grey text-dshadow-black'/>
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
                    <textarea type={'text'} placeholder='รายละเอียด' defaultValue={dataAuction.description} onChange={setAuctionProductDescription} className='textarea w-80 bg-shadow-grey text-dshadow-black'/>
                </div>
                <div className='flex flex-row items-center mt-2 size-full'>
                    <button type='submit' className='mr-5 border-none btn grow bg-shadow-success hover:bg-shadow-hsuccess text-shadow-white'>ยืนยันการเพิ่มสินค้าประมูล</button>
                    <Link to='/product-management' className='border-none btn grow bg-shadow-error hover:bg-shadow-herror text-shadow-white'>ยกเลิกการเพิ่มสินค้าประมูล</Link>
                </div>
            </form>
        </div>
    )
}

export default EditAuctionProduct