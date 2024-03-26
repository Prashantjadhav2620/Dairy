

// import React, { useState, useEffect } from 'react';
// import * as PDFJSLib from 'pdfjs-dist';

// // function PdfViewer({ filename }) {
// function PdfViewer() {
//   const filename ="PRASHANTProof.pdf" 
//   const [pdfData, setPdfData] = useState(null);
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   useEffect(() => {
//     // fetch(`https://localhost:2620/api/PdfStore/GetPdfContent/${filename}`)
//     //   .then(response => response.blob())
//     //   .then(blob => {
//     //     const loadingTask = PDFJSLib.getDocument({ data: blob });
//     //     loadingTask.promise.then(pdf => {
//     //       setPdfData(pdf);
//     //       setNumPages(pdf.numPages);
//     //     });
//     //   });
    
//     fetch(`https://localhost:2620/api/PdfStore/GetPdfContent/${filename}`, {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/pdf', // Specify that you expect a PDF response
//       },
//     })
//       .then(response => response.blob()) // Convert the response to a Blob
//       .then(blob => {
//         // Create a Blob URL to display the PDF
//         const pdfUrl = URL.createObjectURL(blob);
    
//         // Use the Blob URL as needed, for example, displaying it in an iframe
//         const iframe = document.createElement('iframe');
//         iframe.src = pdfUrl;
//         document.body.appendChild(iframe);
//       })
//       .catch(error => {
//         console.error('Error fetching or displaying PDF:', error);
//       });
//   }, [filename]);

//   const handlePageChange = (newPageNumber) => {
//     setPageNumber(newPageNumber);
//   };

//   const renderPage = (pageNumber) => {
//     const page = pdfData.getPage(pageNumber);
//     const scale = 1.5;
//     const viewport = page.getViewport({ scale });

//     return (
//       <div className="pdf-page" style={{ width: viewport.width, height: viewport.height }}>
//         <canvas ref={(canvas) => {
//           const context = canvas.getContext('2d');
//           const renderContext = {
//             canvasContext: context,
//             viewport: viewport
//           };
//           page.render(renderContext);
//         }} />
//       </div>
//     );
//   };

//   return (
//     <div>
//       {pdfData && (
//         <>
//           <div className="pdf-viewer">
//             {renderPage(pageNumber)}
//           </div>
//           <div className="pdf-controls">
//             {/* Add navigation buttons or page selection here */}
//           </div>
//         </>
//       )}
//       {!pdfData && <p>Loading PDF...</p>}
//     </div>
//   );
// }

// export default PdfViewer;


// // import React, { useState, useEffect } from 'react';
// // import { Document, Page, pdfjs } from 'react-pdf';

// // pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// // const PdfViewer = () => {
// //   const [numPages, setNumPages] = useState(null);
// //   const [pageNumber, setPageNumber] = useState(1);

// //   const onDocumentLoadSuccess = ({ numPages }) => {
// //     setNumPages(numPages);
// //   };

// //   useEffect(() => {
// //     // Assuming you have an API endpoint to fetch the PDF content by filename
// //     const fetchPdfContent = async () => {
// //       // const filename = 'your-pdf-filename.pdf'; // Replace with the actual filename
// //       const filename ="PRASHANTProof.pdf"
// //       const response = await fetch(`api/PdfStore/GetPdfContent/${filename}`);
// //       const blob = await response.blob();
// //       const url = URL.createObjectURL(blob);
// //       setPdfUrl(url);
// //     };

// //     fetchPdfContent();
// //   }, []); // Make sure to adjust the dependencies if needed

// //   const [pdfUrl, setPdfUrl] = useState(null);

// //   return (
// //     <div>
// //       {pdfUrl && (
// //         <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
// //           <Page pageNumber={pageNumber} />
// //         </Document>
// //       )}
// //       <p>
// //         Page {pageNumber} of {numPages}
// //       </p>
// //     </div>
// //   );
// // };

// // export default PdfViewer;
