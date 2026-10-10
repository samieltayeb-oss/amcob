function getImageDimensions(buffer) {
  try {
    if (!buffer || buffer.length < 10) return { width: null, height: null, format: 'unknown' };

    // PNG
    if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
      if (buffer.length >= 24) {
        return {
          width: buffer.readUInt32BE(16),
          height: buffer.readUInt32BE(20),
          format: 'png'
        };
      }
    }

    // GIF
    if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
      if (buffer.length >= 10) {
        return {
          width: buffer.readUInt16LE(6),
          height: buffer.readUInt16LE(8),
          format: 'gif'
        };
      }
    }

    // WebP
    if (buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
      const type = buffer.toString('ascii', 12, 16);
      if (type === 'VP8 ' && buffer.length >= 30) {
        const width = buffer.readUInt16LE(26) & 0x3fff;
        const height = buffer.readUInt16LE(28) & 0x3fff;
        return { width, height, format: 'webp' };
      } else if (type === 'VP8L' && buffer.length >= 25) {
        const b0 = buffer[21];
        const b1 = buffer[22];
        const b2 = buffer[23];
        const b3 = buffer[24];
        const width = 1 + (((b1 & 0x3F) << 8) | b0);
        const height = 1 + (((b3 & 0xF) << 10) | (b2 << 2) | ((b1 & 0xC0) >> 6));
        return { width, height, format: 'webp' };
      } else if (type === 'VP8X' && buffer.length >= 30) {
        const width = 1 + buffer.readUIntLE(24, 3);
        const height = 1 + buffer.readUIntLE(27, 3);
        return { width, height, format: 'webp' };
      }
      return { width: null, height: null, format: 'webp' };
    }

    // JPEG
    if (buffer[0] === 0xFF && buffer[1] === 0xD8) {
      let offset = 2;
      while (offset < buffer.length) {
        if (buffer[offset] !== 0xFF) { offset++; continue; }
        const marker = buffer[offset + 1];
        if (marker === 0xC0 || marker === 0xC1 || marker === 0xC2) {
          const height = buffer.readUInt16BE(offset + 5);
          const width = buffer.readUInt16BE(offset + 7);
          return { width, height, format: 'jpeg' };
        }
        if (marker === 0xD9 || marker === 0xDA) break; // SOS or EOI
        const length = buffer.readUInt16BE(offset + 2);
        offset += 2 + length;
      }
      return { width: null, height: null, format: 'jpeg' };
    }

    // SVG
    const str = buffer.slice(0, 2000).toString('utf8');
    if (str.includes('<svg')) {
      const vb = str.match(/viewBox=["']\s*([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\s*["']/i);
      if (vb) {
        return { width: Math.round(parseFloat(vb[3])), height: Math.round(parseFloat(vb[4])), format: 'svg' };
      }
      const w = str.match(/width=["']([0-9.]+)px?["']/i);
      const h = str.match(/height=["']([0-9.]+)px?["']/i);
      if (w && h) {
        return { width: Math.round(parseFloat(w[1])), height: Math.round(parseFloat(h[1])), format: 'svg' };
      }
      return { width: null, height: null, format: 'svg' };
    }

    return { width: null, height: null, format: 'unknown' };
  } catch (e) {
    return { width: null, height: null, format: 'unknown' };
  }
}

module.exports = { getImageDimensions };
