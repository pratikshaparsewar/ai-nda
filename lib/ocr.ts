import type OpenAI from 'openai'

export async function extractTextViaOCR(buffer: Buffer, openai: OpenAI): Promise<string> {
  // Register browser globals required by pdfjs-dist before importing it
  const { createCanvas, DOMMatrix, ImageData } = await import('canvas')
  // @ts-expect-error – polyfill browser globals for pdfjs-dist in Node.js
  global.DOMMatrix ??= DOMMatrix
  // @ts-expect-error
  global.ImageData ??= ImageData

  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs')
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/legacy/build/pdf.worker.mjs',
    import.meta.url
  ).toString()

  const pdf = await pdfjsLib.getDocument({
    data: new Uint8Array(buffer),
    useSystemFonts: true,
  }).promise

  const pageCount = Math.min(pdf.numPages, 15)
  const textParts: string[] = []

  for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
    const page = await pdf.getPage(pageNum)
    const viewport = page.getViewport({ scale: 2.0 })
    const canvas = createCanvas(viewport.width, viewport.height)
    const context = canvas.getContext('2d')

    await page.render({
      canvasContext: context as unknown as CanvasRenderingContext2D,
      canvas: canvas as unknown as HTMLCanvasElement,
      viewport,
    }).promise

    const base64 = canvas.toBuffer('image/png').toString('base64')

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: { url: `data:image/png;base64,${base64}`, detail: 'high' },
          },
          {
            type: 'text',
            text: 'Extract all text from this document page exactly as written. Return only the raw text, no commentary.',
          },
        ],
      }],
      max_tokens: 4096,
    })

    const extracted = response.choices[0]?.message?.content ?? ''
    if (extracted.trim()) textParts.push(extracted.trim())
  }

  return textParts.join('\n\n')
}
