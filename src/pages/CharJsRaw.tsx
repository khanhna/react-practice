import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { enableHorizontalCrosshairLineChartPlugin } from 'src/components/ChartJs/Line';

ChartJS.register(
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
);

const chartOptions: ChartOptions = {
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
    tooltip: {
      enabled: true,
    },
    zoom: {
      zoom: {
        drag: {
          enabled: true,
          modifierKey: 'shift',
        },
        mode: 'x',
      },
      pan: {
        enabled: true,
        mode: 'x',
      },
    },
  },
  scales: {
    xLower: {
      grid: {
        drawOnChartArea: false,
      },
      display: false,
    },
    yLower: {
      type: 'linear',
      stack: 'yScale',
      grid: {
        drawOnChartArea: false,
      },
      beginAtZero: true,
      stackWeight: 1,
      display: false,
    },
    x: {
      grid: {
        drawOnChartArea: false,
      },
    },
    y: {
      type: 'linear',
      stack: 'yScale',
      grid: {
        drawOnChartArea: false,
      },
      stackWeight: 4,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const chartJsData: ChartData = {
  labels,
  datasets: [
    {
      type: 'line',
      label: 'Dataset 1',
      stack: 'price',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      xAxisID: 'x',
      yAxisID: 'y',
    },
    {
      type: 'line',
      label: 'Dataset 2',
      stack: 'price',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      xAxisID: 'x',
      yAxisID: 'y',
    },
    {
      type: 'bar',
      label: 'Sub Dataset',
      stack: 'marketVol',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(235, 53, 229)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      xAxisID: 'xLower',
      yAxisID: 'yLower',
    },
    {
      type: 'bar',
      label: 'Sub Dataset 2',
      stack: 'stockVol',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(235, 53, 229)',
      backgroundColor: 'rgba(246, 34, 34, 0.562)',
      xAxisID: 'xLower',
      yAxisID: 'yLower',
    },
  ],
};

export default function CharJsRaw() {
  const chartRef = useRef<ChartJS<'line'>>(null);

  useEffect(() => {
    ChartJS.register(enableHorizontalCrosshairLineChartPlugin);

    return () => {
      ChartJS.unregister(enableHorizontalCrosshairLineChartPlugin);
    };
  }, []);

  const handleResetZoom: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!chartRef?.current) return;
    chartRef.current.resetZoom();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', alignItems: 'center' }}>
      <div style={{ width: '80vw' }}>
        <Chart type="line" options={chartOptions} data={chartJsData} ref={chartRef} />
      </div>
      <button onClick={handleResetZoom}>Reset Zoom</button>
    </div>
  );
}
