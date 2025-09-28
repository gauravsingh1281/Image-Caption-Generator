import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { uploadImageAndGenerateCaption, clearError } from "../../features/auth/authSlice";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const UploadImage = () => {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);
    const [dragActive, setDragActive] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    const watchedImage = watch("image");

    // Clear errors when component mounts
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    // Handle image preview
    useEffect(() => {
        if (watchedImage && watchedImage[0]) {
            const file = watchedImage[0];
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);

            // Cleanup URL when component unmounts
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl(null);
        }
    }, [watchedImage]);

    const handleUpload = async (data) => {
        if (!data.image || data.image.length === 0) {
            toast.error('Please select an image file');
            return;
        }

        const file = data.image[0];

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select a valid image file');
            return;
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size must be less than 5MB');
            return;
        }

        const formData = new FormData();
        formData.append('imageFile', file);

        try {
            await dispatch(uploadImageAndGenerateCaption(formData)).unwrap();
            toast.success('Caption generated successfully!');
            reset();
            setPreviewUrl(null);

            // Show redirect message and redirect to dashboard
            toast.info('Redirecting to dashboard...', { autoClose: 1500 });
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000); // 2 second delay to show success message
        } catch (error) {
            // Error is handled by Redux state
            console.log("Failed to upload image and generate caption", error);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                // Create a new FileList-like object
                const dt = new DataTransfer();
                dt.items.add(file);
                document.querySelector('input[type="file"]').files = dt.files;

                // Trigger form validation
                const event = new Event('change', { bubbles: true });
                document.querySelector('input[type="file"]').dispatchEvent(event);
            } else {
                toast.error('Please drop a valid image file');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Back to Dashboard Button */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="font-medium">Back to Dashboard</span>
                    </button>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        AI Image Caption Generator
                    </h1>
                    <p className="text-lg text-gray-600">
                        Upload an image and let AI generate a detailed caption for you
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleSubmit(handleUpload)} className="space-y-6">
                        {/* Error Display */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-red-800">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* File Upload Area */}
                        <div
                            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${dragActive
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-gray-300 hover:border-indigo-400'
                                }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                {...register("image", {
                                    required: "Please select an image file"
                                })}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />

                            {previewUrl ? (
                                <div className="space-y-4">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="mx-auto h-48 w-auto rounded-lg shadow-md"
                                    />
                                    <p className="text-sm text-gray-600">Click to change image</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <svg
                                        className="mx-auto h-16 w-16 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div>
                                        <p className="text-lg font-medium text-gray-900">
                                            Drag and drop your image here
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            or click to browse files
                                        </p>
                                        <p className="text-xs text-gray-500 mt-2">
                                            PNG, JPG, GIF up to 5MB
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Validation Error */}
                        {errors.image && (
                            <p className="text-sm text-red-600">{errors.image.message}</p>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium transition-all duration-200 ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating Caption...
                                </>
                            ) : (
                                'Generate Caption'
                            )}
                        </button>
                    </form>
                </div>

                {/* Feature Info */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-indigo-600 text-2xl mb-2">🤖</div>
                        <h3 className="font-medium text-gray-900">AI Powered</h3>
                        <p className="text-sm text-gray-600">Advanced AI technology</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-indigo-600 text-2xl mb-2">⚡</div>
                        <h3 className="font-medium text-gray-900">Fast Processing</h3>
                        <p className="text-sm text-gray-600">Quick caption generation</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-indigo-600 text-2xl mb-2">🔒</div>
                        <h3 className="font-medium text-gray-900">Secure</h3>
                        <p className="text-sm text-gray-600">Your images are safe</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadImage;