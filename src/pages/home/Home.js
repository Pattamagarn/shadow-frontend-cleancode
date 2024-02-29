import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'

const Home = () => {
    return (
        <div>
            <MetaHeader title={`หน้าหลัก`} />
            <Navigation />
            <TitleBox title={'หน้าหลัก'} />
        </div>
    )
}

export default Home