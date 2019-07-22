import React, { Component } from 'react';
import { Document, Page, pdfjs } from "react-pdf"
import Dropzone from 'react-dropzone'
import './app.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${ pdfjs.version }/pdf.worker.js`

class App extends Component {
  state = {
    numPages: null,
    file: null
  }

  onFileChange = (files) => {
    this.setState({
      file: files[0]
    });
  }

  onDocumentLoadSuccess = (document) => {
    const { numPages } = document;
    this.setState({
      numPages,
    });
  }

  render() {
    const {numPages, file} = this.state
    return (
      <div className="App">
        <Dropzone onDrop={this.onFileChange}>
          {({getRootProps, getInputProps}) => (
            <div className="dropzone-section">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag and drop some files here, or click to select files</p>
              </div>
            </div>
          )}
        </Dropzone>
        <Document
          file={file}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          {
            file &&
              Array.from(
                new Array(numPages),
                (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                  />
                ),
              )}
        </Document>
      </div>
    );
  }
}

export default App;
