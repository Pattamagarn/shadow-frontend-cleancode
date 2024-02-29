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
            <form onSubmit={handleAddGameName} className='mx-10 mt-10 flex flex-row items-center align-middle justify-start'>
                <span className='text-2xl mr-2'>ชื่อเกม</span>
                <input value={gameNameList.gameName} type={'text'} placeholder='ชื่อเกม' onChange={setGameName} className='input mr-2 bg-[#D9D9D9] text-[#000000]'/>
                <button type='submit' className='btn mr-2 border-none bg-[#A5DC86] hover:bg-[#86b36d] text-[#FFFFFF]'>ยืนยันการเพิ่มชื่อเกม</button>
                <Link to='/general-management' className='btn mr-2 border-none bg-[#F27474] hover:bg-[#ca6161] text-[#FFFFFF]'>ยกเลิกการเพิ่มชื่อเกม</Link>
            </form>
        </div>
    )
}

export default AddGameName