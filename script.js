// fetch("https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_kP07TZHPpvl1Yi0xj8GbD0eyEKn8X&ipAddress=")
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); 
})
.then(data => {
    // console.log(data);
    let lat = data.location["lat"];
    let lng = data.location["lng"];
    
    // Create an object to store both lat and lng
    let locationData = {
        lat: lat,
        lng: lng
    };
    // Convert the object to a JSON string and store it in local storage
    localStorage.setItem('location', JSON.stringify(locationData));
    

    document.querySelector(".ip_output_part").innerHTML = data.ip;
    document.querySelector(".location_output_part").innerHTML = `${data.location["country"]}, ${data.location["city"]} <br/> ${data.location["postalCode"]}`;
    document.querySelector(".timezone_output_part").innerHTML = `${data.location["timezone"]}`;
    document.querySelector(".ISP_output_part").innerHTML = `${data.as["name"]}`;
})
.catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
});

// +++++++++++++++++++++++++++++++++++++++++++++++++


document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const input = document.querySelector("#ip_input").value;

    checkIPAddress(input);
})

function checkIPAddress(ip) {
    const ipv4Pattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

    if (ipv4Pattern.test(ip)) {
        console.log("Valid IPv4 address");
        document.querySelector("#ip_input").style.borderColor = "white";

        // let ipaddress = "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_kP07TZHPpvl1Yi0xj8GbD0eyEKn8X&ipAddress=";

        ipaddress += ip;

        fetch(ipaddress)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // console.log(data);
            
            document.querySelector(".ip_output_part").innerHTML = data.ip;
            document.querySelector(".location_output_part").innerHTML = `${data.location["country"]}, ${data.location["city"]} <br/> ${data.location["postalCode"]}`;
            document.querySelector(".timezone_output_part").innerHTML = `${data.location["timezone"]}`;
            document.querySelector(".ISP_output_part").innerHTML = `${data.as["name"]}`;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

    } else {
        alert("wrong IP Address")
        document.querySelector("#ip_input").style.borderColor = "red";
    }
}
