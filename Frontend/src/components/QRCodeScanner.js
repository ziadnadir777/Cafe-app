import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';

const QRCodeScanner = () => {
    const [scanResult, setScanResult] = useState('');
    const navigate = useNavigate();

    const handleScan = (data) => {
        if (data) {
            setScanResult(data);
            // Extract zoneId from QR code data and navigate to the menu page
            const zoneId = extractZoneId(data); // Implement this function
            navigate(`/menu?zoneId=${zoneId}`);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <div>
            <QrReader
                onScan={handleScan}
                onError={handleError}
                style={{ width: '100%' }}
            />
            {scanResult && <p>Scan Result: {scanResult}</p>}
        </div>
    );
};

export default QRCodeScanner;
