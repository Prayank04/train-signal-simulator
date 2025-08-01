import useTimer from '../../hooks/useTimer'; // adjust path if needed
import React, { useContext, useState } from 'react';
import { TimeContext } from '../../context/TimeContext';
import ClockControl from './ClockControl';
import './StatusBar.css';
import { parseLogFile } from '../../utils/logParser';
import { parseAndStructureData } from '../../utils/excelParser';

// PDF.js imports
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

// Helper function to dynamically load a script from a CDN
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      return resolve();
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
};

export default function StatusBar() {
  // Destructure all necessary values from TimeContext, correcting the typo from 'set' to 'setExcelData'
  const { initialTime, currentTime, setInitialTime, setAllLogEntries, setRouteDatabase } = useContext(TimeContext);
  const liveTime = useTimer(); // this ticks every second

  // Define the missing state variables
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState(null);
  const [excelFileName, setExcelFileName] = useState('');


  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsParsing(true);
    setParseError(null);
    console.log('📤 Uploading', file.name, file.type);

    let fullText = '';
    try {
        if (file.type === 'application/pdf') {
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
        } else if (file.name.endsWith('.xps')) {
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
        } else {
            fullText = await file.text();
        }

        const { initialTime, allLogEntries } = parseLogFile(fullText);
        console.log('⏱ Parsed initialTime =', initialTime);
        console.log('Log entries:', allLogEntries);

        setInitialTime(initialTime);
        setAllLogEntries(allLogEntries);
        console.log('[StatusBar] Full list of entry times:', allLogEntries.map(e => e.time.toLocaleTimeString('en-GB')));
    } catch (err) {
        console.error('Parse error:', err);
        setParseError('Failed to parse log file: ' + err.message);
    } finally {
        setIsParsing(false);
        e.target.value = '';
    }
  };

  const handleExcelUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log('📤 Uploading Excel File:', file.name);
    setExcelFileName(file.name);
    
    try {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js');
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = event.target.result;
          const workbook = window.XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames.find(name => name.toLowerCase().includes('route control table'));
          if (!sheetName) throw new Error("Could not find 'Route Control Table' sheet.");

          const worksheet = workbook.Sheets[sheetName];
          const jsonData = window.XLSX.utils.sheet_to_json(worksheet);
          
          // Use the new parser to structure the data
          const structuredData = parseAndStructureData(jsonData);
          setRouteDatabase(structuredData);
          console.log('[StatusBar] Successfully created and set route database.');
        } catch (err) {
          console.error('An error occurred during Excel file processing:', err);
          setParseError('Failed to parse Excel file: ' + err.message);
        }
      };
      
      reader.onerror = (err) => {
          setParseError('Failed to read the Excel file.');
          console.error('FileReader error:', err);
      };

      reader.readAsArrayBuffer(file);
    } catch (err) {
      console.error(err);
      setParseError(err.message);
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
        
      <div className="status-right flex items-center" style={{ marginLeft: '90px' }}>
        <div className="mr-4">
          <label className={`cursor-pointer upload-btn ${isParsing ? 'disabled' : ''}`}>
            {isParsing ? 'Parsing...' : 'Upload Log'}
            <input type="file" accept=".pdf, .txt, .xps" onChange={handleUpload} className="hidden" disabled={isParsing} />
          </label>
        </div>
        <div className="ml- 4"> {/* <-- This adds space before Excel upload */}
          <label className="cursor-pointer upload-btn">
            {excelFileName ? excelFileName.substring(0, 15) + '...' : 'Upload Excel'}
            <input type="file" accept=".xlsx, .xls" onChange={handleExcelUpload} className="hidden" />
          </label>
        </div>
      </div>

       {parseError && (
        <div className="error-banner w-full bg-red-800 text-white text-center p-2">
          <strong>Error:</strong> {parseError}
        </div>
      )}
    </div>
  );
};
