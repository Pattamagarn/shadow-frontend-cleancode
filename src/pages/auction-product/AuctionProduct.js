import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import DropDown from '../../components/drop-down/DropDown'
import Card from '../../components/card/Card'
import { Icon } from '@iconify/react'
import { useEffect, useState , useCallback} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AuctionProduct = () => {

    const [dataAuction, setDataAuction] = useState([])
    const [dataAuctionSearch, setDataAuctionSearch] = useState([])
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/read-auction-product`)
            .then((response) => {
                if (response) {
                    setDataAuction(response.data.payload)
                }
            })
    }, [])

    const filterDataAuction = (event) => {
        const newDataAuction = dataAuction.filter((row) => {
            return row.game_name.toLowerCase().includes(event.target.value.toLowerCase()) || row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setDataAuctionSearch(newDataAuction)
    }

    return (
        <div>
            <MetaHeader title={`สินค้าประมูล`} />
            <Navigation />
            <TitleBox title={'สินค้าประมูล'} />
            <div>
                <div className='flex flex-row justify-between my-10 px-36 '>
                    <DropDown data={dataAuction} type={'auction'} setData={setDataAuction}/>
                    <label className="flex items-center self-center gap-2 input input-bordered input-md size-fit">
                        <Icon icon={"material-symbols:search"} className='text-xl' />
                        <input type="text" placeholder="ชื่อเกม" onChange={filterDataAuction} />
                    </label>
                </div>
            </div>
            <div className='grid grid-flow-col grid-cols-4 gap-5 py-10 mx-40 grid-row-2'>
                {dataAuctionSearch.length === 0 ? dataAuction.map((value,id) => (
                    <div key={id}>
                        <Card
                            uuid={value.uuid}
                            name={value.name}
                            game_name={value.game_name}
                            information={value.information}
                            start_time={value.start_time}
                            end_time={value.end_time}
                            path='auction' />
                    </div>
                )) :    dataAuctionSearch.map((value,id) => (
                        <div key={id}>
                            <Card
                                uuid={value.uuid}
                                name={value.name}
                                game_name={value.game_name}
                                information={value.information}
                                start_time={value.start_time}
                                end_time={value.end_time}
                                path='auction' />
                        </div>

                    ))}
            </div>

        </div>
    )
}

export default AuctionProduct