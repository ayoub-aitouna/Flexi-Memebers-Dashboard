import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../Assets/img/logo.png";
function Nav({ Open, toggleSidebarMobileHamburger, toggleSidebarMobileClose }) {
  return (
    <>
      <nav className='bg-white border-b border-gray-200 sticky z-30 top-0 left-0 w-screen'>
        <div className='px-3 py-3 lg:px-5 lg:pl-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start'>
              <button
                id='toggleSidebarMobile'
                aria-expanded='true'
                onClick={() => Open()}
                aria-controls='sidebar'
                className='lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded'>
                <svg
                  id='toggleSidebarMobileHamburger'
                  ref={toggleSidebarMobileHamburger}
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
                <svg
                  id='toggleSidebarMobileClose'
                  className='w-6 h-6 hidden'
                  ref={toggleSidebarMobileClose}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
              <Link
                to={""}
                className='text-xl font-bold flex items-center lg:ml-2.5'>
                <img src={logo} className='h-6 px-2' alt='Windster Logo' />
                <span className='self-center whitespace-nowrap'>
                  فلكسي للعملاء
                </span>
              </Link>
              <form
                action='#'
                method='GET'
                className='hidden  lg:block lg:pl-32 lg:mr-40'>
                <label htmlFor='topbar-search' className='sr-only'>
                  ابحث عن عنصر
                </label>
                <div className='mt-1 relative lg:w-96'>
                  <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                    <svg
                      width='13.47'
                      height='15'
                      viewBox='0 0 14 15'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M7.00319 0.518677C10.5728 0.518677 13.4764 3.42226 13.4764 6.9919C13.4764 8.67605 12.8301 10.2121 11.7725 11.3649L13.8536 13.4417C14.0484 13.6364 14.049 13.9515 13.8543 14.1463C13.7572 14.2447 13.6289 14.2932 13.5013 14.2932C13.3743 14.2932 13.2467 14.2447 13.149 14.1476L11.0427 12.0472C9.93473 12.9346 8.52988 13.4658 7.00319 13.4658C3.43354 13.4658 0.529297 10.5616 0.529297 6.9919C0.529297 3.42226 3.43354 0.518677 7.00319 0.518677ZM7.00319 1.51578C3.98328 1.51578 1.52641 3.97199 1.52641 6.9919C1.52641 10.0118 3.98328 12.4687 7.00319 12.4687C10.0224 12.4687 12.4793 10.0118 12.4793 6.9919C12.4793 3.97199 10.0224 1.51578 7.00319 1.51578Z'
                        fill='#BABABA'
                      />
                    </svg>
                  </div>
                  <input
                    type='text'
                    name='email'
                    id='topbar-search'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pr-10 p-2.5'
                    placeholder='  ابحث عن عنصر'
                  />
                </div>
              </form>
            </div>
            <div className='flex items-center'>
              <button
                id='toggleSidebarMobileSearch'
                type='button'
                onClick={() => Open()}
                className='lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg'>
                <span className='sr-only'> ابحث عن عنصر</span>
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
