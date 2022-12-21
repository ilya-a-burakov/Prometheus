# Basic config

The path prometheus/scss/config.scss contains the main configuration file for styles. It contains variables for colors, fonts and sizes. As well as CSS classes for use inside components. The config currently has the following sections:
1. Colors Varibles
2. Size Variables
3. Text Variables
4. Breakpoints

::: tip
If you want to use these variables inside components, you need to pass them in first!
:::


## Colors Varibles

Variables used for colors inside the config. For now, only the white theme is supported.

```scss
	$transparent:   rgba(0,0,0,0);
	// Main and secondary colors
	$main:      #00ff88; 
	$second:    #FCD714;
	// Main tons
	$light-main:  rgba($main, 0.1);
	// Black and white colors
	$dark:      #242424; 
	$grey:      #F7F7F7; 
	$light:     #F4F7FF; 
	$white:     #fff;
```
In the same section there are classes for setting colors for blocks as background-color, for text as font-color and for svg as fill. Also here are styles for creating a border using border.
```scss
	// Text Color Classes
	.t-second {color: $second; }
	.t-main   {color: $main }
	.t-dark   {color: $dark }
	.t-grey   {color: $grey;}
	.t-white  {color: $white;}
	.t-transp {opacity: 0.5;}
	// Icon Color Clasess
	.i-main-f { fill:   $main }
	.i-main-s { stroke: $main }
	// Border Color Clasess
	.br-l-dark 			{ border: 1px solid rgba($dark, 0.1) }
	.br-right-dark  { border-right: 1px solid rgba($dark, 0.1) }
	.br-bot-dark  	{ border-bottom: 1px solid rgba($dark, 0.1) }
	.br-l-main 			{ border: 1px solid rgba($main, 0.1) }
	.br-light  			{ border: 1px solid $light }
	.br-bot-light  	{ border-bottom: 1px solid $light }
	.br-t-white 		{ border: 1px solid rgba($white, 0.1); }
	// Background Color Clasess
	.bg-l-main  { background: $light-main; }
	.bg-main  { background: $main; }
	.bg-dark  { background: $dark; }
	.bg-grey  { background: $grey; }
	.bg-light { background: $light; }
	.bg-card 	{ background: #F7F7F7; }
	.bg-card-blue { background: #eef2f6; }
	.bg-white   { background: $white; }
	.bg-t-white { background: rgba($white,0.05); }
	.bg-transp  { background: rgba($white,0); }
```

## Size Variables
We use REM as our base unit of size. Further, all sizes are made multiples of half or a quarter of 1 rem. We use 8 variable sizes for all padding, margins and everything else.
```scss
	$extra:   		5rem;
	$big:   			2.5rem; 
	$semi:    		1.5rem;
	$medium:  		1.25rem;
	$regular: 		1rem;
	$small:   		0.75rem;
	$thin:    		0.5rem;
	$extra-thin: 	0.25rem;
```
The same section contains classes for determining the size of icons, adding margin, padding and rounding corners.
```scss
	// Icon Clasess
	.i-big    	{ width: $extra * 2;  height: $extra * 2; }
	.i-semi   	{ width: $big * 3;    height: $big * 3; }
	.i-medium   { width: $extra;    	height: $extra; }
	.i-regular  { width: $semi * 2;   height: $semi * 2; }
	.i-small  	{ width: $semi;     	height: $semi }
	.i-default	{ width: $regular;    height: $regular }
	.i-thin  		{ width: 2rem;     	height: 2rem }
	// Extra 
	.i-circle   { padding: $small; border-radius: $extra; background: $light-main; overflow: visible; }
	// Padding Clasess
	.pd-extra   { padding: $extra;  }
	.pd-semi-extra   { padding: $semi * 2;  }
	.pd-big   { padding: $big;  }
	.pd-semi  { padding: $semi;   } 
	.pd-medium  { padding: $medium; }
	.pd-regular { padding: $regular;}
	.pd-small { padding: $small;  } 
	.pd-thin  { padding: $thin;   } 
	.pd-zero  { padding: 0;   }
	// Padding Clasess Top
	.pd-t-extra   { padding-top: $extra;  }
	.pd-t-big   { padding-top: $big;  }
	.pd-t-semi  { padding-top: $semi;   } 
	.pd-t-medium  { padding-top: $medium; }
	.pd-t-regular { padding-top: $regular;}
	.pd-t-small { padding-top: $small;  } 
	.pd-t-thin  { padding-top: $thin;   } 
	.pd-t-zero  { padding-top: 0;   }  
	// Padding Clasess bottom
	.pd-b-extra   { padding-bottom: $extra;  }
	.pd-b-big   { padding-bottom: $big;  }
	.pd-b-semi  { padding-bottom: $semi;   } 
	.pd-b-medium  { padding-bottom: $medium; }
	.pd-b-regular { padding-bottom: $regular;}
	.pd-b-small { padding-bottom: $small;  } 
	.pd-b-thin  { padding-bottom: $thin;   } 
	.pd-b-zero  { padding-bottom: 0;   }  
	// Padding Clasess Right
	.pd-r-extra   { padding-right: $extra;  }
	.pd-r-big   { padding-right: $big;  }
	.pd-r-semi  { padding-right: $semi;   } 
	.pd-r-medium  { padding-right: $medium; }
	.pd-r-regular { padding-right: $regular;}
	.pd-r-small { padding-right: $small;  } 
	.pd-r-thin  { padding-right: $thin;   } 
	.pd-r-zero  { padding-right: 0;   }  
	// Extra padding: 
	.pd-thin-big{ padding: $thin $big; }
	.pd-small-big{ padding: $small $big; }
	.pd-semi-big{ padding: $semi $big; }
	// Margin Classes
	.mn-extra   { margin-bottom: $extra;  }
	.mn-big   { margin-bottom: $big;    }
	.mn-semi  { margin-bottom: $semi;   }
	.mn-medium  { margin-bottom: $medium;   }
	.mn-regular { margin-bottom: $regular;  }
	.mn-small   { margin-bottom: $small;  }
	.mn-thin  { margin-bottom: $thin;   } 
	.mn-extra-thin  { margin-bottom: $extra-thin;   } 
	// Margin Top
	.mn-t-auto  { margin-top: auto;   }
	.mn-t-extra   { margin-top: $extra;  }
	.mn-t-big   { margin-top: $big;    }
	.mn-t-semi  { margin-top: $semi;   }
	.mn-t-medium  { margin-top: $medium;   }
	.mn-t-regular { margin-top: $regular;  }
	.mn-t-small   { margin-top: $small;  }
	.mn-t-thin  { margin-top: $thin;   } 
	.mn-t-extra-thin  { margin-top: $extra-thin;   } 
	// Margin Classes Left
	.mn-l-small   { margin-left: $light;   }
	// Margin Classes Right
	.mn-r-extra   { margin-right: $extra;   }
	.mn-r-bold    { margin-right: $big;   }
	.mn-r-semi    { margin-right: $semi;   }
	.mn-r-medium  { margin-right: $medium;   }
	.mn-r-regular { margin-right: $regular;  }
	.mn-r-small   { margin-right: $small;   }
	.mn-r-thin    { margin-right: $thin;   }
	// Border radius
	.radius-medium 	{	border-radius: $regular * 2 }
	.radius-regular {	border-radius: $regular }
```

## Text Variables
Variable for font name and styles for typography. Headings, plain text, text decoration and more.
```scss
	$font: 'Avenir Next';
	// Headers
	.tx-extra   { padding: $extra;  }
	.tx-big   	{ padding: $big;  }
	.tx-semi  	{ padding: $semi;   } 
	.tx-medium  { padding: $medium; }
	.tx-regular { padding: $regular;}
	.tx-small 	{ padding: $small;  } 
	.tx-thin  	{ padding: $thin;   } 
	.tx-zero  	{ padding: 0;   } 
	// Font Styles
	h1 {font-weight: 500; font-size: 3.5rem ; line-height: 4rem; 	letter-spacing: -0.1rem; }
	h2 {font-weight: 500; font-size: 3rem; 		line-height: 1.125; }
	h3 {font-weight: 500; font-size: 2rem; 		line-height: 1.25; }
	h4 {font-weight: 700; font-size: 1.75rem; line-height: 1.125; letter-spacing: 0.1em; text-transform: uppercase; }
	h5 {font-weight: 600; font-size: 1rem; 		line-height: 24px; 	letter-spacing: 0.1em; text-transform: uppercase; }
	b  {font-weight: 700}
	// Class for Font Style
	.h1 				{font-weight: 500; font-size: 80px; 		line-height: 1.00; letter-spacing: -0.1rem; }
	.h1-product {font-weight: 500; font-size: 1.25rem; 	line-height: 1.50; letter-spacing: 0; }
	.h2 				{font-weight: 500; font-size: 2.25rem; 	line-height: 1.3;  letter-spacing: -0.05em; }
	.h3 				{font-weight: 500; font-size: 2rem; 		line-height: 1.25; }
	.h4 				{font-weight: 700; font-size: 1.75rem; 	line-height: 1.25; letter-spacing: 0.1em; text-transform: uppercase; }
	.h5 				{font-weight: 600; font-size: 1rem; 		line-height: 1.50; letter-spacing: 0.1em; text-transform: uppercase;}
	.h6 				{font-weight: 600; font-size: 1rem; 		line-height: 1.50; white-space: normal; text-transform: revert; line-height: 1; font-weight: 600; letter-spacing: 0;}
	// Text decoration
	.uppercase 				{text-transform: uppercase;}
	.small-underline 	{display: block; font-size: 0.875rem; color: #8A8A8A; text-decoration: underline; }
	.underline 				{text-decoration: underline; }
	.line-through 		{text-decoration: line-through;  }
	// Typogragy Styles
	span.label  	{font-weight: 500; font-size: 24px; line-height: 32px; letter-spacing: 0.1em; text-transform: uppercase; }
	span.cursive 	{font-weight: 700; color: #00ff88 }
	p           	{font-style: normal; font-weight: normal; font-size: 1rem; line-height: 1.5; }
	.small     		{font-style: normal; font-weight: normal; font-size: 18px; line-height: 32px; }
	.p-small     	{font-size: 0.875rem;		line-height: 1.25rem; }
	.p-medium     {font-size: 1rem;				line-height: 1.5rem;}
	.p-big     		{font-size: 1.25rem;		line-height: 1.25;	font-weight: 400;	text-transform: revert; letter-spacing: 0; }
	// Block align
	.mn-center 	{ margin: 0 auto;}
	// Text align
	.t-left   	{ text-align: left; }
	.t-center   { text-align: center; }
	.t-right  	{ text-align: right; }
	// Linehegiht
	.t-lh-1 		{ line-height: 1}
	.t-lh-15 		{ line-height: 1.5}
	.t-lh-2 		{ line-height: 2}
	// Font weights
	.t-bold   	{font-weight: 900;}
	.t-demi   	{font-weight: 700;}
	.t-semi   	{font-weight: 600;}
	.t-medium 	{font-weight: 500;}
	.t-regular 	{font-weight: 300;}
	.t-light  	{font-weight: 200;}
```
## Breakpoints	
Variables for defining screen sizes for media queries in responsive.scss.
```scss
$super-ultra-tiny-flip-phone-max: 240px;
$flip-phone-max: 									320px;
$phone-portrait-max: 							321px;
$phone-landscape-max: 						640px;
$tablet-portrait-min: 						641px;
$tablet-portrait-max: 						768px;
$tablet-landscape-min: 						769px;
$tablet-landscape-max: 						1024px;
$desktop-min: 										1025px;
$desktop-max: 										1440px;
$xl-desktop-min: 									1441px;
$xl-desktop-max: 									1920px;
$xxl-desktop-min: 								1921px;
```