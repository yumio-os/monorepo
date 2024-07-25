// src/adminjs/components/GenericJsonShow.jsx
import React from 'react';

import ReactJson from 'react-json-view';

import { Box, Label } from '@adminjs/design-system';

const GenericJsonShow = ({ record, property }) => {
  const reconstructJson = (params) => {
    const result = {};

    Object.keys(params).forEach((fullKey) => {
      const nestedKeys = fullKey.split('.');
      let currentLevel = result;

      // Iterate over each part of the key except the last one
      nestedKeys.slice(0, -1).forEach((key, index) => {
        // Check if the next key is a number, suggesting an array
        if (!currentLevel[key]) {
          currentLevel[key] = isNaN(parseInt(nestedKeys[index + 1], 10)) ? {} : [];
        }
        currentLevel = currentLevel[key];
      });

      // Set the value at the deepest level
      const lastKey = nestedKeys[nestedKeys.length - 1];
      currentLevel[lastKey] = params[fullKey];
    });

    return result;
  };
  const fixedStruct = reconstructJson(record.params);
  const formattedJson = fixedStruct[property.name];

  //   return <pre style={{ background: '#f6f8fa', padding: '1em', borderRadius: '5px' }}>{formattedJson}</pre>;
  return (
    <Box>
      <Label>{property.label}</Label>
      <ReactJson src={formattedJson} />
    </Box>
  );
};

export default GenericJsonShow;
