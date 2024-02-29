import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import axios from 'axios'

const AddGameName = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 1 && navigate('/')
    }, [isLogin, navigate])

    const [gameNameList, setGameNameList] = useState({gameName:''})
    
    const setGameName = (gameName) => {
        setGameNameList({...gameNameList, gameName:gameName.target.value})
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

    const handleAddGameName = (event) => {
        event.preventDefault()
        axios.post(`${process.env.REACT_APP_API}/game-name-insert`, { gameName: gameNameList.gameName }, { withCredentials: true })
        .then((response) => {
            if(response.data.status){
                alertSuccess('สำเร็จ', response.data.payload, 'ตกลง')
                navigate('/general-management')
            }else{
                if(response.data.payload === 'เพิ่มชื่อเกมล้มเหลว'){
                    alertError('ผิดพลาด', `เพิ่มเกมชื่อ ${gameNameList.gameName} ล้มเหลว`, 'ตกลง')
                }else{
                    alertWarning('คำเตือน', response.data.payload, 'ตกลง')
                }
            }
            
        })
        .catch((error) => {
            alertError('ผิดพลาด', `เพิ่มเกมชื่อ ${gameNameList.gameName} ล้มเหลว`, 'ตกลง')
        })
    }

    return (
        <div>
            <MetaHeader title={`เพิ่มชื่อเกม`} />
            <Navigation />
            <TitleBox title={'เพิ่มชื่อเกม'} />
            <form onSubmit={handleAddGameName} className='flex flex-row items-center justify-start mx-10 mt-10 align-middle'>
                <span className='mr-2 text-2xl'>ชื่อเกม</span>
                <input value={gameNameList.gameName} type={'text'} placeholder='ชื่อเกม' onChange={setGameName} className='input mr-2 bg-[#D9D9D9] text-[#000000]'/>
                <button type='submit' className='mr-2 border-none btn bg-shadow-success hover:bg-shadow-hsuccess text-shadow-white'>ยืนยันการเพิ่มชื่อเกม</button>
                <Link to='/general-management' className='mr-2 border-none btn bg-shadow-error hover:bg-shadow-herror text-shadow-white'>ยกเลิกการเพิ่มชื่อเกม</Link>
            </form>
        </div>
    )
}

export default AddGameName