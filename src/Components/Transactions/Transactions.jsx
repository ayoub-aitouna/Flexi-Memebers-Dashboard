import { useState, useEffect } from "react";
import { BaseUrl } from "../../config";
import Cookies from "js-cookie";
import { MonthsNames } from "../../config";

function Transactions() {
  const [UsersList, setUsersList] = useState([]);
  const [FiltredResault, setFiltredResault] = useState([]);
  const [Search, setSearch] = useState([]);
  const [AllSelected, setAllSelected] = useState(false);

  const [data, setdata] = useState([]);

  useEffect(() => {
    const user = Cookies.get("accesToken");

    fetch(`${BaseUrl}/profile/getLastTransactions`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setdata(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className='h-fit w-screen md:w-full   relative  left-0  lg:mr-64  overflow-hidden'>
        <div className='flex items-start  mb-4 flex-col mr-3'>
          <h3 className='text-xl font-bold leading-none text-gray-900  p-4 sm:p-6 '>
            التحويلات
          </h3>{" "}
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
              value={Search}
              onChange={(e) => {
                setSearch(e.target.value);
                setFiltredResault(
                  UsersList.filter(
                    (item) =>
                      (item.gym_name != null &&
                        item.gym_name.includes(e.target.value)) ||
                      (item.category != null &&
                        item.category.includes(e.target.value)) ||
                      (item.location != null &&
                        item.location.includes(e.target.value)) ||
                      (item.phonenumber != null &&
                        item.phonenumber.includes(e.target.value)) ||
                      (item.gym_name == null &&
                        "إسم النادي".includes(e.target.value))
                  )
                );
              }}
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pr-10 p-2.5'
              placeholder='  ابحث عن عنصر'
            />
          </div>
        </div>{" "}
        <div className='flow-root w-full overflow-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='p-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider  '>
                  <input
                    type='checkbox'
                    name=''
                    id=''
                    checked={AllSelected}
                    onClick={() => {
                      setAllSelected(!AllSelected);
                    }}
                  />
                  <span className='m-2'> التحويلات</span>
                </th>{" "}
                <th
                  scope='col'
                  className='p-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider '>
                  التاريخ
                </th>{" "}
                <th
                  scope='col'
                  className='p-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider '>
                  القيمة
                </th>{" "}
                <th
                  scope='col'
                  className='p-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider '>
                  نوع تحويل
                </th>
              </tr>{" "}
            </thead>{" "}
            <tbody className='bg-white '>
              {data.map((items) => (
                <>
                  <TransactionItem data={items} isSelected={AllSelected} />
                </>
              ))}{" "}
            </tbody>{" "}
          </table>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}

function TransactionItem({ data }) {
  const date = new Date(data.Transaction_date);
  const currentDate = `${date.getDate()} ${
    MonthsNames[date.getMonth()]
  } ${date.getFullYear()}`;
  return (
    <>
      <tr>
        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900 grid grid-rows-2'>
          {data.TypeOfTransacrion == "Incoming"
            ? "تم الدفع من "
            : "تم الدفع إلى "}
          <span className='font-semibold '> {data.full_name}</span>
        </td>
        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-500'>
          {currentDate}
        </td>
        <td className='p-4 whitespace-nowrap text-sm font-semibold text-gray-900'>
          {data.Transaction_Value}
        </td>

        <td className='p-4 whitespace-nowrap text-sm font-semibold text-gray-900'>
          {data.TypeOfTransacrion == "Incoming" ? "واردة" : "الصادرة"}
        </td>
      </tr>
    </>
  );
}
export default Transactions;
