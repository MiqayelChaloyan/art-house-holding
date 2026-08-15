export type MonitoringTheme = 'dark' | 'light';

export interface MonitoringChartTheme {
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
  series: string[];
  grid: string;
  axis: string;
  axisLine: string;
  text: string;
  comparisonLine: string;
  tooltipBg: string;
  tooltipBorder: string;
  tooltipText: string;
  cardBg: string;
  cardBorder: string;
  plotBg: string;
  areaFillStart: string;
  areaFillEnd: string;
  pageViewsFillStart: string;
  pageViewsFillEnd: string;
  barFillStart: string;
  barFillEnd: string;
  heatmapBase: string;
}

export const CHART_THEMES: Record<MonitoringTheme, MonitoringChartTheme> = {
  dark: {
    primary: '#8ab4f8',
    secondary: '#81c995',
    tertiary: '#fdd663',
    quaternary: '#f28b82',
    series: ['#8ab4f8', '#81c995', '#fdd663', '#c58af9', '#78d9ec', '#f28b82'],
    grid: 'rgba(255,255,255,0.07)',
    axis: '#ffffff',
    axisLine: 'rgba(255,255,255,0.14)',
    text: '#ffffff',
    comparisonLine: 'rgba(255,255,255,0.45)',
    tooltipBg: '#292a2d',
    tooltipBorder: '#5f6368',
    tooltipText: '#ffffff',
    cardBg: '#1f1f1f',
    cardBorder: 'rgba(255,255,255,0.1)',
    plotBg: 'rgba(255,255,255,0.02)',
    areaFillStart: 'rgba(138,180,248,0.34)',
    areaFillEnd: 'rgba(138,180,248,0.02)',
    pageViewsFillStart: 'rgba(129,201,149,0.22)',
    pageViewsFillEnd: 'rgba(129,201,149,0.01)',
    barFillStart: '#8ab4f8',
    barFillEnd: '#5e97f6',
    heatmapBase: '138,180,248',
  },
  light: {
    primary: '#1a73e8',
    secondary: '#188038',
    tertiary: '#e37400',
    quaternary: '#c5221f',
    series: ['#1a73e8', '#188038', '#e37400', '#9334e6', '#12b5cb', '#c5221f'],
    grid: '#f1f3f4',
    axis: '#80868b',
    axisLine: 'transparent',
    text: '#202124',
    comparisonLine: '#1a73e8',
    tooltipBg: '#ffffff',
    tooltipBorder: '#dadce0',
    tooltipText: '#202124',
    cardBg: '#ffffff',
    cardBorder: '#e8eaed',
    plotBg: 'transparent',
    areaFillStart: 'rgba(26,115,232,0.22)',
    areaFillEnd: 'rgba(26,115,232,0.02)',
    pageViewsFillStart: 'rgba(24,128,56,0.16)',
    pageViewsFillEnd: 'rgba(24,128,56,0.01)',
    barFillStart: '#1a73e8',
    barFillEnd: '#4285f4',
    heatmapBase: '26,115,232',
  },
};

export function getChartTheme(theme: MonitoringTheme): MonitoringChartTheme {
  return CHART_THEMES[theme];
}
