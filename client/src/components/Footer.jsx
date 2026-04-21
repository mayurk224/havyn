import React from 'react'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <footer className="w-full bg-[#0f0f0f] text-white pt-20 pb-10 px-4 sm:px-6 lg:px-8 mt-24">
        <div className="max-w-7xl mx-auto">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row justify-between gap-16 mb-20">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <h2 className="text-5xl font-black tracking-tighter hover:scale-105 transition-transform cursor-pointer">
                Havyn<span className="text-primary">.</span>
              </h2>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full lg:max-w-4xl">
              {/* Column 1 */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold tracking-tight text-white/90">
                  Shop
                </h3>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Outerwear
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Longerwear
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Bottom
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      All
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 2 */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold tracking-tight text-white/90">
                  Customer
                </h3>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Partnership
                    </a>
                  </li>
                  <li>
                    <Link
                      to="/seller/onboarding"
                      className="text-sm text-zinc-500 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Become Seller
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Providing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Affiliate
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3 */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold tracking-tight text-white/90">
                  Connect
                </h3>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      X (Twitter)
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 4 */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold tracking-tight text-white/90">
                  Security
                </h3>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Cookies
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Payment
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-sm text-zinc-500 font-medium">
              &copy; 2026 Havyn. All Rights Reserved.
            </p>
            <div className="flex gap-10">
              <a
                href="#"
                className="text-sm text-zinc-500 hover:text-white transition-all duration-300 underline underline-offset-8 decoration-transparent hover:decoration-white/20"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-zinc-500 hover:text-white transition-all duration-300 underline underline-offset-8 decoration-transparent hover:decoration-white/20"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer