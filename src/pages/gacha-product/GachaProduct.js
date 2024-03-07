import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import DropDown from '../../components/drop-down/DropDown'
import { Icon } from '@iconify/react'
import Card from '../../components/card/Card'
import { useState, useEffect } from 'react'
import axios from 'axios'

const GachaProduct = () => {

    const [dataGacha, setDataGacha] = useState([])
    const [dataGachaSearch, setDataGachaSearch] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/read-gacha-product`)
            .then((response) => {
                if (response) {
                    setDataGacha(response.data.payload)
                }
            })
    }, [])

    const filterDataGacha = (event) => {
        const newDataGacha = dataGacha.filter((row) => {
            return row.game_name.toLowerCase().includes(event.target.value.toLowerCase()) || row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setDataGachaSearch(newDataGacha)
    }

    return (
        <div>
            <MetaHeader title={`สินค้าสุ่มกาชา`} />
            <Navigation />
            <TitleBox title={'สินค้าสุ่มกาชา'} />
            <div>
                <div className='flex flex-row justify-between my-10 px-36 '>
                    <DropDown />
                    <label className="flex items-center self-center gap-2 input input-bordered input-md size-fit">
                        <Icon icon={"material-symbols:search"} className='text-xl' />
                        <input type="text" placeholder="ชื่อสินค้าหรือชื่อเกม" onChange={filterDataGacha} />
                    </label>
                </div>
            </div>
            <div className='grid grid-flow-col grid-cols-4 gap-5 py-10 mx-40 grid-row-2'>
                {dataGachaSearch.length <= 0 ? dataGacha.map((value) => (
                    <Card
                        name={value.name}
                        game_name={value.game_name}
                        information={value.information}
                        aysel={`10`}
                        path='gacha'
                    />
                )

                ) : dataGachaSearch.map((value) => (
                    <Card
                        name={value.name}
                        game_name={value.game_name}
                        information={value.information}
                        aysel={`10`}
                        path='gacha'
                    />
                )

                )}
            </div>
        </div>
    )
}

export default GachaProduct