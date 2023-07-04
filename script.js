//Dom Element
const btn = document.getElementById("btn");
const loader = document.getElementById("loader");

//Get user IP address
btn.addEventListener("click", async () => {
    try {
        loader.removeAttribute('class', 'none');

        const response = await fetch("https://api.ipify.org?format=json");
        const ipAddress = await response.json();

        let ip = ipAddress.toString();
        const token = "3a3c2bcea31b8f";

        const apiUrl = "https://ipinfo.io/geo?ip=" + ip + "&token=" + token;
        // const apiUrl = `https://ipinfo.io/${ip}/geo`

        const rawdata = await fetch(apiUrl);
        const data = await rawdata.json();
        console.log(data);

        sessionStorage.clear();

        setTimeout(() => {
            loader.setAttribute('class', 'none');
            sessionStorage.setItem("userLocation", JSON.stringify(data));
            sessionStorage.setItem("ipLoc", JSON.stringify(ipAddress));
            window.location.href = "./addressInfo.html";
        }, 1000);

    } catch (err) {
        alert(`Error: ${err}`);
    }
});