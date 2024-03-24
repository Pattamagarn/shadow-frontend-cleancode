import { Link } from "react-router-dom"
import CountdownTimer from "../countdown-time/CountDownTimer"

const Card = ({ uuid, name, game_name, aysel, information, promotion_status = 0, promotion, path, start_time, end_time }) => {

    return (
        <div >
            <div className="border shadow-xl border-x-4 border-y-4 border-shadow-primary card lg:card-compact bg-base-100">
                <div className="flex items-center card-body">
                    <h2 className="card-title">{name}</h2>
                    <h3 className="card-title">{`( ${game_name} )`}</h3>
                </div>
                <figure className="h-32 mx-auto border rounded-lg border-shadow-primary border-x-4 border-y-4">
                    <div className='w-28 h-28 flex-3'>
                        {path === 'general' ?
                            <img src={`${process.env.REACT_APP_GENERAL_PRODUCT}${information}`} alt='product' key={information} className='flex w-full h-full' />
                            : path === 'gacha' ?
                                <img src={`${process.env.REACT_APP_GACHA_PRODUCT}${information}`} alt='product' key={information} className='flex w-full h-full' />
                                : <img src={`${process.env.REACT_APP_AUCTION_PRODUCT}${information}`} alt='product' key={information} className='flex w-full h-full' />
                        }

                    </div>
                </figure>
                <div className="items-center card-body">
                    {path === 'auction' ?
                        <div className="flex flex-col items-center justify-center card-actions">
                            <div className="flex items-center ">
                                <CountdownTimer
                                    start_time={start_time}
                                    end_time={end_time}
                                    detail={true} />
                            </div>
                            <Link className="btn btn-primary" to={`/auction-product-item/${uuid}`} >ดูรายละเอียด/สั่งซื้อ</Link>
                        </div>
                        : promotion_status ?
                            <div className="flex flex-col justify-center ">
                                <div className="flex justify-center my-2">
                                    <span>{`${promotion} Aysel`}</span>
                                    <span className="line-through text-[#7d7d84] text-xs ">{`${aysel} Aysel`}</span>
                                </div>
                                <div className="justify-center card-actions">
                                    <Link className="btn btn-primary" to={`/promotion-product-item/${uuid}`} >ดูรายละเอียด/สั่งซื้อ</Link>
                                </div>
                            </div>
                            : <div className="flex flex-col justify-center ">
                                <div className="flex justify-center my-2">
                                    <span>{`${aysel} Aysel`}</span>
                                </div>
                                <div className="justify-center card-actions">
                                    <Link className="btn btn-primary" to={`/general-product-item/${uuid}`} >ดูรายละเอียด/สั่งซื้อ</Link>
                                </div>
                            </div>
                    }

                </div>
            </div>

        </div>
    )
}

export default Card