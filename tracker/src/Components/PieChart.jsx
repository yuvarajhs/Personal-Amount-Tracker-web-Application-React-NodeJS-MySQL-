
// import React, { useEffect, useState } from "react";
// import { Doughnut } from "react-chartjs-2";
// import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import Axios from 'axios'

// Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// const data = {
//   labels: ["Daily Petrol expense", "Food", "Groceries ", "Others", "EMI"],
//   datasets: [
//     {
//       data: [10, 20, 30, 10, 40],
//       backgroundColor: [
//         "#336699",
//         "#99CCFF",
//         "#999933",
//         "#666699",
//         "#CC9933"
//       ],
//       borderColor: "#D1D6DC"
//     }
//   ]
// };

// const options = {
//   plugins: {
//     legend: {
//       display: true
//     },
//     tooltip: {
//       enabled: true,
//       callbacks: {
//         label: function (context) {
//           const label = context.chart.data.labels[context.dataIndex] || '';
//           const value = context.raw;
//           return `${label}: ${value}`;
//         }
//       }
//     },
//     datalabels: {
//       color: '#fff', // Label text color
//       formatter: (value, context) => {
//         return context.chart.data.labels[context.dataIndex];
//       }
//     }
//   },
//   rotation: -90, // Start angle in degrees
//   circumference: 180, // Sweep angle in degrees
//   cutout: "25%", // Cutout percentage
//   maintainAspectRatio: true,
//   responsive: true
// };

// const PieChart = () => {
//   const [debitdata, setDebitData] = useState([])
//   const getdebitdata = async() =>{
//     const response = await fetch("http://localhost:8081/getDebits",{
//       method:"Get"
//     }) ;
//     const result = await response.json();
//     console.log("result",result);
//     setDebitData(result);
    
    
//   }
//   useEffect(()=>{
//     getdebitdata();

//   },[])
 
//   return (
//     <div className="pieChart" >
//       <Doughnut data= {debitdata.map((item,index)=>item.debit)}
//       options={options} />
//     </div>
//   );
// };

// export default PieChart;



import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Axios from 'axios';

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#336699",
          "#99CCFF",
          "#999933",
          "#666699",
          "#CC9933"
        ],
        borderColor: "#D1D6DC"
      }
    ]
  });

  const getDebitData = async () => {
    try {
      const response = await Axios.get("http://localhost:8081/getDebits");
      const result = response.data;
      console.log("result", result);

      // Extract labels and data from the response
      const labels = result.map(item => item.name);
      const data = result.map(item => item.debit);

      setChartData({
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              "#8FA7FF",
              "#FFF88F",
              "#B5FFF9",
              "#94FF99",
              "#FFB0B0"
            ],
            borderColor: "#D1D6DC"
          }
        ]
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDebitData();
  }, []);

  const options = {
    plugins: {
      legend: {
        display: false,
        labels:{
          color:'black',
          font:{
            size:20
          }
        }
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            const label = context.chart.data.labels[context.dataIndex] || '';
            const value = context.raw;
            return `${label}: ${value}`;
          }
        }
      },
      datalabels: {
        color: 'black', // Label text color
        font:{
          size:15
        },
        formatter: (value, context) => {
          return context.chart.data.labels[context.dataIndex];
        }
      }
    },
    rotation: -90, // Start angle in degrees
    circumference: 180, // Sweep angle in degrees
    cutout: "15%", // Cutout percentage
    maintainAspectRatio: true,
    responsive: true
  };

  return (
    <div >
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
