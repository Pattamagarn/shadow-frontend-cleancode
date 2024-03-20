import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useState,useEffect } from 'react'
import { Link,useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import axios from 'axios'

const EditGachaProduct = () => {
    const { uuid } = useParams()
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()
    const [data,setData] = useState([])
    const [dataGacha,setDataGacha] = useState([])

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 1 && navigate('/')
    }, [isLogin, navigate])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/game-name-select`)
        .then((response) => {
            if(response.data.status) {
                setData(response.data.payload)
            }
        })
    },[])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/read-gacha-product-uuid/${uuid}`)
        .then((response) => {
            if (response.data.status) {
                setDataGacha(response.data.payload[0])
            }
        })
        .catch((error) => {
            console.log(error)
        })
        
    },[uuid])

    const [gachaProductList, setGachaProductList] = useState({
        productId:'', gameName:'',
        name:'', chance:'',
        guaranteeStatus:'', information: '',
        description: ''
    })

    const setGachaProductProductId = (productId) => {
        setGachaProductList({...gachaProductList, productId:productId.target.value})
    }

    const setGachaProductGameName = (gameName) => {
        setGachaProductList({...gachaProductList, gameName:gameName.target.value})
    }

    const setGachaProductName = (name) => {
        setGachaProductList({...gachaProductList, name:name.target.value})
    }

    const setGachaProductChance = (chance) => {
        setGachaProductList({...gachaProductList, chance:chance.target.value})
    }

    const setGachaProductGuaranteeStatus = (guaranteeStatus) => {
        setGachaProductList({...gachaProductList, guaranteeStatus:guaranteeStatus.target.value})
    }

    const setGachaProductInformation = (information) => {
        setGachaProductList({...gachaProductList, information:information.target.files[0]})
    }

    const setGachaProductDescription = (description) => {
        setGachaProductList({...gachaProductList, description:description.target.value})
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

    const handleEditGachaProduct = (event) => {

    }
    
    return (
        <div>
            <MetaHeader title={`แก้ไขสินค้ากาชาปอง`} />
            <Navigation />
            <TitleBox title={'แก้ไขสินค้ากาชาปอง'} />
            <form onSubmit={handleEditGachaProduct} className='items-end mx-auto mt-10 mb-10 form-control justify-evenly size-fit'>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>รหัสสินค้า</span>
                    <input type={'text'} defaultValue={dataGacha.product_id} placeholder='รหัสสินค้า' onChange={setGachaProductProductId} className='input w-80 bg-shadow-grey text-shadow-black'/>
                </div>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>ชื่อสินค้า</span>
                    <input type={'text'} defaultValue={dataGacha.name} placeholder='ชื่อสินค้า' onChange={setGachaProductName} className='input w-80 bg-shadow-grey text-shadow-black'/>
                </div>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>ชื่อเกม</span>
                    <select onChange={setGachaProductGameName} className="select w-80 bg-shadow-grey text-shadow-black">
                        <option disabled defaultValue={dataGacha.game_name}>เลือกชื่อเกม</option>
                        {data.map((game) => <option key={game.game_name}>{game.game_name}</option>)}
                    </select>
                </div>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>เปอร์เซ็นต์การดรอป</span>
                    <input type={'text'} defaultValue={dataGacha.chance} placeholder='เปอร์เซ็นต์การดรอป' onChange={setGachaProductChance} className='input w-80 bg-shadow-grey text-shadow-black'/>
                </div>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>การันตี</span>
                    <select defaultValue={dataGacha.guarantee_status} onChange={setGachaProductGuaranteeStatus} className="select w-80 bg-shadow-grey text-shadow-black">
                        <option value={false} select='true'>ปิด</option>
                        <option value={true}>เปิด</option>
                    </select>
                </div>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>รูปภาพ</span>
                    <input type={'file'} defaultValue={dataGacha.information} onChange={setGachaProductInformation} className='file-input w-80 bg-shadow-grey text-shadow-black'/>
                </div>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>รายละเอียด</span>
                    <textarea defaultValue={dataGacha.description} type={'text'} placeholder='รายละเอียด' onChange={setGachaProductDescription} className='textarea w-80 bg-shadow-grey text-shadow-black'/>
                </div>
                <div className='flex flex-row items-center mt-2 size-full'>
                    <button type='submit' className='mr-5 border-none btn grow bg-shadow-success hover:bg-shadow-hsuccess text-shadow-white'>ยืนยันการเพิ่มสินค้ากาชาปอง</button>
                    <Link to='/product-management' className='border-none btn grow bg-shadow-error hover:bg-shadow-herror text-shadow-white'>ยกเลิกการเพิ่มสินค้ากาชาปอง</Link>
                </div>
            </form>
        </div>
    )
}

export default EditGachaProduct