# Responsive

Responsiveness is achieved by reducing the root font-size by a factor of 1 and changing all REM sizes. Some additional styles are also used for Layout - reducing the number of columns and so on.

```scss
@media screen and (min-width: $xxl-desktop-min) {
    html, body {
      font-size: 20px;
    }
  }
  
  @media screen and (min-width: $xl-desktop-min) {
    html, body {
      font-size: 18px;
    }
  }
  
  @media screen and (max-width: $desktop-max) {
    html, body {
      font-size: 16px;
    }
  }
```
  