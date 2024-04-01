import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Swal from 'sweetalert2'

const EditImagePaymentMethod = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()
    const [imgSend, setImgSend] = useState('')
    const [dataImg, setDataImg] = useState([])
    const [methodImg, setMethodImg] = useState('')
    const { uuid } = useParams();


    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 1 && navigate('/')
    }, [isLogin, navigate])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/payment-method-select`)
            .then((response) => {
                if (response.data.status) {
                    setDataImg(response.data.payload[1].information)
                }
            })
    }, [])

    // console.log(dataImg)
    const setImg = (img) => {
        setMethodImg(URL.createObjectURL(img.target.files[0]))
        setImgSend(img.target.files[0])
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
        formData.append('uuid', uuid)
        formData.append('file', imgSend)
        axios.patch(`${process.env.REACT_APP_API}/payment-method-update-image`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        }).then((response) => {
            console.log(response)
                if (response.data.status) {
                    alertSuccess('สำเร็จ', response.data.payload, 'ตกลง')
                } else {
                    alertWarning('คำเตือน', response.data.payload, 'ตกลง')
                }
            }).catch((error) => {
                alertError('ผิดพลาด', `${error.data.payload}`, 'ตกลง')
            })
    }
    return (
        <div>
            <MetaHeader title={`เปลี่ยนภาพวิธีการชำระเงิน`} />
            <Navigation />
            <TitleBox title={'เปลี่ยนภาพวิธีการชำระเงิน'} />
            <div className='flex flex-col mx-40'>
                <div className='text-shadow-info' >**ตัวอย่างรูปภาพวิธีการชำระเงิน**</div>
                {methodImg !== '' ?
                    <div className='flex max-w-3xl '>
                        <img src={methodImg} alt={`payment method`} className='w-full h-full '></img>
                    </div>
                    :

                    <div className='flex max-w-3xl '>
                        <img src={dataImg[1] === undefined ? `${process.env.REACT_APP_PAYMENT_METHOD}payment-method.png` : `${process.env.REACT_APP_PAYMENT_METHOD}${dataImg[1].information}`} alt={`payment method`} className='w-full h-full '></img>
                    </div>

                }
            </div>
            <form onSubmit={handleEditImg} className='flex flex-row items-center justify-start mx-40 my-10 align-middle'>
                <span className="mr-2 text-2xl">ลิงก์ภาพ</span>
                <input type={'file'} onChange={setImg} className='mr-2 file-input bg-shadow-grey text-shadow-black' />
                <button type='submit' className='mr-2 border-none btn bg-shadow-success hover:bg-shadow-hsuccess text-shadow-white'>ยืนยันการแก้ไขภาพวิธีการชำระเงิน</button>
                <Link to='/general-management' className='mr-2 border-none btn bg-shadow-error hover:bg-shadow-herror text-shadow-white'>ยกเลิกการแก้ไขภาพวิธีการชำระเงิน</Link>
            </form>
        </div>
    )
}

export default EditImagePaymentMethod