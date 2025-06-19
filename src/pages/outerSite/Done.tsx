import { CheckCircleIcon } from '@heroicons/react/16/solid';
import logo from '../../assets/logo.png';

const Done: React.FC = () =>(
  <div dir="rtl" className="flex flex-col items-center justify-center min-h-screen bg-[linear-gradient(244.96deg,_#E1F1F5_48.32%,_#5F8089_100%)]">
    <div className="absolute top-6">
      <img src={logo} alt="DALIL Logo" className="h-16 lg:h-20 w-auto" />
    </div>
      <CheckCircleIcon className='h-24 w-24 text-green-500 mb-6'/>
      <p className='text-2xl font-semibold text-blue-600 mb-6'>
        تم تعيين كلمة السر بنجاح  
      </p>
      <div className='w-80 md:max-w-80'>
      <button
        type="submit"
        className="w-2/3 mx-auto block bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 font-semibold text-lg shadow-md"
    >
        <a href="/Login">تسجيل دخول</a>
    </button>
      </div>
  </div>
);

export default Done;