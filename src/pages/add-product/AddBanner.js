import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import axios from 'axios'

const AddBanner = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()


    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 1 && navigate('/')
    }, [isLogin, navigate])

    const [bannerList, setBannerList] = useState({banner:''})

    const setBanner = (banner) => {
        setBannerList({...bannerList, banner:banner.target.files[0]})
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

    const handleAddBanner = (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('file', bannerList.banner)
        

        axios.post(`${process.env.REACT_APP_API}/banner-insert`, formData, {
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
            
            alertError('ผิดพลาด', `เพิ่มแบนเนอร์ล้มเหลว`, 'ตกลง')
        })
    }

    return (
        <div>
            <MetaHeader title={`เพิ่มแบนเนอร์`} />
            <Navigation />
            <TitleBox title={'เพิ่มแบนเนอร์'} />
            <form onSubmit={handleAddBanner} className='flex flex-row items-center justify-start mx-10 mt-10 align-middle'>
                <span className='mr-2 text-2xl'>ลิงก์ภาพ</span>
                <input type={'file'} onChange={setBanner} className='mr-2 file-input bg-shadow-grey text-shadow-black'/>
                <button type='submit' className='mr-2 border-none btn bg-shadow-success hover:bg-shadow-hsuccess text-shadow-white'>ยืนยันการเพิ่มภาพแบนเนอร์</button>
                <Link to='/general-management' className='mr-2 border-none btn bg-shadow-error hover:bg-shadow-herror text-shadow-white'>ยกเลิกการเพิ่มภาพแบนเนอร์</Link>
            </form>
        </div>
    )
}

export default AddBanner