import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import DataTable from 'react-data-table-component';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios';

const Transaction = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()
    const [history_product, setHistory_product] = useState([])
    const [record_history_product, setRecord_history_product] = useState([])
    const [history_payment, setHistory_payment] = useState([])
    const [record_history_payment, setRecord_history_payment] = useState([])

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 0 && navigate('/')
    }, [isLogin, navigate])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/read-history-payment`, {withCredentials:true})
        .then((response) => {
            if(response.data.status){
                setHistory_payment(response.data.payload.map((value, index) => {
                    const createAt = new Date(value.create_at)
                    let date = createAt.getDate()
                    let month = createAt.getMonth() + 1
                    let year = createAt.getFullYear()
                    let hours = createAt.getHours()
                    let minutes= createAt.getMinutes()
                    let seconds = createAt.getSeconds()

                    if(date < 10 ) date = '0' + date
                    if (month < 10) month = '0' + month
                    if (hours < 10) hours = '0' + hours
                    if (minutes < 10) minutes = '0' + minutes
                    if (seconds < 10) seconds = '0' + seconds
                    const dateTime = `${date}/${month}/${year}-${hours}:${minutes}:${seconds}`
                    return {...value, index: index+1,dateTime:dateTime}
                }))
                
                
            }
        })
        .catch(() => {})


    },[])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/read-history-product`,{withCredentials:true})
        .then((response) => {
            if(response.data.status){
                setHistory_product(response.data.payload.map((value,index) => {
                    const createAt = new Date(value.create_at)
                    let date = createAt.getDate()
                    let month = createAt.getMonth() + 1
                    let year = createAt.getFullYear()
                    let hours = createAt.getHours()
                    let minutes= createAt.getMinutes()
                    let seconds = createAt.getSeconds()

                    if(date < 10 ) date = '0' + date
                    if (month < 10) month = '0' + month
                    if (hours < 10) hours = '0' + hours
                    if (minutes < 10) minutes = '0' + minutes
                    if (seconds < 10) seconds = '0' + seconds
                    const dateTime = `${date}/${month}/${year}-${hours}:${minutes}:${seconds}`
                    return {...value, index:index+1,dateTime:dateTime}
                }))
            }
        })
        .catch(()=>{})
    },[])

    const columns_history_product = [
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
            name: 'ราคา',
            selector: row => row.product_price === 0 ? 'free' : row.product_price ,
            sortable: true
        },
        {
            name: 'ช่องทาง',
            selector: row => row.buy_method,
            sortable: true
        },
        {
            name: 'วันที่-เวลา',
            selector: row => row.dateTime,
            sortable: true
        },

    ]
    const columns_history_payment = [
        {
            name: 'ลำดับ',
            selector: row => row.index,
            sortable: true
        },
        {
            name: 'จำนวน',
            selector: row => row.aysel_amount,
            sortable: true
        },
        {
            name: 'ราคา',
            selector: row => row.cash_amount,
        },
        {
            name: 'สถานะ',
            cell : (row) => [row.payment_status ? <p key={row.title}>สำเร็จแล้ว</p> : <p key={row.title}>รอดำเนินการ</p>
 ]
        },
        {
            name: 'วันที่-เวลา',
            selector: row => row.dateTime,
            sortable: true
        },

    ]

    const filterHistoryPayment = (event) => {
        const newhistory_payment = history_payment.filter(row => {
            return row.cash_amount || row.create_at
        })
        setRecord_history_payment(newhistory_payment)
       
    }

    const filterHistoryProduct = (event) => {
        const newhistory_product = history_product.filter(row => {
            return row.game_name.toLowerCase().includes(event.target.value.toLowerCase()) || row.product_name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecord_history_product(newhistory_product)
    }

    return (
        <div>
            <MetaHeader title={`ธุรกรรมของฉัน`} />
            <Navigation />
            <TitleBox title={'ธุรกรรมของฉัน'} />
            <div>
                <div className='mt-10 text-xl text-primary mx-44'>ประวัติการซื้อสินค้า</div>
                <div className='flex flex-row justify-end my-3 px-36'>
                    <label className="flex items-center gap-2 input input-bordered input-md size-fit ">
                        <Icon icon={"material-symbols:search"} className='text-xl' />
                        <input type="text" placeholder="ชื่อสินค้า" onChange={filterHistoryProduct} />
                    </label>
                </div>

                <div className='mx-32'>
                    <DataTable
                        columns={columns_history_product}
                        data={record_history_product.length <= 0 ? history_product : record_history_product}
                        pagination
                        striped
                        responsive
                        persistTableHead={true}
                        minRows={5}
                    />
                    
                </div>
            </div>

            <div >
                <div className='mt-10 text-xl text-primary mx-44'>ประวัติการเติมเงิน</div>
                <div className='flex flex-row justify-end my-3 px-36'>
                    <label className="flex items-center gap-2 input input-bordered input-md size-fit ">
                        <Icon icon={"material-symbols:search"} className='text-xl' />
                        <input type="text" placeholder="วันที่ หรือ ราคา" onChange={filterHistoryPayment} />
                    </label>
                </div>
                <div className='mx-32'>
                <DataTable
                    columns={columns_history_payment}
                    data={record_history_payment.length <= 0 ? history_payment : record_history_payment}
                    fixedHeader
                    pagination
                    persistTableHead={true}
                    minRows={5}
                />
                </div>
                
            </div>
        </div>
    )
}

export default Transaction