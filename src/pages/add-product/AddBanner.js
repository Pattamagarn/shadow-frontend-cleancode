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
            <form onSubmit={handleAddBanner} className='mx-10 mt-10 flex flex-row items-center align-middle justify-start'>
                <span className='text-2xl mr-2'>ลิงก์ภาพ</span>
                <input type={'file'} onChange={setBanner} className='file-input mr-2 bg-[#D9D9D9] text-[#000000]'/>
                <button type='submit' className='btn mr-2 border-none bg-[#A5DC86] hover:bg-[#86b36d] text-[#FFFFFF]'>ยืนยันการเพิ่มภาพแบนเนอร์</button>
                <Link to='/general-management' className='btn mr-2 border-none bg-[#F27474] hover:bg-[#ca6161] text-[#FFFFFF]'>ยกเลิกการเพิ่มภาพแบนเนอร์</Link>
            </form>
        </div>
    )
}

export default AddBanner