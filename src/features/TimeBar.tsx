import { useEffect, useState } from 'react';
import { parseFormatTimePT } from '../utils/dateUtils';
import { fetchTimeData } from '../services/apiService';

interface TimeData {
    AvgTotalTime: number;
    avgTimeLowPriority: number;
    avgTimeMediumPriority: number;
    avgTimeHighPriority: number;

}


function TimeBar() {
    const [data, setData] = useState<TimeData | null>(null);
    const [errorTimeBar, setErrorTimeBar] = useState<Error | null>(null);
    const [loadingTimeBar, setLoadingTimeBar] = useState<boolean>(true);

    useEffect(() => {
        const loadData = async () => {
            setLoadingTimeBar(true);
            setErrorTimeBar(null);
            try {
                const dataResponse = await fetchTimeData();
                setData(dataResponse);
            } catch (error) {
                setErrorTimeBar(error as Error);
            } finally {
                setLoadingTimeBar(false);
            }
        };
        loadData();
    }, []);

    if (loadingTimeBar) {
        return <p>loading tasks...</p>;
    }

    if (errorTimeBar) {
        console.log(errorTimeBar);
        return null;
    }

    return (
        <div className='flex flex-col md:flex-row border-1 border-gray-400 m-4'>
            <div className='basis-1/2 m-2'>
                <h2 className="text-xl font-bold mb-4 text-center">Average time to finish tasks:</h2>
                <h2 data-testid='avgtimetotal' className="text-xl font-bold mb-4 text-center">{parseFormatTimePT(data?.AvgTotalTime.toString())}</h2>
            </div>
            <div className='basis-1/2 m-2'>
                <h2 className="text-xl font-bold mb-4 text-center lg:text-left">Average time to finish tasks by priority:</h2>
                <h2 data-testid='avgtimelow' className="text-xl font-bold mb-4 text-center lg:text-left">Low= {parseFormatTimePT(data?.avgTimeLowPriority.toString())}</h2>
                <h2 data-testid='avgtimemedium' className="text-xl font-bold mb-4 text-center lg:text-left">Medium= {parseFormatTimePT(data?.avgTimeMediumPriority.toString())}</h2>
                <h2 data-testid='avgtimehigh' className="text-xl font-bold mb-4 text-center lg:text-left">High= {parseFormatTimePT(data?.avgTimeHighPriority.toString())}</h2>
            </div>
        </div>
    );


    return null;
}

export default TimeBar;