import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Home = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    // Redirect to dashboard if user is already logged in
    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-gray-900">CaptionAI</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate("/login")}
                                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate("/register")}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10"></div>
                <div className="relative max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center">
                        {/* Left Content */}
                        <div className="text-center lg:text-left">
                            <div className="mb-6">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-4">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Powered by Google Gemini AI
                                </span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Transform Images Into
                                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block">
                                    Captivating Stories
                                </span>
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                                Create personalized, multi-language captions with customizable tones.
                                Our advanced AI understands context and generates human-like descriptions
                                for any image in seconds.
                            </p>

                            {/* Key Features Highlights */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                                <span className="inline-flex items-center px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm border">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    7 Tone Styles
                                </span>
                                <span className="inline-flex items-center px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm border">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    10+ Languages
                                </span>
                                <span className="inline-flex items-center px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm border">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                    Custom Context
                                </span>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button
                                    onClick={() => navigate("/register")}
                                    className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    <span className="flex items-center justify-center">
                                        Start Creating Captions
                                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </button>
                                <button
                                    onClick={() => navigate("/login")}
                                    className="border-2 border-gray-300 hover:border-indigo-600 text-gray-700 hover:text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 bg-white hover:bg-gray-50"
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>

                        {/* Right Content - Interactive Demo */}
                        <div className="relative">
                            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                                {/* Demo Image */}
                                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20"></div>
                                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>

                                {/* Customization Options Preview */}
                                <div className="space-y-3 mb-4">
                                    <div className="flex gap-2">
                                        <select className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50">
                                            <option >Creative Tone</option>
                                        </select>
                                        <select className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50">
                                            <option>English</option>
                                        </select>
                                    </div>
                                    <textarea
                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 resize-none"
                                        rows="2"
                                        placeholder="Add context..."
                                        readOnly
                                    ></textarea>
                                </div>

                                {/* Generated Caption */}
                                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border-l-4 border-indigo-500">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900 mb-1">AI Generated Caption:</p>
                                            <p className="text-sm text-gray-700">"A breathtaking sunset paints the sky in vibrant hues of orange and purple, creating a magical moment of natural artistry."</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
                            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-4">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            Advanced AI Capabilities
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Powerful Features That Set Us Apart
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                            Experience the next generation of AI-powered image captioning with unprecedented customization and accuracy
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-16">
                        {/* Feature 1 - Customizable Tones */}
                        <div className="group relative p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-200">
                            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">7 Customizable Tones</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Choose from Formal, Casual, Creative, Humorous, Professional, Poetic, or Neutral tones to match your content perfectly.
                            </p>
                            <div className="flex flex-wrap gap-1">
                                {['Formal', 'Creative', 'Humorous'].map((tone) => (
                                    <span key={tone} className="px-2 py-1 bg-white/70 text-xs font-medium text-indigo-700 rounded-md">{tone}</span>
                                ))}
                                <span className="px-2 py-1 bg-white/70 text-xs font-medium text-gray-500 rounded-md">+4 more</span>
                            </div>
                        </div>

                        {/* Feature 2 - Multi-Language */}
                        <div className="group relative p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 hover:shadow-2xl transition-all duration-300 border border-emerald-100 hover:border-emerald-200">
                            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-Language Support</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Generate captions in 10+ languages including English, Spanish, French, German, Chinese, Japanese, and more.
                            </p>
                            <div className="flex flex-wrap gap-1">
                                {[
                                    { name: 'English', icon: 'US' },
                                    { name: 'Spanish', icon: 'ES' },
                                    { name: 'French', icon: 'FR' }
                                ].map((lang) => (
                                    <span key={lang.name} className="px-2 py-1 bg-white/70 text-xs font-medium text-emerald-700 rounded-md flex items-center">
                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                        </svg>
                                        {lang.name}
                                    </span>
                                ))}
                                <span className="px-2 py-1 bg-white/70 text-xs font-medium text-gray-500 rounded-md">+7 more</span>
                            </div>
                        </div>

                        {/* Feature 3 - Context Awareness */}
                        <div className="group relative p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 hover:shadow-2xl transition-all duration-300 border border-purple-100 hover:border-purple-200">
                            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Context Understanding</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Add custom context to help AI understand your specific needs and generate more accurate, relevant captions.
                            </p>
                            <div className="flex flex-wrap gap-1">
                                <span className="px-2 py-1 bg-white/70 text-xs font-medium text-purple-700 rounded-md">Business</span>
                                <span className="px-2 py-1 bg-white/70 text-xs font-medium text-purple-700 rounded-md">Social Media</span>
                                <span className="px-2 py-1 bg-white/70 text-xs font-medium text-purple-700 rounded-md">Academic</span>
                            </div>
                        </div>

                        {/* Feature 4 - Lightning Fast */}
                        <div className="group relative p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 hover:shadow-2xl transition-all duration-300 border border-yellow-100 hover:border-yellow-200">
                            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast Processing</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Get your customized captions in seconds with our optimized Google Gemini AI integration and efficient processing pipeline.
                            </p>
                            <div className="flex items-center text-sm text-orange-600 font-medium">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                Average: 2-3 seconds
                            </div>
                        </div>

                        {/* Feature 5 - Secure & Private */}
                        <div className="group relative p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200">
                            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-gray-400 to-slate-500 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            <div className="w-14 h-14 bg-gradient-to-br from-gray-600 to-slate-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Private</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Your images and data are processed securely with enterprise-grade encryption and privacy protection.
                            </p>
                            <div className="flex items-center text-sm text-gray-600 font-medium">
                                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                SOC 2 Compliant
                            </div>
                        </div>

                        {/* Feature 6 - Easy Management */}
                        <div className="group relative p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 hover:shadow-2xl transition-all duration-300 border border-cyan-100 hover:border-cyan-200">
                            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Gallery Management</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Organize, view, and manage your captioned images with our intuitive gallery system and easy delete functionality.
                            </p>
                            <div className="flex items-center text-sm text-cyan-600 font-medium">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                </svg>
                                Cloud Storage Included
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 mb-4">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Simple 4-Step Process
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            From Image to Perfect Caption
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                            Our intuitive workflow makes it easy to create personalized captions that match your exact needs
                        </p>
                    </div>

                    <div className="relative">

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
                            {/* Step 1 */}
                            <div className="text-center group">
                                <div className="relative mx-auto mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        1
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Upload Your Image</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Drag & drop or click to upload any image. Supports JPG, PNG, GIF up to 5MB.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="text-center group">
                                <div className="relative mx-auto mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                                        </svg>
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        2
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Customize Your Style</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Choose tone, language, and add context to personalize your caption style.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="text-center group">
                                <div className="relative mx-auto mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        3
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">AI Magic Happens</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Google Gemini AI analyzes your image and generates a customized caption in seconds.
                                </p>
                            </div>

                            {/* Step 4 */}
                            <div className="text-center group">
                                <div className="relative mx-auto mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                        </svg>
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        4
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Save & Manage</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Get your perfect caption and save it to your personal gallery for easy access.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Demo CTA */}
                    <div className="text-center mt-16">
                        <div className="inline-flex items-center justify-center p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-4-8V4a2 2 0 012-2h2a2 2 0 012 2v2M8 18h8" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to try it yourself?</h3>
                                <p className="text-gray-600 mb-4">Experience the magic of AI-powered captions</p>
                                <button
                                    onClick={() => navigate("/register")}
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    Start Creating Now →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            Trusted by Content Creators
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                            What Our Users Say
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4 italic">
                                "The multi-language feature is incredible! I can create captions in Spanish for my international audience. The creative tone option makes my social media posts stand out."
                            </p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                    M
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Maria Rodriguez</p>
                                    <p className="text-sm text-gray-600">Social Media Manager</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4 italic">
                                "As a professional photographer, I need formal captions for client galleries. The professional tone and context features help me create perfect descriptions every time."
                            </p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                    D
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">David Chen</p>
                                    <p className="text-sm text-gray-600">Professional Photographer</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4 italic">
                                "The speed is amazing! I can process dozens of images for my blog in minutes. The humorous tone option adds personality to my travel photos."
                            </p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                    S
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Sarah Johnson</p>
                                    <p className="text-sm text-gray-600">Travel Blogger</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="mb-8">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 text-white/90 backdrop-blur-sm mb-6">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Join 10,000+ Happy Users
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                            Ready to Transform Your Images Into Stories?
                        </h2>
                        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Start creating personalized, multi-language captions with AI in seconds. No credit card required.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <button
                            onClick={() => navigate("/register")}
                            className="group bg-white text-gray-900 hover:bg-gray-50 px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-2xl hover:shadow-xl transform hover:-translate-y-1 flex items-center"
                        >
                            <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Start Free Now
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                        <div className="flex items-center text-white/80 text-sm">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Free • No signup required to try • Instant results
                        </div>
                    </div>

                    {/* Feature highlights */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-white/80 text-sm">
                        <div className="flex items-center justify-center">
                            <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            7 Tone Styles
                        </div>
                        <div className="flex items-center justify-center">
                            <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            10+ Languages
                        </div>
                        <div className="flex items-center justify-center">
                            <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Lightning Fast
                        </div>
                        <div className="flex items-center justify-center">
                            <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Secure & Private
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        {/* Brand Column */}
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">CaptionAI</span>
                            </div>
                            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                                Transform your images into compelling stories with our advanced AI technology.
                                Create personalized captions in multiple languages with customizable tones.
                            </p>
                            <div className="flex space-x-4">
                                <div className="flex items-center text-sm text-gray-400">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                    Powered by Google Gemini AI
                                </div>
                            </div>
                        </div>

                        {/* Product Column */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
                            <ul className="space-y-3 text-gray-400">
                                <li>
                                    <button
                                        onClick={() => navigate("/register")}
                                        className="hover:text-indigo-400 transition-colors cursor-pointer"
                                    >
                                        Get Started
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => navigate("/login")}
                                        className="hover:text-indigo-400 transition-colors cursor-pointer"
                                    >
                                        Sign In
                                    </button>
                                </li>
                                <li><span className="hover:text-indigo-400 transition-colors cursor-pointer">Features</span></li>
                                <li><span className="hover:text-indigo-400 transition-colors cursor-pointer">Pricing</span></li>
                            </ul>
                        </div>

                        {/* Features Column */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-white">Features</h3>
                            <ul className="space-y-3 text-gray-400">
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    7 Tone Styles
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Multi-Language
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Context Aware
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Smart Gallery
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="border-t border-gray-800 pt-8 mb-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div>
                                <div className="text-2xl font-bold text-white mb-1">10,000+</div>
                                <div className="text-sm text-gray-400">Happy Users</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white mb-1">500K+</div>
                                <div className="text-sm text-gray-400">Captions Generated</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white mb-1">10+</div>
                                <div className="text-sm text-gray-400">Languages</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white mb-1">2.5s</div>
                                <div className="text-sm text-gray-400">Avg. Processing</div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm mb-4 md:mb-0">
                            © 2025 CaptionAI. All rights reserved. Powered by artificial intelligence.
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                            <span className="hover:text-indigo-400 transition-colors cursor-pointer">Privacy Policy</span>
                            <span className="hover:text-indigo-400 transition-colors cursor-pointer">Terms of Service</span>
                            <span className="hover:text-indigo-400 transition-colors cursor-pointer">Support</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home;