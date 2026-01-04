'use client';

import { useEffect, useState } from 'react';

interface Product {
    slug: string;
    title: string;
    subtitle: string;
    heroImage: string;
    description: string;
    category: string;
    ctaText: string;
    ctaLink: string;
    price: string;
    regularPrice: string;
    themeColor: string;
    tag: string;
    qty: string;
    img1: string;
    img2: string;
    img3: string;
    spec: string;
    reviewerName: string;
    reviewerEmail: string;
    reviewerComment: string;
    reviewerScore: string;
}

export default function ProductGrid() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedTitle, setSelectedTitle] = useState<string>('');
    const [selectedSlug, setSelectedSlug] = useState<string>('');

    useEffect(() => {
        // Fetch products from API route
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    const handleImageClick = (image: string, title: string, slug: string) => {
        setSelectedImage(image);
        setSelectedTitle(title);
        setSelectedSlug(slug);
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedImage(null);
        setSelectedTitle('');
        setSelectedSlug('');
        // Re-enable body scroll
        document.body.style.overflow = 'auto';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Header Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <img
                            src="/Oshare_logo.png"
                            alt="OSHARE"
                            className="h-16 sm:h-20 lg:h-24 w-auto"
                        />
                    </div>
                    <p className="text-lg text-gray-600">
                        "Browse our selection of modern lifestyle goods."
                    </p>
                </div>
            </section>

            {/* Product Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {products.map((product) => (
                        <div
                            key={product.slug}
                            className="group cursor-pointer"
                            onClick={() => product.heroImage && handleImageClick(product.heroImage, product.title, product.slug)}
                        >
                            {/* Product Image */}
                            <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square mb-3">
                                {product.heroImage ? (
                                    <img
                                        src={product.heroImage}
                                        alt={product.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Product Name */}
                            <h3 className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                                {product.title}
                            </h3>

                            {/* Optional: Price */}
                            {product.price && (
                                <p className="text-sm text-gray-600 mt-1">
                                    NT${product.price}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 animate-fadeIn"
                    onClick={closeModal}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                        onClick={closeModal}
                        aria-label="Close modal"
                    >
                        <svg
                            className="w-8 h-8 sm:w-10 sm:h-10"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    {/* Modal Content */}
                    <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-white rounded-lg overflow-hidden">
                            <img
                                src={selectedImage}
                                alt={selectedTitle}
                                className="w-full h-auto max-h-[80vh] object-contain"
                            />
                            {selectedTitle && (
                                <div className="p-4 sm:p-6 bg-white flex justify-between items-center">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                        {selectedTitle}
                                    </h2>
                                    {selectedSlug && (
                                        <a
                                            href={`/oshare/${selectedSlug}`}
                                            className="text-sm sm:text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors whitespace-nowrap ml-4"
                                        >
                                            查看產品詳情 ➡️
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="text-center space-y-6">
                    <a
                        href="https://line.me/R/ti/p/@014wgqai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white rounded-full transition-all duration-200 hover:opacity-90"
                        style={{ backgroundColor: '#15803d' }}
                    >
                        透過官方 Line 聯絡我們
                    </a>

                    {/* QR Code */}
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-32 h-32 rounded-lg overflow-hidden">
                            <img
                                src="/L_oshare_2dbarcodes_BW.png"
                                alt="官方 LINE QR CODE"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <p className="text-sm text-gray-600">官方 LINE ID: @014wgqai</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
