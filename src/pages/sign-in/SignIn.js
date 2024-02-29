import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import { Icon } from '@iconify/react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { signInAccount } from '../../service/authentication'
import { useSelector,useDispatch } from 'react-redux'
import { setIsLogin } from '../../redux/isLoginSlice'

const SignIn = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        isLogin.status && navigate('/')
    }, [isLogin, navigate])

    const [account, setAccount] = useState({email:'', password:''})
    const [hide, setHide] = useState(true)
    
    const setEmail = (email) => {
        setAccount({...account, email:email.target.value})
    }

    const setPassword = (password) => {
        setAccount({...account, password:password.target.value})
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

    const handleSignInAccount = (event) => {
        event.preventDefault()
        signInAccount(account, alertSuccess, alertError, alertWarning)
    }

    return (
        <div>
            <MetaHeader title={`เข้าสู่ระบบ`} />
            <Navigation />
            <form onSubmit={handleSignInAccount} className='p-2 bg-shadow-primary form-control sm:hidden min-w-[240px]'>
                <div className='flex flex-row items-center justify-center flex-nowrap'>
                    <Icon icon={'game-icons:minerals'} className='text-2xl size-fit text-shadow_pink sm:text-4xl' />
                    <span translate='no' className='text-xl subpixel-antialiased not-italic font-normal size-fit text-shadow-white'>SHADOW</span>
                </div>
                <div className='flex flex-row items-center justify-center flex-nowrap'>
                    <span translate='no' className='text-xl subpixel-antialiased not-italic font-normal size-fit text-shadow-white'>ยินดีต้อนรับกลับ</span>
                </div>
                <input value={account.email} type={'text'} placeholder='อีเมล' onChange={setEmail} className='mt-4 input bg-shadow-grey text-shadow-black'/>
                <label className='flex flex-row items-center mt-4 input bg-shadow-grey text-shadow-black flex-nowrap'>
                    <input value={account.password} type={hide ? 'password' : 'text'} placeholder='รหัสผ่าน' onChange={setPassword} className='size-full'/>
                    <span className='flex items-center justify-end'>
                    <Icon icon={hide ? "mdi:hide" : "mdi:show"} className='text-shadow-black size-full' onClick={() => setHide(!hide)}/>
                    </span>
                </label>
                <button type='submit' className='mt-4 border-none btn bg-shadow-success hover:bg-shadow-hsuccess text-shadow-white'>เข้าสู่ระบบ</button>
                <Link to='/' className='mt-4 border-none btn bg-shadow-error hover:bg-shadow-herror text-shadow-white'>กลับสู่หน้าหลัก</Link>
                <Link to='/sign-up' className='mt-4 border-none btn bg-shadow-info hover:bg-shadow-hinfo text-shadow-white'>ไปหน้าสมัครสมาชิก</Link>
                <Link to='/forgot-password' className='btn mt-4 border-none bg-shadow-accent hover:bg-shadow-haccent] text-shadow-white'>ลืมรหัสผ่าน</Link>
            </form>

            <div className='container justify-center hidden w-full h-full mx-auto mt-5 sm:flex'>
                <form onSubmit={handleSignInAccount} className={`p-10 rounded bg-shadow-primary`}>
                    <div className='flex justify-center align-middle'>
                    <Icon icon={"game-icons:minerals"} className='text-shadow-pink' width={48} height={48} />
                    <h4 className='text-5xl text-center text-shadow-white'>SHADOW</h4>
                    </div>
                    <h4 className='mt-5 text-3xl text-center text-shadow-white'>ยินดีต้อนรับกลับ</h4>
                    <div className='w-full max-w-xs mt-5 form-control'>
                        <input value={account.email} type={'text'} placeholder='อีเมล' className='w-full max-w-xs input bg-shadow-grey text-shadow-black' onChange={setEmail}/>
                    </div>
                    <div className='w-full max-w-xs mt-5 form-control'>
                        <label className='flex items-center justify-between w-full max-w-xs gap-2 input bg-shadow-grey text-shadow-black'>
                            <input value={account.password} type={hide ? 'password' : 'text'} placeholder='รหัสผ่าน' onChange={setPassword}/>
                            <Icon icon={hide ? "mdi:hide" : "mdi:show"} className='text-shadow-black' width={24} height={24} onClick={() => setHide(!hide)}/>
                        </label>
                    </div>
                    <div className='flex justify-between mt-1 align-middle'>
                        <Link to='/sign-up' className='flex link text-shadow-info hover:text-shadow-hinfo'>
                            <span className='mr-1'>สมัครสมาชิก</span>
                            <Icon icon={"line-md:account-add"} className='text-shadow-info hover:text-shadow-hinfo' width={24} height={24} />
                        </Link>
                        <Link to='/forgot-password' className='link text-shadow-error hover:text-shadow-herror'>
                            ลืมรหัสผ่าน
                        </Link>
                    </div>
                    <div className='flex flex-col w-full border-opacity-50'>
                        <button className="w-full mt-5 border-none btn bg-shadow-success hover:bg-shadow-hsuccess text-shadow-white">เข้าสู่ระบบ</button>
                        <Link to='/' className="w-full mt-5 border-none btn bg-shadow-error hover:bg-shadow-herror text-shadow-white">
                            กลับสู่หน้าหลัก
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn