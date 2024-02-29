import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { Icon } from '@iconify/react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

const EditProfile = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()
    const [account, setAccount] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState({ oldPass: '', newPass: '', confirmPass: '' })
    const [hide1, setHide1] = useState(true)
    const [hide2, setHide2] = useState(true)
    const [hide3, setHide3] = useState(true)

    useEffect(() => {
        !isLogin.status && navigate('/')
    }, [isLogin, navigate])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/authentication-account`, { withCredentials: true })
            .then((response) => {
                if (response.data.status) {
                    setAccount(response.data.payload)
                }
            })
    }, [])

    const handleEditUsername = (event) => {
        setUsername(event.target.value)
    }

    return (
        <div>
            <MetaHeader title={`แก้ไขโปรไฟล์`} />
            <Navigation />
            <TitleBox title={'แก้ไขโปรไฟล์'} />
            <div className='flex flex-row place-content-center justify-evenly w-auto mt-20'>
                <div className='grid gap-4 '>
                    <div className='px-6 py-3 rounded-lg mt-2 bg-neutral max-w-sm w-full' >{account.email}</div>
                    <label className='input w-full max-w-xs bg-neutral text-[#000000] flex justify-between items-center gap-2'>
                        <input key={account.username} defaultValue={account.username} placeholder='ชื่อผู้ใช้' onChange={handleEditUsername} />
                    </label>
                    <label className='input w-full max-w-xs bg-neutral text-[#000000] flex justify-between items-center gap-2'>
                        <input type={hide1 ? 'password' : 'text'} placeholder='รหัสผ่านเก่า' />
                        <Icon icon={hide1 ? "mdi:hide" : "mdi:show"} className='text-[#000000]' width={24} height={24} />
                    </label>
                    <label className='input w-full max-w-xs bg-neutral text-[#000000] flex justify-between items-center gap-2'>
                        <input type={hide2 ? 'password' : 'text'} placeholder='รหัสผ่านใหม่' />
                        <Icon icon={hide2 ? "mdi:hide" : "mdi:show"} className='text-[#000000]' width={24} height={24} />
                    </label>
                    <label className='input w-full max-w-xs bg-neutral text-[#000000] flex justify-between items-center gap-2'>
                        <input type={hide3 ? 'password' : 'text'} placeholder='ยืนยันรหัสผ่านใหม่' />
                        <Icon icon={hide3 ? "mdi:hide" : "mdi:show"} className='text-[#000000]' width={24} height={24} />
                    </label>

                </div>
                <div >
                    <button><img src={`${process.env.REACT_APP_AVATAR}${account.avatar}`} alt='profile picture' width={256} height={256} className='image rounded-full'></img></button>
                </div>

            </div>
            <div className='flex place-content-center gap-16 mt-10 mb-10'>
                <button className='btn btn-success w-60 rounded-3xl' >บันทึก</button>
                <Link to='/profile'><button className='btn btn-error w-60 rounded-3xl'>ยกเลิก</button></Link>
            </div>
        </div>
    )
}

export default EditProfile