import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { Icon } from '@iconify/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'



const GachaProduct = () => {
    const { uuid } = useParams()
    const navigate = useNavigate()
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const [account, setAccount] = useState([])
    const [dataGacha, setDataGacha] = useState([])
    const [dataGachaNormal, setDataGachaNormal] = useState([])
    const [dataGachaSpecial, setDataGachaSpecial] = useState([])
    const [showModals, setShowModals] = useState(false)
    const [showData, setShowData] = useState([])
    const [time, setTime] = useState('')
    const [buyBy, setBuyBy] = useState('')
    const [countGuaruntee, setCountGuaruntee] = useState(0)
    const rateNormal = []
    const rateSpecial = []
    let gacha = []
    let dataNormal = []
    let dataChanceNormal = []
    let dataChanceSpecial = []
    let dataSpecial = []




    useEffect(() => {
        isLogin.status && isLogin.payload.role === 1 && navigate('/')
    }, [isLogin, navigate])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/read-gacha-product`)
            .then((response) => {
                if (response) {
                    setDataGacha(response.data.payload)
                }
            })
        axios.get(`${process.env.REACT_APP_API}/read-gacha-product-normal`)
            .then((response) => {
                if (response) {
                    setDataGachaNormal(response.data.payload)
                }
            })
        axios.get(`${process.env.REACT_APP_API}/read-gacha-product-special`)
            .then((response) => {
                if (response) {
                    setDataGachaSpecial(response.data.payload)
                }
            })
        axios.get(`${process.env.REACT_APP_API}/authentication-account`, { withCredentials: true })
            .then((response) => {
                if (response.data.status) {
                    setAccount(response.data.payload)
                    setCountGuaruntee(response.data.payload.gacha_count)
                }
            })



    }, [])
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


    const countDecimalNumber = (number) => {
        const numberString = number.toString()
        const decimalIndex = numberString.indexOf('.')
        if (decimalIndex === -1) {
            return 0
        }
        const numberDigits = numberString.length - (decimalIndex + 1)

        return numberDigits
    }

    const handleRateGacha = (countsGuaruntee) => {
        gacha = []
        dataNormal = []
        dataChanceNormal = []
        dataSpecial = []
        dataChanceSpecial = []
        // console.log(countsGuaruntee)
        if (parseInt(countsGuaruntee + 1) === parseInt(process.env.REACT_APP_GUARUNTEE)) {
            setCountGuaruntee(0)
            //เอาข้อมูลอัตราการออกของสินค้าจากดาต้าเบส ไว้ใน dataChanceSpecial
            dataGachaSpecial.map((value) => {
                return dataChanceSpecial.push(value.chance)
            })
            //เอาค่าที่น้อยที่สุด
            const min = Math.min(...dataChanceSpecial)
            const stringMin = countDecimalNumber(min)

            //rateSpecail เก็บจำนวนเลขอัตราการออกสินค้า
            dataChanceSpecial.map((value) => {
                return rateSpecial.push(Math.round(value * (10 ** parseFloat(stringMin))))
            })

            //เอาชื่อจากdataGachaSpecialมาสร้างarrayตามจำนวนเลขอัตราการออกสินค้า แล้วต่อกันให้เป็นอาเรย์เดียว
            dataGachaSpecial.map((value, index) => {
                dataSpecial = dataSpecial.concat(new Array(rateSpecial[index]).fill(value.name))
                return dataSpecial
            })

            //เคลียร์ค่าในกาชานอลมอล **เผื่อกดสุ่มใหม่**
            gacha = []
            if (dataSpecial.length > 0) {
                dataSpecial = dataSpecial[(Math.round(Math.random() * dataSpecial.length))]
                let index = dataGachaSpecial.findIndex((element) => element.name === dataSpecial)
                if (index === -1) {
                    gacha.push(dataGachaSpecial[0])
                }
                else {
                    gacha.push(dataGachaSpecial[index])
                }
            }
            // console.log(gacha)
        }
        else {
            if (parseInt(countsGuaruntee + 1) > parseInt(process.env.REACT_APP_GUARUNTEE)) {
                setCountGuaruntee((countsGuaruntee+1)-(parseInt(process.env.REACT_APP_GUARUNTEE)))
                // console.log('over set')
            }
            //เอาข้อมูลอัตราการออกของสินค้าจากดาต้าเบส ไว้ใน dataChanceNormal
            dataGachaNormal.map((value) => {
                return dataChanceNormal.push(value.chance)
            })
            //เอาค่าที่น้อยที่สุด
            const min = Math.min(...dataChanceNormal)
            const stringMin = countDecimalNumber(min)

            //rateNormal เก็บจำนวนเลขอัตราการออกสินค้า
            dataChanceNormal.map((value) => {
                return rateNormal.push(Math.round(value * (10 ** parseFloat(stringMin))))
            })

            //เอาชื่อจากdataGachaNormalมาสร้างarrayตามจำนวนเลขอัตราการออกสินค้า แล้วต่อกันให้เป็นอาเรย์เดียว
            dataGachaNormal.map((value, index) => {
                dataNormal = dataNormal.concat(new Array(rateNormal[index]).fill(value.name))
                return dataNormal
            })

            //เคลียร์ค่าในกาชานอลมอล **เผื่อกดสุ่มใหม่**
            gacha = []
            if (dataNormal.length > 0) {
                dataNormal = dataNormal[(Math.round(Math.random() * dataNormal.length))]
                let index = dataGachaNormal.findIndex((element) => element.name === dataNormal)
                if (index === -1) {
                    gacha.push(dataGachaNormal[0])
                }
                else {
                    gacha.push(dataGachaNormal[index])
                }
            }
            // console.log(gacha)
        }


    }


    const handleBuyOneTime = () => {
        setShowModals(false)
        setShowData([])
        setBuyBy('one')
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
            Swal.fire({
                title: 'แจ้งเตือน',
                text: `คุณต้องการจ่าย ${process.env.REACT_APP_BUY_ONCE} Aysel สำหรับการสุ่มกาชา 1 ครั้ง`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3FC3EE',

                cancelButtonColor: '#F27474',
                confirmButtonText: 'ตกลง',
                cancelButtonText: 'ยกเลิก'
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        if (parseFloat(isLogin.payload.aysel_amount) >= parseFloat(process.env.REACT_APP_BUY_ONCE)) {
                            setCountGuaruntee(countGuaruntee + 1)
                            setShowModals(true)
                            handleRateGacha(countGuaruntee)
                            axios.patch(`${process.env.REACT_APP_API}/update-aysel`, {
                                email: isLogin.payload.email,
                                aysel_amount: parseFloat(isLogin.payload.aysel_amount) - parseFloat(process.env.REACT_APP_BUY_ONCE)
                            }, { withCredentials: true })
                                .then((response) => {
                                    if (response.data.status) {
                                        axios.post(`${process.env.REACT_APP_API}/create-store-product`, {
                                            email: isLogin.payload.email,
                                            method_uuid: gacha[0].uuid,
                                            game_name: gacha[0].game_name,
                                            product_name: gacha[0].name,
                                            used_status: 0
                                        }, { withCredentials: true })
                                            .then((response) => {
                                                if (response.data.status) {
                                                    // console.log("สร้างสินค้าในคลังสำเร็จ")
                                                    axios.get(`${process.env.REACT_APP_API}/read-lasted-store-product`, { withCredentials: true })
                                                        .then((response) => {
                                                            if (response.data.status) {
                                                                axios.post(`${process.env.REACT_APP_API}/create-history-product`, {
                                                                    uuid: response.data.payload[0].uuid,
                                                                    email: isLogin.payload.email,
                                                                    game_name: gacha[0].game_name,
                                                                    product_name: gacha[0].name,
                                                                    product_price: process.env.REACT_APP_BUY_ONCE,
                                                                    buy_method: "สินค้ากาชาแบบสุ่ม1ครั้ง"
                                                                }, { withCredentials: true })
                                                                    .then((response) => {
                                                                        if (response.data.status) {
                                                                            setShowData(gacha)
                                                                        }
                                                                    })
                                                                    .catch((error) => {

                                                                    })
                                                                axios.patch(`${process.env.REACT_APP_API}/update-gacha-count/${account.email}`, {
                                                                    gacha_count: countGuaruntee
                                                                })
                                                                    .then((response) => {
                                                                        if (response.data.status) {
                                                                            console.log(countGuaruntee)
                                                                        }
                                                                    })
                                                                    .catch((error) => { })
                                                            }
                                                        })
                                                        .catch((error) => {
                                                            alertError('ไม่สำเร็จ', 'การซื้อไม่สำเร็จ', 'ตกลง')
                                                        })
                                                } else {
                                                    // console.log("สร้างสินค้าในไม่คลังสำเร็จ")
                                                }
                                            })
                                            .catch((error) => {
                                                alertError('ไม่สำเร็จ', 'การซื้อไม่สำเร็จ', 'ตกลง')
                                            })

                                    } else {
                                        alertError('ไม่สำเร็จ', 'การซื้อไม่สำเร็จ', 'ตกลง')
                                    }
                                })
                                .catch((error) => {
                                    alertError('ไม่สำเร็จ', 'การซื้อไม่สำเร็จ', 'ตกลง')
                                })




                        }
                        else if (parseFloat(isLogin.payload.aysel_amount) < parseFloat(process.env.REACT_APP_BUY_ONCE)) {
                            Swal.fire({
                                title: 'ผิดพลาด',
                                text: `จำนวนAyselไม่เพียงพอต่อการซื้อ`,
                                icon: 'error',
                                showCancelButton: true,
                                confirmButtonColor: '#3FC3EE',

                                cancelButtonColor: '#F27474',
                                confirmButtonText: 'ตกลง, ไปเติมAysel',
                                cancelButtonText: 'ยกเลิก'
                            })
                                .then((result) => {
                                    if (result.isConfirmed) {
                                        navigate('/top-up')
                                    }
                                })
                        }
                    }
                })
        }


    }

    const handleBuyTenTime = () => {
        setShowModals(false)
        setShowData([])
        setBuyBy('ten')
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
            Swal.fire({
                title: 'แจ้งเตือน',
                text: `คุณต้องการจ่าย ${process.env.REACT_APP_BUY_TEN} Aysel สำหรับการสุ่มกาชา 10 ครั้ง`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3FC3EE',

                cancelButtonColor: '#F27474',
                confirmButtonText: 'ตกลง',
                cancelButtonText: 'ยกเลิก'
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        if (parseFloat(isLogin.payload.aysel_amount) >= parseFloat(process.env.REACT_APP_BUY_TEN)) {
                            setShowModals(true)
                            for (let index = 0; index <= 9; index++) {
                                setTimeout(() => {
                                    setTime(10 - index)
                                    handleRateGacha(countGuaruntee + parseInt(index))
                                    axios.patch(`${process.env.REACT_APP_API}/update-aysel`, {
                                        email: isLogin.payload.email,
                                        aysel_amount: parseFloat(isLogin.payload.aysel_amount) - parseFloat(process.env.REACT_APP_BUY_TEN)
                                    }, { withCredentials: true })
                                        .then((response) => {
                                            if (response.data.status) {
                                                axios.post(`${process.env.REACT_APP_API}/create-store-product`, {
                                                    email: isLogin.payload.email,
                                                    method_uuid: gacha[0].uuid,
                                                    game_name: gacha[0].game_name,
                                                    product_name: gacha[0].name,
                                                    used_status: 0
                                                }, { withCredentials: true })
                                                    .then((response) => {
                                                        if (response.data.status) {
                                                            // console.log("สร้างสินค้าในคลังสำเร็จ")
                                                            axios.get(`${process.env.REACT_APP_API}/read-lasted-store-product`, { withCredentials: true })
                                                                .then((response) => {
                                                                    if (response.data.status) {
                                                                        axios.post(`${process.env.REACT_APP_API}/create-history-product`, {
                                                                            uuid: response.data.payload[0].uuid,
                                                                            email: isLogin.payload.email,
                                                                            game_name: gacha[0].game_name,
                                                                            product_name: gacha[0].name,
                                                                            product_price: index === 9 ? 0 : process.env.REACT_APP_BUY_ONCE,
                                                                            buy_method: "สินค้ากาชาแบบสุ่ม 10 ครั้ง"
                                                                        }, { withCredentials: true })
                                                                            .then((response) => {
                                                                                if (response.data.status) {
                                                                                    setShowData((previous) => [...previous, gacha])
                                                                                    axios.patch(`${process.env.REACT_APP_API}/update-gacha-count/${account.email}`, {
                                                                                        gacha_count: countGuaruntee+parseInt(index)
                                                                                    })
                                                                                        .then((response) => {
                                                                                            if (response.data.status) {
                                                                                                console.log(countGuaruntee)
                                                                                            }
                                                                                        })
                                                                                        .catch((error) => { })
                                                                                }
                                                                            })
                                                                            .catch((error) => {
                                                                                alertError('ไม่สำเร็จ', 'การซื้อไม่สำเร็จ', 'ตกลง')
                                                                            })
                                                                    }
                                                                })
                                                                .catch((error) => {
                                                                    alertError('ไม่สำเร็จ', 'การซื้อไม่สำเร็จ', 'ตกลง')
                                                                })
                                                        } else {
                                                            // console.log("สร้างสินค้าในไม่คลังสำเร็จ")
                                                        }
                                                    })
                                                    .catch((error) => {
                                                        alertError('ไม่สำเร็จ', 'การซื้อไม่สำเร็จ', 'ตกลง')
                                                    })
                                            } else {
                                                alertSuccess('ไม่สำเร็จ', 'การซื้อไม่สำเร็จ', 'ตกลง')
                                            }
                                        })
                                        .catch((error) => {
                                            alertError('ไม่สำเร็จ', 'การซื้อไม่สำเร็จ', 'ตกลง')
                                        })


                                }, 2000 * index)
                            }
                            setCountGuaruntee(parseInt(countGuaruntee - parseInt(process.env.REACT_APP_GUARUNTEE)))
                            
                        }
                        else if (parseFloat(isLogin.payload.aysel_amount) < parseFloat(process.env.REACT_APP_BUY_ONCE)) {
                            Swal.fire({
                                title: 'ผิดพลาด',
                                text: `จำนวนAyselไม่เพียงพอต่อการซื้อ`,
                                icon: 'error',
                                showCancelButton: true,
                                confirmButtonColor: '#3FC3EE',

                                cancelButtonColor: '#F27474',
                                confirmButtonText: 'ตกลง, ไปเติมAysel',
                                cancelButtonText: 'ยกเลิก'
                            })
                                .then((result) => {
                                    if (result.isConfirmed) {
                                        navigate('/top-up')
                                    }
                                })
                        }
                    }
                })
        }
    }
    return (
        <div>
            <MetaHeader title={`สินค้าสุ่มกาชา`} />
            <Navigation />
            <TitleBox title={'สินค้าสุ่มกาชา'} />
            {
                dataGacha.length === 0 ?
                    <div>
                        <div className='max-w-full mb-5'>
                            <div className='lg:flex md:hidden sm:hidden relative rounded-3xl max-w-[1200px] py-10 mx-auto overflow-hidden max-h-[500px] hidden bg-gradient-to-r from-shadow-primary to-[#9d09cf]' >
                                <div className='flex justify-center w-full ' >
                                    <div className='flex items-center'>
                                        <Icon icon={"game-icons:perspective-dice-six-faces-random"} width={125} className='text-shadow-white' />
                                        <div className='text-5xl font-bold text-shadow-white'>สินค้าสุ่มกาชายังไม่พร้อมให้บริการ</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center mt-24' >
                            <Link className='border-none btn bg-shadow-error hover:bg-shadow-herror' to='/'>กลับไปหน้าแรก</Link>
                        </div>
                    </div>
                    :
                    <div className='flex flex-col'>
                        <div className='flex justify-end mx-40 '>
                            <div className='flex items-center btn btn-ghost hover:bg-shadow-white text-md text-shadow-info' onClick={() => document.getElementById('detail-gacha-product').showModal()}>ดูสินค้าสุ่มกาชาทั้งหมด<Icon icon={"mdi:information-outline"} width={20} /></div>
                        </div>
                        <dialog id='detail-gacha-product' className='modal'>
                            <div className='flex flex-col justify-center max-w-5xl modal-box border-x-4 border-y-4 border-shadow-info'>
                                <div className='flex flex-col px-12 my-5'>
                                    <div className='flex justify-end my-3 text-shadow-info'>วางลูกศรค้างเพื่อดูชื่อ</div>
                                    <div className='grid justify-center grid-flow-row grid-cols-4 gap-5'>
                                        {dataGacha.map((value, id) => (
                                            <div key={id} className='flex '>
                                                {
                                                    value.guarantee_status ?
                                                        <div>
                                                            <div className='flex border-x-8 border-y-8 rounded-xl border-shadow-accent w-[200px] h-[180px] justify-center bg-'>
                                                                <img src={`${process.env.REACT_APP_GACHA_PRODUCT}${value.information}`} alt='gacha-product' title={value.name} />
                                                            </div>
                                                            <div>
                                                                <div>อัตราการออก {value.chance}%</div>
                                                            </div>
                                                        </div> :
                                                        <div>
                                                            <div className='flex border-x-8 border-y-8 rounded-xl border-shadow-primary w-[200px] h-[180px] justify-center bg-'>
                                                                <img src={`${process.env.REACT_APP_GACHA_PRODUCT}${value.information}`} alt='gacha-product' title={value.name} />
                                                            </div>
                                                            <div>
                                                                <div>อัตราการออก {value.chance}%</div>
                                                            </div>
                                                        </div>
                                                }
                                            </div>
                                        ))}

                                    </div>
                                </div>
                                <div className='flex justify-start '>
                                    <div className=' text-shadow-error'>*สินค้ากรอบสีทองคือสินค้าการันตี</div>
                                </div>
                                <div className="flex justify-center modal-action">
                                    <form method='dialog' className='flex justify-center'>
                                        <button className="border-none btn bg-shadow-info hover:bg-shadow-hinfo text-shadow-white" >ตกลง</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                        <div className='max-w-full mb-5'>
                            <div className='flex relative  max-w-[1200px] py-10 mx-auto overflow-hidden max-h-[500px] bg-gradient-to-r from-shadow-primary to-[#9d09cf] ' >
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
                                <button className='text-2xl border-none btn bg-shadow-primary text-shadow-white hover:bg-shadow-primary/80' onClick={handleBuyOneTime} >{process.env.REACT_APP_BUY_ONCE} <Icon icon={"game-icons:minerals"} width={30} className='text-shadow-info' /></button>
                                <div className='text-xl '>1 ครั้ง</div>
                            </div>

                            <div className='flex flex-col items-center'>
                                <button className='text-2xl border-none btn bg-shadow-primary text-shadow-white hover:bg-shadow-primary/80' onClick={handleBuyTenTime}>{process.env.REACT_APP_BUY_TEN} <Icon icon={"game-icons:minerals"} width={30} className='text-shadow-info' /></button>
                                <div className='text-xl '>10 ครั้ง</div>
                            </div>
                        </div>
                        {
                            showModals &&
                            <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full'>
                                <div className='absolute '>
                                    {
                                        showData.length === 0 ?
                                            <div className='flex flex-col justify-center max-w-5xl bg-shadow-white border-x-4 border-y-4 border-shadow-info w-[1020px] h-[500px]'>
                                                <div className='flex flex-col items-center justify-center'>
                                                    <div className='text-3xl font-bold'>กรุณารอสักครู่ กำลังสุ่ม...</div>
                                                    <div className='text-xl'>{time}</div>
                                                </div>
                                                <div className='flex items-center justify-center w-full h-full '>
                                                    <img src={`${process.env.REACT_APP_GACHA_PRODUCT}/diceRandom.gif`} alt='gacha-product' title={'Random'} className="w-72 h-72" />
                                                </div>
                                            </div> : buyBy === 'one' ?
                                                <div className='flex flex-col justify-center max-w-5xl bg-shadow-white border-x-4 border-y-4 border-shadow-info w-[1020px] h-[500px]'>
                                                    <div className='flex items-center justify-center w-full h-full '>
                                                        <img src={`${process.env.REACT_APP_GACHA_PRODUCT}/diceRandom.gif`} alt='gacha-product' title={'Random'} className="w-72 h-72" />
                                                    </div>
                                                    <div className="flex justify-center" >
                                                        <div>
                                                            <button className="w-full border-none btn bg-shadow-info hover:bg-shadow-hinfo text-shadow-white" onClick={() => document.getElementById('show-gacha-product-one').showModal()}>ดูของขวัญ</button>
                                                        </div>
                                                    </div>
                                                    <dialog id='show-gacha-product-one' className='modal'>
                                                        <div className='flex flex-col justify-center max-w-5xl modal-box border-x-4 border-y-4 border-shadow-info'>
                                                            <div className='flex flex-col justify-center px-12 my-5'>
                                                                <div className='flex justify-end my-3 text-shadow-info'>วางลูกศรค้างเพื่อดูชื่อ</div>
                                                                <div className='grid-flow-row grid-cols-4 gap-5 gridjustify-center '>
                                                                    {showData.map((value, id) => (
                                                                        <div key={id} className='flex justify-center '>
                                                                            {
                                                                                value.guarantee_status ?
                                                                                    <div>

                                                                                        <div className='flex pb-3 my-2'>
                                                                                            <div className='text-3xl font-bold text-shadow-primary'>{`ยินดีด้วย ! คุณได้รับ`}</div>
                                                                                        </div>
                                                                                        <div className='flex border-x-8 border-y-8 rounded-xl border-shadow-accent w-[200px] h-[180px] justify-center bg-'>
                                                                                            <img src={`${process.env.REACT_APP_GACHA_PRODUCT}${value.information}`} alt='gacha-product' title={value.name} />
                                                                                        </div>
                                                                                    </div> :
                                                                                    <div>
                                                                                        <div className='flex pb-3 my-2'>
                                                                                            <div className='text-3xl font-bold text-shadow-primary'>{`ยินดีด้วย ! คุณได้รับ`}</div>
                                                                                        </div>
                                                                                        <div className='flex border-x-8 border-y-8 rounded-xl border-shadow-primary w-[200px] h-[180px] justify-center bg-'>
                                                                                            <img src={`${process.env.REACT_APP_GACHA_PRODUCT}${value.information}`} alt='gacha-product' title={value.name} />
                                                                                        </div>
                                                                                    </div>
                                                                            }
                                                                        </div>
                                                                    ))}

                                                                </div>
                                                            </div>
                                                            <div className="flex justify-center modal-action">
                                                                <form method='dialog' className='flex justify-center gap-5'>
                                                                    <button className="w-full border-none btn bg-shadow-info hover:bg-shadow-hinfo text-shadow-white" onClick={() => { navigate('/transaction') }}>ตกลง</button>
                                                                    <button className="w-full border-none btn bg-shadow-error hover:bg-shadow-herror text-shadow-white" onClick={() => { setShowModals(false) }}>ปิด</button>
                                                                </form>
                                                            </div>
                                                        </div>


                                                    </dialog>


                                                </div> : buyBy === 'ten' && showData.length === 10 ?
                                                    <div className='flex flex-col justify-center max-w-5xl modal-box border-x-4 border-y-4 border-shadow-info w-[1020px] h-[500px]'>
                                                        <div className='flex items-center justify-center w-full h-full '>
                                                            <img src={`${process.env.REACT_APP_GACHA_PRODUCT}/diceRandom.gif`} alt='gacha-product' title={'Random'} className="w-72 h-72" />
                                                        </div>
                                                        <div className="flex justify-center modal-action ">
                                                            <div className='flex items-end'>
                                                                <button className="border-none btn bg-shadow-info hover:bg-shadow-hinfo text-shadow-white" onClick={() => document.getElementById('show-gacha-product-ten').showModal()} >ดูของขวัญ</button>
                                                            </div>
                                                        </div>
                                                        <dialog id='show-gacha-product-ten' className='modal'>
                                                            <div className='flex flex-col justify-center max-w-5xl modal-box border-x-4 border-y-4 border-shadow-info'>
                                                                <div className='flex flex-col px-12 my-5'>
                                                                    <div className='flex justify-end my-3 text-shadow-info'>วางลูกศรค้างเพื่อดูชื่อ</div>
                                                                    <div className='flex justify-center pb-3 my-2'>
                                                                        <div className='text-3xl font-bold text-shadow-primary'>{`ยินดีด้วย ! คุณได้รับ`}</div>
                                                                    </div>
                                                                    <div className='grid justify-center grid-flow-row grid-cols-5 gap-5 '>
                                                                        {showData.map((value, id) => (
                                                                            <div key={id} className='flex'>
                                                                                {
                                                                                    value[0].guarantee_status ?
                                                                                        <div>

                                                                                            <div className='flex border-x-8 border-y-8 rounded-xl border-shadow-accent w-[170px] h-[160px] justify-center bg-'>
                                                                                                <img src={`${process.env.REACT_APP_GACHA_PRODUCT}${value[0].information}`} alt='gacha-product' title={value[0].name} />
                                                                                            </div>
                                                                                        </div> :
                                                                                        <div>

                                                                                            <div className='flex border-x-8 border-y-8 rounded-xl border-shadow-primary w-[160px] h-[160px] justify-center bg-'>
                                                                                                <img src={`${process.env.REACT_APP_GACHA_PRODUCT}${value[0].information}`} alt='gacha-product' title={value[0].name} />
                                                                                            </div>
                                                                                        </div>
                                                                                }
                                                                            </div>
                                                                        ))}

                                                                    </div>
                                                                </div>
                                                                <div className="flex justify-center modal-action">
                                                                    <form method='dialog' className='flex justify-center gap-5'>
                                                                        <button className="w-full border-none btn bg-shadow-info hover:bg-shadow-hinfo text-shadow-white" onClick={() => { navigate('/transaction') }}>ตกลง</button>
                                                                        <button className="w-full border-none btn bg-shadow-error hover:bg-shadow-herror text-shadow-white" onClick={() => { setShowModals(false) }}>ปิด</button>
                                                                    </form>
                                                                </div>
                                                            </div>


                                                        </dialog>
                                                    </div>
                                                    :
                                                    <div className='flex flex-col justify-center max-w-5xl modal-box border-x-4 border-y-4 border-shadow-info w-[1020px] h-[500px]'>
                                                        <div className='flex flex-col items-center justify-center'>
                                                            <div className='text-3xl font-bold'>กรุณารอสักครู่ กำลังสุ่ม...</div>
                                                            <div className='text-xl'>{time}</div>
                                                        </div>
                                                        <div className='flex items-center justify-center w-full h-full '>
                                                            <img src={`${process.env.REACT_APP_GACHA_PRODUCT}/diceRandom.gif`} alt='gacha-product' title={'Random'} className="w-72 h-72" />
                                                        </div>

                                                    </div>

                                    }
                                </div>
                            </div>
                        }


                    </div>

            }

        </div>
    )
}

export default GachaProduct