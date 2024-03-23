import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setIsLogin } from '../../redux/isLoginSlice'
import { Icon } from '@iconify/react'
import axios from 'axios'
import Swal from 'sweetalert2'

const NavigationMember = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const dispatch = useDispatch()
    
    const alertSuccess = (payload) => {
        Swal.fire({
            title: 'สำเร็จ',
            text: payload,
            icon: 'success',
            confirmButtonText: 'ตกลง'
        })
    }

    const signOut = () => {
        axios.get(`${process.env.REACT_APP_API}/sign-out-account`, { withCredentials: true })
        .then((response) => {
            dispatch(setIsLogin({status: response.data.status, payload: response.data.payload}))
            alertSuccess('ออกจากระบบสำเร็จ')
        })
    }
    
    return (
        <nav className="navbar bg-gradient-to-b from-shadow-primary to-[#9d09cf] flex flex-row justify-between min-w-[240px] sm:py-5 lg:px-10 lg:justify-evenly">
            <div className="navbar-start">
                <Link to={"/"} className="flex flex-row items-center justify-center flex-nowrap">
                    <Icon icon={"game-icons:minerals"} className="text-2xl size-fit text-shadow-pink sm:text-4xl" />
                    <span translate="no" className="text-lg subpixel-antialiased not-italic font-normal size-fit text-shadow-white sm:text-2xl">SHADOW</span>
                </Link>
            </div>
            <div className="hidden navbar-center lg:flex">
                <details className="dropdown dropdown-end">
                    <summary className="flex items-center p-2 mx-2 align-middle border-none btn flex-nowrap text-shadow-white bg-shadow-accent hover:bg-shadow-haccent">
                        <Icon icon="ant-design:product-filled" className="mr-1 text-2xl"/>
                        <span translate="no" className="text-xl subpixel-antialiased not-italic font-normal text-left text-nowrap">หมวดหมู่สินค้า</span>
                        <Icon icon="gridicons:dropdown" className="text-2xl"/>
                    </summary>
                    <menu className="dropdown-content menu z-[1] mt-5 w-full">
                        <Link to="/general-product" className="flex items-center p-2 align-middle bg-shadow-info text-shadow-primary hover:text-shadow-info hover:bg-shadow-primary flex-nowrap">
                            <Icon icon="ep:goods-filled" className="mr-1 text-2xl"/>
                            <span translate="no" className="text-xl subpixel-antialiased not-italic font-normal text-nowrap">สินค้าทั้งหมด</span>
                        </Link>
                        <Link to="/promotion-product" className="flex items-center p-2 align-middle bg-shadow-info text-shadow-primary hover:text-shadow-info hover:bg-shadow-primary flex-nowrap">
                            <Icon icon="mdi:discount" className="mr-1 text-2xl"/>
                            <span translate="no" className="text-xl subpixel-antialiased not-italic font-normal text-nowrap">สินค้าโปรโมชัน</span>
                        </Link>
                        <Link to="/auction-product" className="flex items-center p-2 align-middle bg-shadow-info text-shadow-primary hover:text-shadow-info hover:bg-shadow-primary flex-nowrap">
                            <Icon icon="mingcute:auction-fill" className="mr-1 text-2xl"/>
                            <span translate="no" className="text-xl subpixel-antialiased not-italic font-normal text-nowrap">สินค้าประมูล</span>
                        </Link>
                        <Link to="/gacha-product" className="flex items-center p-2 align-middle bg-shadow-info text-shadow-primary hover:text-shadow-info hover:bg-shadow-primary flex-nowrap">
                            <Icon icon="game-icons:perspective-dice-six-faces-random" className="mr-1 text-2xl"/>
                            <span translate="no" className="text-xl subpixel-antialiased not-italic font-normal text-nowrap">สินค้าสุ่มกาชา</span>
                        </Link>
                    </menu>
                </details>
                <Link to="/top-up" className="flex items-center p-2 mx-2 align-middle border-none btn flex-nowrap text-shadow-white bg-shadow-accent hover:bg-shadow-haccent">
                    <Icon icon="ph:plus-fill" className="mr-1 text-2xl"/>
                    <span translate="no" className="text-xl subpixel-antialiased not-italic font-normal text-left text-nowrap">เติมไอเซล</span>
                </Link>
                <div className="flex items-center p-2 ml-2 align-middle flex-nowrap text-shadow-white">
                    <span translate="no" className="text-xl subpixel-antialiased not-italic font-normal text-left text-nowrap">{isLogin.payload.aysel_amount}</span>
                    <Icon icon="game-icons:minerals" className="text-2xl text-shadow-info"/>
                </div>
                <details className="dropdown dropdown-end">
                    <summary className="flex items-center p-2 mr-2 align-middle border-none btn btn-ghost flex-nowrap text-shadow-white">
                        <div className="avatar">
                            <div className="rounded-full w-11">
                                <img src={`${process.env.REACT_APP_AVATAR}${isLogin.payload.avatar}`} alt={`avatar-${isLogin.payload.username}`}/>
                            </div>
                        </div>
                        <span translate="no" className="text-xl subpixel-antialiased not-italic font-normal text-left text-nowrap">{isLogin.payload.username}</span>
                        <Icon icon="gridicons:dropdown" className="text-2xl"/>
                    </summary>
                    <menu className="dropdown-content menu z-[1] mt-5 w-full">
                        <Link to="/profile" className="flex items-center p-2 align-middle bg-shadow-info text-shadow-primary hover:text-shadow-info hover:bg-shadow-primary flex-nowrap">
                            <Icon icon="flowbite:profile-card-solid" className="mr-1 text-2xl"/>
                            <span translate="no" className="text-xl subpixel-antialiased not-italic font-normal text-nowrap">โปรไฟล์ของฉัน</span>
                        </Link>
                        <Link to="/store-product" className="flex items-center p-2 align-middle bg-shadow-info text-shadow-primary hover:text-shadow-info hover:bg-shadow-primary flex-nowrap">
                            <Icon icon="streamline:bag-solid" className="mr-1 text-2xl"/>
                            <span translate="no" className="text-xl subpixel-antialiased not-italic font-normal text-nowrap">คลังสินค้าของฉัน</span>
                        </Link>
                        <Link to="/transaction" className="flex items-center p-2 align-middle bg-shadow-info text-shadow-primary hover:text-shadow-info hover:bg-shadow-primary flex-nowrap">
                            <Icon icon="icon-park-solid:transaction-order" className="mr-1 text-2xl"/>
                            <span translate="no" className="text-xl subpixel-antialiased not-italic font-normal text-nowrap">ธุรกรรมของฉัน</span>
                        </Link>
                        <div onClick={signOut} className="flex items-center p-2 align-middle bg-shadow-info text-shadow-primary hover:text-shadow-info hover:bg-shadow-primary flex-nowrap">
                            <Icon icon="mdi:logout" className="mr-1 text-2xl"/>
                            <span translate="no" className="text-xl subpixel-antialiased not-italic font-normal text-nowrap">ออกจากระบบ</span>
                        </div>
                    </menu>
                </details>
            </div>
            <div className="navbar-center">
                <details className="flex items-center justify-center dropdown dropdown-end lg:hidden">
                    <summary className="btn btn-link">
                        <Icon icon={"icon-park-outline:hamburger-button"} className="text-lg size-fit text-shadow-white sm:text-4xl" />
                    </summary>
                    <menu className="dropdown-content menu z-[1] mt-2 sm:mt-5">
                        <span className="flex items-center p-2 align-middle bg-shadow-info text-shadow-primary hover:text-shadow-info hover:bg-shadow-primary flex-nowrap">
                            <Icon icon="game-icons:minerals" className="mr-1 text-shadow-pink"/>
                            <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-right text-nowrap sm:text-xl">{isLogin.payload.aysel_amount}</span>
                        </span>
                        <details className="dropdown dropdown-left">
                            <summary className="flex items-center p-2 align-middle bg-shadow-info text-shadow-primary hover:text-shadow-info hover:bg-shadow-primary flex-nowrap">
                                <Icon icon="ant-design:product-filled" className="mr-1"/>
                                <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">หมวดหมู่สินค้า</span>
                            </summary>
                            <menu className="dropdown-content menu z-[1]">
                                <Link to="/general-product" className="flex items-center p-2 align-middle bg-shadow-info text-shadow-primary hover:text-shadow-info hover:bg-shadow-primary flex-nowrap">
                                    <Icon icon="ep:goods-filled" className="mr-1"/>
                                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">สินค้าทั้งหมด</span>
                                </Link>
                                <Link to="/promotion-product" className="flex items-center p-2 align-middle bg-shadow-info text-shadow-primary hover:text-shadow-info hover:bg-shadow-primary flex-nowrap">
                                    <Icon icon="mdi:discount" className="mr-1"/>
                                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">สินค้าโปรโมชัน</span>
                                </Link>
                                <Link to="/auction-product" className="flex items-center p-2 align-middle bg-shadow-info text-shadow-primary hover:text-shadow-info hover:bg-shadow-primary flex-nowrap">
                                    <Icon icon="mingcute:auction-fill" className="mr-1"/>
                                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">สินค้าประมูล</span>
                                </Link>
                                <Link to="/gacha-product" className="flex items-center p-2 align-middle bg-shadow-info text-shadow-primary hover:text-shadow-info hover:bg-shadow-primary flex-nowrap">
                                    <Icon icon="game-icons:perspective-dice-six-faces-random" className="mr-1"/>
                                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">สินค้าสุ่มกาชา</span>
                                </Link>
                            </menu>
                        </details>
                        <Link to="/top-up" className="flex items-center p-2 align-middle bg-shadow-info text-shadow-primary hover:text-shadow-info hover:bg-shadow-primary flex-nowrap">
                            <Icon icon="ph:plus-fill" className="mr-1"/>
                            <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">เติมไอเซล</span>
                        </Link>
                        <details className="dropdown dropdown-left">
                            <summary className="flex items-center p-2 align-middle bg-shadow-info text-shadow-primary hover:text-shadow-info hover:bg-shadow-primary flex-nowrap">
                                <Icon icon="iconamoon:profile-fill" className="mr-1"/>
                                <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">จัดการบัญชี</span>
                            </summary>
                            <menu className="dropdown-content menu z-[1]">
                                <Link to="/profile" className="flex items-center p-2 align-middle bg-shadow-info text-shadow-primary hover:text-shadow-info hover:bg-shadow-primary flex-nowrap">
                                    <Icon icon="flowbite:profile-card-solid" className="mr-1"/>
                                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">โปรไฟล์ของฉัน</span>
                                </Link>
                                <Link to="/store-product" className="flex items-center p-2 align-middle bg-shadow-info text-shadow-primary hover:text-shadow-info hover:bg-shadow-primary flex-nowrap">
                                    <Icon icon="streamline:bag-solid" className="mr-1"/>
                                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">คลังสินค้าของฉัน</span>
                                </Link>
                                <Link to="/transaction" className="flex items-center p-2 align-middle bg-shadow-info text-shadow-primary hover:text-shadow-info hover:bg-shadow-primary flex-nowrap">
                                    <Icon icon="icon-park-solid:transaction-order" className="mr-1"/>
                                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">ธุรกรรมของฉัน</span>
                                </Link>
                                <div onClick={signOut} className="flex items-center p-2 align-middle bg-shadow-info text-shadow-primary hover:text-shadow-info hover:bg-shadow-primary flex-nowrap">
                                    <Icon icon="mdi:logout" className="mr-1"/>
                                    <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">ออกจากระบบ</span>
                                </div>
                            </menu>
                        </details>
                    </menu>
                </details>
            </div>
        </nav>
    )
}

export default NavigationMember