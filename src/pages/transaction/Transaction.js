import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import DataTable from 'react-data-table-component';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios';

const Transaction = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()
    const [history_product, setHistory_product] = useState([])
    const [record_history_product, setRecord_history_product] = useState([])
    const [history_payment, setHistory_payment] = useState([])
    const [record_history_payment, setRecord_history_payment] = useState([])
    const [create , setCreate] = useState([])

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 0 && navigate('/')
    }, [isLogin, navigate])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/read-history-payment`, {withCredentials:true})
        .then((response) => {
            if(response.data.status){
                setHistory_payment(response.data.payload.map((value, index) => {
                    return {...value, index: index+1}
                }))
                setCreate(response.data.payload.create_at.map((value) => {
                    return {...value}
                }))
            }
        })
        .catch(() => {})


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
            selector: row => row.product_price,
            sortable: true
        },
        {
            name: 'ช่องทาง',
            selector: row => row.buy_method,
            sortable: true
        },
        {
            name: 'วันที่-เวลา',
            selector: row => row.create_at.toLocaleString(),
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
            selector: row => row.create_at,
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
                <div className='text-primary text-xl mx-44 mt-10'>ประวัติการซื้อสินค้า</div>
                <div className='flex flex-row  justify-end px-36 my-3'>
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
                <div className='text-xl text-primary mx-44 mt-10'>ประวัติการเติมเงิน</div>
                <div className='flex flex-row  justify-end px-36 my-3'>
                    <label className="flex items-center gap-2 input input-bordered input-md size-fit ">
                        <Icon icon={"material-symbols:search"} className='text-xl' />
                        <input type="text" placeholder="วันที่-เวลา หรือ ราคา" onChange={filterHistoryPayment} />
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
                    className='table px-10'
                />
                </div>
                
            </div>
        </div>
    )
}

export default Transaction