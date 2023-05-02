var packetdata = {};

async function startUpdate() {
  while (true) {
    for (var i = 2; i <= 9; i++) {
      await getPacketData(i);
    }
    await new Promise(resolve => setTimeout(resolve, 6000));
  }
}

async function getPacketData(id) {
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
    packetdata["id" + id] = json.udp + json.tcp;
    updateData(id);
  } catch (error) {
    console.error("Error:", error);
  }
}

function updateData(id) {
  const element = document.getElementById("packet" + id);
  if (element) {
    element.textContent = parseInt(packetdata["id" + id]);
  }
}

startUpdate();
