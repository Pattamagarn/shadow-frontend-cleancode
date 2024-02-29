import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import axios from 'axios'

const AddGeneralProduct = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 1 && navigate('/')
    }, [isLogin, navigate])
    
    const [generalProductList, setGeneralProductList] = useState({
        productId:'', gameName:'',
        name:'', normalPrice:'',
        specialPrice:'', information: '',
        description: ''
    })

    const setGeneralProductProductId = (productId) => {
        setGeneralProductList({...generalProductList, productId:productId.target.value})
    }

    const setGeneralProductGameName = (gameName) => {
        setGeneralProductList({...generalProductList, gameName:gameName.target.value})
    }

    const setGeneralProductName = (name) => {
        setGeneralProductList({...generalProductList, name:name.target.value})
    }

    const setGeneralProductNormalPrice = (normalPrice) => {
        setGeneralProductList({...generalProductList, normalPrice:normalPrice.target.value})
    }

    const setGeneralProductSpecialPrice = (specialPrice) => {
        setGeneralProductList({...generalProductList, specialPrice:specialPrice.target.value})
    }

    const setGeneralProductInformation = (information) => {
        setGeneralProductList({...generalProductList, information:information.target.files[0]})
    }

    const setGeneralProductDescription = (description) => {
        setGeneralProductList({...generalProductList, description:description.target.value})
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

    const handleAddGeneralProduct = (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('productId', generalProductList.productId)
        formData.append('gameName', generalProductList.gameName)
        formData.append('name', generalProductList.name)
        formData.append('normalPrice', generalProductList.normalPrice)
        formData.append('specialPrice', generalProductList.specialPrice)
        formData.append('file', generalProductList.information)
        formData.append('description', generalProductList.description)
        axios.post(`${process.env.REACT_APP_API}/create-general-product`, formData, {
            headers: {'Content-Type': 'multipart/form-data'},
            withCredentials: true
        })
        .then((response) => {
            if(response.data.status){
                alertSuccess('สำเร็จ', response.data.payload, 'ตกลง')
            }else{
                alertWarning('คำเตือน', response.data.payload, 'ตกลง')
            }
        })
        .catch((error) => {
            alertError('ผิดพลาด', `เพิ่มสินค้าล้มเหลว`, 'ตกลง')
        })
    }

    return (
        <div>
            <MetaHeader title={`เพิ่มสินค้า`} />
            <Navigation />
            <TitleBox title={'เพิ่มสินค้า'} />
            <form onSubmit={handleAddGeneralProduct} className='mx-auto mt-10 form-control items-end justify-evenly size-fit'>
                <div className='flex flex-row items-center mt-2 justify-end size-full'>
                    <span className='text-2xl mr-10 text-nowrap'>รหัสสินค้า</span>
                    <input value={generalProductList.productId} type={'text'} placeholder='รหัสสินค้า' onChange={setGeneralProductProductId} className='input w-80 bg-[#D9D9D9] text-[#000000]'/>
                </div>
                <div className='flex flex-row items-center mt-2 justify-end size-full'>
                    <span className='text-2xl mr-10 text-nowrap'>ชื่อสินค้า</span>
                    <input value={generalProductList.name} type={'text'} placeholder='ชื่อสินค้า' onChange={setGeneralProductName} className='input w-80 bg-[#D9D9D9] text-[#000000]'/>
                </div>
                <div className='flex flex-row items-center mt-2 justify-end size-full'>
                    <span className='text-2xl mr-10 text-nowrap'>ชื่อเกม</span>
                    <select value={generalProductList.gameName} onChange={setGeneralProductGameName} className="select w-80 bg-[#D9D9D9] text-[#000000]">
                        <option disabled selected>เลือกชื่อเกม</option>
                        <option>Shadow Garden</option>
                        <option>Shadow Design</option>
                    </select>
                </div>
                <div className='flex flex-row items-center mt-2 justify-end size-full'>
                    <span className='text-2xl mr-10 text-nowrap'>ราคาเต็ม</span>
                    <input value={generalProductList.normalPrice} type={'text'} placeholder='ราคาเต็ม' onChange={setGeneralProductNormalPrice} className='input w-80 bg-[#D9D9D9] text-[#000000]'/>
                </div>
                <div className='flex flex-row items-center mt-2 justify-end size-full'>
                    <span className='text-2xl mr-10 text-nowrap'>ราคาลด</span>
                    <input value={generalProductList.specialPrice} type={'text'} placeholder='ราคาลด' onChange={setGeneralProductSpecialPrice} className='input w-80 bg-[#D9D9D9] text-[#000000]'/>
                </div>
                <div className='flex flex-row items-center mt-2 justify-end size-full'>
                    <span className='text-2xl mr-10 text-nowrap'>รูปภาพ</span>
                    <input type={'file'} onChange={setGeneralProductInformation} className='file-input w-80 bg-[#D9D9D9] text-[#000000]'/>
                </div>
                <div className='flex flex-row items-center mt-2 justify-end size-full'>
                    <span className='text-2xl mr-10 text-nowrap'>รายละเอียด</span>
                    <textarea value={generalProductList.description} type={'text'} placeholder='รายละเอียด' onChange={setGeneralProductDescription} className='textarea w-80 bg-[#D9D9D9] text-[#000000]'/>
                </div>
                <div className='flex flex-row items-center mt-2 size-full'>
                    <button type='submit' className='btn grow mr-5 border-none bg-[#A5DC86] hover:bg-[#86b36d] text-[#FFFFFF]'>ยืนยันการเพิ่มสินค้า</button>
                    <Link to='/product-management' className='btn grow border-none bg-[#F27474] hover:bg-[#ca6161] text-[#FFFFFF]'>ยกเลิกการเพิ่มสินค้า</Link>
                </div>
            </form>
        </div>
    )
}

export default AddGeneralProduct