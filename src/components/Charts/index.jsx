import { Line, Pie } from "@ant-design/charts";
import React from "react";

function ChartComponent({ sortedTransactions }) {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });
  //   console.log(data);

  const spendingData = sortedTransactions.filter((transaction) => {
    if (transaction.type == "expense") {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  });

  let finalSpendings = spendingData.reduce((acc, obj) => {
    let key = obj.tag;
    if (!acc[key]) {
      acc[key] = { tag: obj.tag, amount: obj.amount };
    } else {
      acc[key].amount += obj.amount;
    }
    return acc;
  }, {});
  const config = {
    data: data,
    width: 400,
    height: 400,
    autoFit: false,
    xField: "date",
    yField: "amount",
    point: {
      size: 5,
      shape: "circle",
      style: {
        fill: "#f00",
        stroke: "#fff",
        lineWidth: 6,
        opacity: 0.7,
        rotate: 90,
      },
    },

    label: {
      style: {
        fill: "#333",
        fontSize: 14,
        fontWeight: "bold",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        rotate: 45,
      },
      position: "top",
      offsetX: 10,
      offsetY: 5,
    },
  };
  const spendingConfig = {
    data: Object.values(finalSpendings),
    width: 400,
    height: 400,
    autoFit: false,

    angleField: "amount",
    colorField: "tag",
  };

  let chart;
  let pieChart;
  return (
    <div className="charts-wrapper">
      <div style={{marginLeft:"2rem"}}>
        <h3 style={{ marginTop: 0 }}>Financial Insights</h3>
        <Line
          {...config}
          onReady={(chartInstance) => (chart = chartInstance)}
        />
      </div>
      <div style={{marginRight:"2rem"}}>
        <h3>Your Outlays</h3>
        <Pie
          {...spendingConfig}
          onReady={(chartInstance) => (pieChart = chartInstance)}
        />
      </div>
    </div>
  );
}

export default ChartComponent;
