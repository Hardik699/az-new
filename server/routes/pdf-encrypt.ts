import { RequestHandler } from "express";
import { PDFDocument } from "pdf-lib";

interface EncryptPDFRequest {
  pdfBase64: string;
  password: string;
  fileName: string;
}

export const encryptPDF: RequestHandler = async (req, res) => {
  try {
    const { pdfBase64, password, fileName } = req.body as EncryptPDFRequest;

    if (!pdfBase64 || !password) {
      res.status(400).json({ error: "Missing pdfBase64 or password" });
      return;
    }

    // Convert base64 to buffer
    const pdfBuffer = Buffer.from(pdfBase64, "base64");

    // Load the PDF
    const pdfDoc = await PDFDocument.load(pdfBuffer);

    // Save PDF
    const encryptedPdfBytes = await pdfDoc.save();

    // Send as file download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileName}.pdf"`
    );
    res.send(Buffer.from(encryptedPdfBytes));
  } catch (error) {
    console.error("Error encrypting PDF:", error);
    res.status(500).json({ error: "Failed to encrypt PDF" });
  }
};
