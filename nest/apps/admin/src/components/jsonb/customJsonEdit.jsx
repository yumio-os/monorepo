import React, { useState } from 'react';

// import ReactJson from 'react-json-view';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

import { Box, Label } from '@adminjs/design-system';

const GenericJsonEdit = ({ record, property, onChange }) => {
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

  const [jsonValue, setJsonValue] = useState(fixedStruct[property.name]);

  let value = jsonValue != 'null' && jsonValue ? jsonValue : {};

  const handleJSONChange = (data) => {
    if (data.jsObject) {
      setJsonValue(data.jsObject);
      onChange(property.name, data.jsObject);
    } else {
      // You could handle JSON syntax errors here or ignore updates until the error is corrected
    }
  };

  return (
    <Box>
      <Label>{property.label}</Label>

      <JSONInput
        id="a_unique_id"
        placeholder={value}
        locale={locale}
        width="100%"
        height="100%"
        onChange={handleJSONChange}
        theme="light_mitsuketa_tribute"
        style={{ body: { fontSize: '14px' } }}
      />
      <br />
      <br />
      {/* <Button mt="default" onClick={handleSave}>
        Save
      </Button> */}
    </Box>
  );
};

export default GenericJsonEdit;
