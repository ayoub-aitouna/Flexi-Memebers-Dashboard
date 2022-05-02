import React from "react";

function Alert({ options, cancle, ok }) {
  return (
    <>
      <div
        className='absolute  grid grid-rows-[2rem_1fr_auto] bg-white w-[30vw] h-[20vh] top-[50%] left-[50%]
      translate-x-[-50%] translate-y-[50%] shadow-[0px_0px_8px_rgba(0,0,0,.08)] 
      rounded-[15px]'>
        <h1 className=' text-center mt-4 font-black text-xl'>
          {options.Title}
        </h1>
        <p className='grid place-content-center'>{options.Message}</p>
        <div className='grid grid-cols-2 mb-4'>
          <div className='grid place-content-center'>
            <p
              className='bg-blue-600 rounded-md cursor-pointer  text-white py-2 px-8 grid place-content-center'
              onClick={() => ok()}>
              اريد حظر هذا الحساب
            </p>
          </div>
          <div className='grid place-content-center '>
            <p
              className='bg-red-600 rounded-md cursor-pointer text-white py-2 px-8 grid place-content-center'
              onClick={() => cancle()}>
              لا أريد حظر هذا الحساب
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Alert;
