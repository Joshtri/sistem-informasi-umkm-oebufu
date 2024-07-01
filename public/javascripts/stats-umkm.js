const labels = ["Usaha Mikro", "Usaha Menengah", "Usaha Kecil"];

const data = {
  labels: labels,
  datasets: [
    {

      backgroundColor: ["#ECDBBA", "#C84B31", "#2D4263"],

      data: [4, 4, 4],
      hoverOffset: 4,
    },
  ],
};

const config = {
  type: "bar",
  data: data,
  options: {
    scales:{
      x:{
        ticks:{
        
        }
          
      }
    },
     

    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Grafik Kategori Usaha",
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
        text: "Grafik Kategori Usaha",
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
        text: "Grafik Kategori Usaha",
      },
    },
  },
};

let myChart = new Chart(document.getElementById("Usaha-Mikro-Chart"), config);
axios.get("/statistics/statistik/umkm").then((e) => {
  console.log(e);
  myChart.data.datasets[0].data = e.data.data;
  myChart.update();
});


// render init block
function ChartType(type) {
  //destroy chart
  myChart.destroy();
  if (type === "bar") {
    myChart = new Chart(document.getElementById("Usaha-Mikro-Chart"), config);
  }

  if (type === "doughnut") {
    myChart = new Chart(document.getElementById("Usaha-Mikro-Chart"), config2);
  }

  if (type === "pie") {
    myChart = new Chart(document.getElementById("Usaha-Mikro-Chart"), config3);
  }
}
