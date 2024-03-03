import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../../../Components/Common/ChartsDynamicColor";
import { Card, CardBody, CardHeader, Col } from "reactstrap";

const ChartsCardApex = () => {
  const Area = ({ dataColors }) => {
    var chartLineAreaColors = getChartColorsArray(dataColors);
    const series = [
      {
        type: "area",
        data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33],
      },
    ];

    var options = {
      chart: {
        toolbar: {
          show: !1,
        },
      },
      stroke: {
        curve: "smooth",
      },
      fill: {
        type: "solid",
        opacity: [0.35, 1],
      },
      labels: [
        "15 Nov",
        "Dec 02",
        "Dec 03",
        "Dec 04",
        "Dec 05",
        "Dec 06",
        "Dec 07",
        "Dec 08",
        "Dec 09 ",
        "Dec 10",
        "Dec 11",
      ],
      markers: {
        size: 0,
      },
      yaxis: [
        {
          title: {
            text: "Series A",
          },
        },
        {
          opposite: !0,
          title: {
            text: "Series B",
          },
        },
      ],
      tooltip: {
        shared: !0,
        intersect: !1,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
          },
        },
      },
      colors: chartLineAreaColors,
    };

    return (
      <React.Fragment>
        <ReactApexChart
          dir="ltr"
          className="apex-charts"
          options={options}
          series={series}
          type="line"
          height={400}
        />
      </React.Fragment>
    );
  };

  return (
    <Card>
      <CardHeader>
        <h4 className="card-title mb-0">Line & Area Charts</h4>
      </CardHeader>
      <CardBody>
        <Area dataColors='["--vz-success", "--vz-success"]' />
      </CardBody>
    </Card>
  );
};

export default ChartsCardApex;
