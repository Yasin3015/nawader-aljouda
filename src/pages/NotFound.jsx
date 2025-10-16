import { Link } from 'react-router-dom';
import $404Image from '../assets/images/404.svg';
const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <img src={$404Image} alt="" />
      <h2 className="text-2xl md:text-3xl font-semibold text-center mt-8">
        Oops! page not found
      </h2>
      
      <p className="text-gray-600 text-center mt-4 max-w-md">
        It somewhat so better or explicitly. Another consequatur peruri and tempo
      </p>

      <Link 
        to="/"
        className="mt-8 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;