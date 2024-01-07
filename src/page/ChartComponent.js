import React, { useEffect, useState } from 'react'
import Navbar from '../component/navbar/Navbar'
import SideBar from '../component/sideBar/SideBar'
import { Chart } from 'chart.js';
import 'chart.js/auto'; // ADD THIS
import { SITE } from '../App';
import axios from 'axios';
import { useSelector } from "react-redux";
import { DatePicker, Space } from 'antd';
import * as echarts from 'echarts';
export default function ChartComponent() {

  const user = useSelector(({ users }) => {
    return users.currentUser
  })
  const [chartDom, setChartDom] = useState()
  const [chartIncome, setChartIncome] = useState()
  const [chartExpense, setChartExpense] = useState()
  const [arrObjIncome, setArrObjIncome] = useState()
  const [arrObjExpense, setArrObjExpense] = useState()

  const [arrayIncome, setArrayIncome] = useState()
  const [arrayExpense, setArrayExpense] = useState()
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [message, setMessage] = useState(null);
  //! month picker

  const onChange = (date, dateString) => {
    console.log(dateString);
    const [yearString, monthString] = dateString.split('-');
    console.log(yearString);
    console.log(monthString);
    // setDateValue(dateString)
    setMonth(monthString)
    setYear(yearString)
  };

  useEffect(() => {
    const currentDate = new Date();
    console.log(currentDate.getMonth());
    // Lấy thông tin ngày, tháng, năm
    setMonth(currentDate.getMonth() + 1 < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1)
    setYear(currentDate.getFullYear())
  }, [])
  useEffect(() => {
    setChartDom(document.getElementById('chartDom'))
  }, [])
  useEffect(() => {
    setChartIncome(document.getElementById('chart-income'))
  }, [])


  const getArrayMonth = async () => {
    const resArrayMonth = await axios.get(`${SITE}/fill/netIncome/month/${user.user_id}-
    ${month}-${year}
    `);
    // 

    if (resArrayMonth.data.message) {
      setMessage(resArrayMonth.data.message)
    } else {
      setArrayExpense(resArrayMonth.data.arrExpense.map(function (str) {
        // let number = parseInt(str, 10); // Chuyển đổi từ chuỗi sang số nguyên
        // return isNaN(number) ? NaN : -Math.abs(number); // Giữ nguyên dấu âm
        return parseInt(str, 10); // Chuyển đổi từ chuỗi sang số nguyên

      }))
      setArrayIncome(resArrayMonth.data.arrIncome.map(function (str) {
        return parseInt(str, 10); // Chuyển đổi từ chuỗi sang số nguyên
      }))
      setMessage(null)
    }


  }
  useEffect(() => {
    getArrayMonth()
  }, [month, year]);

  useEffect(() => {
    if (chartDom) {
      var myChart = echarts.init(chartDom, null, {
        // width: 500,
        // height: 500
      });
      var option;
      var emphasisStyle = {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.3)'
        }
      };
      option = {
        legend: {
          data: ['Income', 'Expense'],
          left: '10%'
        },

        tooltip: {},
        xAxis: {
          data: ['1-6', '7-13', '14-20', '21-26', '27-31'],
          name: 'Ngày',
          axisLine: { onZero: true },
          splitLine: { show: false },
          splitArea: { show: false }
        },
        yAxis: {},
        grid: {
          bottom: 100
        },
        series: [
          {
            name: 'Income',
            type: 'bar',
            stack: 'one',
            emphasis: emphasisStyle,
            data: arrayIncome
          },
          {
            name: 'Expense',
            type: 'bar',
            stack: 'one',
            emphasis: emphasisStyle,
            data: arrayExpense
          },

        ]
      };

      option && myChart.setOption(option);
    }

  }, [chartDom, arrayIncome, arrayExpense])

  //! chart income
  const getArrayIncomeData = async () => {
    
    const resArrayIncomeData = await axios.get(`${SITE}/fill/category/income/${user.user_id}-
    ${month}-${year}
    `);
    const resArrayExpenseData = await axios.get(`${SITE}/fill/category/expense/${user.user_id}-
    ${month}-${year}
    `);
    // 

    console.log(resArrayExpenseData);
    console.log(resArrayExpenseData.data);
    setArrObjExpense(resArrayExpenseData.data)
    setArrObjIncome(resArrayIncomeData.data)

  }
  useEffect(() => {
    getArrayIncomeData()
  }, [month, year]);

  console.log(arrObjIncome);

  useEffect(() => {
    console.log(arrObjIncome);

    if (chartIncome && arrObjIncome !== undefined) {
      console.log(arrObjIncome);
      var myChartIncome = echarts.init(chartIncome, null, {

      });
      var option;

      option = {

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: 10,
          left: 'center',
          data: arrObjIncome.arrayCategoryName

        },
        series: [
          {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: arrObjIncome.arrayCategoryValue
            ,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      option && myChartIncome.setOption(option);
    }

  }, [chartIncome, arrObjIncome])

  //! chart expense
  useEffect(() => {
    setChartExpense(document.getElementById('chart-expense'))
  }, [])
  useEffect(() => {

    if (chartExpense && arrObjExpense !== undefined) {
      console.log(arrObjExpense);
      var myChartExpense = echarts.init(chartExpense, null, {

      });
      var option;

      option = {

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: 10,
          left: 'center',
          data: arrObjExpense.arrayCategoryName

        },
        series: [
          {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: arrObjExpense.arrayCategoryValue
            ,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      option && myChartExpense.setOption(option);
    }

  }, [chartExpense, arrObjExpense])

  if (message == "Không có dữ liệu") {
    setArrayExpense(null)
    setArrayIncome(null)
    setMessage(null)
  }

  return (
    <>
      <div class='container-navbar-side' style={{ paddingLeft: 80 }}>
        <Navbar />
      </div>
      <SideBar />
      <div class='month-picker'>
        <p >Pick month:</p>
        <DatePicker onChange={onChange} picker="month" />
      </div>

      <div class='body-chart'>
        {!arrayIncome ?
          <div class='container-bar-chart'>
            <div id="chartDom" >
            </div>

            <div class='titleChart'>Không có dữ liệu</div>

          </div>
          :
          <div class='container-bar-chart'>
            <div id="chartDom" >
            </div>
            <div class='titleChart'>Biểu đồ thu nhập ròng tháng {month}-{year}</div>

          </div>
        }

        <div class='container-income-chart'>
          <div id="chart-income" >
          </div>
          <div class='titleChart'>Khoản thu</div>

        </div>

        <div class='container-expense-chart'>
          <div id="chart-expense" >
          </div>
          <div class='titleChart'>Khoản chi</div>

        </div>

      </div>



    </>
  )
}
