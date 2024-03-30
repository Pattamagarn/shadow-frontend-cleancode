import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import DataTable from 'react-data-table-component'
import { Icon } from '@iconify/react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

const StoreProduct = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()
    const [data_product, setData_product] = useState([])
    const [record_product,setRecord_product] = useState([])
    const [hideMap,setHideMap] = useState({})
    const isHidden = (rowID) => hideMap[rowID]

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 0 && navigate('/')
    }, [isLogin, navigate])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/read-store-product`, { withCredentials: true })
        .then((response) => {
            if(response.data.status){
                setData_product(response.data.payload.map((value,index) => {
                    return {...value,index:index+1}
                }))
            }
        })
        .catch(() => {})
    },[])

    const toggleHide = (rowID) => {
        setHideMap((prevHideMap) => ({
            ...prevHideMap,[rowID] : !prevHideMap[rowID]
        }))
    }

    const columns_data_product = [
        {
            name: 'ลำดับ',
            selector: row => row.index,
            sortable: true
        },
        {
            name: 'ชื่อเกม',
            selector: row => row.game_name,
            sortable: true
        },
        {
            name: 'ชื่อสินค้า',
            selector: row => row.product_name,

        },
        {
            name: 'สถานะ',
            selector: row => row.used_status,
            cell : (row) => [row.used_status ? 'ใช้งานแล้ว' : 'ยังไม่ได้ใช้งาน']

        },
        {
            name: 'โค้ดสินค้า',
            selector: row => row.method_uuid,
            cell : (row) => [isHidden(row.uuid) ? <div key={row.uuid}>{row.uuid}</div> : <div>xxx-xxx-xxx</div>]

        },
        {
            name: 'ซ่อน',
            // selector: i,
            cell: (row) => [<div key={row.uuid} className='btn btn-ghost' onClick={() => toggleHide(row.uuid)} >{isHidden(row.uuid) ? <Icon icon={"mdi:show"} key={row.uuid} className='text-3xl text-shadow-primary' /> : <Icon icon={"mdi:hide"} key={row.uuid}  className='text-3xl text-shadow-primary' /> }</div>]
        },
    ]


    const filterData = (event) => {
        const newData_product = data_product.filter(row => {
            return row.game_name.toLowerCase().includes(event.target.value.toLowerCase()) || row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecord_product(newData_product)
    }

    return (
        <div>
            <MetaHeader title={`คลังสินค้าของฉัน`} />
            <Navigation />
            <TitleBox title={'คลังสินค้าของฉัน'} />
            <div className='flex flex-row justify-end my-3 px-36'>
                    <label className="flex items-center gap-2 input input-bordered input-md size-fit ">
                        <Icon icon={"material-symbols:search"} className='text-xl' />
                        <input type="text" placeholder="ชื่อสินค้าหรือชื่อเกม" onChange={filterData} />
                    </label>
                </div>
                <div className='mx-32'>
                <DataTable
                    columns={columns_data_product}
                    data={record_product.length <= 0 ? data_product : record_product}
                    pagination
                    striped
                    responsive
                    persistTableHead={true}
                />
                </div>
        </div>
        
    )
}

export default StoreProduct