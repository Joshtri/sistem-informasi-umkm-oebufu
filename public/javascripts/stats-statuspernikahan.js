const labels = ["Sudah Menikah", "Belum Menikah", "Cerai Hidup", "Cerai Mati"];

const data = {
    labels: labels,
    datasets: [
        {
  
            backgroundColor: [
                "#C84B31",
                "#ECDBBA",
                "#2D4263",
                "#1E5128"
            ],

            data: [0, 0, 0, 0],
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
                text: 'Grafik Status Pernikahan'
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
              text: 'Grafik Status Pernikahan'
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
              text: 'Grafik Status Pernikahan'
          }
      }
  },
};

let myChart = new Chart(document.getElementById("Status-Chart"), config);

axios.get('/statistics/statistik/status').then(e => {
    console.log(e);
    myChart.data.datasets[0].data = e.data.data;
    myChart.update();
});


// render init block
function ChartType(type) {
  //destroy chart
  myChart.destroy();
  if (type === "bar") {
    myChart = new Chart(document.getElementById("Status-Chart"), config);
  }

  if (type === "doughnut") {
    myChart = new Chart(document.getElementById("Status-Chart"), config2);
  }

  if (type === "pie") {
    myChart = new Chart(document.getElementById("Status-Chart"), config3);
  }
}
