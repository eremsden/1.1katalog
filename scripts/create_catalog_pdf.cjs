const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

async function buildPdf() {
  console.log('Generating 8-page catalog PDF...');
  const pdfDoc = await PDFDocument.create();

  for (let i = 1; i <= 8; i++) {
    const imgPath = path.join(__dirname, '..', 'public', 'img', 'pages', `page-${i}.jpg`);
    const imgBytes = fs.readFileSync(imgPath);
    const image = await pdfDoc.embedJpg(imgBytes);

    // Standard A4 aspect ratio or image dimensions
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
    console.log(`Embedded page ${i}`);
  }

  const pdfBytes = await pdfDoc.save();

  fs.writeFileSync(path.join(__dirname, '..', 'dikon-catalog.pdf'), pdfBytes);
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'dikon-catalog.pdf'), pdfBytes);
  const distDir = path.join(__dirname, '..', 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'dikon-catalog.pdf'), pdfBytes);
  }
  console.log('Successfully saved dikon-catalog.pdf! Total size:', pdfBytes.length);
}

buildPdf().catch(console.error);
