var data = {
    id: 'multipleBarsLines',
    legendBar: ['UDP', 'TCP'],
    symbol: ' ', //数值是否带百分号 
    xAxis: ['s1', 's2', 's3', 's4', 's5', 's6'],
    yAxis: [], // 将yAxis设为空数组，待数据请求成功后再填充
    barColor: ['#009883', '#e66922'], //柱子颜色 必填参数
};

// 拼接URL参数
var params = {
  id: '1-6'
};
var url = 'http://localhost:8081/get_proto?' + $.param(params);

// 发送Ajax请求
$.ajax({
  url: url,
  type: 'GET',
  dataType: 'json',
  success: function(response) {
    // 成功获取数据后，将数据填充到yAxis中
    data.yAxis = response.data;
    // 渲染图表
    renderChart(data);
  },
  error: function(xhr, status, error) {
    console.error('请求失败：', error);
  }
});

function renderChart(data) {
  // 渲染图表的代码
}