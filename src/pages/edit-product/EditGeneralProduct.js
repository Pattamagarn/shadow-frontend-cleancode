import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Swal from 'sweetalert2'

const EditGeneralProduct = () => {
    const { uuid } = useParams()
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()
    const [dataGeneral, setDataGeneral] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 1 && navigate('/')
    }, [isLogin, navigate])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/game-name-select`)
            .then((response) => {
                if (response.data.status) {
                    setData(response.data.payload)
                }
            })

    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/read-general-product-uuid/${uuid}`)
            .then((response) => {
                if (response.data.status) {
                    setDataGeneral(response.data.payload[0])
                }
            })

            .catch((error) => {
                console.log(error)
            })
    }, [uuid])


    const [generalProductList, setGeneralProductList] = useState({
        productId: '', gameName: '',
        name: '', normalPrice: '',
        specialPrice: '', information: '',
        description: ''
    })


    const setGeneralProductGameName = (gameName) => {
        setGeneralProductList({ ...generalProductList, gameName: gameName.target.value })
    }

    const setGeneralProductName = (name) => {
        setGeneralProductList({ ...generalProductList, name: name.target.value })
    }

    const setGeneralProductNormalPrice = (normalPrice) => {
        setGeneralProductList({ ...generalProductList, normalPrice: normalPrice.target.value })
    }

    const setGeneralProductSpecialPrice = (specialPrice) => {
        setGeneralProductList({ ...generalProductList, specialPrice: specialPrice.target.value })
    }

    const setGeneralProductInformation = (information) => {
        setGeneralProductList({ ...generalProductList, information: information.target.files[0] })
    }

    const setGeneralProductDescription = (description) => {
        setGeneralProductList({ ...generalProductList, description: description.target.value })
    }

    const alertSuccess = (title, text, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: text,
            icon: 'success',
            confirmButtonText: confirmButtonText
        })
        navigate('/product-management')
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

    const handleEditGeneralProduct = (event) => {        
        event.preventDefault()
        axios.patch(`${process.env.REACT_APP_API}/update-general-product/${uuid}`,{
            name: generalProductList.name !== '' ? generalProductList.name : dataGeneral.name,
            game_name: generalProductList.gameName !== '' ? generalProductList.gameName : dataGeneral.game_name,
            normal_price: generalProductList.normalPrice !== '' ? generalProductList.normalPrice : dataGeneral.normal_price,
            special_price: generalProductList.specialPrice !== '' ? generalProductList.specialPrice : dataGeneral.special_price,
            information: generalProductList.information !== '' ? generalProductList.information : dataGeneral.information,
            description: generalProductList.description !== '' ? generalProductList.description : dataGeneral.description
        })
        .then((response) => {
            if(response.data.status){
                alertSuccess("สำเร็จ",response.data.payload,'success')
            }
            else {
                alertError('ผิดพลาด',response.data.payload,'error')
            }
        })
        .catch((error) => {
            alertError('ผิดพลาด','แก้ไขสินค้าทั่วไปล้มเหลว','error')
        })
    }

    return (
        <div>
            <MetaHeader title={`แก้ไขสินค้า`} />
            <Navigation />
            <TitleBox title={'แก้ไขสินค้า'} />
            <form onSubmit={handleEditGeneralProduct} className='items-end mx-auto mt-10 mb-10 form-control justify-evenly size-fit'>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>ชื่อเกม</span>
                    <select onChange={setGeneralProductGameName} className="select w-80 bg-shadow-grey text-shadow-black">
                        <option disabled defaultValue={dataGeneral.game_name}>เลือกสินค้า</option>
                        {data.map((game) => <option key={game.game_name}>{game.game_name}</option>)}
                    </select>
                </div>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>รหัสสินค้า</span>
                    <div type={'text'}  placeholder='รหัสสินค้า' className='py-2 input w-80 bg-shadow-grey text-shadow-blac' >{dataGeneral.product_id}</div>
                </div>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>ชื่อสินค้า</span>
                    <input type={'text'} defaultValue={dataGeneral.name} placeholder='ชื่อสินค้า' onChange={setGeneralProductName} className='input w-80 bg-shadow-grey text-shadow-black' />
                </div>

                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>ราคาเต็ม</span>
                    <input type={'text'} defaultValue={dataGeneral.normal_price} placeholder='ราคาเต็ม' onChange={setGeneralProductNormalPrice} className='input w-80 bg-shadow-grey text-shadow-black' />
                </div>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>ราคาลด</span>
                    <input type={'text'} defaultValue={dataGeneral.special_price} placeholder='ราคาลด' onChange={setGeneralProductSpecialPrice} className='input w-80 bg-shadow-grey text-shadow-black' />
                </div>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>รูปภาพ</span>
                    <input type={'file'} onChange={setGeneralProductInformation} className='file-input w-80 bg-shadow-grey text-shadow-black' />
                </div>
                <div className='flex flex-row items-center justify-end mt-2 size-full'>
                    <span className='mr-10 text-2xl text-nowrap'>รายละเอียด</span>
                    <textarea type={'text'} defaultValue={dataGeneral.description} placeholder='รายละเอียด' onChange={setGeneralProductDescription} className='textarea w-80 bg-shadow-grey text-shadow-black' />
                </div>
                <div className='flex flex-row items-center mt-2 size-full'>
                    <button type='submit' className='mr-5 border-none btn grow bg-shadow-success hover:bg-shadow-hsuccess text-shadow-white'>ยืนยันการเพิ่มสินค้า</button>
                    <Link to='/product-management' className='border-none btn grow bg-shadow-error hover:bg-shadow-herror text-shadow-white'>ยกเลิกการเพิ่มสินค้า</Link>
                </div>
            </form>
        </div>
    )
}

export default EditGeneralProduct