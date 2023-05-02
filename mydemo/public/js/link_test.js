var Count = 0
var countElement = document.getElementById('packetCount')
countElement.textContent = Count

var Type = 'TCP'
var typeElement = document.getElementById('protocolType')
typeElement.textContent = Type

var str = '0%'
var lossElement = document.getElementById('cal_loss')

async function getLossData(id) {
    const url = "http://127.0.0.1:8081/cal_loss";
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
        
        updateLossData(json.loss)
    } catch (error) {
        console.error("Error:", error);
    }
}

async function updateLossData(s){
    var sstr = Number(s*100).toFixed(1);
    sstr += "%";
    lossElement.textContent = sstr
}

getLossData(2)