import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";

interface IHighchartData {
  highchartData?: {
    title: string;
    stock: string;
  }[];
}

const MyChart = ({ highchartData = [] }: IHighchartData) => {
  const options = {
    chart: {
      type: "line",
      renderTo: "container",
      defaultSeriesType: "column",
      zoomType: "xy",
    },

    title: {
      text: "Stock Products",
    },
    xAxis: {
      categories: highchartData?.map((item) => item?.title),
      min: 0,
      max: 5,
      scrollbar: {
        enabled: true,
        barBackgroundColor: "rgb(96, 165, 250)",
        barBorderRadius: 4,
        barBorderWidth: 2,
        buttonBackgroundColor: "white",
        buttonBorderWidth: 0,
        buttonArrowColor: "white",
        buttonBorderRadius: 4,
        rifleColor: "white",
        trackBackgroundColor: "white",
        trackBorderWidth: 0,
        trackBorderColor: "white",
        trackBorderRadius: 4,
        height: 6,
        margin: 6,
      },
    },
    yAxis: {
      title: {
        text: "Stock",
      },
    },
    series: [
      {
        name: "Products",
        data: highchartData?.map((item) => item?.stock),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default MyChart;
