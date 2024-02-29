import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const EditProfile = () => {
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const navigate = useNavigate()

    useEffect(() => {
        !isLogin.status && navigate('/')
    }, [isLogin, navigate])

    return (
        <div>
            <MetaHeader title={`แก้ไขโปรไฟล์`} />
            <Navigation />
            <TitleBox title={'แก้ไขโปรไฟล์'} />
        </div>
    )
}

export default EditProfile