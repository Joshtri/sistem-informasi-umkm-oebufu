const labels = [
  "0-15 Tahun",
  "16-24 Tahun",
  "25-34 Tahun",
  "35-44 Tahun",
  "45-54 Tahun",
  "56-64 Tahun",
  "65 Tahun keatas",
];

const data = {
  labels: labels,
  datasets: [
    {

      backgroundColor: [
        "#62374E",
        "#007880",
        "#2D4263",
        "#ECDBBA",
        "#C84B31",
        "#1E5128",
        "#FFD700",
      ],

      data: [0, 0, 0, 0, 0, 0, 0],
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
        text: "Grafik Umur",
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
        text: "Grafik Umur",
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
        text: "Grafik Umur",
      },
    },
  },
};

let myChart = new Chart(document.getElementById("Umur-Chart"), config);

axios.get("/statistics/statistik/umur").then((e) => {
  console.log(e);
  myChart.data.datasets[0].data = e.data.data;
  myChart.update();
});

// function changebar() {
//     const updatetype = "bar";
//     myChart.config.type = updatetype;
//     myChart.update();
//   }

//   function changepie() {
//     const updatetype = "pie";
//     myChart.config.type = updatetype;
//     myChart.update();
//   }

//   function changedoughnut() {
//     const updatetype = "doughnut";
//     myChart.config.type = updatetype;
//     myChart.update();
//   }

// render init block

function ChartType(type) {
  //destroy chart
  myChart.destroy();
  if (type === "bar") {
    myChart = new Chart(document.getElementById("Umur-Chart"), config);
  }

  if (type === "doughnut") {
    myChart = new Chart(document.getElementById("Umur-Chart"), config2);
  }

  if (type === "pie") {
    myChart = new Chart(document.getElementById("Umur-Chart"), config3);
  }
}
