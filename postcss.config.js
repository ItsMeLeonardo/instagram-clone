

module.exports = {
  plugins: {
    "postcss-nested": {},
		"postcss-import": {},
		"postcss-color-mod-function": {
			importFrom: './styles/theme.css'
		},
		"autoprefixer": {},
  },
};

