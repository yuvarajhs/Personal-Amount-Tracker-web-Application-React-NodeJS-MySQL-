import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Axios from 'axios';

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const CreditPieChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#57f276",
          "#406466",
          "#c1db69",
          "#f7b0d1",
          "#bccccc"
        ],
        borderColor: "#D1D6DC"
      }
    ]
  });

  const getDebitData = async () => {
    try {
      const response = await Axios.get("http://localhost:8081/getcredits");
      const result = response.data;
      console.log("result", result);

      // Extract labels and data from the response
      const labels = result.map(item => item.name);
      const data = result.map(item => item.credit);

      setChartData({
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              "#57f276",
              "#3F4054",
              "#c1db69",
              "#f7b0d1",
              "#bccccc"
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
        display: true,
        labels:{
            color:'black',
            font:{
                size:22
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
            size :15,
            
        },
        formatter: (value, context) => {
          return context.chart.data.labels[context.dataIndex];
        }
      }
    },
    rotation: -90, // Start angle in degrees
    circumference: 180, // Sweep angle in degrees
    cutout: "45%", // Cutout percentage
    maintainAspectRatio: true,
    responsive: true
  };

  return (
    <div >
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default CreditPieChart;