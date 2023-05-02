<template>
    <div id="myChart" style="height: 400px"></div>
</template>
  
<script>
import * as echarts from 'echarts/core';
import { GraphChart } from 'echarts/charts';
import { TooltipComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TooltipComponent, GridComponent, GraphChart, CanvasRenderer]);

export default {

    mounted() {
        var myChart = echarts.init(document.getElementById('myChart'));

        const data = [
            {
                name: 'h1',
                x: 300,
                y: 80,
                category: 'host',
            },
            {
                name: 's1',
                x: 400,
                y: 80,
                category: 'switch',
            },
            {
                name: 's2',
                x: 500,
                y: 0,
                category: 'switch',
            },
            {
                name: 's3',
                x: 500,
                y: 60,
                category: 'switch',
            },
            {
                name: 's4',
                x: 500,
                y: 120,
                category: 'switch',
            },
            {
                name: 's5',
                x: 500,
                y: 180,
                category: 'switch',
            },
            {
                name: 's6',
                x: 600,
                y: 80,
                category: 'switch',
            },
            {
                name: 'h2',
                x: 700,
                y: 80,
                category: 'host',
            },
        ]

        const categories = [
            {
                name: 'host',
                symbol: 'image://data:image/png;base64,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',
            },
            {
                name: 'switch',
                symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFcAAAA4CAYAAACIamTjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFxEAABcRAcom8z8AAAoSSURBVHhe7ZxZUJNZFsd9nMd5nLeZx3nsqqmp6rJGq8vpnulxepnS7qqe7rJxulVEW2SVfQtLB0QggODaKoqIgixZSYJRQBHobmhpFsMSEkIgG0gEIoieybl8gUAuyRfgo0Fzqn4lJve799z/d+6552bbsRUsQDX1hwDV8/dWEqwY/yimbowfpjRfRcIVxov4b7TcmBNTZ/qCdk2AauJPTLdvj6GASfKxQ0QYuak6WmFpS5YbW1Prxob5dQZNqXgAnNTVdIOypos1rtdiX9hnnML8S4TS0hktt4giFaZCHBt9YNzZnhagmnw3WGk9SiLMIWC2TN+WLx0evStUU4XZTNAH9CVPqnscLzep0Mdj98a/Qp8Z97eWOZbh70MVlpj4ujFZet3oQKFUO4kRJKntoU5wK4E+oq8CqdaapDANxsmNojDF+Almar+NHXswvjtKYSrJko08uCTWGJ1CnhdUwGf7AghXz0vcJrMdENb2wjXxYJ9Apqt0pLDUAJXtz8y0uTPMVyFKqyBBbuwtkmoXI9Mp6N8/+BBu36kAo8kEaNbxcSi/XQHBx2PdJsAVNRX1oFQ2QkfHE2hr+wlaWlp9RiltXuwP51gsHZrGvSGk3hoRoILfMXJsjOHuGycfu1Yk0apdl3rtrVYICgxbJijNXr9+DX19/RAXxwNB5vXF67nkvrgH1L+OgcX4HMxmK8zNzTHeeLdXr16BsrbDrU+MaNw/wuvNueveGLEDh6h3cNmvHMgVdbcebLbnjGueDScpkkghPDSB3BxafxtB+ZUH8OUXR2DP+/8EuUIJ8/PzjAfsTK8fofbrpFCq6w9VWopwv2HkYm/f1VvO4ObkGqneaGvSgMloJZHKxkZGRuDChcuQEp9P7c8VTD0I7TlXMnkXYefOPRAblwBDWi0zkmdDf2em7cz/lkwua6CO4QQjOUZh6g2+Z9nPyObZMKfEys1NN4V9s7QO2YBLckA9Cnb7C8ZNz4ZR1dLaBtFRyWQTxKgLC+bB3r2fwfEToSAUiciNmHo+Qx0PV8DBA8fh3Z27oFYoYp0CXr6ch5GhicV+0G/doBXGrZNEcEwPFaWqZWPRuCQemHDU0+Ue8zGmgViFuc+XaPVGR7PWp2jGTRA3FRQTJ+c0vBxXhmvfmL937f4ADh0JJDmd7RgzU7PEL9e+aGDO7m73nB6coGZ4WKEKjA9GbbCwrvgazSvNNcIO/S8M/rZ7D9lIp6anmRae7dWr12Ay2KBJwd1BhgistFQzki4ZT2a4VC3spV60EWBexXLtL3/dCXccovhisy9eLuurtOQu6w3qhf0lDPQYl13PJZhOcb9iZF2I2nypdpjWeK1gHoyJzISDB4OgoLCI1Jw2m42ZMnvDpf5YNeDWP0YgroTp6Rmm5ZLhNc/GZ9zSyGYRrTB3MdLu2BFeb03j4tyPAmDeWg9sciOKqBsaIxGO6QNTEK3dZlEoGZpx7F/vEHEj5aZHtEabDVYKm3XI4JKbogE4qRxPJOKGyExDXG1kbHDWpjl5eaRKUCjrITIynjxOa+8En8fUsx68jbEWfhAPwLcySzER97jY8Piy0D2vcQ3u+u//Y++qtandbif1b2Jihtu1KAzejMnJSR+wkbw/NTUFMzN2MOjNpK5lk3p8gSfSw2GxIYGIG1ypq06v9P0F6rWAB4RPP/4vfPnVAda1KRb7rvUm9vHxJ/9ZVgd7MxTWYrKBRm3ecDFdwVNbeK0eAkWGiEVxs0/fgzjpGGcCOwv+c+cvkIOCN0PNp2wvqEJgOYeR6IvhjWhvb4eQ0GhWx+i1gNrFOoRNOduyXFwBTwLpZx9DisTASmAUK7/gLAQGniRHVVobBJ/7178/Zf3iydyc5x0fj7kNjY1M6yWbm52HUYOJ1UrAm3uzrJykJdoYawE1S63RAT+nAdIFD93FJWQq4PtqDXk7hNaJKyUlZcRZzJddXd1QWHSOLHnMh/iK1JHAILL0vRkKYpuc8bpcMR1kZuaQa+YdqcL2zE4OCK43Av9W9+jITfJmC9HcsfiahutYvlDm0Cq9og9yMuREw9XFZYgv74czQs+TxYPCiMHAuLpkGBlslu3s7JzPdSnmXrZH2N5OPUxMsEsfzhf2Pa3ClWC0pouGIenak2XaeRUXycxthAzHHbldu/pkzhWU+rSxYJRazc843VRWgocM45iZVcrA1NXY1ATRp1LISqH1h5TUqCGlXA3ZfKWbbqzEdZKV1wiZpY4iv4ouslhcx7jGzvBmaLU6uHu3BhJiszxOYiPBiNf0j7DK/XgjcJW4Xo+RWlzZC/zrnXA6q56qFeKTuE6ww6QbC4n7vGSIlB04KKYHX3dvV8Oas7tLDY/uc18KOunrNlDfPbHPzJFyzdkOD1cXRIOQUTUIvMvti3nVE2sS10lumgx4jnIj9s4gRIsMkCUeJm9Puzq/XcD0hCUf5n6MbIzOEvxgiUgHSdVaEkxYAdB0WI11ibsSjOiUSz9DYsUgpNbqIFs4tK3EdoqZKNRDXOUgpBW3sorQ1dhQcVeCST7x/I8QVaEhSR8L60xH5YFH7FuiPuoENwO84egD+oJRSXy71U9WIW1jWiuciksDIwEHRdHjb/Q4UsoAJJU9hbiaYQLW1jhppPjuU7hcsfBJmJXcFPW7PfZDpSMvOjYa5/X8Gg3pM0o4QsaIqNKRMRMuthMfMK3RfNwoNl1ctmRmq4hza8HX3MgV6MuWFPdNwC8uh/jF5RC/uBziF5dD/OJyiF9cDsET63fVhlAibkjV0Jn1HPf8LCcjr9H2rdT0ORH3RKWmgOtTy9tEmuDh7GGZ5Rsi7vFaQ7lf3I0jtaAZDsvNnxBxD8uM+9NzG2ZpDf34zqnr3drFT5zjB/EibvU/pTX04zvBVfr7RFinBdUY9iUXtUzQGvthz6nrPQPUL6OcqBqOyshpsNEu8uOd6Cud+qNVI7sYOd0t+I4mND2nUUO72M/qxF7pfOpRWKeFiwx/TDnbci43TWqndeRnidN85WRY6dNin78ydfL24Nexlzv6/WWaO3joiirpeXRUPPoRI5fvht+exDo4orS3YyPfZ9quYKQ6Nq0HQcLR5DV9wY9m2NFhqflUzNUnJfzs+3rawG8yvIJmbeSN7vxv6icPMJJwY1gXO9LF18nnfryWlt+kpjnzJsArbO6Kv/jzhfCyPm4FXc2wpjsiHjsaXqrOj7na2ZiW12ShObodSBc0GaKv/XovpLw/GyOUWq/+loa/TYBJPvJ69zF+tipbkCIuy86o23LRjT7lpMlu80+r0qOudh5CnzfldxW4MEwluanS9wSpog8dgicvIKk6nXXvoWOy7Ssnv17yeJIe7PtMhlyUxVfwcbzv8x7sRx+2XERyabhZLvyq0sJ3t3KTRO+gCLyzrfsibvaGODlWM1wYJNRfdH0M25CbliQhv1GD1Q3T19sj4NtpO3b8Hw6iZM//DVGwAAAAAElFTkSuQmCC',
            },

        ]

        this.option = {
            title: {
                text: 'Topology Graph'
            },
            tooltip: {},
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    type: 'graph',
                    layout: 'none',
                    symbolSize: 50,
                    roam: true,
                    label: {
                        show: true
                    },
                    edgeSymbol: [],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        fontSize: 20
                    },
                    data,
                    links: [
                        {
                            source: 'h1',
                            target: 's1',
                            lineStyle: {
                                color: 'rgb(156,159,162)'
                            }
                        },
                        {
                            source: 's1',
                            target: 's2',
                            lineStyle: {
                                color: 'rgb(156,159,162)'
                            }
                        },
                        {
                            source: 's1',
                            target: 's3',
                            lineStyle: {
                                color: 'rgb(156,159,162)'
                            }
                        },
                        {
                            source: 's1',
                            target: 's4',
                            lineStyle: {
                                color: 'rgb(156,159,162)'
                            }
                        },
                        {
                            source: 's1',
                            target: 's5',
                            lineStyle: {
                                color: 'rgb(156,159,162)'
                            }
                        },
                        {
                            source: 's2',
                            target: 's6',
                            lineStyle: {
                                color: 'rgb(156,159,162)'
                            }
                        },
                        {
                            source: 's3',
                            target: 's6',
                            lineStyle: {
                                color: 'rgb(156,159,162)'
                            }
                        },
                        {
                            source: 's4',
                            target: 's6',
                            lineStyle: {
                                color: 'rgb(156,159,162)'
                            }
                        },
                        {
                            source: 's5',
                            target: 's6',
                            lineStyle: {
                                color: 'rgb(156,159,162)'
                            }
                        },
                        {
                            source: 's6',
                            target: 'h2',
                            lineStyle: {
                                color: 'rgb(156,159,162)'
                            }
                        }],
                    categories,
                    lineStyle: {
                        opacity: 0.9,
                        width: 6,
                        curveness: 0,
                    }
                }
            ],
            currentLineIndex: 0
        };

        myChart.setOption(this.option);
        this.changeSwitch('h1->s1')
        this.changeProtoType('UDP')
        this.changeLineColor();
        
    },
    methods: {
        changeLineColor() {
            // 更改连接线的颜色
            var myChart = echarts.init(document.getElementById('myChart'));
            const lineCount = this.option.series[0].links.length;
            if (this.option.currentLineIndex === lineCount) {
                // 如果所有线都已经闪烁过一次，重置索引并返回
                this.option.currentLineIndex = 0;
                return;
            }

            // 更改当前线的颜色
            const lineStyle = this.option.series[0].links[this.option.currentLineIndex].lineStyle;
            lineStyle.color = 'rgb(255,255,0)';
            myChart.setOption(this.option);

            // 闪烁一次
            setTimeout(() => {
                lineStyle.color = 'rgb(156,159,162)';
                myChart.setOption(this.option);

                setTimeout(() => {
                    // 继续闪烁下一条线
                    if(this.option.currentLineIndex == 0){
                        var randomNum = Math.floor(Math.random() * 4) + 1
                        this.option.currentLineIndex = randomNum;
                        this.changeSwitch('s1->s'+(this.option.currentLineIndex+1));
                    }
                    else if(this.option.currentLineIndex < 5){
                        this.option.currentLineIndex += 4;
                        this.changeSwitch('s'+(this.option.currentLineIndex-3)+'->s'+6);
                    }
                    else if(this.option.currentLineIndex < 9){
                        this.option.currentLineIndex = 9;
                        this.changeSwitch('s6->h2');
                    }
                    else{
                        this.option.currentLineIndex = 0;
                        this.changeSwitch('h1->s1');
                        var r = Math.floor(Math.random()*2)+1
                        // console.log(r)
                        if(r==1){
                            this.changeProtoType('UDP')
                        }
                        else{
                            this.changeProtoType('TCP')
                        }    
                    }
                    // console.log(this.option.currentLineIndex)
                    myChart.setOption(this.option);
                    this.changeLineColor();
                }, 500);
            }, 1000);

            myChart.setOption(this.option);

        },
        changeColor(id, color) {
            // console.log(id, color)
            this.option.series[0].links[id].lineStyle.color = color;
        },
        getRandomColor() {
            // 获取随机颜色
            return '#' + Math.floor(Math.random() * 16777215).toString(16);
        },
        changeSwitch(id){
            var switchElement = document.getElementById('location')
            switchElement.textContent = id
        },
        changeProtoType(type){
            var typeElement = document.getElementById('protocolType')
            typeElement.textContent = type
        }
    },
}
</script>
  
<style>
#myChart {
    width: 100%;
    height: 100%;
}
</style>
  