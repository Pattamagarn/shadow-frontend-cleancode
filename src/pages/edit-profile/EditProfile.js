import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { updatePasswordAccount } from '../../service/authentication'
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
    const [dataProfile,setDataProfile] = useState('')
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
        setDataProfile(URL.createObjectURL(information.target.files[0]))
        setProfileAvatar(information.target.files[0])
    }

    const alertSuccess = (title, text, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: text,
            icon: 'success',
            confirmButtonText: confirmButtonText
        })
            .then((result) => {
                if (result.isConfirmed) {
                    navigate('/profile')
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

    const alertWarning = (title, text, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            confirmButtonText: confirmButtonText
        })
    }

    const handleSubmit = (event) => {
        if(username !== '' || profileAvatar !== '' || password.newPassword !== ''){
            if ((password.newPassword) === (password.confirmPassword) && (password.newPassword !== '')) {
                //change password
                if (password.oldPassword === '') {  //not yet input old password
                    Swal.fire({
                        title: "เกิดข้อผิดพลาด",
                        text: "กรุณาใส่รหัสผ่านเก่า",
                        icon: 'warning',
                        confirmButtonText: "ตกลง"
                    })
                } else { // already input old password
                    event.preventDefault()
                    updatePasswordAccount(account.email, password.oldPassword, password.newPassword, alertSuccess, alertError, alertWarning)
                }
            }
            else if((password.newPassword) !== (password.confirmPassword) && (password.newPassword !== '')){
                Swal.fire({
                    title: "เกิดข้อผิดพลาด",
                    text: "การยืนยันรหัสผ่านใหม่ไม่ตรงกัน",
                    icon: 'warning',
                    confirmButtonText: "ตกลง"
                })
            }
            else{
                Swal.fire({
                title: "ตรวจสอบอีกที",
                text: "คุณแน่ใจว่าต้องการเปลี่ยนข้อมูลส่วนตัว?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3FC3EE',

                cancelButtonColor: '#F27474',
                confirmButtonText: "ตกลง",
                cancelButtonText: 'ยกเลิก'
            })
            .then((result) => {
                if(result.isConfirmed){
                    if (username !== account.username && username !== ''){
                        axios.patch(`${process.env.REACT_APP_API}/update-username/${account.email}`, {
                            username: username
                        })
                        .then((response) => {
                            if (response.data.status) {
                                Swal.fire({
                                    title: 'สำเร็จ',
                                    text: response.data.payload,
                                    icon: 'success'
                                })
                                    .then((result) => {
                                        if (result.isConfirmed) {
                                            navigate('/profile')
                                        }
                                    })
                            } else {
                                Swal.fire({
                                    title: 'ผิดพลาด',
                                    text: response.data.payload,
                                    icon: 'error'
                                });
                            }
                        })
                        .catch((error) => {
                            Swal.fire({
                                title: 'ผิดพลาด',
                                text: 'แก้ไขชื่อล้มเหลว',
                                icon: 'error'
                            });
                        });
                    }
                }
                if((profileAvatar !== account.avatar) && (profileAvatar !== '')){
                    event.preventDefault()
                    const formData = new FormData()
                    formData.append('file', profileAvatar)
                    formData.append('email',account.email)
                    axios.patch(`${process.env.REACT_APP_API}/update-avatar`,formData,{
                        headers : {'Content-Type' : 'multipart/form-data'},
                        withCredentials : true
                    })
                    .then((response) => {
                        if(response.data.status){
                            alertSuccess('สำเร็จ', response.data.payload, 'ตกลง')
                        }else{
                            alertWarning('คำเตือน', response.data.payload, 'ตกลง')
                        }
                    })
                    .catch((error) => {
                        alertError('ผิดพลาด', `${error} แก้ไขรูปโปรไฟล์ล้มเหลว`, 'ตกลง')
                    })
                }
            })
            }
            
        }
        else{
            console.log('nothing')
        }
    }
    return (
        <div>
            <MetaHeader title={`แก้ไขโปรไฟล์`} />
            <Navigation />
            <TitleBox title={'แก้ไขโปรไฟล์'} />
            <div className='flex flex-row w-auto mt-20 place-content-center justify-evenly'>
                <div className='grid gap-4 '>
                    <div className='w-full max-w-sm px-6 pt-2 my-2 rounded-lg bg-neutral ' >{account.email}</div>
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
                <div className='flex flex-col justify-center items-center '>
                    {dataProfile !== '' ?
                        <div className='w-[256px] h-[256px] rounded-full'>
                            <img src={dataProfile} alt={`profile ${account.username}`} title={`${account.username}`} className='w-full h-full rounded-full'></img>
                        </div>
                        :
                        
                        <div className='w-[256px] h-[256px] rounded-full'>
                            <img src={`${process.env.REACT_APP_AVATAR}${account.avatar}`} alt={`profile ${account.username}`} width={256} height={256} className='w-full h-full rounded-full ' title={`${account.username}`}></img>
                        </div>

                    }

                    <div className='flex justify-center mt-5'>
                        <input type={'file'} className='w-full file-input bg-shadow-grey text-shadow-black' onChange={setProfileAvatars} />
                    </div>
                </div>

            </div>
            <div className='flex gap-16 mt-10 mb-10 place-content-center'>
                <Link className='btn btn-success w-60 rounded-3xl' onClick={handleSubmit}>บันทึก</Link>
                <Link className='btn btn-error w-60 rounded-3xl' to='/profile'>ยกเลิก</Link>
            </div>
        </div>
    )
}

export default EditProfile