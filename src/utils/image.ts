/**
 * Client-side image optimization utility
 * Resizes large camera photos to a clean resolution (max 1280px) and quality 0.82
 * to prevent massive base64 payloads, HeadersTimeoutError, and browser memory spikes.
 */
export async function optimizeImageForUpload(
  file: File,
  maxDimension = 1280,
  quality = 0.82
): Promise<{ dataUrl: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to decode image'));
      img.onload = () => {
        let { width, height } = img;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // If canvas context fails, return raw image data
          resolve({
            dataUrl: event.target?.result as string,
            mimeType: file.type || 'image/jpeg',
          });
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Export as JPEG with balanced quality for fast upload & API vision processing
        const mimeType = 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, quality);

        resolve({ dataUrl, mimeType });
      };

      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
