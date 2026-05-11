function rtlLabel(val) {
  return "\u202B" + val;
}
// 
var balanceOptions = {
  series: [
    { name: rtlLabel("الموظف"), data: [4062.50, 0, 0, 0, 0] },
    { name: rtlLabel("الفرع"), data: [13236.85, 7777.75, 147544.17, 10875.02,8568.42 ] },
  ],
  colors: ["rgba(54,162,235,1)", "rgba(255,99,132,1)"],
  chart: {
    type: "bar",
    height: "100%",
    fontFamily: "'Cairo','Arial',sans-serif",
    toolbar: { show: false }
  },
  plotOptions: {
    bar: {
      columnWidth: "55%",
      borderRadius: 5,
      borderRadiusApplication: "end",
    }
  },
  dataLabels: { enabled: false },

  xaxis: {
    categories: [
      rtlLabel("نقدًا"),
      rtlLabel("مدى"),
      rtlLabel("فيزا"),
      rtlLabel("أمريكن إكسبريس"),
      rtlLabel("ماستر كارد")
    ],
    labels: {
      formatter: rtlLabel,
      style: {
        fontFamily: "'Cairo','Arial',sans-serif",
        fontSize: "12px",
        fontWeight: 500
      }
    }
  },

  yaxis: {
    labels: {
      formatter: v => v.toLocaleString("en-EG"),
      style: {
        fontFamily: "'Cairo','Arial',sans-serif",
        fontSize: "12px"
      }
    }
  },

  legend: {
    position: "bottom",
    horizontalAlign: "center"
  },

  tooltip: {
    y: { formatter: v => v.toLocaleString("en-EG") }
  }
};

new ApexCharts(
  document.querySelector("#BalanceChart"),
  balanceOptions
).render();
// 
var allSeries = [0, 1, 1, 2];
var allLabels = [rtlLabel("منتهية") ,rtlLabel("اليوم"), rtlLabel("غدًا"), rtlLabel("لاحقًا"),   ];
var allColors = [
  "rgba(242,36,36,1)",
  "rgba(242,143,36,1)",
  "#9966FF",
  "rgba(54,162,235,1)",
];

var hiddenIndexes = [];
var activeIndexes = allSeries.map((v, i) => i).filter(i => allSeries[i] > 0);
var chartRendered = true;

function buildCustomLegend() {
  var legendEl = document.querySelector("#ContractsChartLegend");
  legendEl.innerHTML = "";
  allLabels.forEach(function(label, i) {
    var isHidden = hiddenIndexes.includes(i);
    var item = document.createElement("span");
    item.style.cssText = `
      display:inline-flex; align-items:center; gap:5px;
      margin: 0 8px; cursor:pointer; font-family:'Cairo',Arial,sans-serif;
      font-size:13px; opacity:${isHidden ? '0.4' : '1'};
      text-decoration:${isHidden ? 'line-through' : 'none'};
      transition: opacity 0.3s;
    `;
    item.innerHTML = `
      <span>${label}</span>
      <span style="width:10px;height:10px;border-radius:50%;background:${allColors[i]};display:inline-block;flex-shrink:0"></span>
    `;
    if (allSeries[i] > 0) {
      item.addEventListener("click", function() {
        if (hiddenIndexes.includes(i)) {
          hiddenIndexes = hiddenIndexes.filter(x => x !== i);
        } else {
          hiddenIndexes.push(i);
        }
        redrawChart();
      });
    } else {
      item.style.cursor = "default";
    }
    legendEl.appendChild(item);
  });
}

function redrawChart() {
  var chartEl = document.querySelector("#ContractsChart");
  var allRealHidden = activeIndexes.every(i => hiddenIndexes.includes(i));

  buildCustomLegend();

  var visibleIndexes = activeIndexes.filter(i => !hiddenIndexes.includes(i));
  var newSeries = visibleIndexes.map(i => allSeries[i]);
  var newLabels = visibleIndexes.map(i => allLabels[i]);
  var newColors = visibleIndexes.map(i => allColors[i]);

  if (allRealHidden) {
    chartEl.style.visibility = "hidden";
    chartEl.style.minHeight = "revert-layer";

    chartInstance.destroy();
    chartRendered = false;

    var defaultSeries = activeIndexes.map(i => allSeries[i]);
    var defaultLabels = activeIndexes.map(i => allLabels[i]);
    var defaultColors = activeIndexes.map(i => allColors[i]);

    chartInstance = new ApexCharts(chartEl, {
      ...contractsBaseOptions,
      series: defaultSeries,
      labels: defaultLabels,
      colors: defaultColors,
    });
    chartInstance.render();

  } else {
    chartEl.style.visibility = "visible";
    
    chartInstance.updateOptions({
      series: newSeries,
      labels: newLabels,
      colors: newColors,
    }, true, true);
  }
}

var contractsBaseOptions = {
  chart: {
    type: "pie",
    fontFamily: "'Cairo','Arial',sans-serif",
    height: "80%",
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 600,
    }
  },
  legend: { show: false },
  dataLabels: { enabled: false }
};

var chartInstance = new ApexCharts(
  document.querySelector("#ContractsChart"),
  {
    ...contractsBaseOptions,
    series: allSeries.filter((v, i) => v > 0),
    labels: allLabels.filter((v, i) => allSeries[i] > 0),
    colors: allColors.filter((v, i) => allSeries[i] > 0),
  }
);
chartInstance.render();
buildCustomLegend();
// 
var carsOptions = {
  series: [4, 1, 30, 0],
  labels: [
    rtlLabel("المتاحة"),
    rtlLabel("المؤجرة"),
    rtlLabel("غير المتاحة"),
    rtlLabel("المحفوظة"),
  ],
  chart: {
    type: "radialBar",
    fontFamily: "'Cairo','Arial',sans-serif",
    // height:"350"
  },
  plotOptions: {
    radialBar: {
      endAngle: 270,
      hollow: {
        margin: 15,
        size: "30%",
        background: "transparent",
        image: undefined,
      },
      
      barLabels: {
        enabled: true,
        fontSize: "12px",
        fontWeight: "500",
        offsetX: -8,
        formatter: function (seriesName, opts) {
          return (
            rtlLabel(seriesName) +
            " : " +
            opts.w.globals.series[opts.seriesIndex]
          );
        },
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          show: false,
        },
        total: {
          show: false,
        },
      },
    },
  },
  colors: [
    "rgba(255,150,38,1)",
    "rgba(151,71,255,1)",
    "rgba(255,38,38,1)",
    "rgba(54,162,235,1)",
  ],
};

new ApexCharts(document.querySelector("#CarsChart"), carsOptions).render();
