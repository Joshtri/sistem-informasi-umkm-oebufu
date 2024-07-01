const labels = ["Belum/Tidak Pernah Sekolah", "Belum/Tidak Tamat SD/SDLB/MI/Paket A", "SD/SDLB/MI/Paket A",
    "SMP/SMPLB/MTs/Paket B", "SMA/SMLB/MA/SMK/MAK/Paket C", "DI/DII/DIII",
    "DIV/S1", "S2", "S3"];

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
              "#FF731D",
              "#EEE3CB",
            ],

            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
                text: 'Grafik Pendidikan'
            }
        }
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
              text: 'Grafik Pendidikan'
          }
      }
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
              text: 'Grafik Pendidikan'
          }
      }
  },
};

let myChart = new Chart(document.getElementById("Pendidikan-Chart"), config);
axios.get('/statistics/statistik/pendidikan').then(e => {
    console.log(e);
    myChart.data.datasets[0].data = e.data.data;
    myChart.update();
});


// render init block
function ChartType(type) {
  //destroy chart
  myChart.destroy();
  if (type === "bar") {
    myChart = new Chart(document.getElementById("Pendidikan-Chart"), config);
  }

  if (type === "doughnut") {
    myChart = new Chart(document.getElementById("Pendidikan-Chart"), config2);
  }

  if (type === "pie") {
    myChart = new Chart(document.getElementById("Pendidikan-Chart"), config3);
  }
}
