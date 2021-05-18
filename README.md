npx postcss css/animate.css > build/css/animate.css
npx postcss css/bootstrap.css > build/css/bootstrap.css
npx postcss css/dark.css > build/css/dark.css
npx postcss css/jquery.pagepiling.css > build/css/jquery.pagepiling.css
npx postcss css/layers.css > build/css/layers.css
npx postcss css/linearicons.css > build/css/linearicons.css
npx postcss css/magnific-popup.css > build/css/magnific-popup.css
npx postcss css/navigation.css > build/css/navigation.css
npx postcss css/owl.carousel.css > build/css/owl.carousel.css
npx postcss css/settings.css > build/css/settings.css
npx postcss css/style.css > build/css/style.css

uglifyjs js/scripts.js --output build/js/scripts.js
uglifyjs js/smoothscroll.js --output build/js/smoothscroll.js
uglifyjs js/rev-slider-init.js --output build/js/rev-slider-init.js

html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype index.html
