const Card = ({ name, game_name, aysel, information,promotion_status=0,promotion,path }) => {

    const handlePickItem = () => {
        
    }

    return (
        <div className="">
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
                    {promotion_status ? 
                        <div>
                            <span className="line-through text-[#7d7d84] ">{`${aysel} Aysel`}</span>
                            <p>{`${promotion} Aysel`}</p>
                        </div> 
                        
                        : <div>
                        
                        <p className="mt-5">{`${aysel} Aysel`}</p>
                    </div> }
                    <div className="justify-center card-actions">
                        <button className="btn btn-primary" onClick={handlePickItem}>ดูรายละเอียด/สั่งซื้อ</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card