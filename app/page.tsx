import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center">
          {/* Hero Image Placeholder */}
          <div className="w-full max-w-4xl mb-12 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 aspect-video flex items-center justify-center">
            <div className="text-white p-8">
              <svg
                className="w-32 h-32 mx-auto mb-4 opacity-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p className="text-2xl font-bold">專業設計 · 完美呈現</p>
              <p className="text-xl mt-2">Professional Design · Perfect Presentation</p>
            </div>
          </div>

          {/* Main Heading - Traditional Chinese */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            打造您的專屬頁面
          </h1>

          {/* Main Heading - English */}
          <h2 className="text-3xl md:text-5xl font-bold text-gray-700 dark:text-gray-300 mb-8 leading-tight">
            Create Your Perfect Landing Page
          </h2>

          {/* Description */}
          <div className="max-w-3xl space-y-6 text-lg md:text-xl text-gray-700 dark:text-gray-300">
            {/* Traditional Chinese */}
            <p className="leading-relaxed">
              我們專門協助客戶設計與架設高品質的著陸頁面與產品頁面。
              <br />
              無論您是新創公司、個人品牌，還是成熟企業，
              <br />
              我們都能為您量身打造專業且吸引人的網頁解決方案。
            </p>

            {/* English */}
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              We help customers design and host their landing pages and product pages.
              <br />
              Whether you're a startup, personal brand, or established business,
              <br />
              we create professional and engaging web solutions tailored to your needs.
            </p>
          </div>

          {/* Services Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-5xl">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">客製化設計</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">Custom Design</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                符合品牌形象的獨特設計
                <br />
                Unique designs that match your brand
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">快速部署</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">Fast Deployment</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                專業託管服務，即刻上線
                <br />
                Professional hosting, launch immediately
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">響應式設計</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">Responsive Design</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                完美適配所有裝置
                <br />
                Perfect on all devices
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-10 rounded-2xl shadow-2xl max-w-3xl w-full">
            <h3 className="text-3xl font-bold mb-4">對我們的服務感興趣？</h3>
            <p className="text-2xl mb-6">Interested in our services?</p>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-4">
              <p className="text-lg mb-2 font-semibold">聯絡我們 | Contact Us</p>
              <a
                href="mailto:takaocybercorner@gmail.com"
                className="text-2xl font-bold hover:text-yellow-300 transition-colors inline-flex items-center gap-2"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                takaocybercorner@gmail.com
              </a>
            </div>

            <p className="text-sm opacity-90">
              我們會盡快回覆您的詢問
              <br />
              We'll respond to your inquiry as soon as possible
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm">
          © 2025 Takao Cyber Corner | 高雄賽博角落
        </p>
      </footer>
    </main>
  )
}
