import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import DataTable from 'react-data-table-component'
import { Icon } from '@iconify/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Analysis = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()
    const [dataMember, setDataMember] = useState([])
    const [dataMemberAdmin, setDataMemberAdmin] = useState(0)
    const [dataMemberUser, setDataMemberUser] = useState(0)
    const [aysel, setAysel] = useState([])
    const [amount, setAmount] = useState([])
    const [product, setProduct] = useState([])

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 1 && navigate('/')
    }, [isLogin, navigate])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/select-account`)
            .then((response) => {
                if (response.data.status) {
                    setDataMember(response.data.payload.map((value) => {
                        return { ...value }

                    }))
                    // response.data.payload.map((value) => (value.role === 0 ? setDataMemberUser(dataMemberUser+1) : setDataMemberAdmin(dataMemberAdmin+1)))
                    
                    
                }
            })
    },[])
    
    
    const [top_product, setTop_product] = ([])
    const columns_top_product = [
        {
            name: 'ลำดับ',
            selector: row => row.id,
            sortable: true
        },
        {
            name: 'ชื่อเกม',
            selector: row => row.game_name
        },
        {
            name: 'ชื่อสินค้า',
            selector: row => row.product,

        },
        {
            name: 'จำนวน',
            selector: row => row.amount,

        },
        {
            name: 'ประมูลด่วน',
            selector: row => row.auction,
            cell: (d) => [<button
                key={d.title}>
                <Icon icon={"mingcute:auction-line"} className='text-[#000000]' width={25} height={25} />
            </button>
            ]
        },
    ]

    return (
        <div>
            <MetaHeader title={`วิเคราะห์ข้อมูล`} />
            <Navigation />
            <TitleBox title={'วิเคราะห์ข้อมูล'} />
            <div className="flex-col hidden lg:flex">
                <div className="flex flex-col items-start text-lg mx-36 ">
                    <span>จำนวนบัญชีทั้งหมดในระบบ {dataMember.length} บัญชี</span>
                    <span>จำนวนบัญชีผู้ดูแลระบบทั้งหมดในระบบ {dataMemberAdmin} บัญชี</span>
                    <span>จำนวนบัญชีสมาชิกทั้งหมดในระบบ { dataMemberUser} บัญชี</span>
                    <span>จำนวน Aysel ที่ขายไปทั้งหมด {aysel} Aysel</span>
                    <span>จำนวนเงินที่ได้รับทั้งหมด {amount} บาท</span>
                    <span>จำนวนสินค้าที่ขายไปทั้งหมด {product} ชิ้น</span>
                </div>
                <TitleBox title={'10 อันดับของขายดีประจำวัน'} />
                <div className='mx-32 mb-10'>
                    <DataTable
                        columns={columns_top_product}
                        data={top_product}
                        fixedHeader
                        pagination
                        persistTableHead={true}
                        className='mx-10'
                    />
                </div>
            </div>
            <div className="flex flex-col lg:hidden">
                <div className="flex flex-col items-start text-lg mx-36 ">
                    <span>จำนวนบัญชีทั้งหมดในระบบ {dataMember.length} บัญชี</span>
                    <span>จำนวนบัญชีผู้ดูแลระบบทั้งหมดในระบบ { dataMemberAdmin} บัญชี</span>
                    <span>จำนวนบัญชีสมาชิกทั้งหมดในระบบ { dataMemberUser} บัญชี</span>
                    <span>จำนวน Aysel ที่ขายไปทั้งหมด {aysel} Aysel</span>
                    <span>จำนวนเงินที่ได้รับทั้งหมด {amount} บาท</span>
                    <span>จำนวนสินค้าที่ขายไปทั้งหมด {product} ชิ้น</span>
                </div>
                <TitleBox title={'10 อันดับของขายดีประจำวัน'} />
                <div className='mx-16 mb-10'>
                    <DataTable
                        columns={columns_top_product}
                        data={top_product}
                        fixedHeader
                        pagination
                        persistTableHead={true}
                        className='mx-10'
                    />
                </div>
            </div>


        </div>
    )
}

export default Analysis