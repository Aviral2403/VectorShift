import { useState, useEffect } from 'react';

const useTemplateVariables = (text) => {
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;
    const matches = [];
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      const varName = match[1];
      if (!matches.includes(varName)) {
        matches.push(varName);
      }
    }
    
    setVariables(matches);
  }, [text]);

  return variables;
};

export default useTemplateVariables;