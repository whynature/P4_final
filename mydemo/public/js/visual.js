var cdata = {
    id: 'multipleBarsLines',
    legendBar: ['UDP', 'TCP'],
    symbol: ' ', //数值是否带百分号 
    xAxis: ['s2', 's3', 's4', 's5'],
    yAxis: [
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    barColor: ['#009883', '#e66922'], //柱子颜色 必填参数
}
var chartElement = document.getElementById('Bar')



function renderChart(data) {
    var myData = (function test() {
        let yAxis = data.yAxis || []
        let legendBar = data.legendBar || []
        var symbol = data.symbol || ' '
        let seriesArr = []
        let legendArr = []
        yAxis && yAxis.forEach((item, index) => {
            legendArr.push({
                name: legendBar && legendBar.length > 0 && legendBar[index]
            })
            seriesArr.push({
                name: legendBar && legendBar.length > 0 && legendBar[index],
                type: 'bar',
                barGap: '0.5px',
                data: item,
                barWidth: data.barWidth || 12,
                label: {
                    normal: {
                        show: false,
                        formatter: '{c}' + symbol,
                        position: 'top',
                        textStyle: {
                            color: '#000',
                            fontStyle: 'normal',
                            fontFamily: '微软雅黑',
                            textAlign: 'left',
                            fontSize: 11,
                        },
                    },
                },
                itemStyle: { //图形样式
                    normal: {
                        barBorderRadius:0,
                        borderWidth:1,
                        borderColor:'#ddd',
                        color: data.barColor[index]
                    },
                }
            })
        })
        return {
            seriesArr,
            legendArr
        }
    })()
    option = {
        title: {
            show: true,
            text: data.title,
            subtext: data.subTitle,
            link: '1111'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                var time = '';
                var str = '';
                for (var i of params) {
                    time = i.name.replace(/\n/g, '') + '<br/>';
                    if (i.data == 'null' || i.data == null) {
                        str += i.seriesName + '：无数据' + '<br/>'
                    } else {
                        str += i.seriesName + '：' + i.data + data.symbol
                    }
    
                }
                return time + str;
            },
            axisPointer: {
                type: 'none'
            },
        },
        legend: {
            right: data.legendRight || '30%',
            top: 0,
            right:10,
            itemGap: 16,
            itemWidth: 10,
            itemHeight: 10,
            data: myData.legendArr,
            textStyle: {
                color: '#fff',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12,
            }
        },
        grid: {
            x: 0,
            y: 30,
            x2: 0,
            y2: 25,
        },
        xAxis: {
            type: 'category',
            data: data.xAxis,
            axisTick: {
                show: false,
            },
    
            axisLine: {
                show: false,
            },
            axisLabel: {       //轴标
                show: true,
                interval: 0,
                textStyle: {
                    lineHeight:5,
                    padding: [2, 2, 0, 2],
                    height: 50,
                    fontSize: 12,
                    color:'#fff',
                },
                rich: {
                    Sunny: {
                        height: 50,
                        // width: 60,
                        padding: [0, 5, 0, 5],
                        align: 'center',
                    },
                },
                formatter: function(params, index) {
                    var newParamsName = "";
                    var splitNumber = 5;
                    var paramsNameNumber = params && params.length;
                    if (paramsNameNumber && paramsNameNumber <= 4) {
                        splitNumber = 4;
                    } else if (paramsNameNumber >= 5 && paramsNameNumber <= 7) {
                        splitNumber = 4;
                    } else if (paramsNameNumber >= 8 && paramsNameNumber <= 9) {
                        splitNumber = 5;
                    } else if (paramsNameNumber >= 10 && paramsNameNumber <= 14) {
                        splitNumber = 5;
                    } else {
                        params = params && params.slice(0, 15);
                    }
    
                    var provideNumber = splitNumber; //一行显示几个字
                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber) || 0;
                    if (paramsNameNumber > provideNumber) {
                        for (var p = 0; p < rowNumber; p++) {
                            var tempStr = "";
                            var start = p * provideNumber;
                            var end = start + provideNumber;
                            if (p == rowNumber - 1) {
                                tempStr = params.substring(start, paramsNameNumber);
                            } else {
                                tempStr = params.substring(start, end) + "\n";
                            }
                            newParamsName += tempStr;
                        }
    
                    } else {
                        newParamsName = params;
                    }
                    params = newParamsName
                    return '{Sunny|' + params + '}';
                },
                color: '#687284',
            },
    
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#F1F3F5',
                    type: 'solid'
                },
                interval: 2
            },
            splitNumber: 4,
        },
        series: myData.seriesArr
    }
    var myChart = echarts.init(chartElement);
    myChart.setOption(option);
}

var chartdata = {};
var packetCnt = 0

async function startUpdate() {
  while (true) {
    packetCnt = 0
    for (var i = 2; i <= 9; i++) {
      await getChartData(i);
    }
    this.changeCnt(packetCnt)
    renderChart(cdata)
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
}

async function getChartData(id) {
  const url = "http://127.0.0.1:8081/get_proto";
  const data = { "id": id };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if(id <= 5){
        cdata.yAxis[0][id-2] = json.udp
        cdata.yAxis[1][id-2] = json.tcp
    }
    packetCnt = packetCnt+json.udp+json.tcp
    
    this.changePacket(id,json.udp+json.tcp)
  } catch (error) {
    console.error("Error:", error);
  }
}

function changeCnt(sum){
    var cntElement = document.getElementById('packetCount')
    cntElement.textContent = sum
}

function changePacket(id, cnt){
    var packetElement = document.getElementById('packet'+id)
    packetElement.textContent = cnt
}

renderChart(cdata)
startUpdate();