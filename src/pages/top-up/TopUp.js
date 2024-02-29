import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Icon } from '@iconify/react'

const TopUp = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 0 && navigate('/')
    }, [isLogin, navigate])

    return (
        <div>
            <MetaHeader title={`เติมเงิน`} />
            <Navigation />
            <TitleBox title={'เติม Aysel'} />
            <img alt="topup" src="http://localhost:3001/public/images/topup/shadow.png" className='container mx-auto h-96 w-7/12' />
            <div className='text-center text-shadow-error text-xl mt-2'>*** อัตราการแลกเปลี่ยนปัจจุบัน {process.env.REACT_APP_BAHT} บาท = {process.env.REACT_APP_AYSEL} Aysel***</div>
            <div className='flex flex-row items-center justify-center mt-10'>
                <input type={'text'} placeholder={'จำนวนเงิน'} className={'input text-center border-none bg-shadow-grey text-shadow-black'} />
                <Icon icon={'ic:outline-double-arrow'} className='text-5xl mx-20 text-shadow-accent' />
                <input type={'text'} placeholder={'จำนวน Aysel'} className={'input text-center border-none bg-shadow-grey text-shadow-black'} />
            </div>
            <TitleBox title={'วิธีชำระเงิน'} />
            <div className='flex flex-col items-center justify-center mt-10 mx-60'>
                <input type={'text'} placeholder={'กรุณากรอก URL'} className={'input w-full text-left border-none bg-shadow-grey text-shadow-black'} />
                <Link to='/transaction' className='link mt-2 self-end text-shadow-accent hover:text-shadow-haccent'>ติดตามสถานะการเติมเงิน</Link>
                <button type='button' className='btn w-full mt-5 border-none bg-shadow-success hover:bg-shadow-hsuccess text-shadow-white'>ยืนยัน</button>
            </div>
            <div className='flex flex-row items-center mt-10 justify-evenly'>
                <button type='button' onClick={()=>document.getElementById('image-payment-method').showModal()} className='btn size-96 text-3xl border-none bg-shadow-primary hover:bg-shadow-primary text-shadow-accent'>ภาพวิธีการชำระเงิน</button>
                <button type='button' onClick={()=>document.getElementById('video-payment-method').showModal()} className='btn size-96 text-3xl border-none bg-shadow-primary hover:bg-shadow-primary text-shadow-accent'>วิดีโอวิธีการชำระเงิน</button>
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