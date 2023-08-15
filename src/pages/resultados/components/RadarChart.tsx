import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
  SubTitle
} from 'chart.js';

import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
  SubTitle
);

const borders = [
  '#A94136',
  '#407D6C',
  '#B5C7CC',
  '#BE529E',
  '#D5273E',
  '#F76150',
  '#FEC4B9',
  '#FEC4B9',
  '#01BDCC',
  '#3EA285',
];

interface RadarChartProps {
  data: Array<{ Pentagono: { MPED: number, MCOM: number, MGES: number, MINV: number, MTEC: number }, Nombre: string }>;
  isTeacher: boolean;
  showTittle: boolean;
  showLabel: boolean;
}

const RadarChart: React.FC<RadarChartProps> = (props) => {
  var datas: any[] = [];
  var contador = 0;
  const data_pentagono = props.data;

  //console.log('In radar chart');
  //console.log(props);
  //console.log(data_pentagono);

  data_pentagono.forEach(element => {
    const values_pentagono = element.Pentagono;
    var VALUES_LIST = [values_pentagono["MPED"], values_pentagono["MCOM"], values_pentagono["MGES"], values_pentagono["MINV"], values_pentagono["MTEC"]];

    datas.push({
      label: props.isTeacher ? "Momento" : element.Nombre,
      data: VALUES_LIST,
      borderColor: borders[contador],
      borderWidth: 4,
      pointHoverBackgroundColor: borders[contador],
      pointHoverBorderColor: '#fff',
      pointBackgroundColor: borders[contador],
      pointBorderColor: borders[contador]
    });
    contador++;
  });

  datas.push(
    {
      backgroundColor: "#ffffff",
      pointRadius: 0,
      borderWidth: 0,
      data: [1, 1, 1, 1, 1]
    },
    {
      backgroundColor: "#00b4d8",
      pointRadius: 0,
      borderWidth: 0,
      data: [2, 2, 2, 2, 2]
    },
    {
      backgroundColor: "#0077b6",
      pointRadius: 0,
      borderWidth: 0,
      data: [3, 3, 3, 3, 3]
    },
    {
      backgroundColor: "#03045e",
      pointRadius: 0,
      borderWidth: 0,
      //borderWidth: 0.5,
      borderColor: '#000000',
      data: [4, 4, 4, 4, 4]
    },
  );

  const data = {
    labels: ['Competencia Pedagógica', 'Competencia Comunicativa', 'Competencia De Gestión', 'Competencia Investigativa', 'Competencia Tecnológica'],
    datasets: datas
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, //para que su tamaño no sea menor al div
    layout: {
      padding: 5
    },
    tooltips: {
      callbacks: {
        title: (tooltipItem, data) => data.labels[tooltipItem[0].index]
      }
    },
    animation: {
      duration: 2
    },
    plugins: {
      title: {
        display: props.showTittle,
        text: 'PENTÁGONO DE COMPETENCIAS',
        paddingTop: 4
      },
      subtitle: {
        display: false,
        text: 'AQUÍ VA UN SUBTÍTULO'
      },
      legend: {
        display: props.showLabel,
        labels: {
            filter: function (item, chart) {
              return item.datasetIndex !== datas.length - 4 && item.datasetIndex !== datas.length - 3 && item.datasetIndex !== datas.length - 2 && item.datasetIndex !== datas.length - 1;
            }
        }
      },
      tooltip: {
        enabled: true,
        callbacks: {
            label: function(context) {
              let label = context.formattedValue;
              if (label === "1,5") {
                  label = "  Momento Explorador";
              } else if (label === "2,5"){
                label = "  Momento Integrador";
              } else {
                label = "  Momento Innovador";
              }
              return label;
            }
        }
      }
    },

    elements: {
      point: {
        radius: 5
      }
    },

    scales: {
        r: {
          grid: {
              color: ['#6996D3', '#4380D3', '#05316D'],
              //lineWidth: 0.5, 
              //borderDashOffset: 50,
              //offset: true, 
              //tickLength: 100, 
              //tickWidth: 500,
          },
          max: 4,
          min: 0,
          //startAngle: 36,
          ticks: {
              stepSize: 1,
              //maxTicksLimit: 5, 
              //stepSize: 1,
              //count: 3
              //backdropPadding: 50, 
              display: false,
              //padding: 50
          },
          angleLines: {
              display: true,
              //color:"#000000",
              //lineWidth: 50, 
              //borderDashOffset: -5000
          },
          pointLabels: {
              display: true,
              //padding: 35,
              //centerPointLabels: true,
              //color: ['red', 'green', 'blue', 'violet', 'salmon']
              font: {
                size: 13
              }
          }
        }
    },
  };

  return (
    <>
      <Radar
        data={data}
        options={options}
      />
    </>
  );
};

export default RadarChart;