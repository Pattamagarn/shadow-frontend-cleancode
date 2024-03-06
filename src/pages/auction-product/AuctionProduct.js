import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import DropDown from '../../components/drop-down/DropDown'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AuctionProduct = () => {

    return (
        <div>
            <MetaHeader title={`สินค้าประมูล`} />
            <Navigation />
            <TitleBox title={'สินค้าประมูล'} />
            <div>
                <div className='flex flex-row justify-between my-10 px-36 '>
                    <DropDown />
                    <label className="flex items-center self-center gap-2 input input-bordered input-md size-fit">
                        <Icon icon={"material-symbols:search"} className='text-xl' />
                        <input type="text" placeholder="ชื่อเกม" />
                    </label>
                </div>
            </div>
        </div>
    )
}

export default AuctionProduct