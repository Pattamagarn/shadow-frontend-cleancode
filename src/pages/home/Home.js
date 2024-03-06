import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import Banner from '../../components/slider/Banner'
import axios from 'axios'
import { Icon } from '@iconify/react'
import GachaProduct from '../gacha-product/GachaProduct'
const Home = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()
    const list = [0, 1, 2]
    const [banner, setBanner] = useState([])
    const [dataGeneral, setDataGeneral] = useState([])
    const [dataPromotion, setDataPromotion] = useState([])
    const [dataAuction, setDataAuction] = useState([])
    const [dataGacha, setDataGacha] = useState([])

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 1 && navigate('/')
    }, [isLogin, navigate])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/banner-select`)
            .then((response) => {
                if (response) {
                    setBanner(response.data.payload)
                }
            })
        axios.get(`${process.env.REACT_APP_API}/read-general-3-product`)
            .then((response) => {
                if (response) {
                    setDataGeneral(response.data.payload)
                    setDataPromotion(response.data.payload.map((value) => (value.special_price_status && value)))
                }
            })
        axios.get(`${process.env.REACT_APP_API}/read-promotion-3-product`)
            .then((response) => {
                if (response) {
                    setDataPromotion(response.data.payload)
                }
            })
        axios.get(`${process.env.REACT_APP_API}/read-auction-3-product`)
            .then((response) => {
                if (response) {
                    setDataAuction(response.data.payload)

                }
            })
        axios.get(`${process.env.REACT_APP_API}/read-gacha-3-product`)
            .then((response) => {
                if (response) {
                    setDataGacha(response.data.payload)

                }
            })
    }, [])


    return (
        <div>
            {console.log(dataPromotion)}
            <MetaHeader title={`หน้าหลัก`} />
            <Navigation />
            <div className='w-full'  >
                <Banner className='flex-row justify-center '>
                    {banner.map((value) => (
                        <img key={value.id} src={`${process.env.REACT_APP_BANNER}${value.information}`} alt={`{banner ${value}}`} width={1024} height={1024} />
                    ))}
                </Banner>

            </div>

            <a href='./general-product' className='flex w-40 gap-2 mx-40' >
                <div className='text-xl'>สินค้าทั้งหมด</div>
                <Icon icon={"ic:outline-double-arrow"} width={30} />
            </a>
            <div className='grid grid-flow-col grid-cols-3 grid-rows-1 gap-5 py-10 mx-40'>
                {dataGeneral.map((value) => (
                    <a href='#'><div className="shadow-xl border-x-4 border-y-4 card lg:card-side border-shadow-primary" >
                        <figure className='flex flex-col px-5 pt-5'>
                            <img src={`${process.env.REACT_APP_GENERAL_PRODUCT}${value.information}`} alt={`{product general ${value}}`} key={value.id} width={40} height={40} className='' />
                            <p className='flex items-end'>ดูรายละเอียด</p>
                        </figure>
                        <div className="flex items-center card-body">
                            <h2 className="justify-start card-title ">{value.name}</h2>
                            <h2 className="card-title ">{`( ${value.game_name} )`}</h2>
                            <p>{value.special_price_status ? `${value.special_price} Aysel` : `${value.normal_price} Aysel`}</p>
                        </div>
                    </div></a>
                ))}
            </div>
            <a href='./promotion-product' className='flex w-40 gap-2 mx-40' >
                <div className='text-xl'>สินค้าโปรโมชั่น</div>
                <Icon icon={"ic:outline-double-arrow"} width={30} />
            </a>
            <div className='grid grid-flow-col grid-cols-3 grid-rows-1 gap-5 py-10 mx-40'>
                {dataPromotion.map((value) => (
                    <a href='#'><div className="shadow-xl border-x-4 border-y-4 card lg:card-side border-shadow-primary" >
                        <figure className='flex flex-col px-5 pt-5'>
                            <img src={`${process.env.REACT_APP_GENERAL_PRODUCT}${value.information}`} alt={`{product general ${value}}`} key={value.id} width={40} height={40} />
                            <p className='flex items-end'>ดูรายละเอียด</p>
                        </figure>
                        <div className="flex items-center card-body">
                            <h2 className="justify-start card-title ">{value.name}</h2>
                            <h2 className="card-title ">{`( ${value.game_name} )`}</h2>
                            <p>{value.special_price_status ? `${value.special_price} Aysel` : `${value.normal_price} Aysel`}</p>

                        </div>
                    </div></a>



                ))}
            </div>
            <a href='./auction-product' className='flex w-40 gap-2 mx-40' >
                <div className='text-xl'>สินค้าประมูล</div>
                <Icon icon={"ic:outline-double-arrow"} width={30} />
            </a>
            <div className='grid grid-flow-col grid-cols-3 grid-rows-1 gap-5 py-10 mx-40'>
                {dataAuction.map((value) => (
                    <a href='#'><div className="shadow-xl border-x-4 border-y-4 card lg:card-side border-shadow-primary" >
                        <figure className='flex flex-col px-5 pt-5'>
                            <img src={`${process.env.REACT_APP_AUCTION_PRODUCT}${value.information}`} alt={`{product general ${value}}`} key={value.id} width={40} height={40} className='' />
                            <p className='flex items-end'>ดูรายละเอียด</p>
                        </figure>
                        <div className="flex items-center card-body">
                            <h2 className="justify-start card-title ">{value.name}</h2>
                            <h2 className="card-title ">{`( ${value.game_name} )`}</h2>
                            <p>{`${value.default_price} Aysel`}</p>

                        </div>
                    </div></a>


                ))}
            </div>
            <a href='./gacha-product' className='flex w-40 gap-2 mx-40' >
                <div className='text-xl'>สินค้าสุ่มกาชา</div>
                <Icon icon={"ic:outline-double-arrow"} width={30} />
            </a>
            <div className='grid grid-flow-col grid-cols-3 grid-rows-1 gap-5 py-10 mx-40'>

                {dataGacha.map((value) => (
                    <a href='#'><div className="shadow-xl border-x-4 border-y-4 card lg:card-side border-shadow-primary" >
                        <figure className='flex flex-col px-5 pt-5'>
                            <img src={`${process.env.REACT_APP_GACHA_PRODUCT}${value.information}`} alt='product gacha' key={value.id} width={40} height={40} />
                            <p className='flex items-end'>ดูรายละเอียด</p>
                        </figure>
                        <div className="flex items-center card-body">
                            <h2 className="justify-start card-title ">{value.name}</h2>
                            <h2 className="card-title ">{`( ${value.game_name} )`}</h2>


                        </div>
                    </div></a>


                ))}
            </div>


        </div>
    )
}

export default Home