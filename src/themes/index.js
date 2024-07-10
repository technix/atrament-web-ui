import { gameDefaultTheme } from 'src/constants';

const lightTheme = {
  '--bg-color': '#FCFCFC',
  '--fg-color': '#5D576B',
  '--shade-color': 'rgba(0, 0, 0, 0.1)',
  '--font-color': '#333333',
  '--accent-bg-color': '#FCFCFC',
  '--accent-fg-color': '#F7567C',
  '--border-radius': '0.5rem',
  '--border-radius-inline': '0.25rem'
};

const sepiaTheme = {
  '--bg-color': '#ffeedb',
  '--fg-color': '#4c3b4d',
  '--shade-color': 'rgba(0, 0, 0, 0.1)',
  '--font-color': '#333333',
  '--accent-bg-color': '#ffeedb',
  '--accent-fg-color': '#a53850',
  '--border-radius': '0.5rem',
  '--border-radius-inline': '0.25rem'
}

const darkTheme = {
  '--bg-color': '#4c3b4d',
  '--fg-color': '#FCFCFC',
  '--shade-color': 'rgba(255, 255, 255, 0.1)',
  '--font-color': '#EEEEEE',
  '--accent-bg-color': '#EEEEEE',
  '--accent-fg-color': '#F7567C',
  '--border-radius': '0.5rem',
  '--border-radius-inline': '0.25rem'
};

export const themes = {
  light: lightTheme,
  sepia: sepiaTheme,
  dark: darkTheme
};

export function applyTheme(theme) {
  Object.entries(themes[theme] || themes[gameDefaultTheme]).forEach(([prop, value]) => {
    document.documentElement.style.setProperty(prop, value);
  });
}

