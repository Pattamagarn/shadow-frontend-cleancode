import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import axios from 'axios'

const EditGameName = () => {
    const { uuid } = useParams()
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 1 && navigate('/')
    }, [isLogin, navigate])

    const [gameNameList, setGameNameList] = useState({ gameName: '' })

    const setGameName = (gameName) => {
        setGameNameList({ ...gameNameList, gameName: gameName.target.value })
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

    const handleEditGameName = (event) => {
        event.preventDefault()
        axios.patch(`${process.env.REACT_APP_API}/game-name-update/${uuid}`,{
            game_name: gameNameList.gameName
        })
        .then((response) => {
            if(response.data.status){
                alertSuccess('สำเร็จ', response.data.payload, 'ตกลง')
                navigate('/general-management')
            }
            else{
                if (response.data.payload === 'แก้ไขชื่อเกมล้มเหลว') {
                    alertError('ผิดพลาด', `แก้ไขเกมชื่อ ${gameNameList.gameName} ล้มเหลว`, 'ตกลง')
                } else {
                    alertWarning('คำเตือน', response.data.payload, 'ตกลง')
                }
            }
        })
        .catch((error) => {
            alertError('ผิดพลาด', `cก้ไขเกมชื่อ ${gameNameList.gameName} ล้มเหลว`, 'ตกลง')
        })
        
    }

    return (
        <div>
            <MetaHeader title={`แก้ไขชื่อเกม`} />
            <Navigation />
            <TitleBox title={'แก้ไขชื่อเกม'} />
            <div className='mt-10 lg:mx-32 md:mx-10 sm:mx-10'>
                <form onSubmit={handleEditGameName} className='flex flex-row items-center justify-start mx-10 mt-10 align-middle'>
                    <span className='mr-2 text-2xl'>ชื่อเกม</span>
                    <input value={gameNameList.gameName} type={'text'} placeholder='ชื่อเกม' onChange={setGameName} className='input mr-2 bg-[#D9D9D9] text-[#000000]' />
                    <button type='submit' className='mr-2 border-none btn bg-shadow-success hover:bg-shadow-hsuccess text-shadow-white'>ยืนยันการแก้ไขชื่อเกม</button>
                    <Link to='/general-management' className='mr-2 border-none btn bg-shadow-error hover:bg-shadow-herror text-shadow-white'>ยกเลิกการแก้ไขชื่อเกม</Link>
                </form>
            </div>

        </div>
    )
}

export default EditGameName