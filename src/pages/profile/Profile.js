import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Profile = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()
    const [account,setAccount] = useState([])

    useEffect(() => {
        !isLogin.status && navigate('/')
    }, [isLogin, navigate])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/authentication-account`, { withCredentials: true })
        .then((response) => {
            if(response.data.status){
                
                setAccount(response.data.payload)
            }
        })
    },[])

    return (
        <div>
            <MetaHeader title={`โปรไฟล์ของฉัน`} />
            <Navigation />
            <TitleBox title={'โปรไฟล์ของฉัน'} />
            <div className='flex justify-end px-44'>
                <Link to='/edit-profile'>
                    <button className='btn btn-outline border-info text-info w-64 rounded-box hover:bg-info hover:border-info'>แก้ไขข้อมูลส่วนตัว</button>
                </Link>
            </div>
            <div className='grid grid-col place-content-center w-auto mt-5 mx-40 mb-10'>
                <img src={`${process.env.REACT_APP_AVATAR}${account.avatar}`} alt='profile' width={350} height={350} className='image rounded-full' />
                
            </div>
            <div className='flex flex-col items-center justify-center align-middle my-10'>
                    <div className='px-6 py-3 rounded-lg mt-2 bg-neutral max-w-sm w-full' >
                        {account.email}
                    </div>
                    <div className='px-6 py-3 rounded-lg mt-2 bg-neutral max-w-sm w-full ' >
                       {account.username}
                    </div>
                    
            </div>
        </div>
    )
}

export default Profile