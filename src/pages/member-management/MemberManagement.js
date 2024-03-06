import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { Icon } from '@iconify/react'

const MemberManagement = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 1 && navigate('/')
    }, [isLogin, navigate])

    const [dataMember, setDataMember] = useState([])
    const [dataMemberSearch, setDataMemberSearch] = useState([])

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
    }, [])

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
            cell: (row) => [row.suspended_status ? <Icon icon={"solar:user-block-bold"} className='text-3xl' /> : <Icon icon={"solar:user-bold"} className='text-3xl' />]
        },
        {
            name: 'บทบาท',
            selector: row => row.role,
            cell: (row) => [row.role ? `ผู้ดูแลระบบ` : `สมาชิก`],
            sortable:true
        }
    ]

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