/**
 * Tokens are a direct translation of the YAML frontmatter in ../DESIGN.md.
 * Do not invent values here — if a value is missing, it belongs in DESIGN.md first.
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // Overridden, not extended: DESIGN.md's structural breakpoints replace Tailwind's
    // defaults while keeping the familiar class names.
    screens: {
      xs: '480px',
      sm: '640px',
      md: '734px',
      lg: '833px',
      xl: '1068px',
      '2xl': '1440px',
    },

    // Overridden to enforce the radii grammar: sm = compact utility, lg = utility cards,
    // pill = actions. Nothing in between. `full` is kept for circular chips and avatars.
    borderRadius: {
      none: '0px',
      xs: '5px',
      sm: '8px',
      md: '11px',
      lg: '18px',
      pill: '9999px',
      full: '9999px',
    },

    extend: {
      colors: {
        // Accent — the only interactive color in the system.
        primary: {
          DEFAULT: '#0066cc', // Action Blue, light surfaces
          focus: '#0071e3', // keyboard focus ring only
          'on-dark': '#2997ff', // Sky Link Blue, dark tiles only
        },
        // Surfaces
        canvas: {
          DEFAULT: '#ffffff',
          parchment: '#f5f5f7',
        },
        surface: {
          pearl: '#fafafc',
          'tile-1': '#272729',
          'tile-2': '#2a2a2c',
          'tile-3': '#252527',
          black: '#000000',
          'chip-translucent': '#d2d2d7',
        },
        // Text
        ink: {
          DEFAULT: '#1d1d1f', // headlines + body on light surfaces
          'muted-80': '#333333',
          'muted-48': '#7a7a7a', // fine print only — 4.0:1 on parchment
        },
        'on-dark': '#ffffff',
        'body-muted': '#cccccc', // secondary copy on dark tiles
        // Hairlines
        hairline: '#e0e0e0',
        'divider-soft': '#f0f0f0',
        // macOS window controls. Real platform chrome inside the simulated
        // browser frame, not decoration.
        traffic: {
          close: '#ff5f57',
          min: '#febc2e',
          max: '#28c840',
        },

        /**
         * Simulated product UI, not portfolio chrome. Each demo keeps its own
         * identity but obeys the same grammar: exactly one accent, saturation
         * under 80%, one gray family. See CLAUDE.md "The demos".
         */
        demo: {
          sphere: {
            accent: '#5b5bd6',
            bg: '#141420',
            raised: '#1e1e2e',
            muted: '#8e8ea3',
          },
          best365: {
            accent: '#2f9e6e',
            bg: '#101614',
            raised: '#18211e',
            muted: '#8a9a94',
          },
          drone: {
            accent: '#4f8f99',
            bg: '#101417',
            raised: '#1a2226',
            muted: '#8b9aa0',
            trace: '#d6b465',
          },
          idea: {
            accent: '#3d7fbf',
            bg: '#0b0c14',
            raised: '#161825',
            muted: '#7e849b',
          },
          story: {
            accent: '#c08a3e',
            bg: '#1a1712',
            raised: '#241f18',
            muted: '#9c9384',
          },
          eco: {
            accent: '#3f9e5a',
            bg: '#f6f8f6',
            raised: '#ffffff',
            ink: '#1e293b',
            muted: '#6b7a8c',
            // The four Spanish municipal bin colors. Semantic data, not decoration.
            bin: {
              yellow: '#d9ab30',
              blue: '#3f77b5',
              green: '#3f9e5a',
              brown: '#8a6a4a',
            },
          },
        },
      },

      fontFamily: {
        // On macOS/iOS/Safari these resolve to the real SF Pro. Inter is the
        // documented open-source fallback everywhere else.
        display: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'system-ui',
          'Inter Variable',
          'Inter',
          'sans-serif',
        ],
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Text',
          'system-ui',
          'Inter Variable',
          'Inter',
          'sans-serif',
        ],
      },

      fontSize: {
        'hero-display': ['56px', { lineHeight: '1.07', letterSpacing: '-0.28px', fontWeight: '600' }],
        'display-lg': ['40px', { lineHeight: '1.1', letterSpacing: '0px', fontWeight: '600' }],
        'display-md': ['34px', { lineHeight: '1.47', letterSpacing: '-0.374px', fontWeight: '600' }],
        lead: ['28px', { lineHeight: '1.14', letterSpacing: '0.196px', fontWeight: '400' }],
        'lead-airy': ['24px', { lineHeight: '1.5', letterSpacing: '0px', fontWeight: '300' }],
        tagline: ['21px', { lineHeight: '1.19', letterSpacing: '0.231px', fontWeight: '600' }],
        'body-strong': ['17px', { lineHeight: '1.24', letterSpacing: '-0.374px', fontWeight: '600' }],
        body: ['17px', { lineHeight: '1.47', letterSpacing: '-0.374px', fontWeight: '400' }],
        'dense-link': ['17px', { lineHeight: '2.41', letterSpacing: '0px', fontWeight: '400' }],
        caption: ['14px', { lineHeight: '1.43', letterSpacing: '-0.224px', fontWeight: '400' }],
        'caption-strong': ['14px', { lineHeight: '1.29', letterSpacing: '-0.224px', fontWeight: '600' }],
        'button-large': ['18px', { lineHeight: '1', letterSpacing: '0px', fontWeight: '300' }],
        'button-utility': ['14px', { lineHeight: '1.29', letterSpacing: '-0.224px', fontWeight: '400' }],
        'fine-print': ['12px', { lineHeight: '1', letterSpacing: '-0.12px', fontWeight: '400' }],
        'micro-legal': ['10px', { lineHeight: '1.3', letterSpacing: '-0.08px', fontWeight: '400' }],
        'nav-link': ['12px', { lineHeight: '1', letterSpacing: '-0.12px', fontWeight: '400' }],
      },

      spacing: {
        xxs: '4px',
        xs: '8px',
        sm: '12px',
        md: '17px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        section: '80px',
        'section-tight': '48px', // tile padding below the phone breakpoint
        'nav-global': '44px',
        'nav-sub': '52px',
      },

      maxWidth: {
        prose: '980px', // text-heavy sections
        grid: '1440px', // product grids and utility cards
      },

      // The single shadow in the system. Product renders only.
      boxShadow: {
        product: 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0px',
        none: 'none',
      },

      transitionTimingFunction: {
        apple: 'cubic-bezier(0.4, 0, 0.22, 1)',
      },
    },
  },
  plugins: [],
}
