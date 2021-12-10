import PdfPrinter from 'pdfmake'
import imageToBase64 from 'image-to-base64'

const fonts = {
    Helvetica: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold'
    }
  }

export const generatePDF = async (movie, movieReviews) => {
    const printer = new PdfPrinter(fonts)

    const base64Image = await imageToBase64(movie.Poster)
    // console.log(base64Image)
  
    const docDefinition = {
        info: {
            title: `${movie.Title}`,
            author: `${movie.imdbID}`,
            subject: 'Movie PDF',
            },
        content: [
            { image: `data:image/jpeg;base64,${base64Image}`, margin: [0, 10] },
            { text: `${movie.Title}`, style: 'header', margin: [0, 20] },
            `${movie.Plot}`,
            { text: 'Reviews', style: 'subHeader', margin: [0, 20] },
            `${movieReviews.map(review => review.comment)}`
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