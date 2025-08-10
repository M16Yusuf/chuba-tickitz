import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from "../../organism/LineChart";
import { useState } from "react";

Chart.register(CategoryScale);

function DashboardPage() {
  const dummyLabel = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  // chart 1 useState
  const [dataChartOne, setDataChartOne] = useState([
    400, 600, 350, 200, 370, 200,
  ]);
  // chart 2 useState
  const [dataChartTwo, setDataChartTwo] = useState([
    100, 321, 234, 340, 782, 456,
  ]);

  const [selectChart1, setSelectChart1] = useState("Chart sales movie");
  const [selectChart2, setSelectChart2] = useState("");

  const dataChart1 = {
    labels: dummyLabel,
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Popularity of colours",
        data: dataChartOne,
        // you can set indiviual colors for each bar
        borderWidth: 1,
        backgroundColor: "rgba(29, 78, 216, 0.53)",
        fill: true,
        tension: 0.4,
        spanGaps: true,
        cubicInterpolationMode: "monotone",
      },
    ],
  };

  const dataChart2 = {
    labels: dummyLabel,
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Popularity of colours",
        data: dataChartTwo,
        // you can set indiviual colors for each bar
        borderWidth: 1,
        backgroundColor: "rgba(29, 78, 216, 0.53)",
        fill: true,
        tension: 0.4,
        spanGaps: true,
        cubicInterpolationMode: "monotone",
      },
    ],
  };

  function handleMovieChart(event) {
    event.preventDefault();
    if (event.target.value == "spiderman-homecoming") {
      setDataChartOne([100, 989, 242, 340, 782, 456]);
    } else if (event.target.value == "avenger-endgame") {
      setDataChartOne([80, 200, 400, 238, 325, 534]);
    } else if (event.target.value == "black-widow") {
      setDataChartOne([100, 321, 234, 340, 782, 456]);
    }
  }

  function handleCategoryChart2(event) {
    event.preventDefault();
    if (event.target.value == "adventure") {
      setDataChartTwo([80, 200, 400, 238, 325, 534]);
    } else if (event.target.value == "action") {
      setDataChartTwo([678, 532, 755, 234, 489, 327]);
    } else if (event.target.value == "sci-fi") {
      setDataChartTwo([100, 989, 242, 340, 782, 456]);
    }
  }

  return (
    <main className="flex h-max flex-col gap-14 bg-[#f5f5f5] md:p-20 xl:items-center">
      {/* first chart */}
      <section className="flex w-full flex-col gap-4 rounded-2xl bg-white px-1 py-8 md:p-5 xl:w-max">
        <span className="text-lg font-semibold">Sales Chart</span>
        <form id="form-chart1">
          <div className="flex flex-col gap-4 md:flex-row">
            <select
              className="w-full rounded-md border border-none bg-gray-200 p-3 md:max-w-[227px]"
              name="movies-name"
              id="movies-name"
              onChange={(e) => {
                handleMovieChart(e);
                setSelectChart1(e.target.value);
              }}
              defaultValue={""}
            >
              <option value="" disabled>
                Movies Name
              </option>
              <option value="spiderman-homecoming">Spiderman HomeComing</option>
              <option value="avenger-endgame">Avenger End Game</option>
              <option value="black-widow">Black Widow</option>
            </select>

            <select
              className="w-full rounded-md border border-none bg-gray-200 p-3 md:max-w-[227px]"
              name="weekly"
              id="weekly"
              defaultValue={""}
            >
              <option value="" disabled>
                Weekly
              </option>
              <option value="nov-23">November 2023</option>
              <option value="octo-24">October 2024</option>
              <option value="dec-24">December 2024</option>
            </select>

            <button
              className="block rounded-md bg-blue-800 p-3 text-center text-white md:w-28"
              id="filter-movie"
            >
              Filter
            </button>
          </div>
        </form>
        <div className="w-full overflow-x-auto md:w-max">
          <div className="w-[700px] md:w-[800px] xl:min-w-[1000px]">
            <LineChart chartData={dataChart1} txtSelected={selectChart1} />
            {/* <canvas id="chart-movie-sales"></canvas> */}
          </div>
        </div>
      </section>

      {/* second chart */}
      <section className="flex w-full flex-col gap-4 rounded-2xl bg-white px-1 py-8 md:p-5 xl:w-max">
        <span className="text-lg font-semibold">Ticket Sales</span>
        <form id="form-chart2">
          <div className="flex flex-col gap-4 md:flex-row">
            <select
              className="w-full rounded-md border border-none bg-gray-200 p-3 md:max-w-[227px]"
              name="category-ticket"
              id="category-ticket"
              onChange={(e) => {
                handleCategoryChart2(e);
                setSelectChart2(e.target.value);
              }}
              defaultValue={""}
            >
              <option value="" disabled>
                Category
              </option>
              <option value="adventure">Adventure</option>
              <option value="action">Action</option>
              <option value="sci-fi">Sci-fi</option>
            </select>

            <select
              className="w-full rounded-md border border-none bg-gray-200 p-3 md:max-w-[227px]"
              name="ticket-location"
              id="ticket-location"
              defaultValue={""}
            >
              <option value="" disabled>
                Location
              </option>
              <option value="studio1-bandung">Studio 1 - Bandung</option>
              <option value="Studio2-bandung">Studio 2 - Bandung</option>
              <option value="Studio4-bogor">Studio 4 - Bogor</option>
            </select>

            <button
              className="block rounded-md bg-blue-800 p-3 text-center text-white md:w-28"
              id="filter-ticket"
            >
              Filter
            </button>
          </div>
        </form>
        <div className="w-full overflow-x-auto md:w-max">
          <div className="w-[700px] md:w-[800px] xl:min-w-[1000px]">
            <LineChart chartData={dataChart2} txtSelected={selectChart2} />
            {/* <canvas id="chart-ticket-sales"></canvas> */}
          </div>
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
