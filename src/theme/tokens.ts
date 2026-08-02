export const color = {
  primary: '#5855E5',
  primaryPressed: '#4442B2',
  primaryTint: '#EFEFFF',
  primaryTintPressed: '#E0E0FF',

  info: '#006CE5',
  infoPressed: '#0054B2',
  infoTint: '#E5F1FF',

  success: '#00764F',
  successPressed: '#005C3D',
  successTint: '#E8F8F0',

  highlight: '#FACC15',
  highlightPressed: '#DEA20C',
  highlightTint: '#FDF5D4',

  error: '#D6383B',
  errorPressed: '#A72B2E',
  errorTint: '#FDECEC',

  text: '#030712',
  textSecondary: '#4A5565',
  textMuted: '#99A1AF',

  border: '#E5E7EB',
  page: '#F9FAFB',
  surface: '#FFFFFF',

  scrim: 'rgba(3,7,18,0.45)',
  secondaryFill: '#F1F3F9',
  secondaryFillPressed: '#E6E9F2',
  checkboxBorder: '#D6DAE3',
  radioBorder: '#C9CEDA',
  countBadgeBg: '#D0CFFF',
  countBadgeText: '#312F80',
  iconTileBg: '#F1F5F9',
  iconTileMark: '#45556C',
} as const;

export const radius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  sheet: 20,
  x2l: 24,
  x3l: 32,
  x4l: 40,
  pill: 999,
} as const;

export const space = {
  none: 0,
  x2: 2,
  x4: 4,
  x8: 8,
  x12: 12,
  x16: 16,
  x20: 20,
  x24: 24,
  x32: 32,
  x40: 40,
  x48: 48,
  x56: 56,
  x64: 64,
  x80: 80,
  x120: 120,
} as const;

export const PAGE_MARGIN = space.x16;

export const fontFamily = {
  regular: 'Roboto_400Regular',
  medium: 'Roboto_500Medium',
  semibold: 'Roboto_600SemiBold',
  bold: 'Roboto_700Bold',
} as const;

type TypeStyle = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
};

const make = (family: string, size: number, lh: number, ls: number): TypeStyle => ({
  fontFamily: family,
  fontSize: size,
  lineHeight: lh,
  letterSpacing: ls,
});

export const type = {
  regular12: make(fontFamily.regular, 12, 16, 0),
  regular14: make(fontFamily.regular, 14, 18, -0.5),
  regular16: make(fontFamily.regular, 16, 20, -0.5),
  regular18: make(fontFamily.regular, 18, 22, -0.5),
  regular20: make(fontFamily.regular, 20, 24, -0.5),

  medium12: make(fontFamily.medium, 12, 16, -0.5),
  medium14: make(fontFamily.medium, 14, 18, -0.5),
  medium16: make(fontFamily.medium, 16, 20, -0.5),
  medium18: make(fontFamily.medium, 18, 22, -0.5),
  medium20: make(fontFamily.medium, 20, 24, -0.5),

  semibold14: make(fontFamily.semibold, 14, 18, -0.5),
  semibold16: make(fontFamily.semibold, 16, 20, -0.5),
  semibold18: make(fontFamily.semibold, 18, 22, -0.5),
  semibold20: make(fontFamily.semibold, 20, 24, -0.5),

  bold16: make(fontFamily.bold, 16, 20, -0.5),
  bold20: make(fontFamily.bold, 20, 24, -0.5),
  bold24: make(fontFamily.bold, 24, 30, -0.5),
  bold32: make(fontFamily.bold, 32, 36, -0.5),
} as const;

export const shadow = {
  card: {
    shadowColor: '#030712',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  cardActive: {
    shadowColor: '#5855E5',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  bottomBar: {
    shadowColor: '#030712',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
  },
  floating: {
    shadowColor: '#5855E5',
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
} as const;

export const TOUCH_TARGET = 44;
