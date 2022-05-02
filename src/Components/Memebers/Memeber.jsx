import React, { useEffect, useState } from "react";

function User({ user }) {
  return (
    <>
      {" "}
      <tr className={`  `}>
        <td className='p-4 whitespace-nowrap text-sm  text-black  text-right'>
          <div className='w-full flex  justify-center h-full '>
            <div className=' h-full rounded-lg  text-[14px] flex flex-row justify-center items-center gap-3  w-[272px] '>
              <h1 className='font-bold grid place-content-start w-[272px] '>
                Ayoub
              </h1>
            </div>
          </div>
        </td>
        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-500 '>
          <div className='w-full flex  justify-center h-full '>
            <div className=' h-full rounded-lg  text-[14px] flex flex-row justify-center items-center gap-3  w-[272px] '>
              <h1 className='font-bold grid place-content-start w-[272px] '>
                {user.pack_name == null ? "غير مشترك" : user.pack_name}
              </h1>
            </div>
          </div>
        </td>
        <td className='p-4 whitespace-nowrap text-sm font-semibold text-gray-500  '>
          <div className='w-full flex  justify-center h-full '>
            <div className=' h-full rounded-lg  text-[14px] flex flex-row justify-center items-center gap-3  w-[272px] '>
              <h1 className='font-bold grid place-content-start w-[272px] '>
                {user.id}
              </h1>
            </div>
          </div>
        </td>

        <td className='p-4 whitespace-nowrap text-sm font-semibold text-gray-900 flex flex-row gap-5'>
          <div className='grid place-content-center w-full'>
            <button className='grid md:grid-cols-2 bg-red-700 py-2 px-6 rounded-xl text-white content-center items-center  '>
              <svg
                width='11'
                height='12'
                viewBox='0 0 11 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M9.56344 4.01828C9.68306 4.01828 9.7916 4.07048 9.87738 4.15868C9.95732 4.25288 9.99759 4.36988 9.98592 4.49348C9.98592 4.53428 9.66614 8.57823 9.48349 10.2804C9.36912 11.325 8.69573 11.9592 7.68563 11.9766C6.90895 11.994 6.14978 12 5.40228 12C4.60867 12 3.83258 11.994 3.07924 11.9766C2.10299 11.9532 1.42901 11.3076 1.32047 10.2804C1.13258 8.57224 0.818636 4.53428 0.812801 4.49348C0.806966 4.36988 0.846646 4.25288 0.927173 4.15868C1.00653 4.07048 1.12091 4.01828 1.24111 4.01828H9.56344ZM6.63884 0C7.16927 0 7.6431 0.370196 7.78022 0.898191L7.87826 1.33619C7.95762 1.69318 8.26689 1.94578 8.62284 1.94578H10.3723C10.6057 1.94578 10.8 2.13958 10.8 2.38618V2.61417C10.8 2.85477 10.6057 3.05457 10.3723 3.05457H0.428312C0.194316 3.05457 0 2.85477 0 2.61417V2.38618C0 2.13958 0.194316 1.94578 0.428312 1.94578H2.17774C2.53311 1.94578 2.84238 1.69318 2.92233 1.33679L3.01394 0.927591C3.15632 0.370196 3.6249 0 4.16116 0H6.63884Z'
                  fill='white'
                />
              </svg>
              <p className='hidden md:block'>حدف</p>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default User;
