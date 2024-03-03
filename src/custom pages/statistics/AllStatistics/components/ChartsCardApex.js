import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../../Components/Common/ChartsDynamicColor";
import { Card, CardBody, CardHeader } from "reactstrap";

const ChartsCardApex = () => {
  const YAxis = ({ dataColors }) => {
    var chartMultiColors = getChartColorsArray(dataColors);
    const series = [
      {
        name: "عدد العملاء",
        type: "column",
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
      },
      {
        name: "عدد المكاتب",
        type: "column",
        data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
      },
      {
        name: "عدد الاعلانات",
        type: "column",
        data: [20, 29, 37, 36, 44, 45, 50, 58],
      },
    ];

    var options = {
      chart: {
        stacked: !1,
        toolbar: {
          show: !1,
        },
      },
      dataLabels: {
        enabled: !1,
      },
      stroke: {
        width: [1, 1, 4],
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "NOV",
        ],
      },
      yaxis: [
        {
          seriesName: "Income",
          opposite: !0,
          axisTicks: {
            show: !0,
          },
          axisBorder: {
            show: !0,
            color: "#038edc",
          },
        },
        {
          seriesName: "Revenue",
          opposite: !0,
          axisTicks: {
            show: !0,
          },
          axisBorder: {
            show: !0,
            color: "#51d28c",
          },
        },
      ],
      tooltip: {
        fixed: {
          enabled: !0,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60,
        },
      },
      legend: {
        horizontalAlign: "left",
        offsetX: 40,
      },
      colors: chartMultiColors,
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
        <h4 className="card-title mb-0">الاحصائيات الكليه</h4>
      </CardHeader>
      <CardBody>
        <YAxis dataColors='[ "--vz-danger","--vz-primary", "--vz-success"]' />
      </CardBody>
    </Card>
  );
};

export default ChartsCardApex;
