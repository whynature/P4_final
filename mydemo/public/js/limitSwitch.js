var s1 = '否';
var s2 = '否';
var s3 = '否';
var s4 = '否';
var s5 = '否';
var s6 = '否';

var id1 = 1;
var id2 = 2;
var id3 = 3;
var id4 = 4;
var id5 = 5;
var id6 = 6;
var cnt = 0;

var elementS1 = document.getElementById('limitS1');
var elementS2 = document.getElementById('limitS2');
var elementS3 = document.getElementById('limitS3');
var elementS4 = document.getElementById('limitS4');
var elementS5 = document.getElementById('limitS5');
var elementS6 = document.getElementById('limitS6');

async function startUpdate(id, s) {
    while (true) {
        await getSwitchData(id, s);
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
}

async function getSwitchData(id, s) {
    const url = "http://127.0.0.1:8081/switch_full";
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
        if(id==2) console.log(json.code)
        if (json.code) {
            s = '是';
        } else {
            s = '否';
        }
        updataData(id, s);
    } catch (error) {
        console.error("Error:", error);
    }
}

function updataData(id, s){
    switch (id) {
        case 1:
            elementS1.textContent = s;
            break;
        case 2:
            elementS2.textContent = s;
            break;
        case 3:
            elementS3.textContent = s;
            break;
        case 4:
            elementS4.textContent = s;
            break;
        case 5:
            elementS5.textContent = s;
            break;
        case 6:
            elementS6.textContent = s;
            break;
        default:
            console.log("Invalid ID!");
    }
}

startUpdate(id1, s1);
startUpdate(id2, s2);
startUpdate(id3, s3);
startUpdate(id4, s4);
startUpdate(id5, s5);
startUpdate(id6, s6);

