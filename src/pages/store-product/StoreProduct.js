import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import DataTable from 'react-data-table-component'
import { Icon } from '@iconify/react'
import { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

const StoreProduct = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()
    const [data_product, setData_product] = useState([])
    const [record_product,setRecord_product] = useState([])

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 0 && navigate('/')
    }, [isLogin, navigate])

    // useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_API}/`, { withCredentials: true })
    //     .then((response) => {
    //         if(response.data.status){
    //             setData_product(response.data.payload)
    //         }
    //     })
    //     .catch(() => {})
    // })

    const columns_data_product = [
        {
            name: 'ชื่อเกม',
            selector: row => row.game_name
        },
        {
            name: 'ชื่อสินค้า',
            selector: row => row.product,

        },
        {
            name: 'สถานะ',
            selector: row => row.amount,

        },
        {
            name: 'โค้ดสินค้า',
            selector: row => row.auction,

        },
        {
            name: 'ซ่อน',
            selector: row => row.hide,
            cell: (d) => [<button
                key={d.title}>[d.hide ?
                 <p
                  key={d.title}
                  onClick={handleClick.bind(this, d.title)}
                  className="btn btn-success btn-sm w-5/12 "
                  
                ><Icon icon={"mdi:show"} className='text-[#000000]' width={25} height={25} /></p> :
                <p
                  key={d.title}
                  onClick={handleClick.bind(this, d.title)}
                  className="btn btn-success btn-sm w-5/12 "
                  
                ><Icon icon={"mdi:hide"} className='text-[#000000]' width={25} height={25} /></p>
                
                ]
            </button>
            ]
        },
    ]

    const handleClick = (title) => {
        console.log(`You clicked me! ${title}`);
      };

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
            <div className='flex flex-row  justify-end px-36 my-3'>
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