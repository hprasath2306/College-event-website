// src/pages/Moments.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Moment {
    id: number;
    imageUrl: string;
}

const Moments = () => {
    const [moments, setMoments] = useState<Moment[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [isUploading, setIsUploading] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch images on component mount
    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://symposium-api-production.up.railway.app/api/moments');
            setMoments(response.data);
        } catch (error) {
            console.error('Failed to fetch images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) return;
    
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', 'fest-moments');
        formData.append('tags', 'fest-moments');
    
        try {
            const uploadResponse = await axios.post(
                'https://api.cloudinary.com/v1_1/dyglppjr6/image/upload', 
                formData
            );
            
            if (uploadResponse.status === 200) {
                const imageUrl = uploadResponse.data.secure_url;
                await axios.post(
                    'https://symposium-api-production.up.railway.app/api/moments', 
                    { imageUrl }
                );
                
                setSelectedFile(null);
                setPreviewUrl('');
                setShowUploadModal(false);
                fetchImages();
            } else {
                console.error('Image upload failed:', uploadResponse.statusText);
            }
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setIsUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FF3366]"></div>
            </div>
          ); 
    }

    return (
        <div className="min-h-screen bg-[#121212] text-white">
            {/* Hero Section */}
            <section className="relative h-[40vh] flex items-center justify-center overflow-hidden mt-12">
                <div className="absolute inset-0 bg-gradient-to-r opacity-20"></div>
                <div className="relative text-center transform transition-all duration-1000">
                    <h1 className="text-5xl md:text-6xl font-['Righteous'] mb-4">
                        Fest Moments
                    </h1>
                    <p className="text-xl text-gray-300">
                        Share your favorite memories from FEST 2024 📸
                    </p>
                </div>
            </section>

            {/* Upload Button */}
            <div className="max-w-7xl mx-auto px-6 flex justify-center">
                <button
                    onClick={() => setShowUploadModal(true)}
                    className="bg-[#FF3366] text-white px-8 py-4 rounded-xl
                   hover:bg-[#ff1f57] transition-colors font-semibold
                   flex items-center gap-2"
                >
                    <i className="fas fa-camera"></i>
                    Share Your Moment
                </button>
            </div>

            {/* Moments Grid */}
            <section className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {moments.map((moment) => (
                        <div
                            key={moment.id}
                            className="bg-[#1a1a1a] rounded-xl overflow-hidden group hover:transform hover:scale-[1.02] transition-all duration-300"
                        >
                            <div className="relative aspect-square">
                                <img
                                    src={moment.imageUrl}
                                    alt="Moment"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                        onClick={() => setShowUploadModal(false)}
                    ></div>
                    <div className="relative bg-[#1a1a1a] rounded-xl p-8 max-w-md w-full m-4">
                        <button
                            onClick={() => setShowUploadModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <i className="fas fa-times"></i>
                        </button>

                        <h2 className="text-2xl font-['Righteous'] mb-6">Share Your Moment</h2>

                        <form onSubmit={handleUpload} className="space-y-4">
                            {/* Image Upload */}
                            <div className="relative border-2 border-dashed border-gray-600 rounded-xl p-4 text-center">
                                {previewUrl ? (
                                    <div className="relative aspect-square">
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedFile(null);
                                                setPreviewUrl('');
                                            }}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="py-8">
                                        <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                                        <p className="text-gray-400">Click or drag image to upload</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={!selectedFile || isUploading}
                                className="w-full bg-[#FF3366] text-white py-3 rounded-lg
                         hover:bg-[#ff1f57] transition-colors font-semibold
                         disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
                            >
                                {isUploading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-cloud-upload-alt"></i>
                                        Share Moment
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Moments;