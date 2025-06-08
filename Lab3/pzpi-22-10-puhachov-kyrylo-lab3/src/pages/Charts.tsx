import { Chart, ChartData, registerables } from 'chart.js'
import React, {useRef, useState, useMemo, useEffect} from 'react'
import { getSensors } from '../http/sensorApi';
import { ISensor } from '../interfaces/ISensor';
import { IBridge } from '../interfaces/IBridge';
import { getBridges } from '../http/bridgeApi';
import { ISelect } from '../interfaces/ISelect';
Chart.register(...registerables);

export const Charts = () => {
    const [sensors, setSensors] = useState<ISensor[]>([]);
    const [bridges, setBridges] = useState<IBridge[]>([])
    const [selectValue, setSelectValue] = useState<string>("0")
    
      const fetchSensorDatas = async () => {
        await getSensors().then((data) => setSensors(data));
      }

      const fetchBridges = async () => {
        await getBridges().then((data) => setBridges(data))
      }
      
      useEffect(() => {
        fetchSensorDatas();
        fetchBridges();
      }, [])

      const sortSensorData = (items: ISensor[]): ISensor[] => {
        const filteredItems = items.filter((item) => item.bridgeId.toString() === selectValue)
        return filteredItems.sort((a, b) => {
            const dateA = new Date(a.name);
            const dateB = new Date(b.name);
            return dateA.getTime() - dateB.getTime();
        });
    }

      const chartData = useMemo<ChartData>(() => {
        const sortedItems = sortSensorData(sensors);
        const formatData = (): ChartData => ({
            labels: sortedItems.map((sensor) => sensor.name),
            datasets: [
              {
                label: 'Value',
                data: sortedItems.map((sensor) => sensor.sensorDatas?.length)
            }
            ]
          });
        return formatData();
      }, [sensors, selectValue])

      const selectBridges = useMemo<ISelect[]>(() => {
        return [
          { value: "0", label: "Select item..." },
          ...bridges.map((item) => {
            return {
              value: item.bridgeId.toString(),
              label: `Id: ${item.bridgeId}, Name: ${item?.name}`,
            };
          }),
        ];
      }, [bridges]);

    const chartRef = useRef<Chart | null>(null);
    const canvasCallback = (canvas: HTMLCanvasElement | null) => {
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (ctx && sensors) {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            
            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: chartData,
            });
        }
    };

  return (
    <div>
      <span>Select bridge</span>
      <select className="form-control" value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
                      {selectBridges.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
        <canvas ref={canvasCallback}></canvas>
    </div>
  )
}