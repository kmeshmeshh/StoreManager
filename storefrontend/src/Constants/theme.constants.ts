export const ButtonVariant = {
    Primary: 'primary',
    Secondary: 'secondary',
    Danger: 'danger',
    Outline: 'outline',
    Ghost: 'ghost',
} as const;

export type ButtonVariantType = typeof ButtonVariant[keyof typeof ButtonVariant];

export const ButtonSize = {
    Sm: 'sm',
    Md: 'md',
    Lg: 'lg',
} as const;

export type ButtonSizeType = typeof ButtonSize[keyof typeof ButtonSize];

export const FontSize = {
    xs: '0.25rem',
    sm: '0.75rem',
    md: '0.50rem',
    lg: '0.875rem',
    xl: '1rem',
    '2xl': '1.125rem',
    '3xl': '1.25rem',
    '4xl': '1.5rem',
} as const;

export const FontWeight = {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
} as const;

export const BorderRadius = {
    none: '0',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
} as const;

export const Spacing = {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
} as const;

export const Colors = {
    primary: '#16a34a',      
    secondary: '#f59e0b',   
    success: '#22c55e',      
    warning: '#fbbf24', 
    warningLight: '#fbbf2433', 
    error: '#dc2626',        
    info: '#a855f7',         

    dark: '#111827',         
    gray: '#6b7280',         
    lightGray: '#f3f4f6',    

    white: '#ffffff',
    border: '#e5e7eb',
    hover: '#f9fafb',

    skeletonBase: '#e5e7eb',
    skeletonHighlight: '#f3f4f6',
} as const;
