import React, { useEffect } from "react";
// import { MOREGRAPH } from "utils/constants";
import Chart from "../Chart";
import { usePieChart } from "@/hooks/chart/UsePieChart";
// import { usePieChart } from "@/hooks/chart/UsePieChart";

interface Props {
  data: any;
}

const PieChart = ({ data }: Props) => {
  const { options: optionsPieChart, setOptions: setOptionsPieChart } =
    usePieChart();

  useEffect(() => {
    if ("data" in data && Object.keys(data).length > 0) {
      setOptionsPieChart({
        ...optionsPieChart,
        series: [
          {
            ...optionsPieChart.series[0],
            ...data,
          },
        ],
      });
    }
  }, [data]);

  return <Chart options={optionsPieChart} type={"more"} />;
};

export default PieChart;
