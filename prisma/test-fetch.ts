async function test() {
  try {
    const res = await fetch("http://localhost:3000/api/socials?userId=cmrqrq7w60000nedcfie3wwb1");
    console.log("Status:", res.status);
    const data = await res.json();
    console.log("Data:", data);
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}
test();
