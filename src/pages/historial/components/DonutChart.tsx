import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
  ChartData,
  Plugin,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Registra solo los elementos necesarios de Chart.js globalmente
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// No registres el plugin globalmente aquí

interface DonutChartProps {
  eventos: {
    [tipoEvento: string]: number;
  };
}

const centerTextPlugin: Plugin<'doughnut'> = {
  id: "centerText",
  beforeDraw: (chart) => {
    const { width, height, ctx } = chart;
    const centerX = width / 2;
    const centerY = height / 2;

    const dataValues = chart.data.datasets[0].data as number[];

    let totalHours = 0;

    dataValues.forEach((value, index) => {
      if (chart.getDataVisibility(index)) {
        totalHours += value;
      }
    });

    ctx.save();

    // Limpiar el área del centro para evitar superposiciones
    ctx.clearRect(centerX - 50, centerY - 25, 100, 50);

    // Dibujar el número grande
    ctx.font = "bold 24px Arial";
    ctx.fillStyle = "#002856";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${totalHours}`, centerX, centerY + 25);

    // Dibujar el texto "Horas" más pequeño
    ctx.font = "16px Arial";
    ctx.fillStyle = "#002856";
    ctx.fillText("Horas", centerX, centerY + 45);

    ctx.restore();
  },
};

// No registres el plugin globalmente con ChartJS.register(centerTextPlugin);

const generateMonochromeScale = (baseColor: string, steps: number): string[] => {
  // Tu implementación existente
  const lightenColor = (color: string, percent: number) => {
    const num = parseInt(color.slice(1), 16);
    const r = Math.min(255, (num >> 16) + percent);
    const g = Math.min(255, ((num >> 8) & 0x00ff) + percent);
    const b = Math.min(255, (num & 0x0000ff) + percent);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const scale: string[] = [];
  for (let i = 0; i < steps; i++) {
    scale.push(lightenColor(baseColor, i * 40));
  }
  return scale;
};

const DonutChart: React.FC<DonutChartProps> = ({ eventos }) => {
  const fixedLabels = [
    "Jornadas de Innovación",
    "Microtalleres",
    "Charlas",
    "Acompañamiento Áulico",
    "Externos",
  ];

  const sortedEvents = fixedLabels.map((label) => ({
    label,
    value: eventos[label] || 0,
  }));

  const labels = sortedEvents.map((event) => event.label);
  const dataValues = sortedEvents.map((event) => event.value);

  const colors = generateMonochromeScale("#002856", labels.length);

  const data: ChartData<"doughnut"> = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw as number;
            return `${context.label}: ${value} horas`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  // Registramos el plugin localmente pasando 'plugins' como prop
  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
    </div>
  );
};

export default DonutChart;
