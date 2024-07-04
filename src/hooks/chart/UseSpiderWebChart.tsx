import { useState } from "react";

export const useSpiderWebChart = (title?: string) => {
  const [options, setOptions] = useState({
    chart: {
      polar: true,
      type: "line",
    },
    title: {
      text: "",
      x: -80,
    },

    pane: {
      size: "80%",
    },

    xAxis: {
      categories: [],
      tickmarkPlacement: "on",
      lineWidth: 0,
    },

    yAxis: {
      gridLineInterpolation: "polygon",
      lineWidth: 0,
      min: 0,
      max: 10,
      tickInterval: 1, // Intervalo entre las marcas del eje
      abels: {
        formatter: function (
          this: Highcharts.AxisLabelsFormatterContextObject,
        ) {
          return this.value.toString();
        },
      },
    },

    tooltip: {
      shared: true,
      pointFormat:
        '<span style="color:{series.color}">{series.name}: <b>' +
        "{point.y:.1f}</b><br/>", // Muestra el valor con un decimal
    },

    legend: {
      align: "right",
      verticalAlign: "middle",
      layout: "vertical",
    },

    series: [
      {
        name: "Average",
        pointPlacement: "on",
        data: [],
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              align: "center",
              verticalAlign: "bottom",
              layout: "horizontal",
            },
            pane: {
              size: "80%",
            },
          },
        },
      ],
    },
  });

  return {
    options,
    setOptions,
  };
};
