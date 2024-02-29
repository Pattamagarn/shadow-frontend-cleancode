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
            alertWarning('คำเตือน', 'กรุณาเข้าสู่ระบบ', 'ตกลง')
        }
    }

    return (
        <div>
            <MetaHeader title={`เติมเงิน`} />
            <Navigation />
            <TitleBox title={'เติม Aysel'} />
            <img alt="topup" src="http://localhost:3001/public/images/topup/topup.jpg" className='container mx-auto rounded h-96' />
            <div className='flex flex-row items-center justify-center mt-10'>
                <input type={'text'} placeholder={'จำนวนเงิน'} className={'input text-center border-none bg-[#D9D9D9] text-[#000000]'} />
                <Icon icon={'ic:outline-double-arrow'} className='text-5xl mx-20 text-[#FFB302]' />
                <input type={'text'} placeholder={'จำนวน Aysel'} className={'input text-center border-none bg-[#D9D9D9] text-[#000000]'} />
            </div>
            <TitleBox title={'วิธีชำระเงิน'} />
            <div className='flex flex-col items-center justify-center mt-10 mx-60'>
                <input value={giftTrueMoney} onChange={(text) => {setGiftTrueMoney(text.target.value)}} type={'text'} placeholder={'กรุณากรอก URL'} className={'input w-full text-left border-none bg-[#D9D9D9] text-[#000000]'} />
                <Link to='/transaction' className='link mt-2 self-end text-[#FFB302] hover:text-[#E5A101]'>ติดตามสถานะการเติมเงิน</Link>
                <button type='button' onClick={handleTopUp} className='btn w-full mt-5 border-none bg-[#A5DC86] hover:bg-[#86b36d] text-[#FFFFFF]'>ยืนยัน</button>
            </div>
            <div className='flex flex-row items-center mt-10 justify-evenly'>
                <button type='button' onClick={()=>document.getElementById('image-payment-method').showModal()} className='btn size-96 text-3xl border-none bg-[#33007B] hover:bg-[#33007B] text-[#FFB302]'>ภาพวิธีการชำระเงิน</button>
                <button type='button' onClick={()=>document.getElementById('video-payment-method').showModal()} className='btn size-96 text-3xl border-none bg-[#33007B] hover:bg-[#33007B] text-[#FFB302]'>วิดีโอวิธีการชำระเงิน</button>
            </div>
            <dialog id='image-payment-method' className='modal'>
                <div className='modal-box'>
                    <span className="text-3xl">ภาพวิธีการชำระเงิน</span>
                    <img src={`${process.env.REACT_APP_PAYMENT_METHOD}payment-method.png`} alt='payment-method' className='size-full h-96' />
                    <div className="modal-action">
                        <form method='dialog'>
                            <button className="btn bg-[#F27474] hover:bg-[#ca6161] text-[#FFFFFF]">ปิด</button>
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
                            <button className="btn bg-[#F27474] hover:bg-[#ca6161] text-[#FFFFFF]">ปิด</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default TopUp