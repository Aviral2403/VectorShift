/**
 * createNode.jsx - Factory for generating node components from registry
 * This eliminates repetitive code across node files by generating components
 * from the centralized node registry configuration.
 */
import React, { useMemo, useCallback, useRef, useEffect } from 'react';
import BaseNode from './BaseNode';
import { FormField, NodeInput, NodeSelect, VariablesInfo } from '../FormComponents/FormComponents';
import { useNodeData, useUpdateNodeField } from '../../store/store';
import { getNodeConfig, getNodeHandles, extractVariablesFromText, FIELD_TYPES } from '../../config/nodeRegistry';


const FieldRenderer = React.memo(({ field, value, onChange, nodeId }) => {
    const textareaRef = useRef(null);

    // Auto-resize effect for textareas
    useEffect(() => {
        if (field.autoResize && textareaRef.current) {
            const textarea = textareaRef.current;
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.max(60, textarea.scrollHeight)}px`;
        }
    }, [value, field.autoResize]);

    const handleChange = useCallback((e) => {
        const newValue = e.target.value;

        // Auto-resize for textareas
        if (field.autoResize && e.target.tagName === 'TEXTAREA') {
            e.target.style.height = 'auto';
            e.target.style.height = `${Math.max(60, e.target.scrollHeight)}px`;
        }

        onChange(field.name, newValue);
    }, [field.name, field.autoResize, onChange]);

    switch (field.type) {
        case FIELD_TYPES.SELECT:
            return (
                <FormField label={field.label}>
                    <NodeSelect
                        value={value}
                        onChange={handleChange}
                        options={field.options}
                    />
                </FormField>
            );

        case FIELD_TYPES.TEXTAREA:
            return (
                <FormField label={field.label}>
                    <NodeInput
                        ref={textareaRef}
                        type="textarea"
                        value={value}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        rows={field.rows || 3}
                    />
                </FormField>
            );

        case FIELD_TYPES.NUMBER:
            return (
                <FormField label={field.label}>
                    <NodeInput
                        type="number"
                        value={value}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        step="any"
                    />
                </FormField>
            );

        case FIELD_TYPES.INPUT:
        default:
            return (
                <FormField label={field.label}>
                    <NodeInput
                        value={value}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                    />
                </FormField>
            );
    }
});

FieldRenderer.displayName = 'FieldRenderer';

/**
 * Factory function to create a node component from the registry
 * @param {string} nodeType - The type of node to create
 * @param {Object} options - Optional overrides and customizations
 * @returns {React.Component} A React component for the node
 */
export const createNodeComponent = (nodeType, options = {}) => {
    const NodeComponent = React.memo(({ id, data }) => {
        const config = getNodeConfig(nodeType);
        const nodeData = useNodeData(id);
        const updateNodeField = useUpdateNodeField();

        // Get field values from store with fallbacks to defaults
        const getFieldValue = useCallback((fieldName, defaultValue) => {
            return nodeData[fieldName] ?? data?.[fieldName] ?? defaultValue;
        }, [nodeData, data]);

        // Direct handler that updates store immediately
        const handleFieldChange = useCallback((fieldName, value) => {
            updateNodeField(id, fieldName, value);
        }, [id, updateNodeField]);

        // Generate handles dynamically from registry
        const handles = useMemo(() => {
            return getNodeHandles(nodeType, {
                text: getFieldValue('text', ''),
                ...nodeData
            });
        }, [nodeData, getFieldValue]);

        // Extract variables for text nodes
        const variables = useMemo(() => {
            if (config?.dynamicHandles) {
                return extractVariablesFromText(getFieldValue('text', ''));
            }
            return [];
        }, [getFieldValue, config?.dynamicHandles]);

        if (!config) {
            console.error(`Node type "${nodeType}" not found in registry`);
            return null;
        }

        const { Icon } = config;

        return (
            <BaseNode
                id={id}
                data={{
                    ...data,
                    description: config.description
                }}
                title={config.title}
                icon={<Icon />}
                nodeType={nodeType}
                handles={handles}
            >
                {/* Render fields from configuration */}
                {config.fields.map((field) => {
                    const defaultValue = typeof field.defaultValue === 'function'
                        ? field.defaultValue(id)
                        : field.defaultValue;
                    const value = getFieldValue(field.name, defaultValue);

                    return (
                        <FieldRenderer
                            key={field.name}
                            field={field}
                            value={value}
                            onChange={handleFieldChange}
                            nodeId={id}
                        />
                    );
                })}

                {/* Show static content if defined */}
                {config.staticContent && (
                    <div
                        className="node-static-content"
                        style={{
                            fontSize: '0.8rem',
                            color: 'var(--text-secondary)',
                            padding: '0.5rem 0'
                        }}
                    >
                        <p style={{ margin: 0 }}>{config.staticContent}</p>
                    </div>
                )}

                {/* Show variables info for text nodes */}
                {config.dynamicHandles && variables.length > 0 && (
                    <VariablesInfo variables={variables} />
                )}

                {/* Custom children if provided */}
                {options.children && options.children({ id, data, nodeData, handleFieldChange })}
            </BaseNode>
        );
    });

    NodeComponent.displayName = `${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)}Node`;

    return NodeComponent;
};

/**
 * Hook to get field value with proper fallbacks
 */
export const useFieldValue = (id, fieldName, defaultValue) => {
    const nodeData = useNodeData(id);
    return nodeData[fieldName] ?? defaultValue;
};

export default createNodeComponent;
