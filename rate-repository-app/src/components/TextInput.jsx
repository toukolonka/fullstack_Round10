import React from 'react';
import { TextInput as NativeTextInput } from 'react-native';

// eslint-disable-next-line no-unused-vars
const TextInput = ({ style, error, ...props }) => {
  let textInputStyle = [style];
  if (error) {
    textInputStyle = [
      {
        ...style,
        borderColor: 'red',
      },
    ];
  }

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
