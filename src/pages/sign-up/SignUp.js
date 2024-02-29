import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import { Icon } from '@iconify/react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { signUpAccount } from '../../service/authentication'
import { useSelector } from 'react-redux'

const SignUp = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()

    useEffect(() => {
        isLogin.status && navigate('/')
    }, [isLogin, navigate])

    const atLeastOneUppercase = /[A-Z]/g
    const atLeastOneLowercase = /[a-z]/g
    const atLeastOneNumeric = /[0-9]/g
    const atLeastOneSpecialChar = /[#?!@$%^&*-]/g
    const eightCharsOrMore = /.{8,}/g
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/

    const [passwordRequireMent, setPasswordRequireMent] = useState({minimumLength: false, alphabetLower: false, alphabetUpper: false, number: false, special: false})
    const [account, setAccount] = useState({username:'', email:'', password:'', confirmPassword:''})
    const [hide, setHide] = useState(true)
    const [hide2, setHide2] = useState(true)

    const setUsername = (username) => {
        setAccount({...account, username:username.target.value})
    }

    const setEmail = (email) => {
        setAccount({...account, email:email.target.value})
    }

    const setPassword = (password) => {
        setAccount({...account, password:password.target.value})
        setPasswordRequireMent({
            minimumLength: password.target.value.match(eightCharsOrMore),
            alphabetLower: password.target.value.match(atLeastOneLowercase),
            alphabetUpper: password.target.value.match(atLeastOneUppercase),
            number: password.target.value.match(atLeastOneNumeric),
            special: password.target.value.match(atLeastOneSpecialChar)
        })
    }

    const setConfirmPassword = (confirmPassword) => {
        setAccount({...account, confirmPassword:confirmPassword.target.value})
    }

    const alertSuccess = (title, text, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: text,
            icon: 'success',
            confirmButtonText: confirmButtonText
        })
        setAccount({userName:'', email:'', password:'', confirmPassword:''})
        setPasswordRequireMent({minimumLength: false, alphabetLower: false, alphabetUpper: false, number: false, special: false})
        navigate('/sign-in')
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

    const createAccount = (event) => {
        event.preventDefault()
        if(account.username.length <= 0 || account.email.length <= 0 || account.password.length <= 0 || account.confirmPassword.length <= 0){
            alertWarning('คำเตือน', (account.username.length <= 0) ? 'กรุณากรอกชื่อผู้ใช้' : (account.email.length <= 0) ? 'กรุณากรอกอีเมล' : (account.password.length <= 0) ? 'กรุณากรอกรหัสผ่าน' : (account.confirmPassword.length <= 0) && 'กรุณายืนยันรหัสผ่าน', 'ตกลง')
        }else if(!account.email.match(emailRegex)){
            alertWarning('คำเตือน', 'กรุณากรอกรูปแบบอีเมลให้ถูกต้อง', 'ตกลง')
          }else if(!passwordRequireMent.minimumLength || !passwordRequireMent.alphabetLower || !passwordRequireMent.alphabetUpper || !passwordRequireMent.number || !passwordRequireMent.special){
            alertWarning('คำเตือน', (!passwordRequireMent.minimumLength) ? 
            'ต้องการความยาวรหัสผ่านอย่างน้อย 8 ตัว' : 
            (!passwordRequireMent.alphabetLower) ? 
            'ต้องการตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว' : 
            (!passwordRequireMent.alphabetUpper) ? 
            'ต้องการตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว' : 
            (!passwordRequireMent.number) ? 
            'ต้องการตัวเลขอย่างน้อย 1 ตัว' : 
            (!passwordRequireMent.special) && 
            'ต้องการตัวอักษรพิเศษอย่างน้อย 1 ตัว', 'ตกลง')
          }else if(account.password !== account.confirmPassword){
            alertWarning('คำเตือน', 'กรุณากรอกรหัสผ่าน และ ยืนยันรหัสผ่านให้ตรงกัน', 'ตกลง')
          }else{
            axios.post(`${process.env.REACT_APP_API}/sign-up-validation`, account)
            .then((response) => {
                if(response.data.status){
                    signUpAccount(account, alertSuccess, alertError, alertWarning)
                }else{
                    alertWarning('คำเตือน', response.data.payload, 'ตกลง')
                }
            })
            .catch((error) => {
                alertError('ผิดพลาด','เกิดข้อผิดพลาดที่ไม่รู้จัก', 'ตกลง')
            })
          }
    }

    return (
        <div>
            <MetaHeader title={`สมัครสมาชิก`} />
            <Navigation />
            <form onSubmit={createAccount} className='p-2 bg-[#33007B] form-control sm:hidden min-w-[240px]'>
                <div className='flex flex-row items-center justify-center flex-nowrap'>
                    <Icon icon={'game-icons:minerals'} className='size-fit text-[#F000B8] text-2xl sm:text-4xl' />
                    <span translate='no' className='subpixel-antialiased not-italic size-fit font-normal text-[#FFFFFF] text-xl'>SHADOW</span>
                </div>
                <div className='flex flex-row items-center justify-center flex-nowrap'>
                    <span translate='no' className='subpixel-antialiased not-italic size-fit font-normal text-[#FFFFFF] text-xl'>ยินดีต้อนรับสู่ระบบ</span>
                </div>
                <input value={account.username} type={'text'} placeholder='ชื่อผู้ใช้' onChange={setUsername} className='input mt-4 bg-[#D9D9D9] text-[#000000]'/>
                <input value={account.email} type={'text'} placeholder='อีเมล' onChange={setEmail} className='input mt-4 bg-[#D9D9D9] text-[#000000]'/>
                <label className='input mt-4 bg-[#D9D9D9] text-[#000000] flex flex-row flex-nowrap items-center'>
                    <input value={account.password} type={hide ? 'password' : 'text'} placeholder='รหัสผ่าน' onChange={setPassword} className='size-full'/>
                    <span className='flex items-center justify-end'>
                    <Icon icon={hide ? "mdi:hide" : "mdi:show"} className='text-[#000000] size-full' onClick={() => setHide(!hide)}/>
                    </span>
                </label>
                <label className='input mt-4 bg-[#D9D9D9] text-[#000000] flex flex-row flex-nowrap items-center'>
                    <input value={account.confirmPassword} type={hide2 ? 'password' : 'text'} placeholder='ยืนยันรหัสผ่าน' onChange={setConfirmPassword} className='size-full'/>
                    <span className='flex items-center justify-end'>
                    <Icon icon={hide2 ? "mdi:hide" : "mdi:show"} className='text-[#000000] size-full' onClick={() => setHide2(!hide2)}/>
                    </span>
                </label>
                <button type='button' onClick={()=>document.getElementById('password-required').showModal()} className='btn mt-4 border-none bg-[#FFB302] hover:bg-[#E5A101] text-[#FFFFFF]'>
                    <Icon icon={'material-symbols:info'} className='size-fit text-[#FFFFFF] text-2xl sm:text-4xl' />
                    ความต้องการของรหัสผ่าน
                </button>
                <button type='submit' className='btn mt-4 border-none bg-[#3FC3EE] hover:bg-[#46a5c4] text-[#FFFFFF]'>สร้างบัญชี</button>
                <Link to='/' className='btn mt-4 border-none bg-[#F27474] hover:bg-[#ca6161] text-[#FFFFFF]'>กลับสู่หน้าหลัก</Link>
                <Link to='/sign-in' className='btn mt-4 border-none bg-[#A5DC86] hover:bg-[#86b36d] text-[#FFFFFF]'>ไปหน้าเข้าสู่ระบบ</Link>
            </form>
            <dialog id='password-required' className='modal'>
                    <div className='modal-box'>
                        <form method='dialog'>
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <p className='text-sm font-bold'>ความต้องการของรหัสผ่าน</p>
                        <ul>
                            <li className={`${passwordRequireMent.minimumLength ? 'text-success' : 'text-error'} text-xs`}>* ความยาวรหัสผ่านอย่างน้อย 8 ตัว</li>
                            <li className={`${passwordRequireMent.alphabetLower ? 'text-success' : 'text-error'} text-xs`}>* มีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว</li>
                            <li className={`${passwordRequireMent.alphabetUpper ? 'text-success' : 'text-error'} text-xs`}>* มีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว</li>
                            <li className={`${passwordRequireMent.number ? 'text-success' : 'text-error'} text-xs`}>* มีตัวเลขอย่างน้อย 1 ตัว</li>
                            <li className={`${passwordRequireMent.special ? 'text-success' : 'text-error'} text-xs`}>* มีเครื่องหมายพิเศษ เช่น #?!@$%^&*- อย่างน้อย 1 ตัว</li>
                        </ul>
                    </div>
            </dialog>
            <div className='container hidden sm:flex justify-center w-full h-full mx-auto mt-5'>
                <form onSubmit={createAccount} className={`p-10 rounded bg-[#33007B]`}>
                    <div className='flex justify-center align-middle'>
                    <Icon icon={"game-icons:minerals"} className='text-[#F000B8]' width={48} height={48} />
                    <h4 className='text-5xl text-center text-[#FFFFFF]'>SHADOW</h4>
                    </div>
                    <h4 className='text-3xl text-center text-[#FFFFFF] mt-5'>ยินดีต้อนรับสู่ระบบ</h4>
                    <div className='w-full max-w-xs mt-5 form-control'>
                        <input value={account.username} type={'text'} placeholder='ชื่อผู้ใช้' className='input w-full max-w-xs bg-[#CACACA] text-[#000000]' onChange={setUsername}/>
                    </div>
                    <div className='w-full max-w-xs mt-5 form-control'>
                        <input value={account.email} type={'text'} placeholder='อีเมล' className='input w-full max-w-xs bg-[#CACACA] text-[#000000]' onChange={setEmail}/>
                    </div>
                    <div className='w-full max-w-xs mt-5 form-control'>
                        <label className='input w-full max-w-xs bg-[#CACACA] text-[#000000] flex justify-between items-center gap-2'>
                            <input value={account.password} type={hide ? 'password' : 'text'} placeholder='รหัสผ่าน' onChange={setPassword}/>
                            <Icon icon={hide ? "mdi:hide" : "mdi:show"} className='text-[#000000]' width={24} height={24} onClick={() => setHide(!hide)}/>
                        </label>
                    </div>
                    <div className='w-full max-w-xs mt-5 form-control'>
                        <label className='input w-full max-w-xs bg-[#CACACA] text-[#000000] flex justify-between items-center gap-2'>
                            <input value={account.confirmPassword} type={hide2 ? 'password' : 'text'} placeholder='ยืนยันรหัสผ่าน' onChange={setConfirmPassword}/>
                            <Icon icon={hide2 ? "mdi:hide" : "mdi:show"} className='text-[#000000]' width={24} height={24} onClick={() => setHide2(!hide2)}/>
                        </label>
                    </div>
                    <div className='flex justify-end mt-1 align-middle'>
                        <Link to='/sign-in' className='link text-[#A5DC86] hover:text-[#86b36d]'>
                            ไปหน้าเข้าสู่ระบบ
                        </Link>
                    </div>
                    <div className='w-full max-w-xs mt-5 form-control'>
                        <p className='text-[#FFFFFF]'>ความต้องการของรหัสผ่าน:</p>
                        <ul>
                            <li className={`${passwordRequireMent.minimumLength ? 'text-success' : 'text-error'}`}>* ความยาวรหัสผ่านอย่างน้อย 8 ตัว</li>
                            <li className={`${passwordRequireMent.alphabetLower ? 'text-success' : 'text-error'}`}>* มีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว</li>
                            <li className={`${passwordRequireMent.alphabetUpper ? 'text-success' : 'text-error'}`}>* มีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว</li>
                            <li className={`${passwordRequireMent.number ? 'text-success' : 'text-error'}`}>* มีตัวเลขอย่างน้อย 1 ตัว</li>
                            <li className={`${passwordRequireMent.special ? 'text-success' : 'text-error'}`}>* มีเครื่องหมายพิเศษ เช่น #?!@$%^&*- อย่างน้อย 1 ตัว</li>
                        </ul>
                    </div>
                    <div className='flex flex-col justify-center w-full align-middle border-opacity-50'>
                        <button type='submit' className="btn border-none bg-[#3FC3EE] hover:bg-[#46a5c4] text-[#FFFFFF] w-full mt-5">สร้างบัญชี</button>
                        <Link to='/' className="btn border-none bg-[#F27474] hover:bg-[#ca6161] text-[#FFFFFF] w-full mt-5">
                            กลับสู่หน้าหลัก
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp