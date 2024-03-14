import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import CountdownTimer from '../../components/countdown-time/CountDownTimer'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Icon } from '@iconify/react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Card from '../../components/card/Card'


const AuctionProductDetail = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const product = useSelector((state) => state.product.product)
    const navigate = useNavigate()

    useEffect(() => {
        // isLogin.status && isLogin.payload.role !== 0 && navigate('/')
    }, [isLogin, navigate])

    const [dataProduct, setDataProduct] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/read-auction-product`)
            .then((response) => {
                if (response.data.status) {
                    let count = 0
                    let check = false
                    response.data.payload.forEach(element => {
                        if (element.uuid === product.item && !check) {
                            check = true
                        }
                        else if (element.uuid !== product.item && !check) {
                            count++
                        }
                    })
                    setDataProduct(response.data.payload[count])
                }
            })
            .catch((error) => { })
    }, [])

    const [auctionProductList, setAuctionProductList] = useState({
        productId: '', defaultPrice: '', latestBidder: ''
    })

    const setAuctionProductDefaultPrice = (defaultPrice) => {
        setAuctionProductList({ ...auctionProductList, defaultPrice: defaultPrice.target.value })
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

    const handleBid = (event, default_price, uuid) => {
        event.preventDefault()
        const productId = uuid
        const defaultPrice = default_price
        const bid = auctionProductList.defaultPrice
        const newPrice = parseInt(defaultPrice) + parseInt(bid)
        const ayselAmount = isLogin.payload.aysel_amount
        const user = isLogin.payload.username


        if (newPrice <= parseInt(ayselAmount)) {
            axios.patch(`${process.env.REACT_APP_API}/update-bid`, {
                uuid: productId,
                default_price: newPrice,
                latest_bidder: user,
            }, {
                withCredentials: true
            })
                .then((response) => {
                    if (response.data.status) {
                        alertSuccess('สำเร็จ', response.data.payload, 'ตกลง')
                    } else {
                        alertWarning('คำเตือน', response.data.payload, 'ตกลง')
                    }
                })
                .catch((error) => {
                    alertError('ผิดพลาด', `ประมูลสินค้าล้มเหลว`, 'ตกลง')
                })
        } else {
            alertError('ผิดพลาด', `Aysel ไม่เพียงพอ`, 'ตกลง')
        }
    }
    return (
        <div>
            <MetaHeader title={`สินค้าประมูล`} />
            <Navigation />
            <TitleBox title={'สินค้าประมูล'} />
            <div className='flex w-full h-full flex-col' >
                <div className='flex w-full h-full  justify-center items-center my-5'>
                    <CountdownTimer
                        start_time={dataProduct.start_time}
                        end_time={dataProduct.end_time}
                        email={isLogin.payload.email}
                        ayselAmount={isLogin.payload.aysel_amount - dataProduct.default_price}
                    />
                </div>
                <div>
                    <Card
                        name={dataProduct.name}
                        game_name={dataProduct.game_name}
                        aysel={dataProduct.normal_price}
                        information={dataProduct.information}
                        promotion_status={dataProduct.special_price_status}
                        promotion={dataProduct.special_price}
                        path='auction' />
                </div>
                <div className='flex flex-row w-full h-full '>
                    <div className='flex flex-col w-full h-full my-5 px-[15rem] '>
                        <div className='flex gap-5'>
                            <span className='text-3xl text-shadow-primary '>ราคาปัจจุบัน</span>
                            <span className='text-3xl text-shadow-primary font-semibold'>{dataProduct.default_price}</span>
                            <Icon icon={"game-icons:minerals"} className="text-3xl size-fit text-shadow-pink sm:text-4xl" />
                        </div>
                        <div className='flex gap-5'>
                            <span className='text-3xl text-shadow-primary'>โดย</span>
                            <span className='text-3xl text-shadow-primary font-semibold'>{dataProduct.latest_bidder}</span>
                        </div>
                    </div>
                    <div className='flex flex-col w-full h-full '>
                        <div className='flex flex-col w-full h-full my-5'>
                            <div className='flex gap-5'>
                                <span className='text-3xl text-shadow-primary '>ประมูลพื้นฐานครั้งละ</span>
                                <span className='text-3xl text-shadow-primary font-semibold'>{dataProduct.default_bid}</span>
                                <Icon icon={"game-icons:minerals"} className="text-3xl size-fit text-shadow-pink sm:text-4xl" />
                            </div>
                            <div className='flex'>
                                <button className='btn btn-ghost text-2xl rounded-box hover:bg-shadow-white'> — </button>
                                <input className='border border-shadow-accent rounded-xl w-40'></input>
                                <button className='btn btn-ghost text-3xl rounded-box hover:bg-shadow-white'> + </button>
                                <button className='btn bg-shadow-accent text-2xl w-28 hover:bg-shadow-haccent/60'> บิด </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default AuctionProductDetail