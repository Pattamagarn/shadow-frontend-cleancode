import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import DataTable from 'react-data-table-component'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Icon } from '@iconify/react'
import axios from 'axios'
import Swal from 'sweetalert2'

const GeneralManagement = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 1 && navigate('/')
    }, [isLogin, navigate])

    const [dataBanner, setDataBanner] = useState([])
    const [dataGameName, setDataGameName] = useState([])
    const [dataGameNameSearch, setDataGameNameSearch] = useState([])
    const [dataPaymentMethod, setDataPaymentMethod] = useState([])
    const [dataBannerActive, setDataBannerActive] = useState(true)
    const [dataGameNameActive, setDataGameNameActive] = useState(true)
    const [dataPaymentMethodActive, setDataPaymentMethodActive] = useState(true)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/banner-select`)
            .then((response) => {
                if (response.data.status) {
                    setDataBanner(response.data.payload.map((value, index) => {
                        return { ...value, index: index + 1 }
                    }))
                }
            })
            .catch((error) => { })
    }, [dataBannerActive])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/game-name-select`)
            .then((response) => {
                if (response.data.status) {
                    setDataGameName(response.data.payload.map((value, index) => {
                        return { ...value, index: index + 1 }
                    }))
                }
            })
            .catch((error) => { })
    }, [dataGameNameActive])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/payment-method-select`)
            .then((response) => {
                if (response.data.status) {
                    setDataPaymentMethod(response.data.payload.map((value, index) => {
                        return { ...value, index: index + 1 }
                    }))
                }
            })
            .catch((error) => { })
    }, [])

    const handleDeleteBanner = (uuid) => {
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
                axios.delete(`${process.env.REACT_APP_API}/banner-delete/${uuid}`)
                    .then((response) => {
                        if (response.data.status) {
                            Swal.fire({
                                title: 'สำเร็จ',
                                text: response.data.payload,
                                icon: 'success'
                            });
                            setDataBannerActive(!dataBannerActive)
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
                            text: 'ลบ Banner ล้มเหลว',
                            icon: 'error'
                        });
                    });
            }
        });
    }

    const handleDeleteGameName = (uuid) => {
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
                axios.delete(`${process.env.REACT_APP_API}/game-name-delete/${uuid}`)
                    .then((response) => {
                        if (response.data.status) {
                            Swal.fire({
                                title: 'สำเร็จ',
                                text: response.data.payload,
                                icon: 'success'
                            });
                            setDataGameNameActive(!dataGameNameActive)
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
                            text: 'ลบชื่อเกมล้มเหลว',
                            icon: 'error'
                        });
                    });
            }
        });
    }


    const handleDeletePayment = (uuid, method, information) => {
        if (method === 'วิดีโอ') {
            if (method === 'วิดีโอ' && information === '') {
                Swal.fire({
                    title: 'ข้อมูลเป็นค่าตั้งต้นแล้ว?',
                    text: 'ไม่มีข้อมูลให้ลบในขณะนี้',
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3FC3EE',

                    cancelButtonColor: '#F27474',
                    confirmButtonText: 'ตกลง',
                })
            }
            else {
                Swal.fire({
                    title: 'คุณแน่ใจใช่ไหม?',
                    text: 'หากลบวิดีโอแล้วจะไม่สามารถกู้คืนได้',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3FC3EE',

                    cancelButtonColor: '#F27474',
                    confirmButtonText: 'ตกลง, ลบได้เลย',
                    cancelButtonText: 'ยกเลิก'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`${process.env.REACT_APP_API}/delete-payment-method-video/${uuid}`)
                            .then((response) => {
                                if (response.data.status) {
                                    Swal.fire({
                                        title: 'สำเร็จ',
                                        text: response.data.payload,
                                        icon: 'success'
                                    });
                                    setDataPaymentMethodActive(!dataPaymentMethodActive)
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
                                    text: 'ลบวิดีโอล้มเหลว',
                                    icon: 'error'
                                });
                            });
                    }
                });
            }
        }
        else if (method === 'รูปภาพ') {
            if (method === 'รูปภาพ' && information === '') {
                Swal.fire({
                    title: 'ข้อมูลเป็นค่าตั้งต้นแล้ว?',
                    text: 'ไม่มีข้อมูลให้ลบในขณะนี้',
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3FC3EE',

                    cancelButtonColor: '#F27474',
                    confirmButtonText: 'ตกลง',
                    // cancelButtonText: 'ยกเลิก'
                })
            }
            else {
                Swal.fire({
                    title: 'คุณแน่ใจใช่ไหม?',
                    text: 'หากลบรูปภาพแล้วจะไม่สามารถกู้คืนได้',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3FC3EE',

                    cancelButtonColor: '#F27474',
                    confirmButtonText: 'ตกลง, ลบได้เลย',
                    cancelButtonText: 'ยกเลิก'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`${process.env.REACT_APP_API}/delete-payment-method-image/${uuid}`)
                            .then((response) => {
                                if (response.data.status) {
                                    Swal.fire({
                                        title: 'สำเร็จ',
                                        text: response.data.payload,
                                        icon: 'success'
                                    });
                                    setDataPaymentMethodActive(!dataPaymentMethodActive)
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
                                    text: 'ลบรูปภาพวิดีโอล้มเหลว',
                                    icon: 'error'
                                });
                            });
                    }
                });
            }
        }


    }

    const columnsBanner = [
        {
            name: 'ลำดับ',
            selector: row => row.index,
            sortable: true
        },
        {
            name: 'ลิงก์ภาพ',
            selector: row => row.information,
            cell: (row) => [<img key={row.uuid} alt={row.uuid} src={`${process.env.REACT_APP_BANNER}${row.information}`} />]
        },
        {
            name: 'แก้ไข',
            selector: row => row.uuid,
            cell: (row) => [<Link key={row.uuid} to={`/edit-banner/${row.uuid}`} className='btn border-none bg-[#F8BB86] hover:bg-[#cf9c6f] text-[#FFFFFF]'>แก้ไข</Link>]
        },
        {
            name: 'ลบ',
            selector: row => row.uuid,
            cell: (row) => [<button onClick={() => handleDeleteBanner(row.uuid)} key={row.uuid} type={`button`} className='btn border-none bg-[#F27474] hover:bg-[#ca6161] text-[#FFFFFF]'>ลบ</button>]
        }
    ]

    const columnsGameName = [
        {
            name: 'ลำดับ',
            selector: row => row.index,
            sortable: true
        },
        {
            name: 'ชื่อเกม',
            selector: row => row.game_name
        },
        // {
        //     name: 'แก้ไข',
        //     selector: row => row.uuid,
        //     cell: (row) => [<Link key={row.uuid} to={`/edit-game-name/${row.uuid}`} className='btn border-none bg-[#F8BB86] hover:bg-[#cf9c6f] text-[#FFFFFF]'>แก้ไข</Link>]
        // },
        {
            name: 'ลบ',
            selector: row => row.uuid,
            cell: (row) => [<button key={row.uuid} onClick={handleDeleteGameName.bind(this, row.uuid)} type={`button`} className='btn border-none bg-[#F27474] hover:bg-[#ca6161] text-[#FFFFFF]'>ลบ</button>],

        }
    ]

    const columnsPaymentMethod = [
        {
            name: 'ลำดับ',
            selector: row => row.index,
            sortable: true
        },
        {
            name: 'วิธีการชำระเงิน',
            selector: row => row.method
        },
        {
            name: 'เปลี่ยน',
            selector: row => row.uuid,
            cell: (row) => [<Link key={row.uuid} to={`${row.method === 'วิดีโอ' ? `/edit-video-payment-method/${row.uuid}` : `/edit-image-payment-method/${row.uuid}`}`} className='btn border-none bg-[#F8BB86] hover:bg-[#cf9c6f] text-[#FFFFFF]'>เปลี่ยน</Link>]
        },
        {
            name: 'ลิงก์ภาพ',
            selector: row => row.information,
            cell: (row) => [<div className='flex w-full'> 
                {row.method === 'วิดีโอ' ?
                    <iframe key={row.uuid} alt={row.uuid} src={row.method === 'วิดีโอ' && row.information === '' ? 'https://www.youtube.com/embed/KEcd278cvRc' : `${row.information}`} /> :
                <img key={row.uuid} alt={row.uuid} src={row.method === 'วิดีโอ' && row.information === '' ? `${process.env.REACT_APP_PAYMENT_METHOD}payment-method.png` : `${process.env.REACT_APP_PAYMENT_METHOD}${row.information}`} /> }

            </div>
            ]
        },
        {
            name: 'ล้าง',
            selector: row => row.uuid,
            cell: (row) => [<button key={row.uuid} type={`button`} onClick={() => handleDeletePayment(row.uuid, row.method, row.information)} className='btn border-none bg-[#F27474] hover:bg-[#ca6161] text-[#FFFFFF]'>ล้าง</button>]
        }
    ]

    const filterDataGameName = (event) => {
        const newDataGameName = dataGameName.filter((row) => {
            return row.game_name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setDataGameNameSearch(newDataGameName)
    }


    return (
        <div>
            <MetaHeader title={`จัดการทั่วไป`} />
            <Navigation />
            <TitleBox title={'จัดการแบนเนอร์'} name={'เพิ่มแบนเนอร์'} path={'/add-banner'} status={true} />
            <div className='mx-32 '>
                <DataTable
                    columns={columnsBanner}
                    data={dataBanner}
                    pagination
                    striped
                    persistTableHead={true}
                    minRows={5}

                />
            </div>
            <TitleBox title={'จัดการชื่อเกม'} name={'เพิ่มชื่อเกม'} path={'/add-game-name'} status={false} />
            <div className='flex flex-row justify-end my-3 px-36'>
                <label className="flex items-center self-end gap-2 input input-bordered input-md size-fit">
                    <Icon icon={"material-symbols:search"} className='text-xl' />
                    <input type="text" placeholder="ชื่อเกม" onChange={filterDataGameName} />
                </label>
            </div>
            <div className='mx-32 '>
                <DataTable
                    columns={columnsGameName}
                    data={dataGameNameSearch.length <= 0 ? dataGameName : dataGameNameSearch}
                    pagination
                    striped
                    persistTableHead={true}
                    minRows={5}
                />
            </div>
            <TitleBox title={'จัดการวิธีการชำระเงิน'} />
            <div className='mx-32 '>
                <DataTable
                    columns={columnsPaymentMethod}
                    data={dataPaymentMethod}
                    pagination
                    striped
                    persistTableHead={true}
                    minRows={5}
                />
            </div>
        </div>
    )
}

export default GeneralManagement