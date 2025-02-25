import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import * as QRCode from 'qrcode';

@Injectable()
export class GeneratePdfTicketProvider {
  async generateTicket(
    customer: string,
    date: Date,
    price: number,
    tripStart: string,
  ) {
    // Generate a unique code (for simplicity, using a timestamp)
    const uniqueCode = Date.now().toString();

    // Generate QR code
    const qrCodeData = `Ticket Code: ${uniqueCode}\nCustomer: ${customer}\nDate: ${date}\nPrice: ${price}\nTrip Start: ${tripStart}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);

    // Create a PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([400, 600]);

    // Embed the QR code image in the PDF
    const qrCodeImageBytes = await fetch(qrCodeImage).then((res) =>
      res.arrayBuffer(),
    );
    const qrCodeImageEmbed = await pdfDoc.embedPng(qrCodeImageBytes);
    page.drawImage(qrCodeImageEmbed, {
      x: 50,
      y: 450,
      width: 100,
      height: 100,
    });

    // Add text to the PDF
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    page.drawText(`Ticket Code: ${uniqueCode}`, {
      x: 50,
      y: 400,
      size: 12,
      font,
    });
    page.drawText(`Customer: ${customer}`, { x: 50, y: 380, size: 12, font });
    page.drawText(`Date: ${format(date, 'dd-MM-yyyy HH:mm')}`, { x: 50, y: 360, size: 12, font });
    page.drawText(`Price: ${price} MAD`, { x: 50, y: 340, size: 12, font });
    page.drawText(`Trip Start: ${tripStart}`, {
      x: 50,
      y: 320,
      size: 12,
      font,
    });

    // Save the PDF
    const pdfBytes = await pdfDoc.save();

    // Convert the object values into an array of bytes
    const byteArray = Object.values(pdfBytes);

    // Convert the byte array to a Buffer
    const buffer = Buffer.from(byteArray);

    // Encode the Buffer to a Base64 string
    const base64String = buffer.toString('base64');

    // return
    return base64String;
  }
}
