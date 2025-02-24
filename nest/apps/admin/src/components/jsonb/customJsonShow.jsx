// src/adminjs/components/GenericJsonShow.jsx
import React, { useState } from 'react';

import ReactJson from 'react-json-view';

import { Box, Label } from '@adminjs/design-system';

const GenericJsonShow = ({ record, property, onChange }) => {
  // Reconstruct JSON from flattened structure
  const reconstructJson = (params) => {
    const result = {};
    Object.keys(params).forEach((fullKey) => {
      const nestedKeys = fullKey.split('.');
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

  s;

  return (
    <Box>
      <Label>{property.label}</Label>
      <ReactJson
        src={jsonValue}
        // onEdit={(edit) => handleJSONChange(edit.updated_src)}
        // onAdd={(add) => handleJSONChange(add.updated_src)}
        // onDelete={(del) => handleJSONChange(del.updated_src)}
        // theme="monokai"
        enableClipboard={true}
        displayDataTypes={true}
      />
    </Box>
  );
};

export default GenericJsonShow;
