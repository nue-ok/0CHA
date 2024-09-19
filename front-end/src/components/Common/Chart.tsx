import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // 추가된 플러그인
import styled from 'styled-components';

// 라이브러리 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels, // 추가된 플러그인
);

const s = {
  Container: styled.section`
    width: 90%;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    background-color: ${(props) => props.theme.bgColor};
  `,
};

interface ChartProps {
  labels: String[];
  datas: number[];
}

const Chart: React.FC<ChartProps> = ({ labels, datas }) => {
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        color: '#666666',
        display: true,
        anchor: 'end',
        align: 'top',
        formatter: (value: number) => value.toString(),
        font: {
          size: 12,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12, // X축 레이블 크기
          },
        },
      },
      y: {
        display: false,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        // label: '벤치프레스',
        data: datas,
        borderColor: '#ccff33',
        backgroundColor: '#ccff33',
        // 데이터 포인트 스타일
        pointRadius: 3, // 포인트 크기
        pointBorderWidth: 1, // 포인트 경계 두께
      },
    ],
  };
  return (
    <>
      <s.Container>
        <Line options={options} data={data} />
      </s.Container>
    </>
  );
};

export default Chart;
