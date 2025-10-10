// "use client";

// import React from 'react';
// import { useTheme } from './ThemeProvider';

// export default function ThemeToggle() {
//   const { theme, setTheme, resolvedTheme } = useTheme();

//   const handleThemeChange = () => {
//     if (theme === 'light') {
//       setTheme('dark');
//     } else if (theme === 'dark') {
//       setTheme('system');
//     } else {
//       setTheme('light');
//     }
//   };

//   const getIcon = () => {
//     if (theme === 'system') {
//       return (
//         <svg
//           width="20"
//           height="20"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
//           <line x1="8" y1="21" x2="16" y2="21" />
//           <line x1="12" y1="17" x2="12" y2="21" />
//         </svg>
//       );
//     }
    
//     if (resolvedTheme === 'dark') {
//       return (
//         <svg
//           width="20"
//           height="20"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
//         </svg>
//       );
//     }
    
//     return (
//       <svg
//         width="20"
//         height="20"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <circle cx="12" cy="12" r="5" />
//         <line x1="12" y1="1" x2="12" y2="3" />
//         <line x1="12" y1="21" x2="12" y2="23" />
//         <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
//         <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
//         <line x1="1" y1="12" x2="3" y2="12" />
//         <line x1="21" y1="12" x2="23" y2="12" />
//         <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
//         <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
//       </svg>
//     );
//   };

//   const getTooltip = () => {
//     if (theme === 'system') {
//       return `System (${resolvedTheme})`;
//     }
//     return theme.charAt(0).toUpperCase() + theme.slice(1);
//   };

//   return (
//     <button
//       onClick={handleThemeChange}
//       className="relative p-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200 group shadow-sm hover:shadow-md"
//       title={getTooltip()}
//       aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
//     >
//       <div className="text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
//         {getIcon()}
//       </div>
      
//       {/* Tooltip */}
//       <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-neutral-900 dark:bg-neutral-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
//         {getTooltip()}
//       </div>
//     </button>
//   );
// }
