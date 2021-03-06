import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
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
import { enableHorizontalCrosshairLineChartPlugin } from 'src/components/ChartJs/Line';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin);

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
      beginAtZero: true,
      max: 1000,
      stackWeight: 1,
    },
    x: {
      grid: {
        drawOnChartArea: false,
      },
    },
    y: {
      type: 'linear',
      stack: 'yScale',
      display: true,
      position: 'left',
      stackWeight: 4,
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
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      xAxisID: 'x',
      yAxisID: 'y',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      xAxisID: 'x',
      yAxisID: 'y',
    },
    {
      label: 'Sub Dataset',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(235, 53, 229)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      xAxisID: 'xLower',
      yAxisID: 'yLower',
    },
  ],
};

export default function ChartJsCombinedChartTest() {
  const chartRef = useRef<ChartJS<'line'>>(null);

  useEffect(() => {
    ChartJS.register(enableHorizontalCrosshairLineChartPlugin);
    return () => ChartJS.unregister(enableHorizontalCrosshairLineChartPlugin);
  }, []);

  const handleResetZoom: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!chartRef?.current) return;
    chartRef.current.resetZoom();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', alignItems: 'center' }}>
      <div style={{ width: '50vw' }}>
        <Line options={chartOptions} data={chartJsData} style={{ height: '400px' }} ref={chartRef} />
      </div>
      <button onClick={handleResetZoom}>Reset Zoom</button>
    </div>
  );
}
