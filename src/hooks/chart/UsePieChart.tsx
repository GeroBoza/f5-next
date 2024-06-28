import { useState } from "react";

export const usePieChart = (title: string) => {
  const [options, setOptions] = useState({
    chart: {
      type: "pie",
    },
    title: {
      text: title,
      align: "center",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b>: {point.percentage:.1f} %",
      },
    },
    series: [
      {
        name: "Pie Chart",
        colorByPoint: true,
      },
    ],
  });

  return {
    options,
    setOptions,
  };
};
