import { create } from '@storybook/theming/create';

export default create({
  base: 'light',
  brandTitle: 'ControlBio UI',
  brandUrl: 'https://github.com/victorzix/controlbio-ui',
  brandImage: './hrz_dark@20x.png', // Vou copiar a imagem para a pasta pública ou configurar o static dir
  brandTarget: '_self',

  // Cores personalizadas baseadas na marca
  colorPrimary: '#3A8B59',
  colorSecondary: '#5EEB94',

  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#e2e8f0',
  appBorderRadius: 4,

  // Text colors
  textColor: '#0f172a',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#979C9C',
  barSelectedColor: '#3A8B59',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#e2e8f0',
  inputTextColor: '#0f172a',
  inputBorderRadius: 4,
});
