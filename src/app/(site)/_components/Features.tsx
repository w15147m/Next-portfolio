import React from 'react';

export default function Features() {
  return (
    <section id="features"
      className="relative z-10 bg-[linear-gradient(180deg,rgba(242,244,247,0.00)_53.55%,#F2F4F7_101.85%)] py-16 md:py-24 lg:py-30">
      <div className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 w-full max-w-[880px] text-center lg:mb-15"><span
            className="mb-5 inline-block text-lg font-medium text-primary">Core Features</span>
          <h2 className="text-3xl font-bold !leading-[1.2] text-title-color dark:text-white/90 md:text-[40px]">Ultimate Tailwind Dashboard –
            Crafted for your favourite Tech Stack</h2>
        </div>
      </div>
      <div className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:gap-7.5">
          <div
            className="rounded-3xl border border-stroke-secondary dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-1 duration-200 hover:border-primary-200 hover:bg-primary-25 md:p-2">
            <div className="h-full rounded-2xl border border-[#F2F4F7] dark:border-gray-800 bg-white dark:bg-gray-900 dark:border-gray-800 p-4 md:p-6">
              <div className="mb-7.5 text-primary"><svg className="h-12 w-12" viewBox="0 0 50 50" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M36.4842 15.2946C34.0332 12.8405 31.1962 10 24.9999 10C20.9684 10 17.8512 11.2024 15.6482 13.6071C15.1867 14.1108 14.7653 14.6673 14.384 15.2766C14.0133 15.8691 13.6804 16.5115 13.3855 17.2039C13.34 17.3109 13.2953 17.4191 13.2515 17.5285C13.0492 18.0341 13.7435 18.4132 14.1477 18.0484C14.1894 18.0108 14.2311 17.9737 14.2729 17.9372C14.8374 17.4436 15.4203 17.0404 16.0216 16.7279C16.4724 16.4935 16.9335 16.31 17.405 16.1774C18.6183 15.8362 19.8999 15.8321 21.2499 16.165C23.1502 16.6331 24.5087 17.993 26.0119 19.4976L26.0156 19.5014C28.4666 21.9555 31.3036 24.7959 37.4999 24.7959C41.5314 24.7959 44.6486 23.5936 46.8516 21.1888C47.3131 20.6851 47.7345 20.1286 48.1158 19.5193C48.4865 18.9268 48.8194 18.2844 49.1143 17.5921C49.1598 17.485 49.2045 17.3768 49.2483 17.2674C49.4506 16.7618 48.7563 16.3827 48.3521 16.7475C48.3105 16.7851 48.2687 16.8222 48.2269 16.8587C47.6624 17.3524 47.0795 17.7555 46.4782 18.068C46.0274 18.3024 45.5663 18.4859 45.0948 18.6185C43.8815 18.9597 42.5999 18.9639 41.2499 18.631C39.3496 18.1628 37.9911 16.8029 36.4879 15.2984L36.4842 15.2946ZM39.5784 21.6553C39.7862 21.6253 39.8005 21.3313 39.6036 21.2586C37.3662 20.4323 35.7529 18.8119 34.5497 17.6033C34.4859 17.5393 34.4233 17.4764 34.3618 17.4149C33.1124 16.1639 32.0538 15.1245 30.6648 14.3355C29.3432 13.5848 27.5984 13 24.9999 13C24.2498 13 23.5585 13.0486 22.9214 13.1406C22.7136 13.1706 22.6993 13.4646 22.8962 13.5374C25.1336 14.3637 26.7469 15.984 27.9501 17.1926C28.0139 17.2566 28.0765 17.3195 28.138 17.3811C29.3874 18.632 30.446 19.6714 31.835 20.4604C33.1566 21.2111 34.9014 21.7959 37.4999 21.7959C38.25 21.7959 38.9413 21.7473 39.5784 21.6553ZM4.90497 30.9734C4.43352 31.1059 3.97241 31.2894 3.5216 31.5238C2.92035 31.8364 2.33744 32.2395 1.7729 32.7331C1.73107 32.7697 1.68935 32.8067 1.64773 32.8443C1.24345 33.2092 0.549207 32.83 0.751492 32.3244C0.795269 32.215 0.839953 32.1068 0.885543 31.9998C1.18044 31.3074 1.51327 30.665 1.88405 30.0725C2.2653 29.4633 2.68667 28.9068 3.14815 28.403C5.35119 25.9983 8.46844 24.7959 12.4999 24.7959C18.6962 24.7959 21.5332 27.6364 23.9842 30.0905L23.9879 30.0943C25.4911 31.5988 26.8496 32.9587 28.7499 33.4269C30.0999 33.7598 31.3815 33.7556 32.5948 33.4144C33.0663 33.2818 33.5274 33.0983 33.9782 32.864C34.5795 32.5514 35.1624 32.1483 35.7269 31.6547C35.7687 31.6181 35.8105 31.581 35.8521 31.5435C36.2563 31.1786 36.9506 31.5577 36.7483 32.0633C36.7045 32.1727 36.6598 32.281 36.6143 32.388C36.3194 33.0803 35.9865 33.7227 35.6158 34.3152C35.2345 34.9245 34.8131 35.481 34.3516 35.9847C32.1486 38.3895 29.0314 39.5918 24.9999 39.5918C18.8036 39.5918 15.9666 36.7514 13.5156 34.2973L13.5147 34.2964C12.0105 32.7906 10.6514 31.4302 8.7499 30.9609C7.39992 30.628 6.11827 30.6321 4.90497 30.9734ZM27.1036 36.0545C27.3005 36.1272 27.2862 36.4212 27.0784 36.4512C26.4413 36.5432 25.75 36.5918 24.9999 36.5918C22.4014 36.5918 20.6566 36.007 19.335 35.2563C17.946 34.4673 16.8877 33.4283 15.6383 32.1773C15.5774 32.1164 15.5151 32.0538 15.452 31.9904C14.2476 30.7807 12.6339 29.1602 10.3956 28.3333C10.1987 28.2606 10.2131 27.9666 10.4208 27.9366C11.0581 27.8446 11.7496 27.7959 12.4999 27.7959C15.0984 27.7959 16.8432 28.3807 18.1648 29.1314C19.5538 29.9204 20.6121 30.9594 21.8615 32.2104C21.9229 32.272 21.9859 32.3352 22.0497 32.3992C23.2529 33.6078 24.8662 35.2282 27.1036 36.0545Z"
                    fill="currentColor"></path>
                </svg></div>
              <h3 className="mb-4 text-xl font-semibold text-title-color dark:text-white/90 md:text-2xl lg:text-xl xl:text-2xl">Built-with
                Tailwind CSS</h3>
              <p className="text-base !leading-normal text-text-color dark:text-gray-300-secondary dark:text-gray-400">Meticulously crafted with Tailwind CSS to
                provide a highly composable and customizable foundation. Quickly build and adjust styles using concise,
                semantic, and human-readable utility classes.</p>
            </div>
          </div>
          <div
            className="rounded-3xl border border-stroke-secondary dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-1 duration-200 hover:border-primary-200 hover:bg-primary-25 md:p-2">
            <div className="h-full rounded-2xl border border-[#F2F4F7] dark:border-gray-800 bg-white dark:bg-gray-900 dark:border-gray-800 p-4 md:p-6">
              <div className="mb-7.5 text-primary"><svg className="h-12 w-12" viewBox="0 0 52 52" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M6.80884 12.48C6.80884 9.89536 8.90415 7.80005 11.4888 7.80005H18.7688C21.3536 7.80005 23.4488 9.89536 23.4488 12.48V39.5201C23.4488 42.1047 21.3536 44.2001 18.7688 44.2001H11.4888C8.90415 44.2001 6.80884 42.1047 6.80884 39.5201V12.48ZM11.4888 10.92C10.6273 10.92 9.92884 11.6185 9.92884 12.48V39.5201C9.92884 40.3816 10.6273 41.0801 11.4888 41.0801H18.7688C19.6304 41.0801 20.3288 40.3816 20.3288 39.5201V12.48C20.3288 11.6185 19.6304 10.92 18.7688 10.92H11.4888Z"
                    fill="currentColor"></path>
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M26.5686 12.48C26.5686 9.89536 28.664 7.80005 31.2486 7.80005H38.5286C41.1134 7.80005 43.2086 9.89536 43.2086 12.48V19.76C43.2086 22.3447 41.1134 24.44 38.5286 24.44H31.2486C28.664 24.44 26.5686 22.3447 26.5686 19.76V12.48ZM31.2486 10.92C30.3871 10.92 29.6886 11.6185 29.6886 12.48V19.76C29.6886 20.6216 30.3871 21.32 31.2486 21.32H38.5286C39.3903 21.32 40.0886 20.6216 40.0886 19.76V12.48C40.0886 11.6185 39.3903 10.92 38.5286 10.92H31.2486Z"
                    fill="currentColor"></path>
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M31.2486 27.5601C28.664 27.5601 26.5686 29.6555 26.5686 32.2401V39.5201C26.5686 42.1047 28.664 44.2001 31.2486 44.2001H38.5286C41.1134 44.2001 43.2086 42.1047 43.2086 39.5201V32.2401C43.2086 29.6555 41.1134 27.5601 38.5286 27.5601H31.2486ZM29.6886 32.2401C29.6886 31.3785 30.3871 30.6801 31.2486 30.6801H38.5286C39.3903 30.6801 40.0886 31.3785 40.0886 32.2401V39.5201C40.0886 40.3816 39.3903 41.0801 38.5286 41.0801H31.2486C30.3871 41.0801 29.6886 40.3816 29.6886 39.5201V32.2401Z"
                    fill="currentColor"></path>
                </svg></div>
              <h3 className="mb-4 text-xl font-semibold text-title-color dark:text-white/90 md:text-2xl lg:text-xl xl:text-2xl">500+ UI
                Elements</h3>
              <p className="text-base !leading-normal text-text-color dark:text-gray-300-secondary dark:text-gray-400">Explore an extensive collection of
                handcrafted Dashboard UI components, elements, and pages for HTML, React, Next.js, Vue, Angular and
                Laravel. Allows you to create feature-packed backends, dashboards, or admin panels easily.</p>
            </div>
          </div>
          <div
            className="rounded-3xl border border-stroke-secondary dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-1 duration-200 hover:border-primary-200 hover:bg-primary-25 md:p-2">
            <div className="h-full rounded-2xl border border-[#F2F4F7] dark:border-gray-800 bg-white dark:bg-gray-900 dark:border-gray-800 p-4 md:p-6">
              <div className="mb-7.5 text-primary"><svg className="h-12 w-12" viewBox="0 0 52 52" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M32.0096 8.54159C33.6917 6.8595 36.419 6.85952 38.1011 8.54159L42.6339 13.0744C44.316 14.7564 44.316 17.4837 42.6339 19.1657L38.1011 23.6985C36.419 25.3806 33.6917 25.3806 32.0096 23.6985L27.4769 19.1657C25.7948 17.4836 25.7948 14.7564 27.4769 13.0743L32.0096 8.54159ZM35.8949 10.7478C35.4312 10.2841 34.6795 10.2841 34.2159 10.7478L29.6832 15.2805C29.2195 15.7442 29.2195 16.4959 29.6832 16.9595L34.2159 21.4923C34.6795 21.9559 35.4312 21.9559 35.8949 21.4923L40.4276 16.9596C40.8912 16.4959 40.8912 15.7442 40.4276 15.2805L35.8949 10.7478Z"
                    fill="currentColor"></path>
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M11.6553 7.80005C9.07065 7.80005 6.97534 9.89536 6.97534 12.48V19.76C6.97534 22.3447 9.07063 24.44 11.6553 24.44H18.9353C21.5201 24.44 23.6153 22.3447 23.6153 19.76V12.48C23.6153 9.89536 21.5201 7.80005 18.9353 7.80005H11.6553ZM10.0953 12.48C10.0953 11.6185 10.7938 10.92 11.6553 10.92H18.9353C19.7969 10.92 20.4953 11.6185 20.4953 12.48V19.76C20.4953 20.6216 19.7969 21.32 18.9353 21.32H11.6553C10.7938 21.32 10.0953 20.6216 10.0953 19.76V12.48Z"
                    fill="currentColor"></path>
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M11.6553 27.5601C9.07065 27.5601 6.97534 29.6555 6.97534 32.2401V39.5201C6.97534 42.1047 9.07063 44.2001 11.6553 44.2001H18.9353C21.5201 44.2001 23.6153 42.1047 23.6153 39.5201V32.2401C23.6153 29.6555 21.5201 27.5601 18.9353 27.5601H11.6553ZM10.0953 32.2401C10.0953 31.3785 10.7938 30.6801 11.6553 30.6801H18.9353C19.7969 30.6801 20.4953 31.3785 20.4953 32.2401V39.5201C20.4953 40.3816 19.7969 41.0801 18.9353 41.0801H11.6553C10.7938 41.0801 10.0953 40.3816 10.0953 39.5201V32.2401Z"
                    fill="currentColor"></path>
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M31.4154 27.5601C28.8307 27.5601 26.7354 29.6555 26.7354 32.2401V39.5201C26.7354 42.1047 28.8307 44.2001 31.4154 44.2001H38.6954C41.2802 44.2001 43.3754 42.1047 43.3754 39.5201V32.2401C43.3754 29.6555 41.2802 27.5601 38.6954 27.5601H31.4154ZM29.8554 32.2401C29.8554 31.3785 30.5538 30.6801 31.4154 30.6801H38.6954C39.5569 30.6801 40.2554 31.3785 40.2554 32.2401V39.5201C40.2554 40.3816 39.5569 41.0801 38.6954 41.0801H31.4154C30.5538 41.0801 29.8554 40.3816 29.8554 39.5201V32.2401Z"
                    fill="currentColor"></path>
                </svg></div>
              <h3 className="mb-4 text-xl font-semibold text-title-color dark:text-white/90 md:text-2xl lg:text-xl xl:text-2xl">10 Unique
                Dashboards</h3>
              <p className="text-base !leading-normal text-text-color dark:text-gray-300-secondary dark:text-gray-400">Choose from uniquely designed dashboard
                variations for Analytics, E-commerce, Marketing, CRM, AI, Sales, and Finance applications. Enhance user
                experience and present data visually, tailored for the specific needs of your project.</p>
            </div>
          </div>
          <div
            className="rounded-3xl border border-stroke-secondary dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-1 duration-200 hover:border-primary-200 hover:bg-primary-25 md:p-2">
            <div className="h-full rounded-2xl border border-[#F2F4F7] dark:border-gray-800 bg-white dark:bg-gray-900 dark:border-gray-800 p-4 md:p-6">
              <div className="mb-7.5 text-primary"><svg className="h-12 w-12" viewBox="0 0 52 52" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M9.75 20.5836C9.75 11.6089 17.0254 4.3335 26.0001 4.3335C34.9748 4.3335 42.2501 11.6089 42.2501 20.5836V31.4167C42.2501 40.3915 34.9748 47.6669 26.0001 47.6669C17.0254 47.6669 9.75 40.3915 9.75 31.4167V20.5836ZM13 23.8336V31.4167C13 38.5966 18.8203 44.4169 26.0001 44.4169C33.1797 44.4169 39.0001 38.5966 39.0001 31.4167V23.8336H13ZM24.3751 20.5835H13C13 13.9541 17.9623 8.48372 24.3751 7.68407V20.5835ZM27.6251 20.5835H39.0001C39.0001 13.9541 34.0377 8.48372 27.6251 7.68407V20.5835Z"
                    fill="currentColor"></path>
                  <path
                    d="M8.34274 6.87639C8.79148 7.65359 9.78531 7.9199 10.5625 7.47116C11.3398 7.02244 11.6061 6.02859 11.1573 5.25139L9.53232 2.4368C9.08359 1.65957 8.08976 1.39327 7.31253 1.842C6.53531 2.29072 6.269 3.28457 6.71774 4.0618L8.34274 6.87639Z"
                    fill="currentColor"></path>
                  <path
                    d="M6.5 13.3191C7.39746 13.3191 8.125 12.5915 8.125 11.6941C8.125 10.7966 7.39746 10.0691 6.5 10.0691H3.25C2.35255 10.0691 1.625 10.7966 1.625 11.6941C1.625 12.5915 2.35255 13.3191 3.25 13.3191H6.5Z"
                    fill="currentColor"></path>
                </svg></div>
              <h3 className="mb-4 text-xl font-semibold text-title-color dark:text-white/90 md:text-2xl lg:text-xl xl:text-2xl">Easy to
                Customize and Use</h3>
              <p className="text-base !leading-normal text-text-color dark:text-gray-300-secondary dark:text-gray-400">TailAdmin ensures easy customization for
                your HTML, React, Next.js, Vue, Angular and Laravel projects. Follow our comprehensive documentation and
                leverage Tailwind CSS utility classes to achieve your desired results.</p>
            </div>
          </div>
          <div
            className="rounded-3xl border border-stroke-secondary dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-1 duration-200 hover:border-primary-200 hover:bg-primary-25 md:p-2">
            <div className="h-full rounded-2xl border border-[#F2F4F7] dark:border-gray-800 bg-white dark:bg-gray-900 dark:border-gray-800 p-4 md:p-6">
              <div className="mb-7.5 text-primary"><svg className="h-12 w-12" viewBox="0 0 52 52" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.52376 20.8867C6.30076 21.719 6.79464 22.5744 7.62683 22.7973C8.45905 23.0203 9.31446 22.5265 9.53745 21.6943C10.4854 18.1563 12.5744 15.03 15.4802 12.8003C18.3861 10.5705 21.9465 9.36194 25.6093 9.36194C29.272 9.36194 32.8324 10.5705 35.7383 12.8003C38.2718 14.7443 40.1843 17.3699 41.2611 20.3556L37.7769 18.3936C37.026 17.9709 36.0749 18.2368 35.6522 18.9875C35.2293 19.7383 35.4954 20.6895 36.246 21.1123L42.6539 24.7205C43.0144 24.9235 43.4408 24.9749 43.8393 24.8636C44.2378 24.7521 44.5756 24.4871 44.7786 24.1264L48.3868 17.7179C48.8095 16.9672 48.5434 16.0159 47.7928 15.5932C47.0419 15.1706 46.0907 15.4365 45.668 16.1873L44.0856 18.998C42.7887 15.5762 40.5614 12.5685 37.6376 10.325C34.1868 7.67716 29.9588 6.24194 25.6093 6.24194C21.2596 6.24194 17.0316 7.67716 13.5809 10.325C10.1301 12.9729 7.6495 16.6854 6.52376 20.8867Z"
                    fill="currentColor"></path>
                  <path
                    d="M44.7004 31.1131C44.9234 30.2809 44.4296 29.4256 43.5974 29.2026C42.7652 28.9796 41.9097 29.4734 41.6867 30.3056C40.7386 33.8435 38.6497 36.9699 35.7439 39.1997C32.838 41.4294 29.2776 42.6379 25.615 42.6379C21.9521 42.6379 18.3917 41.4294 15.4859 39.1997C12.9567 37.2588 11.0464 34.6391 9.96859 31.6597L13.427 33.6072C14.1777 34.0298 15.129 33.764 15.5517 33.0133C15.9744 32.2625 15.7085 31.3113 14.9578 30.8884L8.54993 27.2802C8.1894 27.0772 7.76298 27.0259 7.36452 27.1371C6.96603 27.2486 6.62814 27.5138 6.42515 27.8743L2.81712 34.2828C2.39444 35.0336 2.66041 35.9848 3.41117 36.4075C4.16192 36.8301 5.11319 36.5643 5.53587 35.8134L7.13066 32.9809C8.42636 36.4112 10.6568 39.4268 13.5865 41.6749C17.0373 44.3227 21.2653 45.7579 25.615 45.7579C29.9644 45.7579 34.1925 44.3227 37.6432 41.6749C41.0941 39.027 43.5747 35.3145 44.7004 31.1131Z"
                    fill="currentColor"></path>
                </svg></div>
              <h3 className="mb-4 text-xl font-semibold text-title-color dark:text-white/90 md:text-2xl lg:text-xl xl:text-2xl">Lifetime Free
                Updates</h3>
              <p className="text-base !leading-normal text-text-color dark:text-gray-300-secondary dark:text-gray-400">Take your project to the next level with
                TailAdmin&#x27;s lifetime Free updates. Access new features and improvements without any extra cost –
                because innovation should never have a price tag.</p>
            </div>
          </div>
          <div
            className="rounded-3xl border border-stroke-secondary dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-1 duration-200 hover:border-primary-200 hover:bg-primary-25 md:p-2">
            <div className="h-full rounded-2xl border border-[#F2F4F7] dark:border-gray-800 bg-white dark:bg-gray-900 dark:border-gray-800 p-4 md:p-6">
              <div className="mb-7.5 text-primary"><svg className="h-12 w-12" viewBox="0 0 52 52" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.5208 23.5012C15.0251 23.5012 13.8125 24.7137 13.8125 26.2096C13.8125 27.7052 15.0251 28.9179 16.5208 28.9179C18.0166 28.9179 19.2294 27.7052 19.2294 26.2096C19.2294 24.7137 18.0166 23.5012 16.5208 23.5012Z"
                    fill="currentColor"></path>
                  <path
                    d="M23.2917 26.2096C23.2917 24.7137 24.5044 23.5012 26.0001 23.5012C27.4959 23.5012 28.7086 24.7137 28.7086 26.2096C28.7086 27.7052 27.4962 28.9179 26.0003 28.9179C24.5046 28.9179 23.2917 27.7052 23.2917 26.2096Z"
                    fill="currentColor"></path>
                  <path
                    d="M35.4791 23.5012C33.9834 23.5012 32.7708 24.7137 32.7708 26.2096C32.7708 27.7052 33.9834 28.9179 35.4791 28.9179C36.975 28.9179 38.1876 27.7052 38.1876 26.2096C38.1876 24.7137 36.975 23.5012 35.4791 23.5012Z"
                    fill="currentColor"></path>
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M26.0001 5.62402C14.6323 5.62402 5.41679 14.8395 5.41679 26.2074C5.41679 31.3057 7.27213 35.9732 10.3416 39.5677L5.89274 44.0167C5.42799 44.4815 5.28898 45.1804 5.54049 45.7875C5.79201 46.3948 6.38455 46.7907 7.04179 46.7907H26.0001C37.3679 46.7907 46.5834 37.5752 46.5834 26.2074C46.5834 14.8395 37.3679 5.62402 26.0001 5.62402ZM8.66679 26.2074C8.66679 16.6344 16.4272 8.87402 26.0001 8.87402C35.5731 8.87402 43.3334 16.6344 43.3334 26.2074C43.3334 35.7803 35.5731 43.5407 26.0001 43.5407H10.9649L13.7436 40.7619C14.0484 40.4573 14.2196 40.0439 14.2196 39.613C14.2196 39.182 14.0484 38.7686 13.7436 38.464C10.6051 35.3253 8.66679 30.9942 8.66679 26.2074Z"
                    fill="currentColor"></path>
                </svg></div>
              <h3 className="mb-4 text-xl font-semibold text-title-color dark:text-white/90 md:text-2xl lg:text-xl xl:text-2xl">Technical
                Support</h3>
              <p className="text-base !leading-normal text-text-color dark:text-gray-300-secondary dark:text-gray-400">Are you stuck with technical issues, need
                clarification, or need assistance? Chat with us on Discord or open a support ticket, and we will get
                back to you within 24 hours.</p>
            </div>
          </div>
        </div>
        <div className="mt-12.5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-7.5 xl:gap-y-6">
          <div
            className="flex items-center gap-4 rounded-3xl border border-stroke-secondary dark:border-gray-700 bg-white dark:bg-gray-900 dark:border-gray-800 px-4 py-3 duration-200 hover:border-primary-200 md:px-7.5 md:py-6">
            <div className="flex items-center gap-4">
              <div className="text-primary"><svg className="h-7 w-7 md:h-9 md:w-9 lg:h-7 lg:w-7 xl:h-9 xl:w-9"
                  viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.37025 4.875C7.50629 4.875 5.99525 6.38604 5.99525 8.25V20.5113C5.80149 20.777 5.64455 21.074 5.53305 21.396L3.71574 26.646C2.95686 28.8384 4.5851 31.125 6.90507 31.125H14.6202V28.875H6.90507C6.13175 28.875 5.589 28.1129 5.84196 27.3821L7.65927 22.1321C7.81611 21.6789 8.24291 21.375 8.72238 21.375H14.6202V19.125H8.24525V8.25C8.24525 7.62869 8.74892 7.125 9.37025 7.125H26.6202C27.2415 7.125 27.7452 7.62869 27.7452 8.25V14.625H29.9952V8.25C29.9952 6.38604 28.4841 4.875 26.6202 4.875H9.37025Z"
                    fill="currentColor"></path>
                  <path
                    d="M23.7178 27.375C23.7178 26.7123 24.2551 26.175 24.9178 26.175H24.9328C25.5955 26.175 26.1328 26.7123 26.1328 27.375C26.1328 28.0377 25.5955 28.575 24.9328 28.575H24.9178C24.2551 28.575 23.7178 28.0377 23.7178 27.375Z"
                    fill="currentColor"></path>
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M18.8877 20.25C18.8877 18.3861 20.3988 16.875 22.2627 16.875H27.6028C29.4667 16.875 30.9778 18.3861 30.9778 20.25V29.625C30.9778 31.4889 29.4667 33 27.6028 33H22.2627C20.3988 33 18.8877 31.4889 18.8877 29.625V20.25ZM22.2627 19.125C21.6414 19.125 21.1377 19.6287 21.1377 20.25V29.625C21.1377 30.2463 21.6414 30.75 22.2627 30.75H27.6028C28.2241 30.75 28.7278 30.2463 28.7278 29.625V20.25C28.7278 19.6287 28.2241 19.125 27.6028 19.125H22.2627Z"
                    fill="currentColor"></path>
                </svg></div>
              <h3 className="text-lg font-semibold text-text-color dark:text-gray-300 md:text-xl lg:text-lg xl:text-xl">Fully Responsive</h3>
            </div>
          </div>
          <div
            className="flex items-center gap-4 rounded-3xl border border-stroke-secondary dark:border-gray-700 bg-white dark:bg-gray-900 dark:border-gray-800 px-4 py-3 duration-200 hover:border-primary-200 md:px-7.5 md:py-6">
            <div className="flex items-center gap-4">
              <div className="text-primary"><svg className="h-7 w-7 md:h-9 md:w-9 lg:h-7 lg:w-7 xl:h-9 xl:w-9"
                  viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19.6255 11.1873C20.2077 11.3167 20.5749 11.8936 20.4454 12.4759L17.8863 23.9924C17.7568 24.5746 17.1799 24.9418 16.5976 24.8124C16.0154 24.6831 15.6482 24.1062 15.7777 23.5239L18.3368 12.0073C18.4663 11.4251 19.0432 11.0579 19.6255 11.1873Z"
                    fill="currentColor"></path>
                  <path
                    d="M21.4797 16.2365C21.0579 15.8147 21.058 15.1308 21.4798 14.7091C21.9016 14.2874 22.5853 14.2874 23.0071 14.7092L25.5341 17.2364C25.9559 17.6582 25.9559 18.342 25.5341 18.7638L23.0071 21.2907C22.5853 21.7125 21.9014 21.7125 21.4797 21.2907C21.0579 20.869 21.0579 20.1852 21.4797 19.7635L23.2431 18L21.4797 16.2365Z"
                    fill="currentColor"></path>
                  <path
                    d="M14.7354 16.2464C15.1572 15.8247 15.1571 15.1408 14.7353 14.7191C14.3136 14.2974 13.6297 14.2974 13.208 14.7192L10.6908 17.2366C10.2691 17.6584 10.2691 18.3422 10.6908 18.764L13.208 21.2811C13.6298 21.7029 14.3136 21.7029 14.7354 21.2811C15.1572 20.8593 15.1572 20.1755 14.7354 19.7537L12.9818 18.0002L14.7354 16.2464Z"
                    fill="currentColor"></path>
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M8.75221 5.3999C6.96281 5.3999 5.51221 6.8505 5.51221 8.6399V27.3599C5.51221 29.1492 6.96281 30.5999 8.75221 30.5999H27.4722C29.2617 30.5999 30.7122 29.1492 30.7122 27.3599V8.6399C30.7122 6.8505 29.2617 5.3999 27.4722 5.3999H8.75221ZM7.67221 8.6399C7.67221 8.04344 8.15573 7.5599 8.75221 7.5599H27.4722C28.0686 7.5599 28.5522 8.04344 28.5522 8.6399V27.3599C28.5522 27.9563 28.0686 28.4399 27.4722 28.4399H8.75221C8.15573 28.4399 7.67221 27.9563 7.67221 27.3599V8.6399Z"
                    fill="currentColor"></path>
                </svg></div>
              <h3 className="text-lg font-semibold text-text-color dark:text-gray-300 md:text-xl lg:text-lg xl:text-xl">60+ Coded Files</h3>
            </div>
          </div>
          <div
            className="flex items-center gap-4 rounded-3xl border border-stroke-secondary dark:border-gray-700 bg-white dark:bg-gray-900 dark:border-gray-800 px-4 py-3 duration-200 hover:border-primary-200 md:px-7.5 md:py-6">
            <div className="flex items-center gap-4">
              <div className="text-primary"><svg className="h-7 w-7 md:h-9 md:w-9 lg:h-7 lg:w-7 xl:h-9 xl:w-9"
                  viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.53762 5.7601C8.29299 5.7601 7.28402 6.76906 7.28402 8.0137C7.28402 9.25833 8.29299 10.2673 9.53762 10.2673C10.7823 10.2673 11.7912 9.25833 11.7912 8.0137C11.7912 6.76906 10.7823 5.7601 9.53762 5.7601ZM5.12402 8.0137C5.12402 5.57614 7.10006 3.6001 9.53762 3.6001C11.9752 3.6001 13.9512 5.57614 13.9512 8.0137C13.9512 10.0786 12.5331 11.8124 10.6177 12.2942L10.618 15.8401C10.618 16.4365 11.1016 16.9202 11.698 16.9202H17.7077C17.7132 16.9201 17.7187 16.9201 17.7242 16.9201C17.7295 16.9201 17.735 16.9201 17.7403 16.9202H23.7511C24.3476 16.9202 24.8311 16.4368 24.8311 15.8404L24.8307 12.2942C22.9152 11.8125 21.497 10.0787 21.497 8.0137C21.497 5.57614 23.4731 3.6001 25.9106 3.6001C28.3482 3.6001 30.3242 5.57614 30.3242 8.0137C30.3242 10.0786 28.9062 11.8124 26.9907 12.2942L26.9911 15.8401C26.9911 17.6294 25.5406 19.0802 23.7511 19.0802H18.8039L18.8034 23.7062C20.7189 24.1879 22.137 25.9217 22.137 27.9866C22.137 30.4243 20.1609 32.4002 17.7234 32.4002C15.2858 32.4002 13.3098 30.4243 13.3098 27.9866C13.3098 25.9217 14.728 24.1879 16.6434 23.7061L16.6439 19.0802H11.698C9.90868 19.0802 8.4581 17.6297 8.45804 15.8404L8.45771 12.2942C6.54219 11.8125 5.12402 10.0787 5.12402 8.0137ZM25.9106 5.7601C24.666 5.7601 23.657 6.76906 23.657 8.0137C23.657 9.25833 24.666 10.2673 25.9106 10.2673C27.1552 10.2673 28.1642 9.25833 28.1642 8.0137C28.1642 6.76906 27.1552 5.7601 25.9106 5.7601ZM17.7234 25.733C16.4787 25.733 15.4698 26.7421 15.4698 27.9866C15.4698 29.2312 16.4787 30.2402 17.7234 30.2402C18.968 30.2402 19.977 29.2312 19.977 27.9866C19.977 26.7421 18.968 25.733 17.7234 25.733Z"
                    fill="currentColor"></path>
                </svg></div>
              <h3 className="text-lg font-semibold text-text-color dark:text-gray-300 md:text-xl lg:text-lg xl:text-xl">Multi-Framework</h3>
            </div>
          </div>
          <div
            className="flex items-center gap-4 rounded-3xl border border-stroke-secondary dark:border-gray-700 bg-white dark:bg-gray-900 dark:border-gray-800 px-4 py-3 duration-200 hover:border-primary-200 md:px-7.5 md:py-6">
            <div className="flex items-center gap-4">
              <div className="text-primary"><svg className="h-7 w-7 md:h-9 md:w-9 lg:h-7 lg:w-7 xl:h-9 xl:w-9"
                  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M19.0803 5.73981C19.0803 7.02522 18.4519 8.16661 17.4899 8.86989C18.4519 9.57318 19.0804 10.7144 19.0884 11.9991L19.0884 12C19.0884 14.1303 17.3541 15.8731 15.2152 15.8731H15.1339C14.2359 15.8731 13.4059 15.5621 12.7469 15.0498V18.2195C12.7469 20.3751 10.9791 22.1333 8.8087 22.1333C6.66283 22.1333 4.91113 20.3997 4.91113 18.2602C4.91113 16.9747 5.5395 15.8333 6.50149 15.1301C5.5395 14.4268 4.91113 13.2853 4.91113 12C4.91113 10.7146 5.5395 9.57318 6.5015 8.86989C5.5395 8.16661 4.91113 7.02522 4.91113 5.73981C4.91113 3.60945 6.64544 1.86664 8.78431 1.86664H15.207C17.3374 1.86664 19.0803 3.60094 19.0803 5.73981ZM8.8087 20.6471C10.1584 20.6471 11.2526 19.5518 11.2526 18.2195V15.8731L8.7851 15.8731C7.47567 15.881 6.40544 16.944 6.40544 18.2602C6.40544 19.5759 7.48312 20.6471 8.8087 20.6471ZM11.2607 14.3869H8.78431C7.46826 14.3869 6.40544 13.3171 6.40544 12C6.40544 10.6834 7.47584 9.61297 8.79244 9.61297H11.2607V14.3869ZM15.1257 14.3869H15.207C16.5237 14.3869 17.594 13.3165 17.594 12C17.594 10.6834 16.5237 9.61297 15.207 9.61297H15.1257C13.8092 9.61297 12.7388 10.6834 12.7388 12C12.7388 13.3165 13.8092 14.3869 15.1257 14.3869ZM12.7388 3.35281H15.207C16.5237 3.35281 17.594 4.4232 17.594 5.73981C17.594 7.05642 16.5237 8.1268 15.207 8.1268H12.7388V3.35281ZM8.78431 8.1268H11.2526V3.35281H8.78431C7.4677 3.35281 6.39731 4.4232 6.39731 5.73981C6.39731 7.05641 7.4677 8.1268 8.78431 8.1268Z"
                    fill="currentColor"></path>
                </svg></div>
              <h3 className="text-lg font-semibold text-text-color dark:text-gray-300 md:text-xl lg:text-lg xl:text-xl">Figma Design Source
                File</h3>
            </div>
          </div>
          <div
            className="flex items-center gap-4 rounded-3xl border border-stroke-secondary dark:border-gray-700 bg-white dark:bg-gray-900 dark:border-gray-800 px-4 py-3 duration-200 hover:border-primary-200 md:px-7.5 md:py-6">
            <div className="flex items-center gap-4">
              <div className="text-primary"><svg className="h-7 w-7 md:h-9 md:w-9 lg:h-7 lg:w-7 xl:h-9 xl:w-9"
                  viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M7.16699 14.625V27.75C7.16699 28.3713 7.67068 28.875 8.29199 28.875H16.1658C16.1646 28.9197 16.164 28.9647 16.164 29.0097V31.125H8.29199C6.42803 31.125 4.91699 29.6139 4.91699 27.75V8.25C4.91699 6.38604 6.42803 4.875 8.29199 4.875H27.7897C29.6538 4.875 31.1647 6.38604 31.1647 8.25V14.6249H24.9667L24.93 14.625H7.16699ZM7.16699 8.25C7.16699 7.62869 7.67068 7.125 8.29199 7.125H27.7897C28.4112 7.125 28.9147 7.62869 28.9147 8.25V12.375H7.16699V8.25Z"
                    fill="currentColor"></path>
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M27.6204 17.8873C27.577 17.455 27.2883 17.0863 26.8789 16.9404C26.4697 16.7944 26.0128 16.8972 25.7056 17.2045L18.2485 24.6615C17.9268 24.9832 17.8305 25.4671 18.0046 25.8876C18.1788 26.3079 18.589 26.5821 19.044 26.5821H21.789L22.3326 31.9877C22.3761 32.42 22.6648 32.7887 23.074 32.9346C23.4834 33.0806 23.9403 32.9778 24.2475 32.6705L31.7046 25.2135C32.0263 24.8917 32.1226 24.4078 31.9485 23.9874C31.7743 23.5671 31.3641 23.2929 30.9091 23.2929H28.1641L27.6204 17.8873ZM22.8066 24.3321H21.76L25.6191 20.4729L26.0272 24.5306C26.085 25.1054 26.5689 25.5429 27.1465 25.5429H28.1931L24.334 29.4021L23.9259 25.3444C23.8681 24.7696 23.3842 24.3321 22.8066 24.3321Z"
                    fill="currentColor"></path>
                </svg></div>
              <h3 className="text-lg font-semibold text-text-color dark:text-gray-300 md:text-xl lg:text-lg xl:text-xl">Performance Optimized
              </h3>
            </div>
          </div>
          <div
            className="flex items-center gap-4 rounded-3xl border border-stroke-secondary dark:border-gray-700 bg-white dark:bg-gray-900 dark:border-gray-800 px-4 py-3 duration-200 hover:border-primary-200 md:px-7.5 md:py-6">
            <div className="flex items-center gap-4">
              <div className="text-primary"><svg className="h-7 w-7 md:h-9 md:w-9 lg:h-7 lg:w-7 xl:h-9 xl:w-9"
                  viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M7.20898 14.625V27.75C7.20898 28.3713 7.71267 28.875 8.33398 28.875H15.4845C15.8179 29.6816 16.2508 30.4367 16.7677 31.125H8.33398C6.47002 31.125 4.95898 29.6139 4.95898 27.75V8.25C4.95898 6.38604 6.47002 4.875 8.33398 4.875H27.8317C29.6958 4.875 31.2067 6.38604 31.2067 8.25V16.6874C30.5185 16.1702 29.7634 15.7373 28.9567 15.4037V14.625H7.20898ZM7.20898 8.25C7.20898 7.62869 7.71267 7.125 8.33398 7.125H27.8317C28.4532 7.125 28.9567 7.62869 28.9567 8.25V12.375H7.20898V8.25Z"
                    fill="currentColor"></path>
                  <path
                    d="M28.0641 22.7111C28.5035 23.1505 28.5035 23.8628 28.0641 24.3022L25.2026 27.1637C24.9917 27.3746 24.7055 27.4931 24.4071 27.4931C24.1088 27.4931 23.8226 27.3746 23.6117 27.1637L21.9731 25.5251C21.5337 25.0858 21.5337 24.3736 21.9731 23.9342C22.4124 23.4949 23.1248 23.4949 23.5641 23.9342L24.4071 24.7772L26.4731 22.7111C26.9124 22.2718 27.6248 22.2718 28.0641 22.7111Z"
                    fill="currentColor"></path>
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M16.9561 24.9375C16.9561 20.4848 20.5658 16.875 25.0186 16.875C29.4715 16.875 33.0811 20.4848 33.0811 24.9375C33.0811 29.3903 29.4715 33 25.0186 33C20.5658 33 16.9561 29.3903 16.9561 24.9375ZM25.0186 19.125C21.8084 19.125 19.2061 21.7274 19.2061 24.9375C19.2061 28.1477 21.8084 30.75 25.0186 30.75C28.2289 30.75 30.8311 28.1477 30.8311 24.9375C30.8311 21.7274 28.2289 19.125 25.0186 19.125Z"
                    fill="currentColor"></path>
                </svg></div>
              <h3 className="text-lg font-semibold text-text-color dark:text-gray-300 md:text-xl lg:text-lg xl:text-xl">Cross-browser Support
              </h3>
            </div>
          </div>
          <div
            className="flex items-center gap-4 rounded-3xl border border-stroke-secondary dark:border-gray-700 bg-white dark:bg-gray-900 dark:border-gray-800 px-4 py-3 duration-200 hover:border-primary-200 md:px-7.5 md:py-6">
            <div className="flex items-center gap-4">
              <div className="text-primary"><svg className="h-7 w-7 md:h-9 md:w-9 lg:h-7 lg:w-7 xl:h-9 xl:w-9"
                  viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M2.91382 18.0001C2.91382 10.0472 9.36091 3.6001 17.3138 3.6001C25.2667 3.6001 31.7138 10.0472 31.7138 18.0001C31.7138 25.9529 25.2667 32.4001 17.3138 32.4001C9.36091 32.4001 2.91382 25.9529 2.91382 18.0001ZM29.5068 16.9201C29.3661 15.3106 28.914 13.7904 28.2108 12.4201H17.572C16.8702 13.7906 16.4194 15.3108 16.28 16.9201H29.5068ZM16.2817 19.0801H29.5068C29.3661 20.6896 28.914 22.2098 28.2108 23.5801H17.5817C16.8773 22.2101 16.4237 20.6899 16.2817 19.0801ZM14.0738 17.9981V17.9905C14.0738 13.0701 16.5416 8.72612 20.3069 6.12871C19.3491 5.88796 18.3464 5.7601 17.3138 5.7601C10.5539 5.7601 5.07382 11.2401 5.07382 18.0001C5.07382 24.76 10.5539 30.2401 17.3138 30.2401C18.3537 30.2401 19.3635 30.1104 20.3274 29.8663C16.5524 27.2718 14.0764 22.9242 14.0738 17.9981ZM18.9991 25.7401H26.7964C25.7339 27.0403 24.4092 28.1178 22.9033 28.8923C21.3931 28.1191 20.0647 27.0413 18.9991 25.7401ZM26.7964 10.2601C25.7294 8.95454 24.3983 7.87338 22.8844 7.09829C21.3747 7.87462 20.0472 8.95563 18.9834 10.2601H26.7964Z"
                    fill="currentColor"></path>
                </svg></div>
              <h3 className="text-lg font-semibold text-text-color dark:text-gray-300 md:text-xl lg:text-lg xl:text-xl">Dark Mode Support</h3>
            </div>
          </div>
          <div
            className="flex items-center gap-4 rounded-3xl border border-stroke-secondary dark:border-gray-700 bg-white dark:bg-gray-900 dark:border-gray-800 px-4 py-3 duration-200 hover:border-primary-200 md:px-7.5 md:py-6">
            <div className="flex items-center gap-4">
              <div className="text-primary"><svg className="h-7 w-7 md:h-9 md:w-9 lg:h-7 lg:w-7 xl:h-9 xl:w-9"
                  viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M20.9221 4.6801C20.9221 4.08364 21.4056 3.6001 22.0021 3.6001C22.5985 3.6001 23.0821 4.08364 23.0821 4.6801V8.97549H28.1221C28.7185 8.97549 29.2021 9.45903 29.2021 10.0555C29.2021 10.652 28.7185 11.1355 28.1221 11.1355H27.4021V18.3355C27.4021 23.1396 23.7828 27.0985 19.1221 27.6338V31.3201C19.1221 31.9165 18.6385 32.4001 18.0421 32.4001C17.4456 32.4001 16.9621 31.9165 16.9621 31.3201V27.6338C12.3014 27.0985 8.68208 23.1396 8.68208 18.3355V11.1355H7.96208C7.36562 11.1355 6.88208 10.652 6.88208 10.0555C6.88208 9.45903 7.36562 8.97549 7.96208 8.97549H13.0021V4.6801C13.0021 4.08364 13.4856 3.6001 14.0821 3.6001C14.6785 3.6001 15.1621 4.08364 15.1621 4.6801V8.97549H20.9221V4.6801ZM10.8421 11.1355V18.3355C10.8421 22.3119 14.0656 25.5355 18.0421 25.5355C22.0185 25.5355 25.2421 22.3119 25.2421 18.3355V11.1355H10.8421Z"
                    fill="currentColor"></path>
                </svg></div>
              <h3 className="text-lg font-semibold text-text-color dark:text-gray-300 md:text-xl lg:text-lg xl:text-xl">Customized Plugins</h3>
            </div>
          </div>
          <div
            className="flex items-center gap-4 rounded-3xl border border-stroke-secondary dark:border-gray-700 bg-white dark:bg-gray-900 dark:border-gray-800 px-4 py-3 duration-200 hover:border-primary-200 md:px-7.5 md:py-6">
            <div className="flex items-center gap-4">
              <div className="text-primary"><svg className="h-7 w-7 md:h-9 md:w-9 lg:h-7 lg:w-7 xl:h-9 xl:w-9"
                  viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.459 21.75C12.459 21.1287 12.9627 20.625 13.584 20.625H22.584C23.2053 20.625 23.709 21.1287 23.709 21.75C23.709 22.3713 23.2053 22.875 22.584 22.875H13.584C12.9627 22.875 12.459 22.3713 12.459 21.75Z"
                    fill="currentColor"></path>
                  <path
                    d="M12.459 26.25C12.459 25.6287 12.9627 25.125 13.584 25.125H18.084C18.7053 25.125 19.209 25.6287 19.209 26.25C19.209 26.8713 18.7053 27.375 18.084 27.375H13.584C12.9627 27.375 12.459 26.8713 12.459 26.25Z"
                    fill="currentColor"></path>
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M29.334 29.625C29.334 31.4889 27.8229 33 25.959 33H10.209C8.34502 33 6.83398 31.4889 6.83398 29.625V14.4316C6.83398 13.5368 7.18927 12.6787 7.82175 12.0458L15.8733 3.98926C16.5063 3.35587 17.365 3 18.2605 3H25.959C27.8229 3 29.334 4.51104 29.334 6.375V29.625ZM25.959 30.75C26.5803 30.75 27.084 30.2463 27.084 29.625V6.375C27.084 5.75368 26.5803 5.25 25.959 5.25H18.456L18.4603 11.2476C18.4617 13.1125 16.9503 14.625 15.0853 14.625H9.08398V29.625C9.08398 30.2463 9.58767 30.75 10.209 30.75H25.959ZM10.6738 12.375L16.2072 6.83814L16.2103 11.2492C16.2108 11.8708 15.7069 12.375 15.0853 12.375H10.6738Z"
                    fill="currentColor"></path>
                </svg></div>
              <h3 className="text-lg font-semibold text-text-color dark:text-gray-300 md:text-xl lg:text-lg xl:text-xl">Detailed Documentation
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
