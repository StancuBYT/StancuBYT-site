import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { request, gql } from 'graphql-request';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UNISWAP_SUBGRAPH_URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";

export default function PriceChart({ pairAddress }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const query = gql`
        query ($pairAddress: String!) {
          pool(id: $pairAddress) {
            token1Price
          }
        }
      `;

      try {
        const response = await request(UNISWAP_SUBGRAPH_URL, query, { pairAddress: pairAddress.toLowerCase() });
        const chartData = [...data, { time: new Date().toLocaleTimeString(), price: parseFloat(response.pool.token1Price) }];
        setData(chartData.slice(-20)); // ultimele 20 puncte
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [pairAddress]);

  const chartData = {
    labels: data.map(d => d.time),
    datasets: [
      {
        label: 'STBYT Price (USD)',
        data: data.map(d => d.price),
        borderColor: 'rgba(255,255,255,0.8)',
        backgroundColor: 'rgba(155,48,255,0.5)',
        tension: 0.3,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: 'white' } },
      title: { display: true, text: 'StancuBYT Live Price', color: 'white' }
    },
    scales: {
      x: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.2)' } },
      y: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.2)' } },
    }
  };

  return <Line data={chartData} options={options} />;
}

