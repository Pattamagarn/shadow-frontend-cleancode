import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import { Icon } from '@iconify/react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { resetPasswordAccount } from '../../service/authentication'
import { useSelector,useDispatch } from 'react-redux'
import { setIsLogin } from '../../redux/isLoginSlice'

const ForgotPassword = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        isLogin.status && navigate('/')
    }, [isLogin, navigate])

    const [account, setAccount] = useState({email:''})

    const setEmail = (email) => {
        setAccount({...account, email:email.target.value})
    }

    const alertSuccess = (title, text, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: text,
            icon: 'success',
            confirmButtonText: confirmButtonText
        })
        setAccount({email:'', password:''})
        axios.get(`${process.env.REACT_APP_API}/authentication-account`, { withCredentials: true })
        .then((response) => {
            dispatch(setIsLogin({status: response.data.status, payload: response.data.payload}))
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

    const recoveryPassword = (event) => {
        event.preventDefault()
        resetPasswordAccount(account.email, alertSuccess, alertError, alertWarning)
    }

    return (
        <div>
            <MetaHeader title={`กู้คืนรหัสผ่าน`} />
            <Navigation />
            <div className='container hidden sm:flex justify-center w-full h-full mx-auto mt-5'>
                <form onSubmit={recoveryPassword} className={`p-10 rounded bg-[#33007B]`}>
                    <div className='flex justify-center align-middle'>
                    <Icon icon={"game-icons:minerals"} className='text-[#F000B8]' width={48} height={48} />
                    <h4 className='text-5xl text-center text-[#FFFFFF]'>SHADOW</h4>
                    </div>
                    <h4 className='text-3xl text-center text-[#FFFFFF] mt-5'>ลืมรหัสผ่านหรือเปล่า?</h4>
                    <div className='form-control w-full max-w-xs mt-5'>
                        <input value={account.email} type={'text'} placeholder='อีเมล' className='input w-full max-w-xs bg-[#D9D9D9] text-[#000000]' onChange={setEmail}/>
                    </div>
                    <div className='flex flex-col w-full border-opacity-50'>
                        <button type='submit' className="btn border-none bg-[#3FC3EE] hover:bg-[#46a5c4] text-[#FFFFFF] w-full mt-5">ยืนยันอีเมล</button>
                        <Link to='/' className="btn border-none bg-[#F27474] hover:bg-[#ca6161] text-[#FFFFFF] w-full mt-5">
                            กลับสู่หน้าหลัก
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword