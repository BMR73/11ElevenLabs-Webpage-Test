document.getElementById("send").onclick = async () => {
  const message = document.getElementById("input").value;

  const res = await fetch("/run-agent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await res.json();
  document.getElementById("output").textContent = JSON.stringify(data, null, 2);
};

