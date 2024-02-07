function getDeviceInfo(device) {
    fetch(`http://127.0.0.1:5000/api/get_info/${device}`, { mode: 'cors' })
        .then(response => response.json())
        .then(data => {
            document.getElementById('device-info').innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error fetching device info:', error);
            document.getElementById('device-info').innerHTML = `Error: ${error.message}`;
        });
}

