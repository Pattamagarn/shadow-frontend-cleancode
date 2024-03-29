import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import DropDown from '../../components/drop-down/DropDown'
import Card from '../../components/card/Card'
import { useState, useEffect} from 'react'
import { Icon } from '@iconify/react'
import axios from 'axios'

const PromotionProduct = () => {

    const [dataPromotion, setDataPromotion] = useState([])
    const [dataPromotionSearch, setDataPromotionSearch] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/read-promotion-product`)
            .then((response) => {
                if (response) {
                    setDataPromotion(response.data.payload)
                }
            })
            .catch((error) => { })
    }, [])

    const filterDataPromotion = (event) => {
        const newDataPromotion = dataPromotion.filter((row) => {
            return row.game_name.toLowerCase().includes(event.target.value.toLowerCase()) || row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setDataPromotionSearch(newDataPromotion)
    }

    return (
        <div>
            <MetaHeader title={`สินค้าโปรโมชัน`} />
            <Navigation />
            <TitleBox title={'สินค้าโปรโมชัน'} />
            <div>
                <div className='flex flex-row justify-between my-10 px-36 '>
                    <DropDown data={dataPromotion} type={'promotion'} setData={setDataPromotion}/>
                    <label className="flex items-center self-center gap-2 input input-bordered input-md size-fit">
                        <Icon icon={"material-symbols:search"} className='text-xl' />
                        <input type="text" placeholder="ชื่อสินค้าหรือชื่อเกม" onChange={filterDataPromotion} />
                    </label>
                </div>
            </div>
            <div className='grid grid-flow-col grid-cols-4 gap-5 py-10 mx-40 grid-row-2'>
                {dataPromotionSearch.length === 0 ? dataPromotion.map((value,id) => (
                    <div key={id}>
                        <Card
                            uuid={value.uuid}
                            name={value.name}
                            game_name={value.game_name}
                            aysel={value.normal_price}
                            information={value.information}
                            promotion_status={value.special_price_status}
                            promotion={value.special_price}
                            path='general' /> </div>
                )) : dataPromotionSearch.map((value,id) => (
                            <div key={id}>
                                <Card
                                    uuid={value.uuid}
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

export default PromotionProduct