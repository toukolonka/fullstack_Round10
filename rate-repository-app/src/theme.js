import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    textAppBar: '#ffffff',
    primary: '#0366d6',
    appBar: '#24292e',
    main: '#e1e4e8',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    appBar: 24,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
