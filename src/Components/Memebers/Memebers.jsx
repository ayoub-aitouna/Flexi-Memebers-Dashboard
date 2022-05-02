import { useState, useEffect } from "react";
import Memeber from "./Memeber";
import { BaseUrl } from "../../config";
import Cookies from "js-cookie";

function Users() {
  const [UsersList, setUsersList] = useState([]);

  useEffect(() => {
    const Token = Cookies.get("accesToken");

    fetch(`${BaseUrl}/Members/getMembers`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
      body: JSON.stringify({ id: 1 }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsersList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className='  md:w-[80%]   relative  left-0  lg:mr-64 pr-10 overflow-hidden bg-transparent h-fit '>
        <div className='flex items-start  mb-4 flex-col mr-3'>
          <h3 className='text-xl font-bold leading-none text-gray-900  p-4 sm:p-6 '>
            المستخدمين
          </h3>{" "}
        </div>{" "}
        <div className='flow-root w-full overflow-auto'>
          <table
            className='min-w-full  bg-white  rounded-xl py-10 px-10'
            style={{ "border-collapse": "inherit" }}>
            <thead className='w-full '>
              <tr className=' w-full '>
                <th
                  scope='col'
                  className=' text-right text-xs font-bold text-gray-500 uppercase tracking-wider  h-[52px]'>
                  <div className='w-full flex  justify-center h-full '>
                    <div className=' h-full rounded-lg bg-gray-300 text-[14px] flex flex-row justify-center items-center gap-3 text-white w-[272px] '>
                      <input
                        type='text'
                        placeholder='الإسم الكامل'
                        className='bg-transparent w-full h-full pr-5'
                      />
                    </div>
                  </div>
                </th>{" "}
                <th
                  scope='col'
                  className=' text-right text-xs font-medium text-gray-500 uppercase tracking-wider h-[52px]'>
                  <div className='w-full flex  justify-center h-full'>
                    <div className=' h-full rounded-lg bg-gray-300 text-[14px] flex flex-row justify-center items-center gap-3 text-white w-[272px]'>
                      <input
                        type='text'
                        placeholder='البريد الإلكتروني'
                        className='bg-transparent w-full h-full pr-5'
                      />
                    </div>
                  </div>
                </th>{" "}
                <th
                  scope='col'
                  className=' text-right text-xs font-medium text-gray-500 uppercase tracking-wider h-[52px] '>
                  <div className='w-full flex  justify-center h-full'>
                    <div className=' h-full rounded-lg bg-gray-300 text-[14px] flex flex-row justify-center items-center gap-3 text-white w-[272px]'>
                      <input
                        type='text'
                        placeholder='رقم الهاتف'
                        className='bg-transparent w-full h-full pr-5'
                      />
                    </div>
                  </div>
                </th>{" "}
                <th
                  scope='col'
                  className='text-right text-xs font-medium text-gray-500 uppercase tracking-wider h-[52px]'>
                  <div className='w-full h-full rounded-lg bg-border_color text-[14px] flex flex-row justify-center items-center gap-3 text-white '>
                    <svg
                      width='15'
                      height='15'
                      viewBox='0 0 15 15'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M7.25 1C7.25 1.8 7.25 9.66667 7.25 13.5'
                        stroke='white'
                        stroke-width='1.6'
                        stroke-linecap='round'
                      />
                      <path
                        d='M1 7.25C1.8 7.25 9.66667 7.25 13.5 7.25'
                        stroke='white'
                        stroke-width='1.6'
                        stroke-linecap='round'
                      />
                    </svg>
                    <p>إضافة عضو</p>
                  </div>
                </th>{" "}
              </tr>{" "}
            </thead>{" "}
            <tbody className=''>
              {" "}
              {UsersList.map((items, index) => (
                <>
                  <Memeber key={index} user={items} count={index} />
                </>
              ))}{" "}
            </tbody>{" "}
          </table>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}

export default Users;
