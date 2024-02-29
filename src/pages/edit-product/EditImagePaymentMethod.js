import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const EditImagePaymentMethod = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()

    useEffect(() => {
        !isLogin.status && navigate('/')
        isLogin.status && isLogin.payload.role !== 1 && navigate('/')
    }, [isLogin, navigate])
    
    return (
        <div>
            <MetaHeader title={`เปลี่ยนภาพวิธีการชำระเงิน`} />
            <Navigation />
            <TitleBox title={'เปลี่ยนภาพวิธีการชำระเงิน'} />
        </div>
    )
}

export default EditImagePaymentMethod