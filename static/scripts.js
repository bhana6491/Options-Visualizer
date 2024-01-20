// Used to update chart when user picks a new option to graph
function updateChart(range) {
  const rangeValue = window.labels.slice(0, range.value);
  console.log(rangeValue);
  myChart.config.data.labels = rangeValue;
  window.myChart.update();
}

// Calculate PNL + Break even points of the option
function generateGraphData(optionType, optionMethod, index, price) {
  var option_num;
  option_num = index;
  var strike;
  var bid;
  var ask;
  var call_buy_BE;
  var put_buy_BE;
  var call_write_BE;
  var put_write_BE;
  var call_write_profit;
  var put_write_profit;
  var upside1;
  var upside2;
  var upside3;
  var upside4;
  var downside1;
  var downside2;
  var downside3;
  var loss;
  strike = document.getElementById("row-" + option_num + "-strike");
  bid = document.getElementById("row-" + option_num + "-bid");
  ask = document.getElementById("row-" + option_num + "-ask");
  strike = strike.innerText;
  bid = bid.innerText;
  ask = ask.innerText;

  // 1.02 signfies 2% increase/decrease in price from that point
  if (optionType === "Calls") {
    if (optionMethod === "Buying") {
      call_buy_BE = parseFloat(strike) + parseFloat(ask);
      upside2 = call_buy_BE * 1.02;
      upside3 = upside2 * 1.02;
      upside4 = upside3 * 1.02;
      downside1 = strike - strike * 0.1;
      downside2 = downside1 - strike * 0.1;
      loss = -Math.abs(ask * 100);

      upside1 = Number.parseFloat(upside1).toFixed(2);
      upside2 = Number.parseFloat(upside2).toFixed(2);
      upside3 = Number.parseFloat(upside3).toFixed(2);
      upside4 = Number.parseFloat(upside4).toFixed(2);

      downside1 = Number.parseFloat(downside1).toFixed(2);
      downside2 = Number.parseFloat(downside2).toFixed(2);

      window.labels = [
        downside2,
        downside1,
        strike,
        call_buy_BE,
        upside2,
        upside3,
        upside4,
      ];
      window.data = [
        loss,
        loss,
        loss,
        0,
        Math.abs((upside2 - price) * 100),
        Math.abs((upside3 - price) * 100),
        Math.abs((upside4 - price) * 100),
      ];
    } else {
      call_write_BE = parseFloat(strike) + parseFloat(bid);
      upside2 = call_write_BE * 1.02;
      upside3 = upside2 * 1.02;
      upside4 = upside3 * 1.02;
      downside1 = strike - strike * 0.1;
      downside2 = downside1 - downside1 * 0.1;
      call_write_profit = Math.abs(bid * 100);
      upside1 = Number.parseFloat(upside1).toFixed(2);
      upside2 = Number.parseFloat(upside2).toFixed(2);
      upside3 = Number.parseFloat(upside3).toFixed(2);
      upside4 = Number.parseFloat(upside4).toFixed(2);
      downside1 = Number.parseFloat(downside1).toFixed(2);
      downside2 = Number.parseFloat(downside2).toFixed(2);
      window.labels = [
        downside2,
        downside1,
        strike,
        call_write_BE,
        upside2,
        upside3,
        upside4,
      ];
      window.data = [
        call_write_profit,
        call_write_profit,
        call_write_profit,
        0,
        -Math.abs((upside2 - price) * 100),
        -Math.abs((upside3 - price) * 100),
        -Math.abs((upside4 - price) * 100),
      ];
    }
  } else {
    if (optionMethod === "Buying") {
      put_buy_BE = parseFloat(strike) - parseFloat(ask);
      upside2 = strike * 1.02;
      upside3 = upside2 * 1.02;
      upside4 = upside3 * 1.02;
      downside1 = put_buy_BE - put_buy_BE * 0.1;
      downside2 = downside1 - downside1 * 0.1;
      downside3 = downside2 - downside2 * 0.1;
      loss = -Math.abs(ask * 100);
      upside1 = Number.parseFloat(upside1).toFixed(2);
      upside2 = Number.parseFloat(upside2).toFixed(2);
      upside3 = Number.parseFloat(upside3).toFixed(2);
      upside4 = Number.parseFloat(upside4).toFixed(2);
      downside1 = Number.parseFloat(downside1).toFixed(2);
      downside2 = Number.parseFloat(downside2).toFixed(2);
      downside3 = Number.parseFloat(downside3).toFixed(2);

      window.labels = [
        downside3,
        downside2,
        downside1,
        put_buy_BE,
        strike,
        upside2,
        upside3,
      ];
      window.data = [
        Math.abs((downside3 - price) * 100),
        Math.abs((downside2 - price) * 100),
        Math.abs((downside1 - price) * 100),
        0,
        loss,
        loss,
        loss,
      ];
    } else {
      put_write_BE = parseFloat(strike) - parseFloat(bid);
      upside2 = strike * 1.02;
      upside3 = upside2 * 1.02;
      upside4 = upside3 * 1.02;
      downside1 = put_write_BE - put_write_BE * 0.1;
      downside2 = downside1 - downside1 * 0.1;
      downside3 = downside2 - downside2 * 0.1;
      put_write_profit = Math.abs(bid * 100);
      upside1 = Number.parseFloat(upside1).toFixed(2);
      upside2 = Number.parseFloat(upside2).toFixed(2);
      upside3 = Number.parseFloat(upside3).toFixed(2);
      upside4 = Number.parseFloat(upside4).toFixed(2);
      downside1 = Number.parseFloat(downside1).toFixed(2);
      downside2 = Number.parseFloat(downside2).toFixed(2);
      downside3 = Number.parseFloat(downside3).toFixed(2);
      window.labels = [
        downside3,
        downside2,
        downside1,
        put_write_BE,
        strike,
        upside2,
        upside3,
      ];
      window.data = [
        -Math.abs((downside3 - price) * 100),
        -Math.abs((downside2 - price) * 100),
        -Math.abs((downside1 - price) * 100),
        0,
        put_write_profit,
        put_write_profit,
        put_write_profit,
      ];
    }
  }
  return upside1;
}
function selectedRow(price, expiry_date) {
  var index,
    table = document.getElementById("table");

  for (var i = 0; i < table.rows.length; i++) {
    table.rows[i].onclick = function () {
      $(".slider").show();

      if (typeof index !== "undefined") {
        table.rows[index].classList.toggle("selected");
      }
      index = this.rowIndex;
      this.classList.toggle("selected");

      document.getElementById("main-div-3").scrollIntoView(true);
      var optionType = $("#call").is(":checked");
      var optionMethod = $("#buy").is(":checked");

      if (optionType == true) {
        optionType = "Calls";
      } else {
        optionType = "Puts";
      }
      if (optionMethod == true) {
        optionMethod = "Buying";
      } else {
        optionMethod = "Writing";
      }

      // required to return upside since it's used for the graph formatting
      var upside_max = generateGraphData(
        optionType,
        optionMethod,
        index,
        price
      );

      if (window.myChart != null) {
        window.myChart.destroy();
      }

      // Set color schemes to signify profit/loss/breakeven on the graph
      correct_colors = [];
      if (
        (optionType === "Calls" && optionMethod == "Buying") ||
        (optionType === "Puts" && optionMethod == "Writing")
      ) {
        correct_colors = [
          "red",
          "red",
          "red",
          "black",
          "green",
          "green",
          "green",
        ];
      } else if (
        (optionType === "Calls" && optionMethod == "Writing") ||
        (optionType === "Puts" && optionMethod == "Buying")
      ) {
        correct_colors = [
          "green",
          "green",
          "green",
          "black",
          "red",
          "red",
          "red",
        ];
      }

      const data = {
        labels: window.labels,
        datasets: [
          {
            label: expiry_date + optionType,
            pointBorderColor: "black",
            fill: false,
            data: window.data,

            backgroundColor: correct_colors,
            borderColor: ["black", "black", "black", "black", "black", "black"],
            borderWidth: 7,
          },
        ],
      };
      const config = {
        type: "line",
        data,
        options: {
          plugins: {
            title: {
              display: true,
              text: optionMethod + expiry_date + optionType,
              color: "white",
              font: {
                size: 60,
                family: "DM Sans",
              },
            },
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                display: true,
                color: "white",
                lineWidth: 2,
              },
              ticks: {
                color: "white",
                font: {
                  size: 20,
                  family: "DM Sans",
                },
              },
              title: {
                display: true,
                text: "Share Price ($)",
                color: "white",
                font: {
                  size: 26,
                  family: "DM Sans",
                },
              },
            },
            y: {
              grid: {
                display: true,
                color: "white",
                lineWidth: 2,
              },
              ticks: {
                min: 15000,
                max: upside_max * 2,
                color: "white",
                font: {
                  size: 20,
                  family: "DM Sans",
                },
              },

              title: {
                display: true,
                text: "P&L ($)",
                color: "white",
                font: {
                  size: 26,
                  family: "DM Sans",
                },
              },
            },
          },
        },
      };

      window.myChart = new Chart(
        document.getElementById("window.myChart"),
        config
      );
    };
  }
}
