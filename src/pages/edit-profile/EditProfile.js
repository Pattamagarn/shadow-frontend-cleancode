import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { Icon } from '@iconify/react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Swal from 'sweetalert2'

const EditProfile = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()
    const [account, setAccount] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })
    const [profileAvatar, setProfileAvatar] = useState('')
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

    const handleOldPassword = (event) => {
        setPassword({ ...password, oldPassword: event.target.value })
    }
    const handleNewPassword = (event) => {
        setPassword({ ...password, newPassword: event.target.value })
    }

    const handleConfirmPassword = (event) => {
        setPassword({ ...password, confirmPassword: event.target.value })
    }

    const setProfileAvatars = (information) => {
        setProfileAvatar(information.target.files[0])
    }

    const handleSubmit = () => {
        if (password.oldPassword === '') {
            Swal.fire({
                title: "เกิดข้อผิดพลาด",
                text: "กรุณาใส่รหัสผ่านเก่า",
                icon: 'warning',
                confirmButtonText: "ตกลง"
            })
        }
        else {
            Swal.fire({
                title: "เกิดข้อผิดพลาด",
                text: "กรุณารอก่อน เดี๋ยวทำได้ในอีกไม่ช้า",
                icon: 'warning',
                confirmButtonText: "ตกลง"
            })
        }
    }
    return (
        <div>
            <MetaHeader title={`แก้ไขโปรไฟล์`} />
            <Navigation />
            <TitleBox title={'แก้ไขโปรไฟล์'} />
            <div className='flex flex-row w-auto mt-20 place-content-center justify-evenly'>
                <div className='grid gap-4 '>
                    <div className='w-full max-w-sm px-6 py-3 mt-2 rounded-lg bg-neutral' >{account.email}</div>
                    <label className='input w-full max-w-xs bg-neutral text-[#000000] flex justify-between items-center gap-2'>
                        <input key={account.username} defaultValue={account.username} placeholder='ชื่อผู้ใช้' onChange={handleEditUsername} />
                    </label>
                    <label className='input w-full max-w-xs bg-neutral text-[#000000] flex justify-between items-center gap-2'>
                        <input type={hide1 ? 'password' : 'text'} placeholder='รหัสผ่านใหม่' onChange={handleNewPassword} />
                        <Icon icon={hide1 ? "mdi:hide" : "mdi:show"} className='text-[#000000]' width={24} height={24} onClick={() => setHide1(!hide1)} />
                    </label>
                    <label className='input w-full max-w-xs bg-neutral text-[#000000] flex justify-between items-center gap-2'>
                        <input type={hide2 ? 'password' : 'text'} placeholder='ยืนยันรหัสผ่านใหม่' onChange={handleConfirmPassword} />
                        <Icon icon={hide2 ? "mdi:hide" : "mdi:show"} className='text-[#000000]' width={24} height={24} onClick={() => setHide2(!hide2)} />
                    </label>
                    {(password.newPassword) === (password.confirmPassword) && password.newPassword !== '' &&
                        <label className='input w-full max-w-xs bg-neutral text-[#000000] flex justify-between items-center gap-2'>
                            <input type={hide3 ? 'password' : 'text'} placeholder='รหัสผ่านเก่า' onChange={handleOldPassword} />
                            <Icon icon={hide3 ? "mdi:hide" : "mdi:show"} className='text-[#000000]' width={24} height={24} onClick={() => setHide3(!hide3)} />
                        </label>
                    }


                </div>
                <div className='flex flex-col justify-center'>
                    <img src={`${process.env.REACT_APP_AVATAR}${account.avatar}`} alt={`profile ${account.username}`} width={256} height={256} className='rounded-full' title={`${account.username}`}></img>
                    <div className='flex justify-center mt-5'>
                        <input type={'file'} onChange={setProfileAvatars} className='w-[85px] file-input bg-shadow-grey text-shadow-black' />
                    </div>
                </div>

            </div>
            <div className='flex gap-16 mt-10 mb-10 place-content-center'>
                <Link className='btn btn-success w-60 rounded-3xl' onClick={() => { handleSubmit() }} >บันทึก</Link>
                <Link className='btn btn-error w-60 rounded-3xl'>ยกเลิก</Link>
            </div>
        </div>
    )
}

export default EditProfile