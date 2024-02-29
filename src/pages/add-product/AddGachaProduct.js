import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import axios from 'axios'

const AddGachaProduct = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 1 && navigate('/')
    }, [isLogin, navigate])

    const [gachaProductList, setGachaProductList] = useState({
        productId:'', gameName:'',
        name:'', chance:'',
        guaranteeStatus:'', information: '',
        description: ''
    })

    const setGachaProductProductId = (productId) => {
        setGachaProductList({...gachaProductList, productId:productId.target.value})
    }

    const setGachaProductGameName = (gameName) => {
        setGachaProductList({...gachaProductList, gameName:gameName.target.value})
    }

    const setGachaProductName = (name) => {
        setGachaProductList({...gachaProductList, name:name.target.value})
    }

    const setGachaProductChance = (chance) => {
        setGachaProductList({...gachaProductList, chance:chance.target.value})
    }

    const setGachaProductGuaranteeStatus = (guaranteeStatus) => {
        setGachaProductList({...gachaProductList, guaranteeStatus:guaranteeStatus.target.value})
    }

    const setGachaProductInformation = (information) => {
        setGachaProductList({...gachaProductList, information:information.target.files[0]})
    }

    const setGachaProductDescription = (description) => {
        setGachaProductList({...gachaProductList, description:description.target.value})
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

    const handleAddGachaProduct = (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('productId', gachaProductList.productId)
        formData.append('gameName', gachaProductList.gameName)
        formData.append('name', gachaProductList.name)
        formData.append('chance', gachaProductList.chance)
        formData.append('guaranteeStatus', gachaProductList.guaranteeStatus)
        formData.append('file', gachaProductList.information)
        formData.append('description', gachaProductList.description)
        axios.post(`${process.env.REACT_APP_API}/create-gacha-product`, formData, {
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
            <MetaHeader title={`เพิ่มสินค้ากาชาปอง`} />
            <Navigation />
            <TitleBox title={'เพิ่มสินค้ากาชาปอง'} />
            <form onSubmit={handleAddGachaProduct} className='mx-auto mt-10 form-control items-end justify-evenly size-fit'>
                <div className='flex flex-row items-center mt-2 justify-end size-full'>
                    <span className='text-2xl mr-10 text-nowrap'>รหัสสินค้า</span>
                    <input value={gachaProductList.productId} type={'text'} placeholder='รหัสสินค้า' onChange={setGachaProductProductId} className='input w-80 bg-[#D9D9D9] text-[#000000]'/>
                </div>
                <div className='flex flex-row items-center mt-2 justify-end size-full'>
                    <span className='text-2xl mr-10 text-nowrap'>ชื่อสินค้า</span>
                    <input value={gachaProductList.name} type={'text'} placeholder='ชื่อสินค้า' onChange={setGachaProductName} className='input w-80 bg-[#D9D9D9] text-[#000000]'/>
                </div>
                <div className='flex flex-row items-center mt-2 justify-end size-full'>
                    <span className='text-2xl mr-10 text-nowrap'>ชื่อเกม</span>
                    <select value={gachaProductList.gameName} onChange={setGachaProductGameName} className="select w-80 bg-[#D9D9D9] text-[#000000]">
                        <option disabled selected>เลือกชื่อเกม</option>
                        <option>Shadow Garden</option>
                        <option>Shadow Design</option>
                    </select>
                </div>
                <div className='flex flex-row items-center mt-2 justify-end size-full'>
                    <span className='text-2xl mr-10 text-nowrap'>เปอร์เซ็นต์การดรอป</span>
                    <input value={gachaProductList.chance} type={'text'} placeholder='เปอร์เซ็นต์การดรอป' onChange={setGachaProductChance} className='input w-80 bg-[#D9D9D9] text-[#000000]'/>
                </div>
                <div className='flex flex-row items-center mt-2 justify-end size-full'>
                    <span className='text-2xl mr-10 text-nowrap'>การันตี</span>
                    <select value={gachaProductList.guaranteeStatus} onChange={setGachaProductGuaranteeStatus} className="select w-80 bg-[#D9D9D9] text-[#000000]">
                        <option value={false} selected>ปิด</option>
                        <option value={true}>เปิด</option>
                    </select>
                </div>
                <div className='flex flex-row items-center mt-2 justify-end size-full'>
                    <span className='text-2xl mr-10 text-nowrap'>รูปภาพ</span>
                    <input type={'file'} onChange={setGachaProductInformation} className='file-input w-80 bg-[#D9D9D9] text-[#000000]'/>
                </div>
                <div className='flex flex-row items-center mt-2 justify-end size-full'>
                    <span className='text-2xl mr-10 text-nowrap'>รายละเอียด</span>
                    <textarea value={gachaProductList.description} type={'text'} placeholder='รายละเอียด' onChange={setGachaProductDescription} className='textarea w-80 bg-[#D9D9D9] text-[#000000]'/>
                </div>
                <div className='flex flex-row items-center mt-2 size-full'>
                    <button type='submit' className='btn grow mr-5 border-none bg-[#A5DC86] hover:bg-[#86b36d] text-[#FFFFFF]'>ยืนยันการเพิ่มสินค้ากาชาปอง</button>
                    <Link to='/product-management' className='btn grow border-none bg-[#F27474] hover:bg-[#ca6161] text-[#FFFFFF]'>ยกเลิกการเพิ่มสินค้ากาชาปอง</Link>
                </div>
            </form>
        </div>
    )
}

export default AddGachaProduct