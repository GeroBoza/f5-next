import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_more from "highcharts/highcharts-more";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";
import wordcloud from "highcharts/modules/wordcloud.js";
import HighchartsMore from "highcharts/highcharts-more";
// import HighchartsNetworkgraph from "highcharts/modules/networkgraph";
// import { NETWORKGRAPH, MOREGRAPH } from "utils/constants";

const typeChart = {
  more: HighchartsMore,
};

interface Props {
  options: any;
  type: TypeChartKey | null;
}

type TypeChartKey = keyof typeof typeChart;

const Chart = ({ options, type = null }: Props) => {
  HC_more(Highcharts);
  NoDataToDisplay(Highcharts);
  wordcloud(Highcharts);

  (Highcharts as any).seriesTypes.wordcloud.prototype.deriveFontSize =
    function (relativeWeight: number) {
      var maxFontSize = 45;
      // Will return a fontSize between 0px and 25px.
      return Math.floor(maxFontSize * (relativeWeight + 1));
    };

  //   type && typeChart[type](Highcharts);
  if (type && type in typeChart) {
    typeChart[type](Highcharts);
  }

  return (
    <div id="chart-component">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;
