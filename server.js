const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const struct = require('struct');  
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors()); 

// Function to read binary file and extract information
const readBinaryFile = (device) => {
    const filePath = path.join(__dirname, 'bin_files', `${device}.bin`);

    try {
        const dataBuffer = fs.readFileSync(filePath);
        let result;

        // Implement data extraction based on device type
        switch (device) {
            case 'battery':
                result = struct.unpack('ff', dataBuffer);
                break;
            case 'motar':
                result = struct.unpack('?', dataBuffer);
                break;
            case 'communication':
                result = struct.unpack('???', dataBuffer);
                break;
            case 'led':
                result = struct.unpack('i', dataBuffer);
                break;
            case 'power':
                result = struct.unpack('f', dataBuffer);
                break;
            default:
                return null;  // Invalid device
        }

        return { data: result };
    } catch (error) {
        return null;  // File not found or error reading file
    }
};

// Define API endpoint to get device information
app.get('/api/get_info/:device', (req, res) => {
    const device = req.params.device;
    const deviceInfo = readBinaryFile(device);

    if (deviceInfo) {
        res.json(deviceInfo);
    } else {
        res.status(404).json({ error: 'Device information not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
