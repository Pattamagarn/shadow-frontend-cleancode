import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import DataTable from 'react-data-table-component'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Icon } from '@iconify/react'
import axios from 'axios'

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

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/banner-select`)
        .then((response) => {
            if(response.data.status){
                setDataBanner(response.data.payload.map((value, index) => {
                    return {...value, index: index+1}
                }))
            }
        })
        .catch((error) => {})
    }, [])
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/game-name-select`)
        .then((response) => {
            if(response.data.status){
                setDataGameName(response.data.payload.map((value, index) => {
                    return {...value, index: index+1}
                }))
            }
        })
        .catch((error) => {})
    },[])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/payment-method-select`)
        .then((response) => {
            if(response.data.status){
                setDataPaymentMethod(response.data.payload.map((value, index) => {
                    return {...value, index: index+1}
                }))
            }
        })
        .catch((error) => {})
    }, [])

    const columnsBanner = [
        {
            name: 'ลำดับ',
            selector: row => row.index,
            sortable:true
        },
        {
            name: 'ลิงก์ภาพ',
            selector: row => row.information,
            cell: (row) => [<img key={row.uuid} alt={row.uuid} src={`${process.env.REACT_APP_BANNER}${row.information}`}/>]
        },
        {
            name: 'แก้ไข',
            selector: row => row.uuid,
            cell: (row) => [<Link key={row.uuid} to={`/edit-banner/${row.uuid}`} className='btn border-none bg-[#F8BB86] hover:bg-[#cf9c6f] text-[#FFFFFF]'>แก้ไข</Link>]
        },
        {
            name: 'ลบ',
            selector: row => row.uuid,
            cell: (row) => [<button key={row.uuid} type={`button`} className='btn border-none bg-[#F27474] hover:bg-[#ca6161] text-[#FFFFFF]'>ลบ</button>]
        }
    ]

    const columnsGameName = [
        {
            name: 'ลำดับ',
            selector: row => row.index,
            sortable:true
        },
        {
            name: 'ชื่อเกม',
            selector: row => row.game_name
        },
        {
            name: 'แก้ไข',
            selector: row => row.uuid,
            cell: (row) => [<Link key={row.uuid} to={`/edit-game-name/${row.uuid}`} className='btn border-none bg-[#F8BB86] hover:bg-[#cf9c6f] text-[#FFFFFF]'>แก้ไข</Link>]
        },
        {
            name: 'ลบ',
            selector: row => row.uuid,
            cell: (row) => [<button key={row.uuid} onClick={handleDeleteGameName.bind(this,row.uuid)} type={`button`} className='btn border-none bg-[#F27474] hover:bg-[#ca6161] text-[#FFFFFF]'>ลบ</button>],

        }
    ]

    const columnsPaymentMethod = [
        {
            name: 'ลำดับ',
            selector: row => row.index,
            sortable:true
        },
        {
            name: 'วิธีการชำระเงิน',
            selector: row => row.method
        },
        // {
        //     selector:row => row.information
        // },
        {
            name: 'เปลี่ยน',
            selector: row => row.uuid,
            cell: (row) => [<Link key={row.uuid} to={`${row.method === 'วิดีโอ' ? '/edit-video-payment-method': '/edit-image-payment-method'}`} className='btn border-none bg-[#F8BB86] hover:bg-[#cf9c6f] text-[#FFFFFF]'>เปลี่ยน</Link>]
            // cell: (row) => [<Link key={row.uuid} to={`${row.method === 'วิดีโอ' ? '/edit-video-payment-method': '/edit-image-payment-method'}/${row.uuid}`} className='btn border-none bg-[#F8BB86] hover:bg-[#cf9c6f] text-[#FFFFFF]'>เปลี่ยน</Link>]
        },
        {
            name: 'ล้าง',
            selector: row => row.uuid,
            cell: (row) => [<button key={row.uuid} type={`button`} className='btn border-none bg-[#F27474] hover:bg-[#ca6161] text-[#FFFFFF]'>ล้าง</button>]
        }
    ]

    const filterDataGameName = (event) => {
        const newDataGameName = dataGameName.filter((row) => {
            return row.game_name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setDataGameNameSearch(newDataGameName)
    }
    const handleDeleteGameName = (uuid) => {
        // console.log(uuid);
        axios.delete(`${process.env.REACT_APP_API}/game-name-delete/${uuid}`)
            .then((response) => {
                console.log('Data deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting data:', error);
            });
    };


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
            <TitleBox title={'จัดการชื่อเกม'} name={'เพิ่มชื่อเกม'} path={'/add-game-name'} status={true} />
            <div className='flex flex-row justify-end px-10 my-3'>
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