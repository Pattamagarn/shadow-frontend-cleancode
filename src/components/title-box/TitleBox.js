import { Link } from 'react-router-dom'
const TitleBox = ({ title, name, path, status = false}) => {
    return (
        <div className='mx-32 mt-10'>
            <div className='flex flex-row items-center justify-start align-middle flex-nowrap'>
                <span className='mr-5 text-3xl subpixel-antialiased not-italic font-normal text-left text-nowrap text-shadow-primary'>{title}</span>
                {status && <Link to={path} className="text-xl subpixel-antialiased not-italic font-normal text-left border-none text-nowrap btn bg-shadow-success hover:bg-shadow-hsuccess text-shadow-white">{name}</Link>}
            </div>
            <div className='h-2 my-3 border-none divider bg-shadow-primary'></div>
        </div>
    )
}

export default TitleBox