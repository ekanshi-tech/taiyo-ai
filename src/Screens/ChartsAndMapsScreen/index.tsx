import LineChartComponent from './LineChartComponent';
import LeafLeftMapComponent from './LeafLetMapComponent';
import { useQuery } from 'react-query';
import { WorldWideDataType } from '../../TS/Interfaces/world.wide.data.interface';

function ChartsAndMapsScreen() {
  const { isLoading, data } = useQuery<WorldWideDataType>(
    'world-wide-api',
    () => fetch('https://disease.sh/v3/covid-19/all').then(res => res.json()),
  );

  const WorldWideData = [
    { title: 'Total Cases: ', value: data?.cases },
    { title: 'Total Deaths: ', value: data?.deaths },
    { title: 'Total Recovered: ', value: data?.recovered },
    { title: 'Total Active: ', value: data?.active },
    { title: 'Total Critical: ', value: data?.critical },
  ];

  return (
    <>
      <div>
        {isLoading ? (
          <h1 className="text-center">Fetching World WIde Data...</h1>
        ) : (
          <>
            <h1 className="mb-4 text-2xl text-center">World Wide Data</h1>
            <div className="flex flex-wrap justify-center">
              {WorldWideData.map(({ title, value }) => (
                <div
                  key={title}
                  className="w-[250px] mx-3  bg-slate-700 px-3 py-4 mb-4 rounded-md "
                >
                  <p>
                    {title}
                    <span className="text-blue-500">{value}</span>
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <LineChartComponent />
      <LeafLeftMapComponent />
    </>
  );
}

export default ChartsAndMapsScreen;
