import {
  Chart as ChartJS,
  Interaction,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import * as chartjsPluginCrosshair from 'chartjs-plugin-crosshair';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  (chartjsPluginCrosshair as any).CrosshairPlugin,
);
(Interaction.modes as any).interpolate = (chartjsPluginCrosshair as any).Interpolate;

// console.log('Checking crosshair', chartjsPluginCrosshair);

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Line Chart - Multi Axis',
    },
    zoom: {
      zoom: {
        drag: {
          enabled: true,
        },
        mode: 'x',
      },
    },
    tooltip: {
      mode: 'interpolate' as any,
      intersect: false,
      callbacks: {
        title: function (a) {
          return a[0].element.x.toFixed(2);
        },
        label: function (d) {
          return d.chart.data.datasets[d.datasetIndex].label + ': ' + d.element.y.toFixed(2);
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        drawOnChartArea: false,
      },
    },
    y: {
      type: 'linear',
      display: true,
      position: 'left',
      grid: {
        drawOnChartArea: false,
      },
    },
    x1: {
      grid: {
        drawOnChartArea: false,
      },
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const chartJsData: ChartData<'line'> = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      xAxisID: 'x',
      yAxisID: 'y',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      xAxisID: 'x1',
      yAxisID: 'y1',
    },
  ],
};

function CharJsLineTest() {
  return (
    <>
      <Line options={chartOptions} data={chartJsData} style={{ height: '400px' }} />
      <Line options={chartOptions} data={chartJsData} style={{ height: '400px' }} />

      {/* <div style={{ height: "200px" }}>
        
      </div>
      <div style={{ height: "200px" }}>
        
      </div> */}
    </>
  );
}

export default CharJsLineTest;
