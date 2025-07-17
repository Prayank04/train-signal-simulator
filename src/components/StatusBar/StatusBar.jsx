import useTimer from '../../hooks/useTimer'; // adjust path if needed
import React, { useContext } from 'react';
import { TimeContext } from '../../context/TimeContext';
import ClockControl from './ClockControl';
import './StatusBar.css';
import { parseLogFile } from '../../utils/logParser';

// PDF.js imports
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

export default function StatusBar() {
  const { initialTime, currentTime, setInitialTime, setAllLogEntries } = useContext(TimeContext);
  const liveTime = useTimer(); // this ticks every second

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log('📤 Uploading', file.name, file.type);

    let fullText = '';
    if (file.type === 'application/pdf') {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      console.log('PDF loaded successfully');
      console.log('Number of pages:', pdf.numPages);

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        fullText += textContent.items.map(item => item.str).join('\n') + '\n';
      }

      console.log('PDF text extracted successfully');
      console.log('PDF text:', fullText);
    } catch (err) {
      console.error('PDF processing error:', err);
      alert('Failed to process PDF: ' + err.message);
      return;
    }
  } else if (file.name.endsWith('.xps')) {
    try {
      const JSZip = (await import('jszip')).default;
      const zip = await JSZip.loadAsync(file);
      console.log('✅ XPS file loaded via JSZip');

      const pageKeys = Object.keys(zip.files).filter(k => k.endsWith('.fpage'));
      if (pageKeys.length === 0) {
        throw new Error('No .fpage files found in the XPS');
      }

      for (let key of pageKeys) {
        const xml = await zip.files[key].async('text');
        const dom = new DOMParser().parseFromString(xml, 'application/xml');
        const glyphs = Array.from(dom.getElementsByTagName('Glyphs'));

        const text = glyphs.map(el => el.getAttribute('UnicodeString')).filter(Boolean).join('\n');
        fullText += text + '\n';
      }

      console.log('📄 Extracted text from XPS:', fullText.slice(0, 500));

    } catch (err) {
      console.error('❌ Failed to parse XPS:', err);
      alert('Failed to process XPS file: ' + err.message);
      return;
    }
  } else {
    fullText = await file.text();
  }

    try {
      const { initialTime, allLogEntries } = parseLogFile(fullText);
      console.log('⏱ Parsed initialTime =', initialTime);
      console.log('First log entry:', allLogEntries[0]);

      setInitialTime(initialTime);
      setAllLogEntries(allLogEntries);
      console.log('[StatusBar] Full list of entry times:', allLogEntries.map(e => e.time.toLocaleTimeString('en-GB')));
    } catch (err) {
      console.error('Parse error:', err);
      alert('Failed to parse log file: ' + err.message);
    }

    e.target.value = '';
  };

  const formatTime = (date) => {
    if (!date) return "--/--/---- --:--:--";
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleDateString('en-GB', { month: 'short' });
    const year = date.getFullYear();
    const time = date.toLocaleTimeString('en-GB', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    return `${day}/${month}/${year} ${time}`;
  };

  // Use simulation time if available, else current system time
  const displayTime = initialTime ? currentTime : liveTime;

  const handleScreenPrint = () => {
    window.print();
  };

  return (
    <div className="status-bar w-full bg-[#333333] text-white p-2 flex justify-between items-center">
      
      {/* Right side: print, time, and clock control */}
      <div className="status-left flex items-center space-x-4">
        <button
          className="screen-print-btn"
          onClick={handleScreenPrint}
        >
          Screen Print
        </button>
      </div>
      {/* Center: Time and Clock Control */}
      <div className="status-right flex items-center space-x-4">
        <div className="time-display">
          {formatTime(displayTime)}
        </div>
        <ClockControl />
      </div>
        
      <div className="status-right flex items-center space-x-4">
        <label className="cursor-pointer">
          <input
            type="file"
            accept=".xps, .txt, .pdf"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};