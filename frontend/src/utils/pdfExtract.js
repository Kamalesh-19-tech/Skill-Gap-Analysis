// Utility to extract text from a PDF file using pdfjs-dist

import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.entry';
import { createWorker } from 'tesseract.js';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/node_modules/pdfjs-dist/build/pdf.worker.entry.js';


export async function extractTextFromPDF(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map(item => item.str).join(' ') + '\n';
    }
    console.log('Extracted resume text:', text);
    if (text.trim()) {
      return text;
    }
    // If no text found, try OCR on each page
    let ocrText = '';
    const worker = await createWorker('eng');
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: context, viewport }).promise;
      const dataUrl = canvas.toDataURL('image/png');
      const { data: { text: pageText } } = await worker.recognize(dataUrl);
      ocrText += pageText + '\n';
    }
    await worker.terminate();
    if (!ocrText.trim()) throw new Error('No extractable text found in PDF (even with OCR).');
    return ocrText;
  } catch (err) {
    console.error('PDF extraction error:', err);
    throw new Error('Could not extract text from this PDF. It may be scanned, encrypted, or unsupported.');
  }
}

//# sourceMappingURL=pdf.worker.js.map

