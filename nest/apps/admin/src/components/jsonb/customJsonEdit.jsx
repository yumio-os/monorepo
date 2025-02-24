import React, { useState } from 'react';

import ReactJson from 'react-json-view';

import {
  Box,
  Button,
  Label,
  TextArea,
} from '@adminjs/design-system';

const GenericJsonEdit = ({ record, property, onChange }) => {
  const [isPasteMode, setIsPasteMode] = useState(false); // Toggle for bulk paste
  const [pasteValue, setPasteValue] = useState(""); // Hold pasted JSON as text

  // Reconstruct JSON from AdminJS params
  const reconstructJson = (params) => {
    const result = {};
    Object.keys(params).forEach((fullKey) => {
      const nestedKeys = fullKey.split(".");
      let currentLevel = result;

      nestedKeys.slice(0, -1).forEach((key, index) => {
        if (!currentLevel[key]) {
          currentLevel[key] = isNaN(parseInt(nestedKeys[index + 1], 10)) ? {} : [];
        }
        currentLevel = currentLevel[key];
      });

      const lastKey = nestedKeys[nestedKeys.length - 1];
      currentLevel[lastKey] = params[fullKey];
    });

    return result;
  };

  const fixedStruct = reconstructJson(record.params);
  const [jsonValue, setJsonValue] = useState(fixedStruct[property.name] || {});

  const handleJSONChange = (updatedJSON) => {
    setJsonValue(updatedJSON);
    onChange(property.name, updatedJSON);
  };

  // Handle bulk pasting of JSON
  const handlePasteSubmit = () => {
    try {
      const parsed = JSON.parse(pasteValue);
      setJsonValue(parsed);
      onChange(property.name, parsed);
      setIsPasteMode(false); // Exit paste mode
    } catch (error) {
      alert("Invalid JSON format. Please paste valid JSON.");
    }
  };

  return (
    <Box>
      <Label>{property.label}</Label>

      {/* Toggle between Paste Mode & JSON Editor */}
      {isPasteMode ? (
        <Box>
          <TextArea
            width="100%"
            height="200px"
            value={pasteValue}
            onChange={(e) => setPasteValue(e.target.value)}
            placeholder="Paste your JSON here..."
          />
          <Button onClick={handlePasteSubmit} mt="default">Apply JSON</Button>
          <Button onClick={() => setIsPasteMode(false)} variant="danger" mt="default">Cancel</Button>
        </Box>
      ) : (
        <ReactJson
          src={jsonValue}
          onEdit={(edit) => handleJSONChange(edit.updated_src)}
          onAdd={(add) => handleJSONChange(add.updated_src)}
          onDelete={(del) => handleJSONChange(del.updated_src)}
          enableClipboard={true} // Enables copy
          displayDataTypes={true} // Helps with selecting & copying
          theme="monokai"
        />
      )}

      {/* Button to enable Paste Mode */}
      <Button onClick={(event) => { event.preventDefault(); return setIsPasteMode(true) }} mt="default">Paste JSON</Button>
    </Box>
  );
};

export default GenericJsonEdit;
