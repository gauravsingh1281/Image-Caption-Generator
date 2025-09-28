import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUserImages, clearError, logout } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    // Get images from user data
    const images = user?.uploadedImage || [];

    // Filter images based on search term
    const filteredImages = images.filter(image =>
        image.caption?.toLowerCase().includes(searchTerm.toLowerCase())
    );



    useEffect(() => {
        const fetchAllImage = async () => {
            try {
                await dispatch(getUserImages()).unwrap();
            } catch (error) {
                toast.error("Failed to load images");
                console.log(error);
            }
        };

        dispatch(clearError());
        fetchAllImage();
    }, [dispatch]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap();
            toast.success("Logged out successfully!");
            navigate("/login");
        } catch (error) {
            toast.error("Failed to logout");
            console.log("Logout error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Gallery</h1>
                            <p className="text-gray-600 mt-1">
                                {images.length} {images.length === 1 ? 'image' : 'images'} with AI-generated captions
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate("/uploadImage")}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 shadow-sm"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span>Upload New Image</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 shadow-sm"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search Bar */}
                {images.length > 0 && (
                    <div className="mb-8">
                        <div className="relative max-w-md mx-auto">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search by caption..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                )}

                {/* Error Display */}
                {error && (
                    <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex">
                            <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <p className="ml-3 text-sm text-red-800">{error}</p>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        <span className="ml-3 text-gray-600">Loading your images...</span>
                    </div>
                )}

                {/* Empty State */}
                {!loading && images.length === 0 && (
                    <div className="text-center py-16">
                        <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No images yet</h3>
                        <p className="text-gray-600 mb-6">Start building your gallery by uploading your first image</p>
                        <button
                            onClick={() => navigate("/uploadImage")}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                        >
                            Upload Your First Image
                        </button>
                    </div>
                )}

                {/* No Search Results */}
                {!loading && images.length > 0 && filteredImages.length === 0 && searchTerm && (
                    <div className="text-center py-12">
                        <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                        <p className="text-gray-600">Try searching with different keywords</p>
                    </div>
                )}

                {/* Image Grid */}
                {!loading && filteredImages.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredImages.map((image, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
                                onClick={() => handleImageClick(image)}
                            >
                                <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
                                    <img
                                        src={image.imageUrl}
                                        alt={`Image ${idx + 1}`}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        loading="lazy"
                                    />

                                </div>
                                <div className="p-4">
                                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                                        {image.caption || "No caption available"}
                                    </p>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-xs text-gray-500">
                                            Click to view details
                                        </span>
                                        <svg className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Image Modal */}
                {selectedImage && (
                    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-screen overflow-hidden">
                            <div className="flex justify-between items-center p-6 border-b">
                                <h3 className="text-lg font-semibold text-gray-900">Image Details</h3>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div>
                                        <img
                                            src={selectedImage.imageUrl}
                                            alt="Selected image"
                                            className="w-full h-auto rounded-lg shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-900 mb-4">AI-Generated Caption</h4>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-gray-700 leading-relaxed">
                                                {selectedImage.caption || "No caption available"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard;