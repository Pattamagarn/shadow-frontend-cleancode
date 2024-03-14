import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import DropDown from '../../components/drop-down/DropDown'
import { Icon } from '@iconify/react'
import Card from '../../components/card/Card'
import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'



const GeneralProduct = () => {

    const [dataGeneral, setDataGeneral] = useState([])
    const [dataGeneralSearch, setDataGeneralSearch] = useState([])
    const [dataFilter, setDataFilter] = useState([])

    const handlefilter = useCallback((text) => {
        setDataFilter(text)
    }, [dataFilter])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/read-general-product`)
            .then((response) => {
                if (response) {
                    setDataGeneral(response.data.payload)
                }
            })
            .catch((error) => { })
    }, [])

    const filterDataGeneral = (event) => {
        const newDataGeneral = dataGeneral.filter((row) => {
            return row.game_name.toLowerCase().includes(event.target.value.toLowerCase()) || row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setDataGeneralSearch(newDataGeneral)
    }

    // const handlePickItem = (event) => {
    //     console.log(event.target)
    // }
    // console.log(dataGeneralFilter)
    return (
        <div>
            <MetaHeader title={`สินค้าทั้งหมด`} />
            <Navigation />
            <TitleBox title={'สินค้าทั้งหมด'} />
            <div >
                <div className='flex flex-row justify-between my-10 lg:mx-36 md:mx-20'>
                        <DropDown data={dataGeneral} select={handlefilter} />
                    <label className="flex items-center self-center gap-2 input input-bordered input-md size-fit">
                        <Icon icon={"material-symbols:search"} className='text-xl' />
                        <input type="text" placeholder="ชื่อสินค้าหรือชื่อเกม" onChange={filterDataGeneral} />
                    </label>
                </div>
            </div>
            <div className='grid grid-flow-row gap-5 py-10 mx-20 md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-1'>
                {dataGeneralSearch.length === 0 && dataFilter.length === 0 ? dataGeneral.map((value) => (
                    <div>
                        <Card
                            name={value.name}
                            game_name={value.game_name}
                            aysel={value.normal_price}
                            information={value.information}
                            promotion_status={value.special_price_status}
                            promotion={value.special_price}
                            path='general' />
                    </div>
                )) : dataGeneralSearch.length === 0 ? dataFilter.map((value) => (
                    // <Link key={value.uuid} to={`/general-product-item/${value.uuid}`}>
                    <div>
                        <Card
                            name={value.name}
                            game_name={value.game_name}
                            aysel={value.normal_price}
                            information={value.information}
                            promotion_status={value.special_price_status}
                            promotion={value.special_price}
                            path='general' />
                    </div>
                    // </Link>
                )) : dataGeneralSearch.map((value) => (
                    <div>
                        <Card
                            name={value.name}
                            game_name={value.game_name}
                            aysel={value.normal_price}
                            information={value.information}
                            promotion_status={value.special_price_status}
                            promotion={value.special_price}
                            path='general' />
                    </div>
                ))}
            </div>




        </div>
    )
}

export default GeneralProduct