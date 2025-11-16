import React, { useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  Filler,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

// Înregistrăm toate modulele
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  Filler,
  TimeScale,
  zoomPlugin
);

const PriceChart = () => {
  const chartRef = useRef(null);

  // Generăm date simulate pentru o lună
  const generateData = () => {
    const labels = [];
    const prices = [];
    let price = 1.0;
    for (let i = 1; i <= 30; i++) {
      labels.push(`2025-11-${i.toString().padStart(2, "0")}`);
      price += (Math.random() - 0.5) * 0.1;
      prices.push(price.toFixed(2));
    }
    return { labels, prices };
  };

  const { labels, prices } = generateData();

  const data = {
    labels,
    datasets: [
      {
        label: "Preț SBYT",
        data: prices,
        borderColor: "#FFD700",
        backgroundColor: "rgba(255, 215, 0, 0.15)",
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#fff" },
      },
      title: {
        display: true,
        text: "Evoluția prețului SBYT",
        color: "#FFD700",
        font: { size: 18 },
      },
      zoom: {
        pan: { enabled: true, mode: "x" },
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: "x",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ddd",
          maxRotation: 60,
          minRotation: 0,
          autoSkip: false, // afișează toate datele
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
      y: {
        ticks: {
          color: "#ddd",
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
    },
  };

  useEffect(() => {
    const chart = chartRef.current;
    return () => chart && chart.destroy && chart.destroy();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1300px",
        height: "400px",
        background: "rgba(20, 25, 35, 0.85)",
        borderRadius: "16px",
        padding: "1.5rem",
        boxShadow: "0 0 25px rgba(255,215,0,0.15)",
        overflowX: "auto",
      }}
    >
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default PriceChart;

