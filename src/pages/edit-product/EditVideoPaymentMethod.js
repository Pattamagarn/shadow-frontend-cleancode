import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useEffect, useState } from 'react'
import { Link,useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Swal from 'sweetalert2'

const EditVideoPaymentMethod = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()
    const [videoList, setVideoList] = useState({video:''})
    const { uuid } = useParams();

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 1 && navigate('/')
    }, [isLogin, navigate])

    const setVideo = (video) => {
        setVideoList({...videoList, video:video.target.value})
    }  
    const alertSuccess = (title, text, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: text,
            icon: 'success',
            confirmButtonText: confirmButtonText
        })
        navigate('/general-management')
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
    
    const handleEditVideo = (event) => {
        event.preventDefault()
        axios.patch(`${process.env.REACT_APP_API}/payment-method-update-video`, {
            uuid : uuid,
            information : videoList.video
        })
        .then((response) => {
            if(response.data.status){
                alertSuccess('สำเร็จ', response.data.payload, 'ตกลง')
            }else{
                alertWarning('คำเตือน', response.data.payload, 'ตกลง')
            }
        })
        .catch((error) => {
            alertError('ผิดพลาด', `แก้ไขวิดีโอวิธีการชำระเงินล้มเหลว`, 'ตกลง')
        })
    }
    
    return (
        <div>
            <MetaHeader title={`เปลี่ยนวิดีโอวิธีการชำระเงิน`} />
            <Navigation />
            <TitleBox title={'เปลี่ยนวิดีโอวิธีการชำระเงิน'} />
            <form onSubmit={handleEditVideo} className='flex flex-row items-center justify-start mx-40 mt-10 align-middle'>
                <span className="mr-2 text-2xl">ลิงก์วิดีโอสำหรับฝัง</span>
                <input type={'text'} onChange={setVideo} className='px-5 mx-2 w-96 input bg-shadow-grey text-shadow-black'/>
                <button type='submit' className='mr-2 border-none btn bg-shadow-success hover:bg-shadow-hsuccess text-shadow-white'>ยืนยันการแก้ไขวิดีโอวิธีการชำระเงิน</button>
                <Link to='/general-management' className='mr-2 border-none btn bg-shadow-error hover:bg-shadow-herror text-shadow-white'>ยกเลิกการแก้ไขวิดีโอวิธีการชำระเงิน</Link>
            </form>
        </div>
    )
}

export default EditVideoPaymentMethod