import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import Card from '../../components/card/Card'
import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import Swal from 'sweetalert2'
import axios from 'axios'


const GeneralProductDetail = ({title}) => {
    return(
        <div>
            <MetaHeader title={`สินค้า - ${title}`} />
            <Navigation />
            <TitleBox title={title} />
        </div>
    )
}

export default GeneralProductDetail