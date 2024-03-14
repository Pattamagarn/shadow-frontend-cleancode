import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import Banner from '../../components/slider/Banner'
import axios from 'axios'
import { Icon } from '@iconify/react'

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

    const handleProductItem = () => {
        navigate('/general-product-item')
    }

    return (

        <div>
            <MetaHeader title={`หน้าหลัก`} />
            <Navigation />
            <div className='max-w-full '  >
                {banner.length === 0 ?
                    <div className='my-10' />

                    :
                    <div>
                        <Banner>
                            {banner.map((value) => (
                                <img key={value.id} src={`${process.env.REACT_APP_BANNER}${value.information}`} alt='banner' />
                            ))}
                        </Banner>
                    </div>}


            </div>

            <Link to='/general-product' className='flex w-40 gap-2 lg:mx-40 md:mx-20' >
                <div className='text-xl'>สินค้าทั้งหมด</div>
                <Icon icon={"ic:outline-double-arrow"} width={30} />
            </Link>
            <div className='grid grid-flow-col grid-rows-1 gap-2 py-10 lg:mx-40 lg:grid-cols-3 md:mx-20' >
                {dataGeneral.map((value) => (
                    <Link to='/general-product-item'><div className="w-auto h-48 shadow-xl border-x-4 border-y-4 card lg:card-side border-shadow-primary " >
                        <figure className='flex flex-col w-32 px-5 '>
                            <div className='flex w-28 h-28' >
                                <img src={`${process.env.REACT_APP_GENERAL_PRODUCT}${value.information}`} alt={`{product general ${value}}`} key={value.id} className='flex w-full h-full' />
                            </div>
                        </figure>
                        <div className="flex items-center card-body ">
                            <h2 className="justify-start card-title ">{value.name}</h2>
                            <span className="text-md">{`( ${value.game_name} )`}</span>
                            <p>{value.special_price_status ? `${value.special_price} Aysel` : `${value.normal_price} Aysel`}</p>
                            <div className='flex items-end justify-center flex-1 mb-5' onClick={handleProductItem}>
                                <p className='flex h-fit btn bg-shadow-white border-shadow-primary hover:bg-shadow-primary/20 text-shadow-primary'>ดูรายละเอียด</p>
                            </div>
                        </div>
                    </div></Link>
                    
                ))}
            </div>
            <Link to='./promotion-product' className='flex w-40 gap-2 lg:mx-40 md:mx-20' >
                <div className='text-xl'>สินค้าโปรโมชั่น</div>
                <Icon icon={"ic:outline-double-arrow"} width={30} />
            </Link>
            <div className='grid grid-flow-col grid-rows-1 gap-5 py-10 lg:mx-40 lg:grid-cols-3 md:mx-20'>
                {dataPromotion.map((value) => (
                    <Link to='#'><div className="h-48 shadow-xl border-x-4 border-y-4 card lg:card-side border-shadow-primary" >
                        <figure className='flex flex-col w-32 px-5 '>
                            <div className='flex w-28 h-28'>
                                <img src={`${process.env.REACT_APP_GENERAL_PRODUCT}${value.information}`} alt={`{product general}`} key={value.id} className='flex w-full h-full' />
                            </div>

                        </figure>
                        <div className="flex items-center card-body">
                            <h2 className="justify-start card-title ">{value.name}</h2>
                            <span className="text-md">{`( ${value.game_name} )`}</span>
                            <p>{value.special_price_status ? <div className='flex w-full'>
                                <p>{`${value.special_price} Aysel`}</p>
                                <span className="line-through text-[#7d7d84] text-xs">{`${value.normal_price} Aysel`}</span>

                            </div> : `${value.normal_price} Aysel`}</p>
                            <div className='flex items-end justify-center flex-1 mb-5' onClick={handleProductItem}>
                                <p className='flex h-fit btn bg-shadow-white border-shadow-primary hover:bg-shadow-primary/20 text-shadow-primary'>ดูรายละเอียด</p>
                            </div>
                        </div>
                    </div></Link>



                ))}
            </div>
            <Link to='./auction-product' className='flex w-40 gap-2 lg:mx-40 md:mx-20' >
                <div className='text-xl'>สินค้าประมูล</div>
                <Icon icon={"ic:outline-double-arrow"} width={30} />
            </Link>
            <div className='grid grid-flow-col grid-rows-1 gap-5 py-10 lg:mx-40 lg:grid-cols-3 md:mx-20 md:grid-cols-3'>
                {dataAuction.map((value) => (
                    <Link to='#'><div className="h-48 shadow-xl border-x-4 border-y-4 card lg:card-side border-shadow-primary" >
                        <figure className='flex flex-col w-32 px-5 '>
                            <div className='flex w-28 h-28'>
                                <img src={`${process.env.REACT_APP_AUCTION_PRODUCT}${value.information}`} alt={`{product general ${value}}`} key={value.id} className='flex w-full h-full' />
                            </div>

                        </figure>
                        <div className="flex items-center card-body">
                            <h2 className="justify-start card-title ">{value.name}</h2>
                            <span className="text-md">{`( ${value.game_name} )`}</span>
                            <p>{`${value.default_price} Aysel`}</p>
                            <div className='flex items-end justify-center flex-1 mb-5' onClick={handleProductItem}>
                                <p className='flex h-fit btn bg-shadow-white border-shadow-primary hover:bg-shadow-primary/20 text-shadow-primary'>ดูรายละเอียด</p>
                            </div>
                        </div>
                    </div></Link>


                ))}
            </div>
            <Link to='./gacha-product' className='flex w-40 gap-2 lg:mx-40 md:mx-20' >
                <div className='text-xl'>สินค้าสุ่มกาชา</div>
                <Icon icon={"ic:outline-double-arrow"} width={30} />
            </Link>
            <div className='grid grid-flow-col grid-rows-1 gap-2 py-10 lg:mx-40 lg:grid-cols-3 md:mx-20 md:grid-cols-3'>
                {dataGacha.map((value) => (
                    <Link to='#'><div className="w-auto h-40 shadow-xl border-x-4 border-y-4 card lg:card-side border-shadow-primary" >
                        <figure className='flex flex-col w-32 px-5'>
                            <div className='flex h-24 w-28' >
                                <img src={`${process.env.REACT_APP_GACHA_PRODUCT}${value.information}`} alt={`{product gacha ${value}}`} key={value.id} className='flex w-full h-full' />
                            </div>

                        </figure>
                        <div className="flex items-center card-body">
                            <h2 className="justify-start card-title ">{value.name}</h2>
                            <span className="text-md">{`( ${value.game_name} )`}</span>
                            <div className='flex items-end justify-center flex-1 mb-5' onClick={handleProductItem}>
                                <p className='flex h-fit btn bg-shadow-white border-shadow-primary hover:bg-shadow-primary/20 text-shadow-primary'>ดูรายละเอียด</p>
                            </div>
                        </div>
                    </div></Link>


                ))}
            </div>



        </div>
    )
}

export default Home