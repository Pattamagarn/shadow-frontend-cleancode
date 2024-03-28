import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useEffect, useState } from 'react'
import { Link,useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Swal from 'sweetalert2'

const EditImagePaymentMethod = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()
    const [imgList, setImgList] = useState({img:''})
    const { uuid } = useParams();


    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 1 && navigate('/')
    }, [isLogin, navigate])


    const setImg = (img) => {
        setImgList({...imgList, img:img.target.files[0]})
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
    
    const handleEditImg = (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('file', imgList.img)
        formData.append('uuid', uuid)
        axios.patch(`${process.env.REACT_APP_API}/payment-method-update-image`, formData, {
            headers: {'Content-Type': 'multipart/form-data'},
            withCredentials:true
        })
        .then((response) => {
            if(response.data.status){
                alertSuccess('สำเร็จ', response.data.payload, 'ตกลง')
            }else{
                alertWarning('คำเตือน', response.data.payload, 'ตกลง')
            }
        })
        .catch((error) => {
            alertError('ผิดพลาด', `${error}แก้ไขรูปภาพวิธีการชำระเงินล้มเหลว`, 'ตกลง')
        })
    }
    
    return (
        <div>
            <MetaHeader title={`เปลี่ยนภาพวิธีการชำระเงิน`} />
            <Navigation />
            <TitleBox title={'เปลี่ยนภาพวิธีการชำระเงิน'} />
            <form onSubmit={handleEditImg} className='flex flex-row items-center justify-start mx-40 mt-10 align-middle'>
                <span className="mr-2 text-2xl">ลิงก์ภาพ</span>
                <input type={'file'} onChange={setImg} className='mr-2 file-input bg-shadow-grey text-shadow-black'/>
                <button type='submit' className='mr-2 border-none btn bg-shadow-success hover:bg-shadow-hsuccess text-shadow-white'>ยืนยันการแก้ไขภาพวิธีการชำระเงิน</button>
                <Link to='/general-management' className='mr-2 border-none btn bg-shadow-error hover:bg-shadow-herror text-shadow-white'>ยกเลิกการแก้ไขภาพวิธีการชำระเงิน</Link>
            </form>
        </div>
    )
}

export default EditImagePaymentMethod