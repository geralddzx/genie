$("#table thead th input").keyup($.debounce(250, (event) => {
  genie.updatePage(0)
  genie.updateTotalPages(0)
  genie.fetch()
}))

$(".table-sort").click((event) => {
  let state = (parseInt($(event.target).attr("state")) + 1) % 3
  $(".table-sort").attr("state", 0)
  $(event.target).attr("state", state)
  genie.fetch()
})

$("#next-page").click((event) => {
  if (!$(event.target).hasClass("disabled")) {
    let newPage = genie.getPage() + 1
    genie.updatePage(newPage)
    genie.fetch()
  }
})

$("#prev-page").click((event) => {
  if (!$(event.target).hasClass("disabled")) {
    let newPage = genie.getPage() - 1
    genie.updatePage(newPage)
    genie.fetch()
  }
})

$("#table tbody").on("click", "tr", (event) => {
  $("#table tbody tr").removeClass("selected")
  $(event.currentTarget).addClass("selected")
  genie.show(event.currentTarget.id)
})

for (let i = 1; i <= 2; i++) {
  $("#gene-plot-select-" + i).click(() => {
    $("#gene-plot-select *").removeClass("selected")
    $("#gene-plot-select-" + i).addClass("selected")

    let layout = {
      plot_bgcolor: "#222222",
      paper_bgcolor:"#222222",
      font: {color: 'white'},
      margin: {t: 25, pad: 0},
      xaxis: {
        title: {text: 'Year'}
      },
      yaxis: {
        title: {text: "Cumulative Count"}
      }
    }

    let trace = [{type: "scatter", mode: "lines", x: genie.relationship.gene_data[0], y: genie.relationship.gene_data[i]}]
    Plotly.newPlot("gene-plot", trace, layout, {displayModeBar: false})
  })
}

for (let i = 1; i <= 2; i++) {
  $("#disease-plot-select-" + i).click(() => {
    $("#disease-plot-select *").removeClass("selected")
    $("#disease-plot-select-" + i).addClass("selected")

    let layout = {
      plot_bgcolor: "#222222",
      paper_bgcolor:"#222222",
      font: {color: 'white'},
      margin: {t: 25, pad: 0},
      xaxis: {
        title: {text: 'Year'}
      },
      yaxis: {
        title: {text: "Cumulative Count"}
      }
    }

    let trace = [{type: "scatter", mode: "lines", x: genie.relationship.disease_data[0], y: genie.relationship.disease_data[i]}]
    Plotly.newPlot("disease-plot", trace, layout, {displayModeBar: false})
  })
}

$("#stats").on("click", ".tab-select", (event) => {
  $("#stats .tab-select").removeClass("selected")
  $(event.target).addClass("selected")
  let index = parseInt($(event.target).attr("index"))

  if (index == genie.relationship.stats.length - 1) {
    $("#stats-plot").empty()
    $("#stats-plot").append($("<h4 style='color:white;display:flex;height:15%;margin:0;align-items:center;justify-content:center'>Related Articles</h4>"))
    let ul = $("<ul class='gene-disease-articles'>")
    $("#stats-plot").append(ul)
    genie.updateLinks($("#stats-plot .gene-disease-articles"), genie.relationship.stats[index][1])
  } else {
    let layout = {
      plot_bgcolor: "#222222",
      paper_bgcolor:"#222222",
      font: {color: 'white'},
      title: {text: genie.relationship.stats[index][0]},
      xaxis: {
        title: {text: 'Year'}
      },
      yaxis: {
        title: {text: genie.relationship.stats[index][3]}
      }
    }

    let trace = [{type: "scatter", mode: "lines", x: genie.relationship.stats[index][1], y: genie.relationship.stats[index][2]}]
    Plotly.newPlot("stats-plot", trace, layout, {displayModeBar: false})
  }
})

$("#export").click((event) => {
  genie.fetch("csv")
})

genie.fetch()
