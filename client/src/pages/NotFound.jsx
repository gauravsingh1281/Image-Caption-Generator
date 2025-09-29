import { useNavigate } from "react-router";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto text-center">
                {/* 404 Animation */}
                <div className="mb-8">
                    <div className="relative">
                        <h1 className="text-9xl font-bold text-indigo-600 opacity-20 select-none">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center animate-pulse">
                                <svg
                                    className="w-16 h-16 text-indigo-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-lg text-gray-600 mb-2">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <p className="text-gray-500">
                        Don't worry, it happens to the best of us!
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Go Back</span>
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="w-full sm:w-auto border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>Go Home</span>
                    </button>
                </div>

                {/* Helpful Links */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-4">
                        Maybe you're looking for one of these?
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <button
                            onClick={() => navigate('/login')}
                            className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200"
                        >
                            Login Page
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200"
                        >
                            Register Page
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => navigate('/uploadImage')}
                            className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200"
                        >
                            Upload Image
                        </button>
                    </div>
                </div>

                {/* Fun Element */}
                <div className="mt-8">
                    <div className="flex items-center justify-center space-x-2 text-gray-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">Lost but not forgotten</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;