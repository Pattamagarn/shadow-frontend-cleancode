import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Icon } from '@iconify/react'
import Swal from 'sweetalert2'
import axios from 'axios'

const TopUp = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()
    const [exchangeRate, setExchangeRate] = useState({baht:'', aysel:''})
    const [giftTrueMoney, setGiftTrueMoney] = useState('')

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

    const handleTopUp = (event) => {
        event.preventDefault()
        if(isLogin.payload.role === 0){
            axios.post(`${process.env.REACT_APP_API}/topup`, {email:isLogin.payload.email, giftTrueMoney:giftTrueMoney}, {
                withCredentials: true
            })
            .then((response) => {
                if(response.data.status){
                    alertSuccess('สำเร็จ', response.data.payload, 'ตกลง')
                }else{
                    alertError('ผิดพลาด', response.data.payload, 'ตกลง')
                }
            })
            .catch((error) => {
                alertError('ผิดพลาด', `เติม Aysel ล้มเหลว6`, 'ตกลง')
            })
        }else{
            Swal.fire({
                title: 'คุณต้องการเข้าสู่ระบบไหม?',
                text: 'จำเป็นต้องเข้าสู่ระบบเพื่อเติม Aysel',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3FC3EE',
    
                cancelButtonColor: '#F27474',
                confirmButtonText: 'ตกลง, ไปเข้าสู่ระบบกัน',
                cancelButtonText: 'ยกเลิก'
              }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/sign-in')
                }
              });
        }
    }

    return (
        <div>
            <MetaHeader title={`เติมเงิน`} />
            <Navigation />
            <TitleBox title={'เติม Aysel'} />
            <img alt="topup" src="http://localhost:3001/public/images/topup/shadow.png" className='container w-5/12 mx-auto' />
            <div className='mt-2 text-xl text-center text-shadow-error'>*** อัตราการแลกเปลี่ยนปัจจุบัน {process.env.REACT_APP_BAHT} บาท = {process.env.REACT_APP_AYSEL} Aysel***</div>
            <div className='flex flex-row items-center justify-center mt-10'>
                <input type={'text'} placeholder={'จำนวนเงิน'} className={'input text-center border-none bg-shadow-grey text-shadow-black'} />
                <Icon icon={'ic:outline-double-arrow'} className='mx-20 text-5xl text-shadow-accent' />
                <input type={'text'} placeholder={'จำนวน Aysel'} className={'input text-center border-none bg-shadow-grey text-shadow-black'} />
            </div>
            <TitleBox title={'วิธีชำระเงิน'} />
            <div className='flex flex-col items-center justify-center mt-10 mx-60'>
                <input value={giftTrueMoney} onChange={(text) => {setGiftTrueMoney(text.target.value)}} type={'text'} placeholder={'กรุณากรอก URL'} className={'input w-full text-left border-none bg-shadow-grey text-shadow-black'} />
                <Link to='/transaction' className='self-end mt-2 link text-shadow-accent hover:text-shadow-haccent'>ติดตามสถานะการเติมเงิน</Link>
                <button type='button' onClick={handleTopUp} className='w-full mt-5 border-none btn bg-shadow-success hover:bg-shadow-hsuccess text-shadow-white'>ยืนยัน</button>
            </div>
            <div className='flex flex-row items-center mt-10 justify-evenly'>
                <button type='button' onClick={()=>document.getElementById('image-payment-method').showModal()} className='text-3xl border-none btn size-96 bg-shadow-primary hover:bg-shadow-primary text-shadow-accent'>ภาพวิธีการชำระเงิน</button>
                <button type='button' onClick={()=>document.getElementById('video-payment-method').showModal()} className='text-3xl border-none btn size-96 bg-shadow-primary hover:bg-shadow-primary text-shadow-accent'>วิดีโอวิธีการชำระเงิน</button>
            </div>
            <dialog id='image-payment-method' className='modal'>
                <div className='modal-box'>
                    <span className="text-3xl">ภาพวิธีการชำระเงิน</span>
                    <img src={`${process.env.REACT_APP_PAYMENT_METHOD}payment-method.png`} alt='payment-method' className='size-full h-96' />
                    <div className="modal-action">
                        <form method='dialog'>
                            <button className="btn bg-shadow-error hover:bg-shadow-herror text-shadow-white">ปิด</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog id='video-payment-method' className='modal'>
                <div className='modal-box'>
                    <span className="text-3xl">วิดีโอวิธีการชำระเงิน</span>
                    <iframe src='https://www.youtube.com/embed/smdmEhkIRVc?si=mq3E5TZNz1Qi352p' title="payment-method-video" className='size-full h-96' frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    <div className="modal-action">
                        <form method='dialog'>
                            <button className="btn bg-shadow-error hover:bg-shadow-herror text-shadow-white">ปิด</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default TopUp