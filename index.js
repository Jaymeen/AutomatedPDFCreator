import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import PDFDocument from 'pdfkit';

async function createPDF(fullName = "") {
    const firstbackgroundimage = await loadImage("1.png");
    const fourthbackgroundimage = await loadImage("4.png");
    
    const doc = new PDFDocument({ size : [firstbackgroundimage.width, firstbackgroundimage.height] });

    doc.pipe(fs.createWriteStream(fullName.trim() + ".pdf"));

    let imageData = createImageWithChanges([500, 1160], firstbackgroundimage, fullName);
    doc.image(imageData, 0, 0);

    doc.addPage();
    doc.image("2.png", 0, 0);

    doc.addPage();
    doc.image("3.png", 0, 0);

    doc.addPage();
    imageData = createImageWithChanges([420, 340], fourthbackgroundimage, fullName);
    doc.image(imageData, 0, 0);

    doc.end();
}

function createImageWithChanges([x, y], backGroundImage, fullName) {
    const canvas = createCanvas(backGroundImage.width, backGroundImage.height);
    const context = canvas.getContext('2d');

    context.drawImage(backGroundImage, 0, 0, canvas.width, canvas.height);

    const fontPath = "Aakar";
    context.font = '50px "' + fontPath + '"';
    context.fillStyle = '#FF0000';

    context.fillText(fullName, x, y);
    const firstImageData = canvas.toBuffer('image/png');

    return firstImageData;
}
// Add some Gujarati Full Name and call the function.
// await createPDF("");