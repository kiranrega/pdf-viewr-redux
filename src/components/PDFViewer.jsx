import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { useDispatch, useSelector } from "react-redux";

export function PDFViewer() {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= numPages) {
      setPageNumber(newPage);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="pdf-viewer">
      <Document file={files[0]} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({ length: files[0].numPages }, (_, i) => (
          <Page key={`page_${i + 1}`} pageNumber={i + 1} width={500} />
        ))}
      </Document>
      <div className="controls">
        <button
          onClick={() => handlePageChange(pageNumber - 1)}
          disabled={pageNumber === 1}
        >
          Previous Page
        </button>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <button
          onClick={() => handlePageChange(pageNumber + 1)}
          disabled={pageNumber === numPages}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
