import './FormComponents.css';

export const NodeLabel = ({ children, className = '' }) => (
  <label className={`node-label ${className}`}>
    {children}
  </label>
);

export const NodeInput = ({ 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  rows,
  className = '',
  ...props 
}) => {
  const Component = type === 'textarea' ? 'textarea' : 'input';
  
  return (
    <Component
      type={type !== 'textarea' ? type : undefined}
      className={`node-input ${type === 'textarea' ? 'text-area' : ''} ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      {...props}
    />
  );
};

export const NodeSelect = ({ 
  value, 
  onChange, 
  options = [], 
  className = '',
  ...props 
}) => (
  <select
    className={`node-select ${className}`}
    value={value}
    onChange={onChange}
    {...props}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export const NodeButton = ({ 
  onClick, 
  children, 
  className = '',
  disabled = false,
  ...props 
}) => (
  <button
    className={`node-button ${className}`}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

export const FormField = ({ 
  label, 
  children, 
  className = '',
  ...props 
}) => (
  <div className={`form-field ${className}`} {...props}>
    {label && <NodeLabel>{label}</NodeLabel>}
    {children}
  </div>
);

export const VariablesInfo = ({ variables }) => {
  if (!variables || variables.length === 0) return null;
  
  return (
    <div className="variables-info">
      <span>Variables: {variables.join(', ')}</span>
    </div>
  );
};