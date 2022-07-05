import { Chart as ChartJS, Plugin } from 'chart.js';
import { PropType } from 'src/types';

function drawLine(ctx: PropType<ChartJS, 'ctx'>) {
  return (startX: number, startY: number, endX: number, endY: number) => {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.closePath();
  };
}

function generateCrosshairPlugin(showHorizontalLine: boolean): Plugin {
  return {
    id: 'crosshair',
    afterDatasetDraw: (chart) => {
      const tooltip: any = chart.tooltip;
      if (!(tooltip?._active && tooltip?._active.length)) {
        chart.canvas.style.cursor = 'default';
        return;
      }
      const {
        ctx,
        chartArea: { top, bottom, left, right },
      } = chart;
      const activePoint = tooltip._active[0];
      if (!activePoint) {
        chart.canvas.style.cursor = 'default';
        return;
      }

      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(102, 102, 102, 1)';

      drawLine(ctx)(activePoint.element.x, top, activePoint.element.x, bottom);
      if (showHorizontalLine) drawLine(ctx)(left, activePoint.element.y, right, activePoint.element.y);

      ctx.setLineDash([]);
      chart.canvas.style.cursor = 'crosshair';
    },
  };
}

/**
 * Only show horizontal line for first dataset if active.
 *
 * Only test with Line Chart
 *
 * Only work if tooltip plugin enabled
 */
export const enableHorizontalCrosshairLineChartPlugin = generateCrosshairPlugin(true);
