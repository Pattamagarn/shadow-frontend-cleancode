import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { Icon } from '@iconify/react'
import Swal from 'sweetalert2'

const MemberManagement = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()

    useEffect(() => {
        !isLogin.status && navigate('/')
    }, [isLogin, navigate])

    const [dataMember, setDataMember] = useState([])
    const [dataMemberSearch, setDataMemberSearch] = useState([])
    const [dataUserActive,setDataUserActive] = useState(true)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/select-account`)
        .then((response) => {
            if(response.data.status){
                setDataMember(response.data.payload.map((value, index) => {
                    return {...value, index: index+1}
                }))
            }
        })
        .catch((error) => {})
    }, [dataUserActive])

    const columnsMember = [
        {
            name: 'ลำดับ',
            selector: row => row.index,
            sortable:true

        },
        {
            name: 'บัญชี',
            selector: row => row.email,
            sortable:true
        },
        {
            name: 'ชื่อผู้ใช้',
            selector: row => row.username,
            sortable:true
        },
        {
            name: 'ระงับ',
            selector: row => row.suspended_status,
            cell: (row) => [<div key={row.email} className='btn btn-ghost' onClick={() => {handleStatusAccount(row.email,row.suspended_status)}}>{row.suspended_status ? <Icon icon={"solar:user-block-bold"} className='text-3xl text-shadow-primary' /> : <Icon icon={"solar:user-bold"} className='text-3xl text-shadow-primary' /> }</div>]
        },
        {
            name: 'บทบาท',
            selector: row => row.role,
            cell: (row) => [row.role ? `ผู้ดูแลระบบ` : `สมาชิก`],
            sortable:true
        }
    ]

    const handleStatusAccount = (email,status) => {
        if(status === 0){
            Swal.fire({
                title: 'แจ้งเตือน!',
                text: `คุณต้องการที่จะระงับการใช้งานผู้ใช้ ${email} ใช่หรือไม่`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3FC3EE',
    
                cancelButtonColor: '#F27474',
                confirmButtonText: 'ตกลง, ระงับได้เลย',
                cancelButtonText: 'ยกเลิก'
            })
            .then((result) => {
                if(result.isConfirmed){
                    axios.patch(`${process.env.REACT_APP_API}/update-status-account/${email}` ,{
                        suspended_status:status
                    })
                    .then((response) => {
                        if(response.data.status){
                            Swal.fire({
                                title: 'สำเร็จ',
                                text: response.data.payload,
                                icon: 'success'
                              });
                            setDataUserActive(!dataUserActive)
                        }else{
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
                            text: 'การระงับล้มเหลว',
                            icon: 'error'
                          });
                });
                }
            })
        }
        else{
            Swal.fire({
                title: 'แจ้งเตือน!',
                text: `คุณต้องการที่จะปลดระงับการใช้งานผู้ใช้ ${email} ใช่หรือไม่`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3FC3EE',
    
                cancelButtonColor: '#F27474',
                confirmButtonText: 'ตกลง, ปลดระงับได้เลย',
                cancelButtonText: 'ยกเลิก'
            })
            .then((result) => {
                if(result.isConfirmed){
                    axios.patch(`${process.env.REACT_APP_API}/update-status-account/${email}` ,{
                        suspended_status:status
                    })
                    .then((response) => {
                        if(response.data.status){
                            Swal.fire({
                                title: 'สำเร็จ',
                                text: response.data.payload,
                                icon: 'success'
                              });
                            setDataUserActive(!dataUserActive)
                        }else{
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
                            text: 'การปลดระงับล้มเหลว',
                            icon: 'error'
                          });
                });
                }
            })
        }
        
    }

    const filterDataMember = (event) => {
        const newDataMember = dataMember.filter((row) => {
            return row.email.toLowerCase().includes(event.target.value.toLowerCase()) || row.username.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setDataMemberSearch(newDataMember)
    }

    return (
        <div>
            <MetaHeader title={`จัดการบัญชีผู้ใช้`} />
            <Navigation />
            <TitleBox title={'จัดการบัญชีผู้ใช้'} />
                <div className='flex flex-row justify-end my-3 px-36'>
                    <label className="flex items-center self-end gap-2 input input-bordered input-md size-fit">
                        <Icon icon={"material-symbols:search"} className='text-xl' />
                        <input type="text" placeholder="ชื่อหรือบัญชีผู้ใช้" onChange={filterDataMember} />
                    </label>
                </div>
            <div className='mx-32'>
                <DataTable
                    columns={columnsMember}
                    data={dataMemberSearch.length <= 0 ? dataMember : dataMemberSearch}
                    // fixedHeader
                    pagination
                    persistTableHead={true}
                    minRows={5}
                    striped
                    responsive
                    
                />
            </div>
        </div>
    )
}

export default MemberManagement