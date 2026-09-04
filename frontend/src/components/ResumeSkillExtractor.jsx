import React, { useState } from 'react';
import { extractSkillsFromText } from '../utils/aiService';
import { extractTextFromPDF } from '../utils/pdfExtract';

// Optionally, you can use a library like pdfjs-dist or mammoth for PDF/DOCX parsing
// For this example, we'll only handle text files for simplicity


const ResumeSkillExtractor = ({ onExtractSkills }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = async (e) => {
    setError('');
    setSkills([]);
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    let text = '';
    if (file.type === 'application/pdf') {
      setLoading(true);
      try {
        text = await extractTextFromPDF(file);
        const extractedSkills = await extractSkillsFromText(text);
        setSkills(extractedSkills);
        if (onExtractSkills) onExtractSkills(extractedSkills);
      } catch (err) {
        setError('Failed to extract skills from PDF.');
      }
      setLoading(false);
      return;
    } else if (file.type.startsWith('text/')) {
      setLoading(true);
      try {
        text = await file.text();
        const extractedSkills = await extractSkillsFromText(text);
        setSkills(extractedSkills);
        if (onExtractSkills) onExtractSkills(extractedSkills);
      } catch (err) {
        setError('Failed to extract skills.');
      }
      setLoading(false);
      return;
    } else {
      setError('Only PDF or text files are supported.');
      return;
    }
  };

  return (
    <div className="glassmorphism p-8 rounded-2xl max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-2 text-white">Upload Resume to Extract Skills</h2>
      <label className="block w-full text-center">
        <input
          type="file"
          accept=".pdf,.txt"
          onChange={handleFileChange}
          className="hidden"
        />
        <span className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold cursor-pointer hover:from-blue-700 hover:to-cyan-700 transition-all">
          Choose File
        </span>
        <span className="ml-4 text-blue-200 align-middle">{fileName || 'No file chosen'}</span>
      </label>
      {loading && <div className="text-blue-200 mt-2">Extracting skills...</div>}
      {error && <div className="text-red-400 mt-2">{error}</div>}
    </div>
  );
};

export default ResumeSkillExtractor;
