import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import DropDown from '../../components/drop-down/DropDown'
import Card from '../../components/card/Card'
import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
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
            {
                dataPromotion.length === 0 ?
                    <div>
                        <div className='max-w-full my-10'>
                            <div className='btn lg:flex md:hidden sm:hidden relative rounded-3xl max-w-[1200px] py-10 mx-auto overflow-hidden max-h-[500px] hidden bg-gradient-to-r from-shadow-primary to-[#9d09cf]' >
                                <div className='flex justify-center w-full h-full' >
                                    <div className='flex items-center '>
                                        <div className='text-5xl font-bold text-shadow-white '>สินค้าลดราคายังไม่พร้อมให้บริการ</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center mt-24' >
                            <Link className='border-none btn bg-shadow-error hover:bg-shadow-herror' to='/'>กลับไปหน้าแรก</Link>
                        </div>
                    </div>
                    :
                    <div>
                        <div>
                            <div className='flex flex-row justify-between my-10 px-36 '>
                                <DropDown data={dataPromotion} type={'promotion'} setData={setDataPromotion} />
                                <label className="flex items-center self-center gap-2 input input-bordered input-md size-fit">
                                    <Icon icon={"material-symbols:search"} className='text-xl' />
                                    <input type="text" placeholder="ชื่อสินค้าหรือชื่อเกม" onChange={filterDataPromotion} />
                                </label>
                            </div>
                        </div>
                        <div className='grid grid-flow-col grid-cols-4 gap-5 py-10 mx-40 grid-row-2'>
                            {dataPromotionSearch.length === 0 ? dataPromotion.map((value, id) => (
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
                            )) : dataPromotionSearch.map((value, id) => (
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
            }

        </div>
    )
}

export default PromotionProduct