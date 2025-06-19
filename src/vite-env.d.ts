// src/vite-env.d.ts
/// <reference types="vite/client" />

// Add declarations for image types if needed
declare module '*.png' {
    const value: string;
    export default value;
  }
  declare module '*.jpg' {
    const value: string;
    export default value;
  }
  declare module '*.jpeg' {
    const value: string;
    export default value;
  }
  declare module '*.gif' {
    const value: string;
    export default value;
  }
  declare module '*.svg' {
     import * as React from 'react';
     export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
     const src: string;
     export default src;
  }
  
  // Add for other asset types like fonts, etc. if you import them