import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

const GachaProduct = () => {
    const navigate = useNavigate()
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const [dataGacha, setDataGacha] = useState([])

    useEffect(() => {
        isLogin.status && isLogin.payload.role !== 1 && navigate('/')
    }, [isLogin, navigate])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/read-gacha-product`)
            .then((response) => {
                if (response) {
                    setDataGacha(response.data.payload)
                }
            })
    }, [])

    const handleOneTime = () => {

    }

    const handleTenTime = () => {

    }
    return (
        <div>
            <MetaHeader title={`สินค้าสุ่มกาชา`} />
            <Navigation />
            <TitleBox title={'สินค้าสุ่มกาชา'} />
            <div>
                <div className='flex justify-end mx-40 '>
                    <div className='flex items-center btn btn-ghost hover:bg-shadow-white text-md' onClick={() => document.getElementById('detail-gacha-product').showModal()}>ดูสินค้าสุ่มกาชาทั้งหมด<Icon icon={"mdi:information-outline"} width={20} /></div>
                </div>
                <dialog id='detail-gacha-product' className='modal'>
                    <div className='flex flex-col justify-center max-w-5xl modal-box border-x-4 border-y-4 border-shadow-info'>
                        <div className='flex flex-col px-12 my-5'>
                            <div className='flex justify-end my-3 text-shadow-info'>วางลูกศรค้างเพื่อดูชื่อ</div>
                            <div className='grid justify-center grid-flow-row grid-cols-4 gap-5'>
                                
                                {dataGacha.map((value, id) => (
                                    <div key={id} className='flex '>
                                        <div className='flex border-x-8 border-y-8 rounded-xl border-shadow-primary w-[200px] h-[180px] justify-center bg-'>
                                            <img src={`${process.env.REACT_APP_GACHA_PRODUCT}${value.information}`} alt='gacha-product' title={value.name}/>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                        <div className="flex justify-center modal-action">
                            <form method='dialog'>
                                <button className="border-none btn bg-shadow-info hover:bg-shadow-hinfo text-shadow-white " >ตกลง</button>
                            </form>
                        </div>
                    </div>
                </dialog>
                <div className='max-w-full mb-5'>
                    <div className='lg:flex md:hidden sm:hidden relative  max-w-[1200px] py-10 mx-auto overflow-hidden max-h-[500px] hidden bg-gradient-to-r from-shadow-primary to-[#9d09cf] ' >
                        <div className='flex justify-center w-full ' >
                            <div className='flex items-center'>
                                <Icon icon={"game-icons:perspective-dice-six-faces-random"} width={125} className='text-shadow-white' />
                                <div className='text-5xl font-bold text-shadow-white'>เริ่มกดสุ่มได้</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-end h-[10rem] justify-evenly'>
                    <div className='flex flex-col items-center'>
                        <button className='text-2xl border-none btn bg-shadow-primary text-shadow-white hover:bg-shadow-primary/80' onClick={handleOneTime} >20 <Icon icon={"game-icons:minerals"} width={30} className='text-shadow-info' /></button>
                        <div className='text-xl '>1 times</div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <button className='text-2xl border-none btn bg-shadow-primary text-shadow-white hover:bg-shadow-primary/80' onClick={handleTenTime}>180 <Icon icon={"game-icons:minerals"} width={30} className='text-shadow-info' /></button>
                        <div className='text-xl '>10 times</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GachaProduct