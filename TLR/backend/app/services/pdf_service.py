"""
PDF text extraction utility.
"""
import io
import PyPDF2


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extract all text from a PDF file's bytes."""
    reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
    pages = []
    for page in reader.pages:
        text = page.extract_text()
        if text:
            pages.append(text)
    return "\n".join(pages)
