var flowdata = {};

async function startUpdate() {
  while (true) {
    for (var i = 2; i <= 9; i++) {
      await getFlowData(i);
    }
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
}

async function getFlowData(id) {
  const url = "http://127.0.0.1:8081/get_flow";
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
    // console.log(json.flow)
    if (json.flow) {
      flowdata["id" + id] = json.flow;
    //   console.log(flowdata["id" + id])
      updateData(id);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function updateData(id) {
  const element = document.getElementById("flow" + id);
  if (element) {
    element.textContent = parseFloat(flowdata["id" + id]).toFixed(1);
    // console.log(flowdata["id" + id])
  }
}

startUpdate();
