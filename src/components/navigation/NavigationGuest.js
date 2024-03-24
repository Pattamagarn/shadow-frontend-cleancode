import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'

const NavigationGuest = () => {

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
                <Link to="/sign-in" className="flex items-center p-2 mx-2 align-middle border-none btn flex-nowrap text-shadow-white bg-shadow-accent hover:bg-shadow-haccent">
                    <Icon icon="mdi:login" className="mr-1 text-2xl"/>
                    <span translate="no" className="text-xl subpixel-antialiased not-italic font-normal text-left text-nowrap">เข้าสู่ระบบ</span>
                </Link>
                <Link to="/sign-up" className="flex items-center p-2 mx-2 align-middle border-none btn flex-nowrap text-shadow-white bg-shadow-accent hover:bg-shadow-haccent">
                    <Icon icon="mdi:register" className="mr-1 text-2xl"/>
                    <span translate="no" className="text-xl subpixel-antialiased not-italic font-normal text-left text-nowrap">สมัครสมาชิก</span>
                </Link>
            </div>
            <div className="navbar-center">
                <details className="flex items-center justify-center dropdown dropdown-end lg:hidden">
                    <summary className="btn btn-link">
                        <Icon icon={"icon-park-outline:hamburger-button"} className="text-lg size-fit text-shadow-white sm:text-4xl" />
                    </summary>
                    <menu className="dropdown-content menu z-[1] mt-2 sm:mt-5">
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
                        <Link to="/sign-in" className="flex items-center p-2 align-middle bg-shadow-info text-shadow-primary hover:text-shadow-info hover:bg-shadow-primary flex-nowrap">
                            <Icon icon="mdi:login" className="mr-1"/>
                            <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">เข้าสู่ระบบ</span>
                        </Link>
                        <Link to="/sign-up" className="flex items-center p-2 align-middle bg-shadow-info text-shadow-primary hover:text-shadow-info hover:bg-shadow-primary flex-nowrap">
                            <Icon icon="mdi:register" className="mr-1"/>
                            <span translate="no" className="text-xs subpixel-antialiased not-italic font-normal text-left text-nowrap sm:text-xl">สมัครสมาชิก</span>
                        </Link>
                    </menu>
                </details>
            </div>
        </nav>
    )
}

export default NavigationGuest