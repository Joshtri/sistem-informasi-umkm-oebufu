const labels = ["Laki-Laki", "Perempuan"];
const data = {
  labels: labels,
  datasets: [
    {
      label:[],
      backgroundColor: ["#2D4263", "#C84B31"],

      data: [0, 0],
      hoverOffset: 4,
    },
  ],
};

const config = {
  type: "bar",
  data: data,
  options: {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Grafik Status",
      },
    },
  },
};

const config2 = {
  type: "doughnut",
  data: data,
  options: {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Grafik Status",
      },
    },
  },
};

const config3 = {
  type: "pie",
  data: data,
  options: {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Grafik Status",
      },
    },
  },
};

let myChart = new Chart(
  document.getElementById("jeniskelamin-Chart"),
  config
);
axios.get("/statistics/statistik/jeniskelamin").then((e) => {
  console.log(e);
  myChart.data.datasets[0].data = e.data.data;
  myChart.update();
});


// render init block
function ChartType(type) {
  //destroy chart
  myChart.destroy();
  if (type === "bar") {
    myChart = new Chart(document.getElementById("jeniskelamin-Chart"), config);
  }

  if (type === "doughnut") {
    myChart = new Chart(document.getElementById("jeniskelamin-Chart"), config2);
  }

  if (type === "pie") {
    myChart = new Chart(document.getElementById("jeniskelamin-Chart"), config3);
  }
}
