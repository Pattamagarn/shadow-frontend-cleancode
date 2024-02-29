import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import TitleBox from '../../components/title-box/TitleBox'

const PromotionProduct = () => {
    return (
        <div>
            <MetaHeader title={`สินค้าโปรโมชัน`} />
            <Navigation />
            <TitleBox title={'สินค้าโปรโมชัน'} />
        </div>
    )
}

export default PromotionProduct