import React from "react";
import ReactECharts from "echarts-for-react";
import { Card, Typography } from "@mui/material";

const DecisionMeter = ({ data }) => {
  const { confidence, recommendation } = data;

  // Chart options for the Decision Meter
  const getChartOptions = () => ({
    title: {
    //   text: `Recommendation: ${recommendation}`,
      left: "center",
      top: "5%",
      textStyle: {
        fontSize: 16,
        fontWeight: "bold",
      },
    },
    tooltip: {
      formatter: "{a} <br/>{b}: {c}%",
    },
    series: [
      {
        name: "Confidence",
        type: "gauge",
        startAngle: 210, // Start of the gauge (left)
        endAngle: -30, // End of the gauge (right)
        radius: "80%",
        detail: {
          formatter: "{value}%",
          fontSize: 16,
          color: "#000",
        },
        data: [{ value: confidence, name:recommendation }],
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.33, "#FF4500"], // Red for "Sell"
              [0.66, "#FFA500"], // Orange for "Hold"
              [1, "#32CD32"], // Green for "Buy"
            ],
          },
        },
        pointer: {
          length: "60%",
          width: 5,
        },
        splitLine: {
          length: 20,
          lineStyle: {
            width: 2,
          },
        },
        axisTick: {
          length: 10,
        },
        axisLabel: {
          distance: 25,
          formatter: (value) => {
            // if (value === 0) return "Sell";
            // if (value === 50) return "Hold";
            // if (value === 100) return "Buy";
            // return recommendation;
          },
          fontSize: 15,
        },
      },
    ],
  });

  return (
    <>
      <Card>

       <ReactECharts option={getChartOptions()} style={{ height: 300, width: "100%" }} />
      </Card>
       {/* <Typography>Recomendation</Typography> */}
    </>
  )
};

export default DecisionMeter;
