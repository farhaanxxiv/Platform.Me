const autoprefixer = require('autoprefixer');

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
	],
	prefix: "",
	theme: {
		container: {
			center: 'true',
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				heading: '"IBM Plex Serif", serif',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				'pastel-yellow': '#f1ee83',
				'pastel-purple': '#e2c6ff',
				'pastel-blue': '#bbecff',
				'pastel-green': '#dcfebc ',
				'pastel-cream': '#ffd3c0',
				'yellow:': '#ffd74a'
			},
			fontSize: {
				xxs: '0.6rem'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'bounce-home-arrow': {
					from: {
						transform: 'translateY(-25%) translateX(-50%)',
						'animation-timing-function': 'cubic- bezier(0.8, 0, 1, 1)'
					},
					to: {
						transform: 'translateY(0%) translateX(-50%)',
						'animation-timing-function': 'cubic-bezier(0,0,0.2,1)'
					}
				},
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'moveLeftRight': {
					'0%': { transform: 'translateX(0rem)' },
					'100%': { transform: 'translateX(0.2rem)' },
				},
				'moveLeftRightOdd': {
					'0%': { transform: 'translateX(0.7rem)' },
					'100%': { transform: 'translateX(0.9rem)' },
				},
			},
			animation: {
				'arrow-bounce': '1s bounce-home-arrow infinite alternate',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'move-left-right': 'moveLeftRight 0.1s ease-in-out alternate infinite 0.05s',
				'move-left-right-odd': 'moveLeftRightOdd 0.1s ease-in-out alternate infinite',

			}
		}
	},
	plugins: [require("tailwindcss-animate"), autoprefixer]
}