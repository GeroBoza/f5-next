import React, { useEffect } from "react";
import Chart from "../Chart";
import { useSpiderWebChart } from "@/hooks/chart/UseSpiderWebChart";

interface Props {
  data: any;
}

const SpiderChart = ({ data }: Props) => {
  const { options: optionsSpiderChart, setOptions: setOptionsSpiderChart } =
    useSpiderWebChart();

  useEffect(() => {
    if (data.length > 0) {
      const keys = data.map((el: any) => el.name);
      const values = data.map((el: any) => el.y);

      setOptionsSpiderChart({
        ...optionsSpiderChart,
        xAxis: {
          ...optionsSpiderChart.xAxis,
          categories: keys,
        },
        series: [
          {
            ...optionsSpiderChart.series[0],
            data: values,
          },
        ],
      });
    }
  }, [data]);

  return <Chart options={optionsSpiderChart} type={"more"} />;
};

export default SpiderChart;
