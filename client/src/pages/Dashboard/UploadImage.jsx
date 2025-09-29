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

        // Add caption customization parameters
        formData.append('tone', data.tone || 'neutral');
        formData.append('language', data.language || 'english');
        formData.append('additionalInfo', data.additionalInfo || '');

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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50">
            {/* Navigation */}
            <nav className="bg-white/90 backdrop-blur-lg shadow-sm border-b border-gray-100/50 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">CaptionAI</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="group flex items-center space-x-2 text-gray-600 hover:text-indigo-600 font-medium transition-all duration-200 px-4 py-2 rounded-lg hover:bg-indigo-50"
                            >
                                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>Back to Gallery</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header Section */}
            <div className="relative overflow-hidden py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="mb-6">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 mb-4">
                            🚀 Powered by Google Gemini AI
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Create Your Perfect
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block">
                            AI Caption
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                        Upload your image and customize every detail - from tone and language to specific context.
                        Our advanced AI creates personalized captions that perfectly match your vision.
                    </p>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
                        <div className="flex items-center text-gray-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                            <span className="font-medium">7 Tone Styles</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                            <span className="font-medium">10+ Languages</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                            <span className="font-medium">Lightning Fast</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">

                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                        {/* Form Header */}
                        <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 px-6 sm:px-8 py-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">Upload & Customize</h2>
                                        <p className="text-sm text-gray-600">Create your personalized AI caption</p>
                                    </div>
                                </div>
                                <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-500">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                                        Secure
                                    </div>
                                    <span>•</span>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                                        Fast
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(handleUpload)} className="p-6 sm:p-8 space-y-8">
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

                            {/* Caption Customization Options */}
                            <div className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 rounded-xl p-6 border border-gray-200/50 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        Customize Your Caption
                                    </h3>
                                    <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-500">
                                        <span className="bg-white/70 px-2 py-1 rounded-md">Optional</span>
                                        <span className="bg-white/70 px-2 py-1 rounded-md">AI Enhanced</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Tone Selection */}
                                    <div className="space-y-2">
                                        <label htmlFor="tone" className="flex items-center text-sm font-bold text-gray-900">
                                            <svg className="w-4 h-4 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                                            </svg>
                                            Caption Tone
                                        </label>
                                        <select
                                            {...register("tone")}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all duration-200 hover:border-indigo-300"
                                        >
                                            <option value="neutral">🎯 Neutral</option>
                                            <option value="formal">👔 Formal</option>
                                            <option value="casual">😊 Casual</option>
                                            <option value="creative">🎨 Creative</option>
                                            <option value="humorous">😄 Humorous</option>
                                            <option value="professional">💼 Professional</option>
                                            <option value="poetic">🌟 Poetic</option>
                                        </select>
                                    </div>

                                    {/* Language Selection */}
                                    <div className="space-y-2">
                                        <label htmlFor="language" className="flex items-center text-sm font-bold text-gray-900">
                                            <svg className="w-4 h-4 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                            </svg>
                                            Language
                                        </label>
                                        <select
                                            {...register("language")}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all duration-200 hover:border-indigo-300"
                                        >
                                            <option value="english">🇺🇸 English</option>
                                            <option value="spanish">🇪🇸 Spanish</option>
                                            <option value="french">🇫🇷 French</option>
                                            <option value="german">🇩🇪 German</option>
                                            <option value="italian">🇮🇹 Italian</option>
                                            <option value="portuguese">🇵🇹 Portuguese</option>
                                            <option value="chinese">🇨🇳 Chinese</option>
                                            <option value="japanese">🇯🇵 Japanese</option>
                                            <option value="korean">🇰🇷 Korean</option>
                                            <option value="hindi">🇮🇳 Hindi</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Additional Information */}
                                <div className="space-y-2">
                                    <label htmlFor="additionalInfo" className="flex items-center text-sm font-bold text-gray-900">
                                        <svg className="w-4 h-4 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                        Additional Context
                                        <span className="ml-2 text-xs text-gray-500 font-normal">(Optional)</span>
                                    </label>
                                    <textarea
                                        {...register("additionalInfo")}
                                        placeholder="Help AI understand your needs better... e.g., 'This is for a business presentation' or 'Focus on the architectural details'"
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none bg-white transition-all duration-200 hover:border-indigo-300"
                                    />
                                    <div className="flex items-start space-x-2 text-xs text-gray-500">
                                        <svg className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <p className="mb-1">💡 <strong>Pro Tips:</strong></p>
                                            <ul className="space-y-1 list-disc list-inside ml-2">
                                                <li>"For social media" → More engaging style</li>
                                                <li>"Professional portfolio" → Formal description</li>
                                                <li>"Focus on emotions" → Emotional elements highlighted</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

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
                            <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 p-6 rounded-xl border border-gray-100">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`group w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-white font-bold text-lg transition-all duration-300 transform ${loading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-2xl hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-200'
                                        }`}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Generating Your Perfect Caption...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            <span>Generate AI Caption</span>
                                            <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </>
                                    )}
                                </button>

                                {/* Quick stats below button */}
                                <div className="flex justify-center items-center mt-4 space-x-6 text-xs text-gray-500">
                                    <div className="flex items-center">
                                        <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span>2-3 sec processing</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-3 h-3 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                        <span>Secure & Private</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-3 h-3 text-purple-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>AI Powered</span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Feature Info */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="text-indigo-600 text-2xl mb-2">🤖</div>
                            <h3 className="font-medium text-gray-900">AI Powered</h3>
                            <p className="text-sm text-gray-600">Advanced Gemini AI</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="text-indigo-600 text-2xl mb-2">🎨</div>
                            <h3 className="font-medium text-gray-900">Customizable Tone</h3>
                            <p className="text-sm text-gray-600">7 different styles</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="text-indigo-600 text-2xl mb-2">🌍</div>
                            <h3 className="font-medium text-gray-900">Multi-Language</h3>
                            <p className="text-sm text-gray-600">10+ languages supported</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="text-indigo-600 text-2xl mb-2">🔒</div>
                            <h3 className="font-medium text-gray-900">Secure</h3>
                            <p className="text-sm text-gray-600">Your images are safe</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadImage;