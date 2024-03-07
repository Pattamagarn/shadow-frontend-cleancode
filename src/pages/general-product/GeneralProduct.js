import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import DropDown from '../../components/drop-down/DropDown'
import { Icon } from '@iconify/react'
import Card from '../../components/card/Card'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const GeneralProduct = () => {

    const [dataGeneral, setDataGeneral] = useState([])
    const [dataGeneralSearch, setDataGeneralSearch] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/read-general-product`)
            .then((response) => {
                if (response) {
                    setDataGeneral(response.data.payload)
                }
            })
    }, [])

    const filterDataGeneral = (event) => {
        const newDataGeneral = dataGeneral.filter((row) => {
            return row.game_name.toLowerCase().includes(event.target.value.toLowerCase()) || row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setDataGeneralSearch(newDataGeneral)
    }

    const handlePickItem = (event) => {
        console.log(event.target)
    }

    return (
        <div>
            <MetaHeader title={`สินค้าทั้งหมด`} />
            <Navigation />
            <TitleBox title={'สินค้าทั้งหมด'} />
            <div >
                <div className='flex flex-row justify-between my-10 px-36 '>
                    <DropDown />
                    <label className="flex items-center self-center gap-2 input input-bordered input-md size-fit">
                        <Icon icon={"material-symbols:search"} className='text-xl' />
                        <input type="text" placeholder="ชื่อสินค้าหรือชื่อเกม" onChange={filterDataGeneral} />
                    </label>
                </div>
            </div>
            <div className='grid grid-flow-col grid-cols-4 gap-5 py-10 mx-40 grid-row-2'>
                {dataGeneralSearch.length <= 0 ? dataGeneral.map((value) => (
                        <Card
                            name={value.name}
                            game_name={value.game_name}
                            aysel={value.normal_price}
                            information={value.information}
                            promotion_status={value.special_price_status}
                            promotion={value.special_price}
                            path='general' />
                )) :
                    dataGeneralSearch.map((value) => (
                        <Link key={value.uuid} to={`/general-product-item/${value.uuid}`}>
                            <Card
                                name={value.name}
                                game_name={value.game_name}
                                aysel={value.normal_price}
                                information={value.information}
                                promotion_status={value.special_price_status}
                                promotion={value.special_price}
                                path='general' />
                        </Link>
                    ))}
            </div>


        </div>
    )
}

export default GeneralProduct