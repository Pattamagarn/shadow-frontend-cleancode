import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { Icon } from '@iconify/react'

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

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/read-general-product`)
        .then((response) => {
            if(response.data.status){
                setDataGeneralProduct(response.data.payload.map((value, index) => {
                    return {...value, index: index+1}
                }))
            }
        })
        .catch((error) => {})
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/read-gacha-product`)
        .then((response) => {
            if(response.data.status){
                setDataGachaProduct(response.data.payload.map((value, index) => {
                    return {...value, index: index+1}
                }))
            }
        })
        .catch((error) => {})
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/read-auction-product`)
        .then((response) => {
            if(response.data.status){
                setDataAuctionProduct(response.data.payload.map((value, index) => {
                    return {...value, index: index+1}
                }))
            }
        })
        .catch((error) => {})
    }, [])

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
            cell: (row) => [<button key={row.uuid} type={`button`} className={`btn border-none ${row.special_price_status ? 'bg-shadow-success hover:bg-shadow-hsuccess' : 'bg-shadow-error hover:bg-shadow-herror' } text-shadow-white`}>{row.special_price_status ? 'เปิด' : 'ปิด' }</button>]
        },
        {
            name: 'แก้ไข',
            selector: row => row.uuid,
            cell: (row) => [<Link key={row.uuid} to={`/edit-general-product/${row.uuid}`} className='btn border-none bg-shadow-warning hover:bg-shadow-hwarning text-shadow-white'>แก้ไข</Link>]
        },
        {
            name: 'ลบ',
            selector: row => row.uuid,
            cell: (row) => [<button key={row.uuid} type={`button`} className='btn border-none bg-shadow-error hover:bg-shadow-herror text-shadow-white'>ลบ</button>]
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
            cell: (row) => [<button key={row.uuid} type={`button`} className={`btn border-none ${row.guarantee_status ? 'bg-shadow-success hover:bg-shadow-hsuccess' : 'bg-shadow-error hover:bg-shadow-herror' } text-shadow-white`}>{row.guarantee_status ? 'เปิด' : 'ปิด' }</button>]
        },
        {
            name: 'แก้ไข',
            selector: row => row.uuid,
            cell: (row) => [<Link key={row.uuid} to={`/edit-gacha-product/${row.uuid}`} className='btn border-none bg-shadow-warning hover:bg-shadow-hwarning text-shadow-white'>แก้ไข</Link>]
        },
        {
            name: 'ลบ',
            selector: row => row.uuid,
            cell: (row) => [<button key={row.uuid} type={`button`} className='btn border-none bg-shadow-error hover:bg-shadow-herror text-shadow-white'>ลบ</button>]
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
            cell: (row) => [row.auction_status ? 'เปิด' : 'ปิด']
        },
        {
            name: 'แก้ไข',
            selector: row => row.uuid,
            cell: (row) => [<Link key={row.uuid} to={`/edit-gacha-product/${row.uuid}`} className='btn border-none bg-shadow-warning hover:bg-shadow-hwarning text-shadow-white'>แก้ไข</Link>]
        },
        {
            name: 'ลบ',
            selector: row => row.uuid,
            cell: (row) => [<button key={row.uuid} type={`button`} className='btn border-none bg-shadow-error hover:bg-shadow-herror text-shadow-white'>ลบ</button>]
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
            <div className='flex flex-row  justify-end px-36 my-3'>
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
            <div className='flex flex-row justify-end px-36 my-3'>
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
            <div className='flex flex-row justify-end px-36 my-3'>
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