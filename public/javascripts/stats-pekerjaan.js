// const bar = document.getElementById("bar");
// const pie = document.getElementById("pie");
// const doughnut = document.getElementById("doughnut");

// bar.addEventListener("click", changebar);
// pie.addEventListener("click", changepie);
// doughnut.addEventListener("click", changedoughnut);

// function changebar() {
//   console.log("changebar function");
// }

// function changepie() {
//   console.log("changepie function");
// }

// function changedoughnut() {
//   console.log("changedoughnut function");
// }


const labels = [
  "Belum/Tidak Bekerja",
  "Mengurus Rumah Tangga",
  "Pelajar/Mahasiswa",
  "Pensiunan",
  "PNS",
  "POLRI",
  "TNI",
  "WIRASWASTA",
  "SWASTA",
  "Pegawai BUMN",
  "Pekerja Lepas",
  "Petani/Peternak/Pekebun",
  "Nelayan",
  "Industri"
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
        "#FF731D",
        "#EEE3CB",
        "#E80F88",
        "#EB1D36",
        "#9AD0EC",
        "#F6D7A7",
        "#C9D8B6"
      ],
      data: [0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0],
      hoverOffset: 14,
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
        text: "Grafik Pekerjaan",
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
        text: "Grafik Pekerjaan",
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
        text: "Grafik Pekerjaan",
      },
    },
  },
};
let myChart = new Chart(document.getElementById("PekerjaanChart"), config);

axios.get("/statistics/statistik/pekerjaan").then((e) => {
  console.log(e);
  myChart.data.datasets[0].data = e.data.data;
  myChart.update();
});

// render init block
function ChartType(type) {
  //destroy chart
  myChart.destroy();
  if (type === "bar") {
    myChart = new Chart(document.getElementById("PekerjaanChart"), config);
  }

  if (type === "doughnut") {
    myChart = new Chart(document.getElementById("PekerjaanChart"), config2);
  }

  if (type === "pie") {
    myChart = new Chart(document.getElementById("PekerjaanChart"), config3);
  }
}