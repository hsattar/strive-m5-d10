import PdfPrinter from 'pdfmake'
import fs from 'fs'

const fonts = {
    Helvetica: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold'
    }
  }

export const generatePDF = (movie) => {
    const printer = new PdfPrinter(fonts)
  
    const docDefinition = {
        info: {
            title: `${movie.Title}`,
            author: `${movie.imdbID}`,
            subject: 'Movie PDF',
            },
        content: [
            {text: `${movie.Title}`, style: 'header', margin: [0, 20]},
            'Year',
            {text: 'Reviews', style: 'subHeader', margin: [0, 20]},
            'blah blah'
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true
            },
            subHeader: {
                fontSize: 14,
                bold: true
            }
        },
        defaultStyle: {
            font: 'Helvetica'
            }
    }

    const options = {
    }

    const pdfDoc = printer.createPdfKitDocument(docDefinition, options)
    return pdfDoc
}