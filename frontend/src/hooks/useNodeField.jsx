import { useEffect, useRef } from 'react';
import { useUpdateNodeField } from '../store/store';

const useNodeField = (nodeId, fieldName, fieldValue) => {
  const updateNodeField = useUpdateNodeField();
  const previousValue = useRef(fieldValue);

  useEffect(() => {
    if (
      nodeId && 
      fieldName !== undefined && 
      fieldValue !== undefined &&
      previousValue.current !== fieldValue
    ) {
      updateNodeField(nodeId, fieldName, fieldValue);
      previousValue.current = fieldValue;
    }
  }, [nodeId, fieldName, fieldValue, updateNodeField]);
};

export default useNodeField;