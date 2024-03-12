import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Temp = () => {
    const exportToPDF = () => {
        const doc = new jsPDF();

        autoTable(doc, {
            head: [['Name', 'Age', 'Country']],
            body: [
                ['John Doe', '30', 'USA'],
                ['Jane Smith', '25', 'Canada'],
                ['Maria Garcia', '35', 'Spain'],
            ],
        });

        // Save the PDF
        doc.save("table.pdf");
    };

    return (
        <div>
            <h2>Sample HTML Table</h2>
            <button onClick={exportToPDF}>Export to PDF</button>
        </div>
    );
};

export default Temp;
