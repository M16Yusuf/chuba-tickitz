import { Line } from "react-chartjs-2";

function LineChart({ chartData, txtSelected }) {
  return (
    <Line
      data={chartData}
      options={{
        plugins: {
          title: {
            display: true,
            text: txtSelected,
          },
          legend: {
            display: false,
          },
        },
      }}
    />
  );
}

export default LineChart;
