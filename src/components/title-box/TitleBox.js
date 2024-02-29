import { Link } from 'react-router-dom'
const TitleBox = ({ title, name, path, status = false}) => {
    return (
        <div className='mx-10 mt-10'>
            <div className='flex flex-row items-center align-middle justify-start flex-nowrap'>
                <span className='text-3xl subpixel-antialiased not-italic font-normal text-left text-nowrap text-[#33007B] mr-5'>{title}</span>
                {status && <Link to={path} className="text-xl subpixel-antialiased not-italic font-normal text-left text-nowrap btn border-none bg-[#A5DC86] hover:bg-[#86b36d] text-[#FFFFFF]">{name}</Link>}
            </div>
            <div className='divider border-none h-2 my-3 bg-[#33007B]'></div>
        </div>
    )
}

export default TitleBox