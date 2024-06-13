import React from 'react';
import axios from 'axios';

const DownloadCSV = () => {
    const handleDownload = async () => {
        try {
            // Fetch credits data
            const creditsResponse = await axios.get('http://localhost:8081/getCredits');
            const creditsData = creditsResponse.data;

            // Fetch debits data
            const debitsResponse = await axios.get('http://localhost:8081/getDebits');
            const debitsData = debitsResponse.data;

            // Combine credits and debits data into CSV format
            const creditsCsvHeader = 'name,date,credit\n';
            const creditsCsvData = creditsData.map(row => 
                `${row.name},${new Date(row.date).toISOString().split('T')[0]},${row.credit}`
            ).join('\n');

            const debitsCsvHeader = 'name,date,debit\n';
            const debitsCsvData = debitsData.map(row => 
                `${row.name},${new Date(row.date).toISOString().split('T')[0]},${row.debit}`
            ).join('\n');

            const csvContent = `${creditsCsvHeader}${creditsCsvData}\n\n${debitsCsvHeader}${debitsCsvData}`;

            // Create a blob with the CSV content
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);

            // Create a link to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'data.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <i className="fa-solid fa-download" onClick={handleDownload}></i>
        </div>
    );
};

export default DownloadCSV;
