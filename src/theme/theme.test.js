import { fontAssets } from './fonts';
import { theme } from './theme';
import { chartColors } from '../constants';

describe('Trailhead theme', () => {
  it('uses the authored Trailhead color roles', () => {
    expect(theme.colors).toMatchObject({
      primary: '#2F4A3A',
      secondary: '#7A8B6F',
      tertiary: '#D9682B',
      background: '#F4EFE4',
      surface: '#FFFDF8',
      onSurface: '#1F2A22',
      outline: '#D8CFBD',
      error: '#B54A2A',
    });
  });

  it('uses Trailhead roundness', () => {
    expect(theme.roundness).toBe(3);
  });

  it('is a light theme', () => {
    expect(theme.dark).toBe(false);
  });

  it.each([
    'displayLarge',
    'displayMedium',
    'displaySmall',
    'headlineLarge',
    'headlineMedium',
    'headlineSmall',
  ])('sets %s in Fraunces', (variant) => {
    expect(theme.fonts[variant].fontFamily).toMatch(/^Fraunces_/);
  });

  it.each([
    'titleLarge',
    'titleMedium',
    'titleSmall',
    'bodyLarge',
    'bodyMedium',
    'bodySmall',
    'labelLarge',
    'labelMedium',
    'labelSmall',
    'default',
  ])('sets %s in Inter', (variant) => {
    expect(theme.fonts[variant].fontFamily).toMatch(/^Inter_/);
  });

  it('only uses font families that the app loads', () => {
    const loadedFamilies = Object.keys(fontAssets);

    Object.values(theme.fonts).forEach(({ fontFamily }) => {
      expect(loadedFamilies).toContain(fontFamily);
    });
  });
});

describe('Trailhead chart palette', () => {
  it('uses the Trailhead category colors in order', () => {
    expect(chartColors).toEqual([
      '#5E7A8C',
      '#C9A66B',
      '#8C4F3A',
      '#2F4A3A',
      '#D9682B',
      '#7A8B6F',
      '#4C5B4A',
      '#B8893B',
      '#A34A3A',
      '#6B705C',
      '#9A8C73',
      '#3E6259',
    ]);
  });
});
