import { useQuery } from 'react-query';
import { Line } from 'react-chartjs-2';
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
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'COVID-19',
    },
  },
};

function LineChartComponent() {
  const { isLoading, data: graphData } = useQuery('Line-chart-api', () =>
    fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all').then(
      res => res.json(),
    ),
  );

  const cases = Object.entries(graphData?.cases || {});
  const deaths = Object.entries(graphData?.deaths || {});
  const recovered = Object.entries(graphData?.recovered || {});
  const labels = deaths.map(item => item[0]);

  const LineChartData = {
    labels,
    graphData,
    datasets: [
      {
        label: 'Cases',
        data: cases.map(item => item[1]),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Deaths',
        data: deaths.map(item => item[1]),

        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Recovered',
        data: recovered.map(item => item[1]),
        borderColor: 'rgb(0, 255, 0)',
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
      },
    ],
  };

  return (
    <>
      {isLoading ? (
        <h1 className="text-center">Fetching Line Chart Data...</h1>
      ) : (
        <>
          <h1 className="mt-6 mb-4 text-2xl text-center">
            COVID-19 Data in Chart JS Line Chart
          </h1>
          <Line options={options} data={LineChartData} />
        </>
      )}
    </>
  );
}

export default LineChartComponent;
