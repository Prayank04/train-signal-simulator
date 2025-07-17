import JSZip from 'jszip';

export async function testXpsParser(file) {
  try {
    const zip = await JSZip.loadAsync(file);
    console.log("✅ XPS file loaded via JSZip");

    const pageKeys = Object.keys(zip.files).filter(k => k.endsWith('.fpage'));

    if (pageKeys.length === 0) {
      console.warn("❌ No .fpage XML files found");
      return;
    }

    console.log(`📄 Found ${pageKeys.length} pages`);

    const firstPageXML = await zip.files[pageKeys[0]].async('text');
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(firstPageXML, "application/xml");

    const glyphs = Array.from(xmlDoc.getElementsByTagName('Glyphs'));
    const strings = glyphs.map(el => el.getAttribute('UnicodeString')).filter(Boolean);

    console.log("🔠 Extracted text:", strings.slice(0, 10).join(" | ")); // just first 10

  } catch (err) {
    console.error("❌ Error parsing XPS:", err);
  }
}
