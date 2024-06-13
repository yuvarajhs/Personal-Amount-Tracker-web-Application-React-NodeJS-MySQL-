import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Title } from 'chart.js';
import Axios from 'axios';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Title);

const LineChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const fetchData = async () => {
    try {
      const creditsResponse = await Axios.get("http://localhost:8081/getCredits");
      const debitsResponse = await Axios.get("http://localhost:8081/getDebits");

      const creditsData = creditsResponse.data;
      const debitsData = debitsResponse.data;

      // Extract labels (dates) and data (credits and debits)
      const labels = creditsData.map(item => new Date(item.date).toLocaleDateString()).concat(debitsData.map(item => new Date(item.date).toLocaleDateString()));

      const creditValues = creditsData.map(item => item.credit);
      const debitValues = debitsData.map(item => item.debit);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Credits',
            data: creditValues,
            fill: false,
            borderColor: 'green',
            tension: 0.4,
          },
          {
            label: 'Debits',
            data: debitValues,
            fill: false,
            borderColor: 'red',
            tension: 0.4,
          }
        ]
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'black',
        },
      },
      title: {
        display: true,
        text: 'Monthly Credits & Debits',
        color: 'black',
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Dates',
          color: 'black',
          font: {
            size: 16,
          },
        },
        ticks: {
          color: 'black',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount',
          color: 'black',
          font: {
            size: 16,
          },
        },
        ticks: {
          color: 'black',
        },
      },
    },
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', color: 'black' }}></h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
