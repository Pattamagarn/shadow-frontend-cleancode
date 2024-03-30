import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Icon } from '@iconify/react'
import axios from 'axios'


const Profile = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()
    const [account, setAccount] = useState([])

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
    return (
        <div>
            <MetaHeader title={`โปรไฟล์ของฉัน`} />
            <Navigation />
            <TitleBox title={'โปรไฟล์ของฉัน'} />
            <div className='flex justify-end px-44'>
                <Link to='/edit-profile'>
                    <button className='w-64 btn btn-outline border-info text-info rounded-box hover:bg-info hover:border-info'>แก้ไขข้อมูลส่วนตัว</button>
                </Link>
            </div>
            <div className='flex flex-row w-auto gap-10 justify-evenly '>
                <div className='flex w-auto '>
                    <div className='w-[350px] h-[350px] rounded-full'>
                        <img src={`${process.env.REACT_APP_AVATAR}${account.avatar}`} alt='profile' className='w-full h-full rounded-full ' />
                    </div>

                </div>
                <div className='flex flex-col justify-center '>
                    <div className='w-[32rem] px-6 py-3 mt-2 rounded-lg bg-neutral text-2xl' >
                        {account.username}
                    </div>
                    <div className='w-[32rem] px-6 py-3 mt-2 rounded-lg bg-neutral text-2xl' >
                        {account.email}
                    </div>
                    {
                        account.role === 0 ? 
                        <div className='flex flex-row justify-between'>
                            <Link className='flex w-[15rem] px-6 py-3 mt-2 rounded-lg border border-shadow-primary bg-shadow-primary/50 hover:text-shadow-white items-center' to='/store-product'>
                                <div className='flex text-2xl '><Icon icon="streamline:bag-solid" className="mr-1 text-3xl" />ดูสินค้าของฉัน</div>
                            </Link>
                            <Link className='flex w-[15.5rem] px-6 py-3 mt-2 rounded-lg border border-shadow-primary bg-shadow-primary/50 hover:text-shadow-white items-center ' to='/transaction'>
                                <div className='flex text-2xl'><Icon icon="icon-park-solid:transaction-order" className="mr-1 text-3xl" />ดูธุรกรรมของฉัน</div>
                            </Link>
                        </div> :
                            <div></div>
                    }


                </div>
            </div>

        </div>
    )
}

export default Profile