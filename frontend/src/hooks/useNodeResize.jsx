import { useState, useEffect, useRef } from 'react';

const useNodeResize = (dependencies = []) => {
  const nodeRef = useRef(null);
  const [dimensions, setDimensions] = useState({ 
    width: 220, 
    height: 120,
    contentHeight: 0
  });

  useEffect(() => {
    if (nodeRef.current) {
      const contentHeight = nodeRef.current.scrollHeight;
      const newHeight = Math.max(120, contentHeight + 40); 
      
      setDimensions(prev => {
        if (prev.height !== newHeight || prev.contentHeight !== contentHeight) {
          return {
            width: 220, 
            height: newHeight,
            contentHeight
          };
        }
        return prev;
      });
    }
  }, [...dependencies]);

  return [nodeRef, dimensions];
};

export default useNodeResize;