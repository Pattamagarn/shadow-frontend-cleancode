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
    const [banner, setBanner] = useState([])
    const [dataGeneral, setDataGeneral] = useState([])
    const [dataPromotion, setDataPromotion] = useState([])
    const [dataAuction, setDataAuction] = useState([])
    const [dataGacha, setDataGacha] = useState([])

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role === 1 && navigate('/analysis')
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
                            {banner.map((value, id) => (
                                <img key={id} src={`${process.env.REACT_APP_BANNER}${value.information}`} alt='banner' />
                            ))}
                        </Banner>
                    </div>}


            </div>

            {
                dataGeneral.length === 0 ?
                    <div className='max-w-full mb-5'>
                        <div className='btn lg:flex md:hidden sm:hidden relative rounded-3xl max-w-[1200px] py-10 mx-auto overflow-hidden max-h-[500px] hidden bg-gradient-to-r from-shadow-primary to-[#9d09cf]' >
                            <div className='flex justify-center w-full h-full' >
                                <div className='flex items-center '>
                                    <div className='text-5xl font-bold text-shadow-white '>สินค้าทั่วไปยังไม่พร้อมให้บริการ</div>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div>
                        <Link to='/general-product' className='flex w-40 gap-2 lg:mx-40 md:mx-20' >
                            <div className='text-xl'>ดูสินค้าทั้งหมด</div>
                            <Icon icon={"ic:outline-double-arrow"} width={30} />
                        </Link>
                        <div className='grid grid-flow-col grid-rows-1 gap-2 py-10 lg:mx-40 lg:grid-cols-3 md:mx-20' >
                            {dataGeneral.map((value, id) => (
                                <div className="w-auto h-auto shadow-xl border-x-4 border-y-4 card lg:card-side border-shadow-primary " key={id}>
                                    <figure className='flex flex-col px-5 md:py-5'>
                                        <div className='flex h-36 w-36 ' >
                                            <img src={`${process.env.REACT_APP_GENERAL_PRODUCT}${value.information}`} alt={`{product general ${value}}`} key={value.id} className='flex w-full h-full' />
                                        </div>
                                    </figure>
                                    <div className="flex items-center card-body">
                                        <h2 className="justify-start card-title line-clamp-1" title={value.name}>{value.name}</h2>
                                        <span className="text-md line-clamp-1" title={value.game_name}>{`( ${value.game_name} )`}</span>
                                        {value.special_price_status ?
                                            <div>
                                                <div className='flex'>
                                                    <p>{`${value.special_price} Aysel`}</p>
                                                    <span className="line-through text-[#7d7d84] text-xs">{`${value.normal_price} Aysel`}</span>
                                                </div>
                                                <Link className='flex items-end justify-center my-5' to={`/promotion-product-item/${value.uuid}`}>
                                                    <p className='flex h-fit btn bg-shadow-white border-shadow-primary hover:bg-shadow-primary/20 text-shadow-primary lg:text-sm'>ดูรายละเอียด</p>
                                                </Link>
                                            </div>

                                            : <div>
                                                <div>
                                                    <div>{`${value.normal_price} Aysel`}</div>
                                                </div>
                                                <Link className='flex items-end justify-center my-5' to={`/general-product-item/${value.uuid}`}>
                                                    <p className='flex h-fit btn bg-shadow-white border-shadow-primary hover:bg-shadow-primary/20 text-shadow-primary lg:text-sm'>ดูรายละเอียด</p>
                                                </Link>
                                            </div>
                                        }

                                    </div>

                                </div>

                            ))}
                        </div>
                    </div>

            }



            {
                dataPromotion.length === 0 ?
                    <div className='max-w-full mb-5'>
                        <div className='lg:flex btn md:hidden sm:hidden relative rounded-3xl max-w-[1200px] py-10 mx-auto overflow-hidden max-h-[500px] hidden bg-gradient-to-r from-shadow-primary to-[#9d09cf]' >
                            <div className='flex justify-center w-full h-full ' >
                                <div className='flex items-center'>
                                    <div className='text-5xl font-bold text-shadow-white'>สินค้าโปรโมชันยังไม่พร้อมให้บริการ</div>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div>
                        <Link to='./promotion-product' className='flex w-56 gap-2 lg:mx-40 md:mx-20' >
                            <div className='text-xl'>ดูสินค้าโปรโมชัน</div>
                            <Icon icon={"ic:outline-double-arrow"} width={30} />
                        </Link>
                        <div className='grid grid-flow-col grid-rows-1 gap-5 py-10 lg:mx-40 lg:grid-cols-3 md:mx-20'>
                            {dataPromotion.map((value, id) => (
                                <div key={id}><div className="w-auto h-auto shadow-xl border-x-4 border-y-4 card lg:card-side border-shadow-primary" >
                                    <figure className='flex flex-col px-5 md:py-5'>
                                        <div className='flex w-36 h-36'>
                                            <img src={`${process.env.REACT_APP_GENERAL_PRODUCT}${value.information}`} alt={`{product general}`} key={value.id} className='flex w-full h-full' />
                                        </div>

                                    </figure>
                                    <div className="flex items-center card-body">
                                        <h2 className="justify-start card-title line-clamp-1" title={value.name}>{value.name}</h2>
                                        <span className="text-md line-clamp-1" title={value.game_name}>{`( ${value.game_name} )`}</span>
                                        <div>{value.special_price_status ?
                                            <div className='flex'>
                                                <p>{`${value.special_price} Aysel`}</p>
                                                <span className="line-through text-[#7d7d84] text-xs">{`${value.normal_price} Aysel`}</span>
                                            </div>
                                            : `${value.normal_price} Aysel`}</div>
                                        <Link className='flex items-end justify-center flex-1 mb-5' to={`/promotion-product-item/${value.uuid}`} >
                                            <p className='flex h-fit btn bg-shadow-white border-shadow-primary hover:bg-shadow-primary/20 text-shadow-primary'>ดูรายละเอียด</p>
                                        </Link>
                                    </div>
                                </div></div>
                            ))}
                        </div>
                    </div>
            }



            {
                dataAuction.length === 0 ?
                    <div className='max-w-full mb-5'>
                        <div className='lg:flex btn md:hidden sm:hidden relative rounded-3xl max-w-[1200px] py-10 mx-auto overflow-hidden max-h-[500px] hidden bg-gradient-to-r from-shadow-primary to-[#9d09cf]' >
                            <div className='flex justify-center w-full h-full ' >
                                <div className='flex items-center'>
                                    <div className='text-5xl font-bold text-shadow-white'>สินค้าประมูลยังไม่พร้อมให้บริการ</div>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div>
                        <Link to='./auction-product' className='flex w-40 gap-2 lg:mx-40 md:mx-20' >
                            <div className='text-xl'>ดูสินค้าประมูล</div>
                            <Icon icon={"ic:outline-double-arrow"} width={30} />
                        </Link>
                        <div className='grid grid-flow-col grid-rows-1 gap-5 py-10 lg:mx-40 lg:grid-cols-3 md:mx-20 md:grid-cols-3'>
                            {dataAuction.map((value, id) => (
                                <div key={id}><div className="w-auto h-auto shadow-xl border-x-4 border-y-4 card lg:card-side border-shadow-primary">
                                    <figure className='flex flex-col px-5 md:py-5'>
                                        <div className='flex w-36 h-36'>
                                            <img src={`${process.env.REACT_APP_AUCTION_PRODUCT}${value.information}`} alt={`{product general ${value}}`} key={value.id} className='flex w-full h-full' />
                                        </div>

                                    </figure>
                                    <div className="flex items-center card-body">
                                        <h2 className="justify-start card-title line-clamp-1" title={value.name}>{value.name}</h2>
                                        <span className="text-md line-clamp-1" title={value.game_name}>{`( ${value.game_name} )`}</span>
                                        <p>{`${value.default_price} Aysel`}</p>
                                        <Link className='flex items-end justify-center flex-1 mb-5' to={`/auction-product-item/${value.uuid}`}>
                                            <p className='flex h-fit btn bg-shadow-white border-shadow-primary hover:bg-shadow-primary/20 text-shadow-primary'>ดูรายละเอียด</p>
                                        </Link>
                                    </div>
                                </div></div>

                            ))}

                        </div>
                    </div>
            }



            {dataGacha.length === 0 ?
                <div className='max-w-full mb-5'>
                    <div className='lg:flex md:hidden sm:hidden relative rounded-3xl max-w-[1200px] py-10 mx-auto overflow-hidden max-h-[500px] hidden bg-gradient-to-r from-shadow-primary to-[#9d09cf]' >
                        <div className='flex justify-center w-full ' >
                            <div className='flex items-center'>
                                <Icon icon={"game-icons:perspective-dice-six-faces-random"} width={125} className='text-shadow-white' />
                                <div className='text-5xl font-bold text-shadow-white'>สินค้าสุ่มกาชายังไม่พร้อมให้บริการ</div>
                            </div>
                        </div>
                    </div>
                </div> :
                <div className='max-w-full mb-5'>
                    <Link className='lg:flex md:hidden sm:hidden relative  max-w-[1200px] py-10 mx-auto overflow-hidden max-h-[500px] hidden bg-gradient-to-r from-shadow-primary to-[#9d09cf]' to={`/gacha-product`}>
                        <div className='flex justify-center w-full ' >
                            <div className='flex items-center'>
                                <Icon icon={"game-icons:perspective-dice-six-faces-random"} width={125} className='text-shadow-white' />
                                <div className='text-5xl font-bold text-shadow-white'>ไปสุ่มกาชา</div>
                            </div>
                        </div>
                    </Link>
                </div>
            }




        </div>
    )
}

export default Home