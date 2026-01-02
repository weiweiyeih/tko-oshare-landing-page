import { getLandingPages } from "@/lib/googleSheet";
import { notFound } from "next/navigation";

// Revalidate every 60 seconds (1 minute)
export const revalidate = 60;

export async function generateStaticParams() {
    const pages = await getLandingPages();
    return pages.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const pages = await getLandingPages();
    const page = pages.find(p => p.slug === slug);

    if (!page) {
        return {
            title: 'Page Not Found',
            description: 'The page you are looking for does not exist.',
        };
    }

    return {
        title: page.title,
        description: page.subtitle,
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const pages = await getLandingPages();
    const page = pages.find(p => p.slug === slug);

    if (!page) return notFound();

    const reviewScore = parseInt(page.reviewerScore) || 5;
    const buttonColor = page.themeColor || '#15803d'; // Default to green-700 if no theme color

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Product Image */}
                    <div className="relative">
                        <div className="bg-gray-100 rounded-3xl overflow-hidden aspect-square">
                            <img
                                src={page.heroImage}
                                alt={page.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            {/* Tag Badge */}
                            {page.tag && (
                                <div className="mb-3">
                                    <span
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border-2"
                                        style={{
                                            borderColor: buttonColor,
                                            color: buttonColor,
                                        }}
                                    >
                                        {page.tag}
                                    </span>
                                </div>
                            )}

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                                {page.title}
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                                {page.subtitle}
                            </p>
                        </div>

                        {page.price && (
                            <div className="flex items-center gap-3">
                                <div className="text-3xl sm:text-4xl font-bold text-black">
                                    NT${page.price}
                                </div>
                                {page.regularPrice && (
                                    <div className="flex flex-col">
                                        <div className="text-xs sm:text-sm text-gray-400 line-through">
                                            NT${page.regularPrice}
                                        </div>
                                        <div className="text-xs sm:text-sm text-red-600 font-semibold">
                                            Save NT${(parseFloat(page.regularPrice) - parseFloat(page.price))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Quantity in Stock */}
                        {page.qty && (
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                <span className="text-sm text-gray-600">
                                    尚有 <span className="font-semibold text-gray-900">{page.qty}</span> 庫存
                                </span>
                            </div>
                        )}

                        {/* CTA Button */}
                        <div>
                            <a
                                href={page.ctaLink}
                                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white rounded-full transition-all duration-200 hover:opacity-90"
                                style={{ backgroundColor: buttonColor }}
                            >
                                {page.ctaText}
                            </a>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2">
                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" style={{ color: buttonColor }}>
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-lg font-medium text-gray-700">品質保證</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" style={{ color: buttonColor }}>
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-lg font-medium text-gray-700">台灣發貨</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" style={{ color: buttonColor }}>
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-lg font-medium text-gray-700">快速出貨</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Details Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">商品詳情</h2>

                <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {page.description}
                    </p>
                </div>
            </section>

            {/* Customer Reviews Section */}
            {page.reviewerName && (
                <section className="bg-gray-900 py-12 lg:py-16 mt-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">消費者評價</h2>

                        <div className="bg-gray-800 rounded-2xl p-6 sm:p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-semibold text-lg">
                                            {page.reviewerName.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-semibold text-lg">{page.reviewerName}</h3>
                                    <p className="text-gray-400 text-sm">{page.reviewerEmail}</p>
                                </div>
                            </div>

                            <p className="text-gray-300 leading-relaxed mb-4">
                                {page.reviewerComment}
                            </p>

                            {/* Star Rating */}
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, index) => (
                                    <svg
                                        key={index}
                                        className={`w-5 h-5 ${index < reviewScore ? 'text-yellow-400' : 'text-gray-600'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Three Images Row */}
            {(page.img1 || page.img2 || page.img3) && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {page.img1 && (
                            <div className="rounded-xl overflow-hidden bg-gray-100 aspect-square">
                                <img
                                    src={page.img1}
                                    alt="Product image 1"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        )}
                        {page.img2 && (
                            <div className="rounded-xl overflow-hidden bg-gray-100 aspect-square">
                                <img
                                    src={page.img2}
                                    alt="Product image 2"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        )}
                        {page.img3 && (
                            <div className="rounded-xl overflow-hidden bg-gray-100 aspect-square">
                                <img
                                    src={page.img3}
                                    alt="Product image 3"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Bottom CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="text-center space-y-6">
                    <a
                        href={page.ctaLink}
                        className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white rounded-full transition-all duration-200 hover:opacity-90"
                        style={{ backgroundColor: buttonColor }}
                    >
                        {page.ctaText}
                    </a>

                    {/* QR Code Placeholder */}
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400">
                            <div className="text-center">
                                <svg className="w-12 h-12 mx-auto text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                </svg>
                                <p className="text-xs text-gray-500">QR Code</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">官方 LINE QR CODE</p>
                    </div>

                    <div>
                        <a
                            href="/oshare/products"
                            className="inline-flex items-center text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            查看全部商品
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
