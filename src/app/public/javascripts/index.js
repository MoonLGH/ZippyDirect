/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
async function get() {
  const link = document.querySelector("#link").value;
  document.querySelector("#linkhere").innerText = "Loading...";
  const res = await fetch("/api/get?link="+link);
  const data = await res.json();
  console.log(res);
  if (res.status !== 200) {
    document.querySelector("#linkhere").innerText = "Link does not valid, please try again";
    return;
  }
  document.querySelector("#linkhere").innerHTML = `Note: click on open in new tab/save as file, if normal click didn't work <br> <a class="btn btn-primary" href="${data.link}" target="_blank" rel="noopener noreferrer nofollow">Or click here to direct download</a>`;
  document.querySelector("#result").value = data.link;
}
