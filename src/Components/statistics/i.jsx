import { useRef, useEffect, useState } from "react";
import { LatestUsers, LatestTransactions, Footer } from "../index";
import ApexCharts from "apexcharts";
import ExportCSV from "../ExportCSV/ExportCSV";
import Cookies from "js-cookie";
import { BaseUrl } from "../../config";

function Statistics() {
  /*
   * Ref
   */

  const MainChart = useRef();
  const DonutRef = useRef();

  /*
   * satate
   */
  const [UsersList, setUsersList] = useState([]);
  const [Sub, setSub] = useState([]);
  const [data, setdata] = useState([]);
  const [SumValues, setSumValues] = useState(0);
  const [IncomeGrowth, setIncomeGrowth] = useState("0%");
  const [LastWeekIncome, setLastWeekIncome] = useState([]);

  /*
   * Fetch Latest Subscribes to flexi app
   *
   */
  const fetchSub = (token) => {
    fetch(`${BaseUrl}/profile/GetLatestSub`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSub(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /*
   * Retirve All Users list
   */
  const fetchData = (token) => {
    fetch(`${BaseUrl}/Data/GetAllUsers`, {
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
        setUsersList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
        console.log(data.SumValue);
        let ExportCSV;
        data.map((item) => {
          ExportCSV.push({ value: item.SumValue, date: item.Transaction_date });
        });
        setLastWeekIncome(ExportCSV);
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
              color: "#527AFF",
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
            labels: {
              style: {
                colors: ["#747373"],
                fontSize: "14px",
                fontWeight: 500,
              },
              formatter: function (value) {
                return "$" + value;
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
        setIncomeGrowth(`${data.Growth}%`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*
   *Use Effect
   */
  useEffect(() => {
    const user = Cookies.get("accesToken");

    /*
     * Load Transaction Data and calculate and show in chart
     */
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
      .then((res) => {
        let Sum = 0;
        for (let i = 0; i < res.length; i++) {
          if (res[i].TypeOfTransacrion == "Incoming") {
            Sum += res[i].Transaction_Value;
          } else {
            Sum -= res[i].Transaction_Value;
          }
        }
        setdata(Sum);

        new ApexCharts(DonutRef.current, {
          series: [Sum],
          colors: ["#553AFE"],
          chart: {
            type: "donut",
            width: 350,
          },
          dataLabels: {
            enabled: false,
          },

          legend: {
            show: false,
          },
          fill: {
            type: "solid",
          },
          stroke: {
            show: true,
            curve: "stepline",
            lineCap: "round",
            width: 1,
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 250,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],

          plotOptions: {
            pie: {
              expandOnClick: false,
              donut: {
                labels: {
                  size: "15%",
                  show: true,
                  name: {
                    show: true,
                    fontSize: "22px",
                    offsetY: -25,
                  },
                  value: {
                    show: true,
                    color: "#000",
                    fontFamily: "Vazirmatn",
                    fontSize: "22px",
                    fontWeight: "bold",
                    offsetY: +10,
                    formatter: function (val) {
                      return val;
                    },
                  },
                  total: {
                    show: true,
                    label: "المجموع",
                    color: "#667085",
                    fontFamily: "Vazirmatn",
                    fontSize: 18,
                    fontWeight: "thin",
                    formatter: function (w) {
                      return (
                        w.globals.seriesTotals.reduce((a, b) => {
                          return a + b;
                        }, 0) + " ريال "
                      );
                    },
                  },
                },
              },
            },
          },
        }).render();
      })
      .catch((err) => {
        console.log(err);
      });

    fetchSub(user);
    fetchData(user);
    getGraphData(user);
    GetIncomingGrowth(user);
  }, []);

  return (
    <>
      <div className='h-fit w-full bg-gray-50 relative  left-0  lg:mr-64'>
        <main className='pl-10 pr-10'>
          <div className='pt-6 px-4'>
            <div className='mb-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 '>
              <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <span className='text-2xl sm:text-3xl leading-none font-bold text-gray-900'>
                      {`${Sub.length} مشترك`}
                    </span>
                    <h3 className='text-base font-normal text-gray-500'>
                      المشتركين الجدد هذا الشهر
                    </h3>
                  </div>
                  <div className='ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold'>
                    14.6%
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
              <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
                <div className='flex items-center '>
                  <div className='flex-shrink-0 grid place-content-center h-full w-full'>
                    <p className='text-2xl sm:text-3xl leading-none font-bold text-gray-900 '>
                      لايوجد بيانات
                    </p>
                  </div>
                </div>
              </div>
              <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <span className='text-2xl sm:text-3xl leading-none font-bold text-gray-900'>
                      {`${UsersList.length} حساب`}
                    </span>
                    <h3 className='text-base font-normal text-gray-500'>
                      المسجلين لهذا الشهر
                    </h3>
                  </div>
                  <div className='ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold'>
                    -2.7%
                    <svg
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fillRule='evenodd'
                        d='M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4'>
              <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2'>
                <div className='flex  w-full items-center justify-between mb-4'>
                  <div className='  flex flex-col sm:flex-row   items-start sm:items-center gap-5'>
                    <h3 className=' font-black  text-3xl text-gray-900'>
                      {`${SumValues} ريال`}
                    </h3>
                    <p className='text-gray-400 '>اشتراكات هذا الأسبوع</p>
                    <div className='flex items-center justify-center  w-fit rounded-md py-2 px-2  bg-green-50 text-green-500  font-bold  '>
                      <p className='flex-0'> {IncomeGrowth}</p>

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

                  <ExportCSV
                    data={LastWeekIncome}
                    headers={[
                      {
                        key: "value",
                        name: "قيمة",
                      },
                      {
                        key: "date",
                        name: "التاريخ",
                      },
                    ]}
                  />
                </div>
                <div dir='ltr' id='main-chart' ref={MainChart} />
              </div>

              <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  overflow-hidden  '>
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex-shrink-0'>
                    <h3 className=' font-black text-3xl text-gray-900'>
                      مصادر الأرباح
                    </h3>
                  </div>
                  <ExportCSV data={LastWeekIncome} fileName={"file"} />
                </div>
                <div className='h-full flex  flex-col items-center'>
                  <div
                    id='main-chart'
                    className=' w-fit mr-auto ml-auto '
                    ref={DonutRef}
                  />
                  <div className='h-full w-full  '>
                    <ul className='w-full h-full flex flex-col gap-6 py-10  '>
                      <InComeItem value={data} />
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4 gap-3'>
              <LatestUsers />
              <LatestTransactions />{" "}
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
}

function InComeItem({ value }) {
  return (
    <li className='flex flex-row justify-between'>
      <div className=' grid grid-cols-[10px,1fr] items-center gap-1'>
        <div className='flex-0 rounded-full bg-orange-500 w-1 aspect-square'></div>
        <p className='font-light text-sm text-gray-400'>ارباح الإشتراكات</p>
      </div>
      <h3 className='font-semibold'>{`${value}ريال`}</h3>
    </li>
  );
}

export default Statistics;
