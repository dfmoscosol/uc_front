import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface HorizontalBarChartProps {
  competencias: {
    pedagogica: number;
    comunicativa: number;
    gestion: number;
    investigativa: number;
    tecnologica: number;
  };
}

// Función para generar una escala monocromática
const generateMonochromeScale = (baseColor: string, steps: number): string[] => {
  const lightenColor = (color: string, percent: number) => {
    const num = parseInt(color.slice(1), 16);
    const r = Math.min(255, (num >> 16) + percent);
    const g = Math.min(255, ((num >> 8) & 0x00ff) + percent);
    const b = Math.min(255, (num & 0x0000ff) + percent);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const scale: string[] = [];
  for (let i = 0; i < steps; i++) {
    scale.push(lightenColor(baseColor, i * 40)); // Incrementa la claridad con cada paso
  }
  return scale;
};

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({ competencias }) => {
  const sortedData = Object.entries(competencias).sort(
    (a, b) => b[1] - a[1]
  );

  const labels = sortedData.map(
    ([key]) => `Competencia ${key.charAt(0).toUpperCase() + key.slice(1)}`
  );
  const dataValues = sortedData.map(([_, value]) => value);

  // Generar escala monocromática
  const colors = generateMonochromeScale("#002856", 5);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Horas Acreditadas",
        data: dataValues,
        backgroundColor: colors,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const, // Cambia el eje para barras horizontales
    responsive: true,
    plugins: {
      legend: {
        display: false, // Ocultar leyenda para un diseño más limpio
      },
      
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Horas",
        },
      },
      
    },
  };

  return <Bar data={data} options={options} />;
};

export default HorizontalBarChart;
