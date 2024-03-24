import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import CountdownTimer from '../../components/countdown-time/CountDownTimer'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector} from 'react-redux'
import { Icon } from '@iconify/react'
import axios from 'axios'
import Swal from 'sweetalert2'


const AuctionProductDetail = () => {
    const { uuid } = useParams()
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()
    const [dataAuction, setDataAuction] = useState([])
    const [account,setAccount] = useState({ email:'',amount:''})
    const [offer, setOffer] = useState('')


    useEffect(() => {
        isLogin.status && isLogin.payload.role !== 0 && navigate('/')
        if(isLogin.status && isLogin.payload.role === 0) {
            setAccount({...account,email:isLogin.payload.email,amount:isLogin.payload.aysel_amount})
        }
    }, [isLogin, navigate.setAccount])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/read-auction-product-uuid/${uuid}`)
            .then((response) => {
                if (response.data.status) {
                    setDataAuction(response.data.payload[0])
                }
            })
            .catch((error) => { })
    }, [uuid])

    const handleInputChange = (event) => {
        if (!isNaN(event.target.value)) {
            setOffer(parseInt(event.target.value))
        }
        else {
            setOffer('')
        }
    }

    const handlePlus = () => {
        setOffer(parseFloat(offer + dataAuction.default_bid))
    }

    const handleMinus = () => {
        if (parseFloat(offer - dataAuction.default_bid) < 0) {
            setOffer(0)
        }
        else {
            setOffer(parseFloat(offer - dataAuction.default_bid))
        }

    }

    const handleBid = (event, default_price, uuid) => {
        if (!isLogin.status) {
            Swal.fire({
                title: 'กรุณาเข้าสู่ระบบ',
                text: 'คุณยังไม่ได้เข้าสู่ระบบ',
                icon: 'error',
                showCancelButton: true,
                confirmButtonColor: '#3FC3EE',

                cancelButtonColor: '#F27474',
                confirmButtonText: 'ตกลง, ไปหน้าเข้าสู่ระบบ',
                cancelButtonText: 'ยกเลิก'
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        navigate('/sign-in')
                    }
                })
        }
        else {
            event.preventDefault()
            const productId = uuid
            const defaultPrice = default_price
            const bid = offer
            const newPrice = parseInt(defaultPrice) + parseInt(bid)
            const ayselAmount = isLogin.payload.aysel_amount
            const user = isLogin.payload.username
            if (bid === '') {
                Swal.fire({
                    title: 'กรุณาใส่จำนวนที่ต้องการประมูล?',
                    text: 'คุณยังไม่ได้ใส่จำนวนAyselที่ต้องการประมูล',
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3FC3EE',
                    confirmButtonText: 'ตกลง',
                })
            } else {
                Swal.fire({
                    title: 'คุณแน่ใจใช่ไหม?',
                    text: `คุณต้องการจ่าย ${newPrice} Aysel`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3FC3EE',

                    cancelButtonColor: '#F27474',
                    confirmButtonText: 'ตกลง, ฉันต้องการจ่าย',
                    cancelButtonText: 'ยกเลิก'
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (newPrice <= parseInt(ayselAmount)) {
                            axios.patch(`${process.env.REACT_APP_API}/update-bid`, {
                                uuid: productId,
                                default_price: newPrice,
                                latest_bidder: user
                            }, { withCredential: true })
                                .then((response) => {
                                    if (response.data.status) {
                                        alertSuccess('สำเร็จ', 'ประมูลสินค้าสำเร็จ', 'ตกลง')
                                    } else {
                                        alertWarning('คำเตือน', 'ประมูลสินค้าล้มเหลว', 'ตกลง')
                                    }
                                })
                                .catch((error) => {
                                    alertError('ผิดพลาด', 'ประมูลสินค้าล้มเหลว', 'ตกลง')
                                })
                        }
                        else {
                            alertError('ผิดพลาด', 'Aysel ไม่เพียงพอ', 'ตกลง')
                        }
                    }
                })
            }
        }
    }

    const alertSuccess = (title, text, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: text,
            icon: 'success',
            confirmButtonText: confirmButtonText
        })
        .then((result) => {
            if (result.isConfirmed) {
                navigate('/transaction')
            }
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

    return (
        <div >
            <MetaHeader title={`สินค้าประมูล`} />
            <Navigation />
            <TitleBox title={'สินค้าประมูล'} />
            <div className='flex flex-col w-full h-full' >
                <div className='flex items-center justify-center w-full h-full my-5'>
                    <CountdownTimer
                        start_time={dataAuction.start_time}
                        end_time={dataAuction.end_time}
                        detail={false}
                        email={account.email}
                        ayselAmount={parseFloat(account.amount) - parseFloat(dataAuction.default_price)}

                        uuid = {dataAuction.uuid}
                        game_name = {dataAuction.game_name}
                        product_name = {dataAuction.name}
                        product_price = {dataAuction.default_price}
                        buy_method = "สินค้าประมูล"
                        product_id = {dataAuction.product_id}
                    />
                </div>
                <div className='flex items-center justify-center md:grid-cols-2 lg:w-full sm:grid-cols-1'>
                <div className="flex-row border shadow-xl lg:w-[740px] h-[280px] border-x-4 border-y-4 border-shadow-primary card lg:card-compact bg-base-100">
                    <div className="flex w-[245px] ">
                        <figure className="flex mx-auto my-auto border rounded-lg border-shadow-primary border-x-4 border-y-4">
                            <div className='flex w-[200px] h-[180px] '>
                                <img src={`${process.env.REACT_APP_AUCTION_PRODUCT}${dataAuction.information}`} alt='product' className='flex w-full h-full' />
                            </div>
                        </figure>
                    </div>
                    <div className="card-body ">
                        <div className="flex-col justify-center pt-5 ">
                            <div className="flex justify-center">
                                <div className="text-3xl card-title">{dataAuction.name}</div>
                            </div>
                            <div className="flex justify-center pb-16">
                                <div className="text-2xl card-title">{`( ${dataAuction.game_name} )`}</div>
                            </div>
                           
                        </div>
                        <div className="flex justify-end card-action ">
                            <button className="btn" onClick={() => document.getElementById('detail-product').showModal()}>ดูรายละเอียด</button>
                        </div>
                        <dialog id='detail-product' className='modal'>
                            <div className='flex flex-col justify-center modal-box border-x-4 border-y-4 border-shadow-info'>
                                <div className='flex justify-center '>
                                    <div className='flex border-x-8 border-y-8 rounded-xl border-shadow-primary w-[200px] h-[180px] justify-center bg-'>
                                        <img src={`${process.env.REACT_APP_AUCTION_PRODUCT}${dataAuction.information}`} alt='auction-product' className='' />
                                    </div>
                                </div>
                                <div className='flex justify-center px-12 my-5'>
                                    <div className='flex justify-center '>
                                        <div className='text-xl text-shadow-info'>{dataAuction.description}  </div>
                                    </div>
                                </div>
                                <div className="flex justify-center modal-action">
                                    <form method='dialog'>
                                        <button className="btn bg-shadow-info hover:bg-shadow-hinfo text-shadow-white " >ตกลง</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>

                    </div>
                </div>
            </div>
                <div className='flex flex-row w-full h-full mb-10'>
                    <div className='flex flex-col w-full h-full my-5 px-[15rem] '>
                        <div className='flex gap-5 my-2'>
                            <span className='text-3xl text-shadow-primary '>ราคาปัจจุบัน</span>
                            <span className='text-3xl font-semibold text-shadow-primary'>{dataAuction.default_price}</span>
                            <Icon icon={"game-icons:minerals"} className="text-3xl size-fit text-shadow-pink sm:text-4xl" />
                        </div>
                        <div className='flex gap-5'>
                            <span className='text-3xl text-shadow-primary'>โดย</span>
                            <span className='text-3xl font-semibold text-shadow-primary'>{dataAuction.latest_bidder}</span>
                        </div>
                    </div>
                    <div className='flex flex-col w-full h-full '>
                        <div className='flex flex-col w-full h-full my-5'>
                            <div className='flex gap-5 my-2'>
                                <span className='text-3xl text-shadow-primary '>ประมูลพื้นฐานครั้งละ</span>
                                <span className='text-3xl font-semibold text-shadow-primary'>{dataAuction.default_bid}</span>
                                <Icon icon={"game-icons:minerals"} className="text-3xl size-fit text-shadow-pink sm:text-4xl" />
                            </div>
                            <div className='flex'>
                                <button className='text-2xl btn btn-ghost rounded-box hover:bg-shadow-white' onClick={handleMinus}> — </button>
                                <input value={offer} onChange={handleInputChange} type={'text'} placeholder="ใส่จำนวนบิด" className='w-40 px-5 border border-shadow-accent rounded-xl'></input>
                                <button className='text-3xl btn btn-ghost rounded-box hover:bg-shadow-white' onClick={handlePlus}> + </button>
                                <button className='text-2xl btn bg-shadow-accent w-28 hover:bg-shadow-haccent/60' onClick={(event) => handleBid(event, dataAuction.default_price, dataAuction.uuid)}> บิด </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default AuctionProductDetail