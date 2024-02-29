import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import DataTable from 'react-data-table-component';
import { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Transaction = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()
    const [history_product,setHistory_product] = useState([])
    const [record_history_product,setRecord_history_product] = useState([])
    const [history_payment,setHistory_payment] = useState([])
    const [record_history_payment,setRecord_history_payment] = useState([])

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 0 && navigate('/')
    }, [isLogin, navigate])


    const columns_history_product = [
        {
            name:'ชื่อเกม',
            selector: row => row.game_name,
            sortable:true
        },
        {
            name:'ชื่อสินค้า',
            selector: row => row.product_name,
        },
        {
            name:'ราคา',
            selector: row => row.product_price,
            sortable:true
        },
        {
            name:'ช่องทาง',
            selector: row => row.buy_method,
            sortable:true
        },
        {
            name:'วันที่-เวลา',
            selector: row => row.create_at,
            sortable:true
        },
        
    ]
    const columns_history_payment = [
        {
            name:'จำนวน',
            selector: row => row.game_name,
            sortable:true
        },
        {
            name:'ราคา',
            selector: row => row.product_name,
        },
        {
            name:'สถานะ',
            selector: row => row.product_price,
            sortable:true
        },
        {
            name:'วันที่-เวลา',
            selector: row => row.create_at,
            sortable:true
        },
        
    ]

    const filterHistoryProduct = (event) => {
        const newhistory_product = history_product.filter(row => {
            return row.game_name.toLowerCase().includes(event.target.value.toLowerCase()) || row.product_name.toLowerCase().includes(event.target.value.toLowerCase()) || row.create_at.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecord_history_product(newhistory_product)
    }

    const filterHistoryPayment = (event) => {
        const newhistory_payment = history_payment.filter(row => {
            return row.game_name.toLowerCase().includes(event.target.value.toLowerCase()) || row.product_name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecord_history_payment(newhistory_payment)
    }

    return (
        <div>
            <MetaHeader title={`ธุรกรรมของฉัน`} />
            <Navigation />
            <TitleBox title={'ธุรกรรมของฉัน'} />
            <div className='container mt-5 px-40'>
                <div className='text text-xl text-primary mx-5'>ประวัติการซื้อสินค้า</div>
                <div className='text-end'> <input type='text' placeholder='ชื่อสินค้าหรือชื่อเกม' onChange={filterHistoryProduct} className='text-center border rounded-lg h-9'></input></div>
                {/* <div className='text-end'> <input type='text' placeholder='ชื่อสินค้าหรือชื่อเกม' onChange={filterHistoryProduct}></input></div> */}
                <DataTable
                    columns={columns_history_product}
                    data={record_history_product.length <= 0 ? history_product : record_history_product}
                    fixedHeader
                    pagination 
                    persistTableHead={true}
                    minRows={5}
                    className='table px-10'
                >
                </DataTable>
            </div>

            <div className='container mt-5 px-40'>
                <div className='text text-xl text-primary mx-5'>ประวัติการเติมเงิน</div>
                <div className='text-end'> <input type='text' placeholder='วันที่-เวลา จำนวน หรือ ราคา' onChange={filterHistoryPayment} className='text-center border rounded-lg h-9'></input></div>
                {/* <div className='text-end'> <input type='text' placeholder='วันที่-เวลา จำนวน หรือ ราคา' onChange={filterHistoryPayment}></input></div> */}
                <DataTable
                    columns={columns_history_payment}
                    data={record_history_payment.length <= 0 ? history_payment : record_history_payment}
                    fixedHeader
                    pagination 
                    persistTableHead={true}
                    minRows={5}
                    className='table px-10'
                >
                </DataTable>
            </div>
        </div>
    )
}

export default Transaction