import { useRef, useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import Cookies from "js-cookie";

import { LatestUsers, LatestTransactions, Footer } from "../index";
import { BaseUrl } from "../../config.js";

function Main() {
  /*
   * Ref
   */
  const MainChart = useRef();

  /*
   * satate
   */
  const [Sub, setSub] = useState([]);
  const [SumValues, setSumValues] = useState(0);
  const [IncomeGrowth, setIncomeGrowth] = useState({
    Growth: 0,
    UsersGrowth: 0,
    SubsGrowth: 0,
  });

  /*
   * Retirve Main Graph Data
   */
  const getGraphData = (token) => {
    fetch(`${BaseUrl}/Data/getMainGraphData`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        new ApexCharts(MainChart.current, {
          chart: {
            height: 420,
            type: "area",
            fontFamily: "Inter, sans-serif",
            foreColor: "#747373",
            toolbar: {
              show: false,
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 90, 100],
            },
          },
          dataLabels: {
            enabled: false,
          },
          tooltip: {
            style: {
              fontSize: "14px",
              fontFamily: "Vazirmatn, sans-serif",
            },
          },
          grid: {
            show: false,
          },
          series: [
            {
              name: "Revenue",
              data: data.SumValue,
              color: "#42B27E",
            },
          ],

          xaxis: {
            categories: data.Transaction_date,
            labels: {
              style: {
                colors: ["#747373"],
                fontSize: "14px",
                fontWeight: 500,
              },
            },
            axisBorder: {
              color: "#747373",
            },
            axisTicks: {
              color: "#747373",
            },
          },
          yaxis: {
            opposite: true,

            labels: {
              style: {
                colors: ["#747373"],
                fontSize: "14px",
                fontWeight: 100,
              },
              formatter: function (value) {
                return ` ${value} ريال`;
              },
            },
          },
          responsive: [
            {
              breakpoint: 1024,
              options: {
                xaxis: {
                  labels: {
                    show: false,
                  },
                },
              },
            },
          ],
        }).render();
        setSumValues(data.SumValue.reduce((a, b) => a + b, 0));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*
   * Retirve Income Growth
   */
  const GetIncomingGrowth = (token) => {
    fetch(`${BaseUrl}/Data/GetIncomingGrowth`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIncomeGrowth(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchSub = (token) => {
    fetch(`${BaseUrl}/Data/GetLatestSub`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        limit: 10,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSub(data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //UseEffect
  useEffect(() => {
    fetchSub(Cookies.get("accesToken"));
    getGraphData(Cookies.get("accesToken"));
    GetIncomingGrowth(Cookies.get("accesToken"));
  }, []);

  //Jsx
  return (
    <>
      <div className='h-fit w-full bg-gray-50 relative  left-0  lg:mr-64'>
        <main className='pl-10 pr-10'>
          <div className='pt-6 px-4'>
            <div className='w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4'>
              <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2 '>
                <div className='flex items-center justify-between mb-4'>
                  <div className='  flex flex-col sm:flex-row   items-start sm:items-center gap-5'>
                    <h3 className=' font-black  text-3xl text-gray-900'>
                      {`${SumValues} ريال`}
                    </h3>
                    <p className='text-gray-400 '>اشتراكات هذا الأسبوع</p>
                    <div className='flex items-center justify-center  w-fit rounded-md py-2 px-2  bg-green-50 text-green-500  font-bold  '>
                      <p className='flex-0'> {`${IncomeGrowth.Growth}%`}</p>

                      <svg
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          fillRule='evenodd'
                          d='M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                  </div>
                </div>{" "}
                <div dir='ltr' id='main-chart' ref={MainChart} />
              </div>{" "}
              <LatestTransactions />
            </div>{" "}
            <div className='mt-4 w-full grid grid-cols-1  gap-4 '>
              <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <span className='text-2xl sm:text-3xl leading-none font-bold text-gray-900'>
                      {`${Sub} مشترك`}
                    </span>
                    <h3 className='text-base font-normal text-gray-500'>
                      المشتركين الجدد هذا الشهر
                    </h3>
                  </div>
                  <div
                    className={`ml-5 w-0 flex items-center justify-end flex-1 ${
                      IncomeGrowth.SubsGrowth > 0
                        ? "text-green-500 "
                        : "text-red-500 "
                    }text-base font-bold`}>
                    {`${IncomeGrowth.SubsGrowth}%`}
                    <svg
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fillRule='evenodd'
                        d='M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className='grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4 gap-3'>
              <LatestUsers />
            </div>{" "}
          </div>{" "}
          <Footer />
        </main>{" "}
      </div>{" "}
    </>
  );
}

function filterDatesByCurrentWeek(dates) {
  let [start, end] = getWeekDates();
  return dates.filter((d) => +d >= +start && +d < +end);
}

function getWeekDates() {
  let now = new Date();
  let dayOfWeek = now.getDay(); //0-6
  let numDay = now.getDate();

  let start = new Date(now); //copy
  start.setDate(numDay - dayOfWeek);
  start.setHours(0, 0, 0, 0);

  let end = new Date(now); //copy
  end.setDate(numDay + (7 - dayOfWeek));
  end.setHours(0, 0, 0, 0);

  return [start, end];
}

export default Main;
