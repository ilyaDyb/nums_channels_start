let ctx = document.querySelector("#myChart")
let graphData = {
    type: 'line',
    data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
};
let myChart = new Chart(ctx, graphData)

let socket = new WebSocket('ws://localhost:8000/ws/some-url/')
socket.onmessage = function(event){
    var data = JSON.parse(event.data)
    console.log(data)
    let newGraphData = graphData.data.datasets[0].data
    let newLabels = graphData.data.labels

    
    newGraphData.shift()
    newLabels.shift()
    newGraphData.push(data.value)
    newLabels.push(data.day)
    graphData.data.datasets[0].data = newGraphData
    graphData.data.labels = newLabels
    myChart.update()
    document.querySelector('#app').innerText = data.value
}