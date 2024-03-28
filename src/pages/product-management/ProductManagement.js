import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { Icon } from '@iconify/react'
import Swal from 'sweetalert2'

const ProductManagement = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 1 && navigate('/')
    }, [isLogin, navigate])

    const [dataGeneralProduct, setDataGeneralProduct] = useState([])
    const [dataGeneralProductSearch, setDataGeneralProductSearch] = useState([])
    const [dataGachaProduct, setDataGachaProduct] = useState([])
    const [dataGachaProductSearch, setDataGachaProductSearch] = useState([])
    const [dataAuctionProduct, setDataAuctionProduct] = useState([])
    const [dataAuctionProductSearch, setDataAuctionProductSearch] = useState([])
    const [dataGeneralProductActive, setDataGeneralProductActive] = useState(true)
    const [dataGachaProductActive, setDataGachaProductActive] = useState(true)
    const [dataAuctionProductActive, setDataAuctionProductActive] = useState(true)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/read-general-product`)
            .then((response) => {
                if (response.data.status) {
                    setDataGeneralProduct(response.data.payload.map((value, index) => {
                        return { ...value, index: index + 1 }
                    }))
                }
            })
            .catch((error) => { })
    }, [dataGeneralProductActive])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/read-gacha-product`)
            .then((response) => {
                if (response.data.status) {
                    setDataGachaProduct(response.data.payload.map((value, index) => {
                        return { ...value, index: index + 1 }
                    }))
                }
            })
            .catch((error) => { })
    }, [dataGachaProductActive])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/read-auction-product`)
            .then((response) => {
                if (response.data.status) {
                    setDataAuctionProduct(response.data.payload.map((value, index) => {
                        return { ...value, index: index + 1 }
                    }))
                }
            })
            .catch((error) => { })
    }, [dataAuctionProductActive])

    const handleDeleteGeneralProduct = (uuid) => {
        Swal.fire({
            title: 'คุณแน่ใจใช่ไหม?',
            text: 'หากลบแล้วจะไม่สามารถกู้คืนได้',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3FC3EE',

            cancelButtonColor: '#F27474',
            confirmButtonText: 'ตกลง, ลบได้เลย',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_API}/delete-general-product/${uuid}`)
                    .then((response) => {
                        if (response.data.status) {
                            Swal.fire({
                                title: 'สำเร็จ',
                                text: response.data.payload,
                                icon: 'success'
                            });
                            setDataGeneralProductActive(!dataGeneralProductActive)
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
                            text: 'ลบสินค้าล้มเหลว',
                            icon: 'error'
                        });
                    });
            }
        });
    }

    const handleDeleteGachaProduct = (uuid) => {
        Swal.fire({
            title: 'คุณแน่ใจใช่ไหม?',
            text: 'หากลบแล้วจะไม่สามารถกู้คืนได้',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3FC3EE',

            cancelButtonColor: '#F27474',
            confirmButtonText: 'ตกลง, ลบได้เลย',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_API}/delete-gacha-product/${uuid}`)
                    .then((response) => {
                        if (response.data.status) {
                            Swal.fire({
                                title: 'สำเร็จ',
                                text: response.data.payload,
                                icon: 'success'
                            });
                            setDataGachaProductActive(!dataGachaProductActive)
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
                            text: 'ลบสินค้ากาชาปองล้มเหลว',
                            icon: 'error'
                        });
                    });
            }
        });
    }

    const handleDeleteAuctionProduct = (uuid) => {
        Swal.fire({
            title: 'คุณแน่ใจใช่ไหม?',
            text: 'หากลบแล้วจะไม่สามารถกู้คืนได้',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3FC3EE',

            cancelButtonColor: '#F27474',
            confirmButtonText: 'ตกลง, ลบได้เลย',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_API}/delete-auction-product/${uuid}`)
                    .then((response) => {
                        if (response.data.status) {
                            Swal.fire({
                                title: 'สำเร็จ',
                                text: response.data.payload,
                                icon: 'success'
                            });
                            setDataAuctionProductActive(!dataAuctionProductActive)
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
                            text: 'ลบสินค้าประมูลล้มเหลว',
                            icon: 'error'
                        });
                    });
            }
        });
    }

    const handleDiscountGeneralProduct = (uuid, status) => {
        axios.patch(`${process.env.REACT_APP_API}/update-status-price/${uuid}`, {
            special_price_status: status
        })
            .then((response) => {
                if (response.data.status) {
                    Swal.fire({
                        title: 'สำเร็จ',
                        text: response.data.payload,
                        icon: 'success'
                    });
                    setDataGeneralProductActive(!dataGeneralProductActive)
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
                    text: 'แก้ไขสถานะล้มเหลว',
                    icon: 'error'
                });
            })

    }

    const handleGuaranteeProduct = (uuid, status) => {
        axios.patch(`${process.env.REACT_APP_API}/update-guarantee-status/${uuid}`, {
            guarantee_status: status
        })
            .then((response) => {
                if (response.data.status) {
                    Swal.fire({
                        title: 'สำเร็จ',
                        text: response.data.payload,
                        icon: 'success'
                    });
                    setDataGachaProductActive(!dataGachaProductActive)
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
                    text: 'แก้ไขสถานะล้มเหลว',
                    icon: 'error'
                });
            })
    }

    const handleStatusAuctionProduct = (uuid,status) => {
        axios.patch(`${process.env.REACT_APP_API}/update-guarantee-status/${uuid}`, {
            guarantee_status: status
        })
            .then((response) => {
                if (response.data.status) {
                    Swal.fire({
                        title: 'สำเร็จ',
                        text: response.data.payload,
                        icon: 'success'
                    });
                    setDataGachaProductActive(!dataGachaProductActive)
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
                    text: 'แก้ไขสถานะล้มเหลว',
                    icon: 'error'
                });
            })
    }

    const columnsGeneralProduct = [
        {
            name: 'ลำดับ',
            selector: row => row.index
        },
        {
            name: 'ชื่อเกม',
            selector: row => row.game_name
        },
        {
            name: 'ชื่อสินค้า',
            selector: row => row.name
        },
        {
            name: 'ราคาลด',
            selector: row => row.special_price
        },
        {
            name: 'ราคา',
            selector: row => row.normal_price
        },
        {
            name: 'ลดราคา',
            selector: row => row.uuid,
            cell: (row) => [<button key={row.uuid} type={`button`} onClick={() => { handleDiscountGeneralProduct(row.uuid, row.special_price_status) }} className={`btn border-none ${row.special_price_status ? 'bg-shadow-success hover:bg-shadow-hsuccess' : 'bg-shadow-error hover:bg-shadow-herror'} text-shadow-white`}>{row.special_price_status ? 'เปิด' : 'ปิด'}</button>]
        },
        {
            name: 'แก้ไข',
            selector: row => row.uuid,
            cell: (row) => [<Link key={row.uuid} to={`/edit-general-product/${row.uuid}`} className='border-none btn bg-shadow-warning hover:bg-shadow-hwarning text-shadow-white'>แก้ไข</Link>]
        },
        {
            name: 'ลบ',
            selector: row => row.uuid,
            cell: (row) => [<button onClick={() => handleDeleteGeneralProduct(row.uuid)} key={row.uuid} type={`button`} className='border-none btn bg-shadow-error hover:bg-shadow-herror text-shadow-white'>ลบ</button>]
        }
    ]

    const columnsGachaProduct = [
        {
            name: 'ลำดับ',
            selector: row => row.index
        },
        {
            name: 'ชื่อเกม',
            selector: row => row.game_name
        },
        {
            name: 'ชื่อสินค้า',
            selector: row => row.name
        },
        {
            name: 'อัตราการออก',
            selector: row => row.chance
        },
        {
            name: 'การันตี',
            selector: row => row.uuid,
            cell: (row) => [<button key={row.uuid} type={`button`} onClick={() => handleGuaranteeProduct(row.uuid, row.guarantee_status)} className={`btn border-none ${row.guarantee_status ? 'bg-shadow-success hover:bg-shadow-hsuccess' : 'bg-shadow-error hover:bg-shadow-herror'} text-shadow-white`}>{row.guarantee_status ? 'เปิด' : 'ปิด'}</button>]
        },
        {
            name: 'แก้ไข',
            selector: row => row.uuid,
            cell: (row) => [<Link key={row.uuid} to={`/edit-gacha-product/${row.uuid}`} className='border-none btn bg-shadow-warning hover:bg-shadow-hwarning text-shadow-white'>แก้ไข</Link>]
        },
        {
            name: 'ลบ',
            selector: row => row.uuid,
            cell: (row) => [<button onClick={() => handleDeleteGachaProduct(row.uuid)} key={row.uuid} type={`button`} className='border-none btn bg-shadow-error hover:bg-shadow-herror text-shadow-white'>ลบ</button>]
        }
    ]

    const columnsAuctionProduct = [
        {
            name: 'ลำดับ',
            selector: row => row.index
        },
        {
            name: 'ชื่อเกม',
            selector: row => row.game_name
        },
        {
            name: 'ชื่อสินค้า',
            selector: row => row.name
        },
        {
            name: 'ราคาปัจจุบัน',
            selector: row => row.default_price
        },
        {
            name: 'สถานะ',
            selector: row => row.auction_status,
            cell: (row) => [<button key={row.uuid} type={`button`} onClick={() => handleStatusAuctionProduct(row.uuid,row.auction_status)} className={`btn border-none ${row.auction_status ? 'bg-shadow-success hover:bg-shadow-hsuccess' : 'bg-shadow-error hover:bg-shadow-herror'} text-shadow-white`}>{row.auction_status ? 'เปิด' : 'ปิด'}</button>]
        },
        {
            name: 'แก้ไข',
            selector: row => row.uuid,
            cell: (row) => [<Link key={row.uuid} to={`/edit-auction-product/${row.uuid}`} className='border-none btn bg-shadow-warning hover:bg-shadow-hwarning text-shadow-white'>แก้ไข</Link>]
        },
        {
            name: 'ลบ',
            selector: row => row.uuid,
            cell: (row) => [<button onClick={() => handleDeleteAuctionProduct(row.uuid)} key={row.uuid} type={`button`} className='border-none btn bg-shadow-error hover:bg-shadow-herror text-shadow-white'>ลบ</button>]
        }
    ]

    const filterDataGeneralProduct = (event) => {
        const newDataGeneralProduct = dataGeneralProduct.filter((row) => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setDataGeneralProductSearch(newDataGeneralProduct)
    }

    const filterDataGachaProduct = (event) => {
        const newDataGachaProduct = dataGachaProduct.filter((row) => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setDataGachaProductSearch(newDataGachaProduct)
    }

    const filterDataAuctionProduct = (event) => {
        const newDataAuctionProduct = dataAuctionProduct.filter((row) => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setDataAuctionProductSearch(newDataAuctionProduct)
    }

    return (
        <div>
            <MetaHeader title={`จัดการสินค้า`} />
            <Navigation />
            <TitleBox title={'จัดการสินค้า'} name={'เพิ่มสินค้า'} path={'/add-general-product'} status={true} />
            <div className='flex flex-row justify-end my-3 px-36'>
                <label className="flex items-center gap-2 input input-bordered input-md size-fit ">
                    <Icon icon={"material-symbols:search"} className='text-xl' />
                    <input type="text" placeholder="ชื่อสินค้า" onChange={filterDataGeneralProduct} />
                </label>
            </div>
            <div className='mx-32'>
                <DataTable
                    columns={columnsGeneralProduct}
                    data={dataGeneralProductSearch.length <= 0 ? dataGeneralProduct : dataGeneralProductSearch}
                    pagination
                    striped
                    responsive
                    persistTableHead={true}
                    minRows={5}

                />
            </div>
            <TitleBox title={'จัดการสินค้ากาชาปอง'} name={'เพิ่มสินค้ากาชาปอง'} path={'/add-gacha-product'} status={true} />
            <div className='flex flex-row justify-end my-3 px-36'>
                <label className="flex items-center self-end gap-2 input input-bordered input-md size-fit">
                    <Icon icon={"material-symbols:search"} className='text-xl' />
                    <input type="text" placeholder="ชื่อสินค้า" onChange={filterDataGachaProduct} />
                </label>
            </div>
            <div className='mx-32'>
                <DataTable
                    columns={columnsGachaProduct}
                    data={dataGachaProductSearch.length <= 0 ? dataGachaProduct : dataGachaProductSearch}
                    pagination
                    striped
                    responsive
                    persistTableHead={true}
                    minRows={5}

                />
            </div>
            <TitleBox title={'จัดการสินค้าประมูล'} name={'เพิ่มสินค้าประมูล'} path={'/add-auction-product'} status={true} />
            <div className='flex flex-row justify-end my-3 px-36'>
                <label className="flex items-center self-end gap-2 input input-bordered input-md size-fit">
                    <Icon icon={"material-symbols:search"} className='text-xl' />
                    <input type="text" placeholder="ชื่อสินค้า" onChange={filterDataAuctionProduct} />
                </label>
            </div>
            <div className='mx-32'>
                <DataTable
                    columns={columnsAuctionProduct}
                    data={dataAuctionProductSearch.length <= 0 ? dataAuctionProduct : dataAuctionProductSearch}
                    pagination
                    striped
                    responsive
                    persistTableHead={true}
                    minRows={5}

                />
            </div>
        </div>
    )
}

export default ProductManagement