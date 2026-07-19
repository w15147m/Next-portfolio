import React from 'react';

export default function TrustedBy() {
  return (
    <section className="pt-17.5">
      <div className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="mb-8 text-center text-lg font-medium text-text-color dark:text-gray-300">Trusted by over 80,000 individuals and
            companies worldwide.</h2>
          <div className="relative mb-13"
            style={{"maskImage":"linear-gradient(to right, transparent, black 20%, black 80%, transparent)"}}></div>
        </div>
        <div className="flex justify-center">
          <div
            className="inline-flex items-center justify-between rounded-xl bg-gray-50 dark:bg-gray-800/50 p-5 max-md:flex-wrap max-md:justify-center max-md:gap-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center -space-x-4"><img alt="avatar" loading="lazy" width="48" height="48"
                  decoding="async" data-nimg="1" className="rounded-full border-[3px] border-gray-50"
                  style={{"color":"transparent"}}
                  
                  src="/images/user/user-01.jpg" /><img alt="avatar"
                  loading="lazy" width="48" height="48" decoding="async" data-nimg="1"
                  className="rounded-full border-[3px] border-gray-50" style={{"color":"transparent"}}
                  
                  src="/images/user/user-02.jpg" /><img alt="avatar"
                  loading="lazy" width="48" height="48" decoding="async" data-nimg="1"
                  className="rounded-full border-[3px] border-gray-50" style={{"color":"transparent"}}
                  
                  src="/images/user/user-03.jpg" /></div>
              <div>
                <h3 className="text-base font-medium text-text-color dark:text-gray-300"><strong className="font-bold">80k+</strong> Happy Users!
                </h3>
                <p className="text-sm text-gray-500">#1 Tailwind CSS Admin Dashboard</p>
              </div>
            </div><span className="mx-12 h-full w-px bg-gray-200 max-md:hidden"></span><a target="_blank"
              rel="noopener noreferrer" className="group flex items-center gap-4"
              href="https://github.com/TailAdmin/tailadmin-free-tailwind-dashboard-template">
              <div className="flex items-center -space-x-4"><svg className="h-10 w-10 text-black" viewBox="0 0 24 24"
                  fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C6.47788 2 2 6.59041 2 12.2531C2 16.7833 4.86531 20.6266 8.83866 21.9824C9.33841 22.0773 9.52193 21.76 9.52193 21.4891C9.52193 21.2447 9.5126 20.4369 9.50836 19.5802C6.72626 20.2004 6.13923 18.3704 6.13923 18.3704C5.68434 17.1853 5.02891 16.8703 5.02891 16.8703C4.12165 16.2339 5.0973 16.2469 5.0973 16.2469C6.1015 16.3193 6.63027 17.3035 6.63027 17.3035C7.52216 18.871 8.96964 18.4178 9.54028 18.1559C9.63001 17.4931 9.88921 17.0409 10.1752 16.7849C7.95406 16.5255 5.61909 15.6464 5.61909 11.7177C5.61909 10.5983 6.00974 9.6836 6.64948 8.96559C6.54564 8.7073 6.20338 7.6645 6.74634 6.25219C6.74634 6.25219 7.58608 5.97662 9.49707 7.3032C10.2947 7.07595 11.1502 6.96209 12 6.95823C12.8499 6.96209 13.706 7.07595 14.5052 7.3032C16.4139 5.97662 17.2525 6.25219 17.2525 6.25219C17.7968 7.6645 17.4544 8.7073 17.3505 8.96559C17.9917 9.6836 18.3797 10.5982 18.3797 11.7177C18.3797 15.6557 16.0403 16.5229 13.8135 16.7767C14.1722 17.0948 14.4918 17.7189 14.4918 18.6754C14.4918 20.0472 14.4802 21.1514 14.4802 21.4891C14.4802 21.762 14.6602 22.0817 15.1671 21.981C19.1383 20.6237 22 16.7818 22 12.2531C22 6.59041 17.5227 2 12 2Z"
                    fill="currentColor"></path>
                </svg></div>
              <div>
                <h3 className="flex items-center gap-1 text-base font-medium text-text-color dark:text-gray-300"><strong
                    className="font-bold">Loading...</strong> {/*   */}Stars on Github<span
                    className="relative flex h-5 w-5 items-center justify-center overflow-hidden"><svg
                      className="absolute inset-0 m-auto h-4 w-4 transition-all duration-300 ease-in-out group-hover:-translate-y-5 group-hover:translate-x-5"
                      viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd"
                        d="M12.4694 3.41946C12.3405 3.31486 12.1761 3.25216 11.9972 3.2521L6.00027 3.25C5.58596 3.24985 5.24999 3.58545 5.24984 3.99958C5.2497 4.4137 5.58544 4.74954 5.99974 4.74968L10.1898 4.75115L3.47065 11.4703C3.17775 11.7632 3.17775 12.2381 3.47065 12.531C3.76354 12.8239 4.23841 12.8239 4.53131 12.531L11.2473 5.81493L11.2487 9.99635C11.2488 10.4105 11.5848 10.7461 11.9991 10.746C12.4134 10.7458 12.7491 10.41 12.749 9.99587L12.7471 4.04738C12.7592 3.841 12.6864 3.63057 12.5287 3.47289C12.5097 3.45384 12.4898 3.43603 12.4694 3.41946Z"
                        fill="currentColor"></path>
                    </svg><svg
                      className="absolute inset-0 m-auto h-4 w-4 -translate-x-5 translate-y-5 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0"
                      viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd"
                        d="M12.4694 3.41946C12.3405 3.31486 12.1761 3.25216 11.9972 3.2521L6.00027 3.25C5.58596 3.24985 5.24999 3.58545 5.24984 3.99958C5.2497 4.4137 5.58544 4.74954 5.99974 4.74968L10.1898 4.75115L3.47065 11.4703C3.17775 11.7632 3.17775 12.2381 3.47065 12.531C3.76354 12.8239 4.23841 12.8239 4.53131 12.531L11.2473 5.81493L11.2487 9.99635C11.2488 10.4105 11.5848 10.7461 11.9991 10.746C12.4134 10.7458 12.7491 10.41 12.749 9.99587L12.7471 4.04738C12.7592 3.841 12.6864 3.63057 12.5287 3.47289C12.5097 3.45384 12.4898 3.43603 12.4694 3.41946Z"
                        fill="currentColor"></path>
                    </svg></span></h3>
                <p className="text-sm text-gray-500">Show your support by giving us a star! 🌟</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
