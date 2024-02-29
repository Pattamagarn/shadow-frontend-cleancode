import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'

const GeneralProduct = () => {
    return (
        <div>
            <MetaHeader title={`สินค้าทั้งหมด`} />
            <Navigation />
            <TitleBox title={'สินค้าทั้งหมด'} />
        </div>
    )
}

export default GeneralProduct