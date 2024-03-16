import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import Card from '../../components/card/Card'
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
// import { Icon } from '@iconify/react'
// import Swal from 'sweetalert2'
import axios from 'axios'


const GeneralProductDetail = () => {
    const { uuid } = useParams()
    const [dataGeneral,setDataGeneral] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/read-general-product-uuid/${uuid}`)
            .then((response) => {
                if (response.data.status) {
                    setDataGeneral(response.data.payload[0])
                }
            })
            .catch((error) => {
                console.log(error)
            })
    },[uuid])

    return (
        <div>
            <MetaHeader title={`สินค้า - sword`} />
            <Navigation />
            <TitleBox title={'sword'} />
            <div className='flex items-center justify-center md:grid-cols-2 lg:w-full sm:grid-cols-1'>
                <Card
                    detail={true}
                    name={dataGeneral.name}
                    game_name={dataGeneral.game_name}
                    aysel={dataGeneral.normal_price}
                    information={dataGeneral.information}
                    promotion_status={dataGeneral.special_price_status}
                    promotion={dataGeneral.special_price}
                    path='general'
                />
            </div>
        </div>
    )
}

export default GeneralProductDetail