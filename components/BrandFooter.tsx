/**
 * BrandFooter - Reusable footer component for all Guarnold projects
 * Adapted for Buckshot Tracker Pro (Dark Industrial Theme)
 * 
 * Displays branding with app name, version, and links to:
 * - Brand website (guarnold.com.ar) - Main hub for all projects
 * - Repository
 * 
 * Configuration via environment variables:
 * - VITE_APP_NAME: Application name
 * - VITE_APP_VERSION: Application version
 * - VITE_BRAND_NAME: Brand name (Guarnold)
 * - VITE_BRAND_URL: Brand website URL
 * - VITE_REPO_URL: Repository URL
 * 
 * Usage:
 * - <BrandFooter /> - Full version with auto dark mode detection
 * - <BrandFooter compact /> - Single line version
 * - <BrandFooter forceDark /> - Force dark mode (useful if parent doesn't have 'dark' class)
 */

import React from 'react';
import { Github, Globe } from 'lucide-react';

interface BrandFooterProps {
  /** Additional CSS classes */
  className?: string;
  /** Show in compact mode (single line) */
  compact?: boolean;
  /** 
   * Force dark mode variant. 
   * If not set, uses Tailwind's dark: classes for automatic detection.
   * Set to true if parent doesn't have 'dark' class but you want dark styling.
   */
  forceDark?: boolean;
}

export const BrandFooter: React.FC<BrandFooterProps> = ({ 
  className = '', 
  compact = false,
  forceDark = false 
}) => {
  // Read from environment variables with fallbacks
  const appName = import.meta.env.VITE_APP_NAME || 'Buckshot Tracker';
  const appVersion = import.meta.env.VITE_APP_VERSION || '4.3.0';
  const brandName = import.meta.env.VITE_BRAND_NAME || 'Guarnold';
  const brandUrl = import.meta.env.VITE_BRAND_URL || 'https://guarnold.com.ar';
  const brandSignature = import.meta.env.VITE_BRAND_SIGNATURE || '';
  const repoUrl = import.meta.env.VITE_REPO_URL || 'https://github.com/Facundo-Guarnier/buckshot-tracker-pro';

  // Base wrapper for forced dark mode
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => 
    forceDark ? <div className="dark">{children}</div> : <>{children}</>;

  // Signature component - subtle and elegant
  const Signature = () => brandSignature ? (
    <img 
      src={brandSignature} 
      alt={brandName}
      className="h-10 sm:h-12 w-auto -my-2 opacity-40 hover:opacity-70 transition-opacity dark:invert dark:opacity-30 dark:hover:opacity-60"
    />
  ) : null;

  if (compact) {
    return (
      <Wrapper>
        <footer className={`
          py-4 px-6 border-t print:hidden transition-colors backdrop-blur-md
          bg-zinc-100/80 border-zinc-200
          dark:bg-black/40 dark:border-red-900/20
          ${className}
        `}>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm">
            {/* App Name with Badge */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-tight">
                {appName}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white text-zinc-500 border border-zinc-300 dark:bg-zinc-900 dark:text-red-500 dark:border-red-900/30">
                v{appVersion}
              </span>
            </div>
            
            <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">|</span>
            
            {/* Brand Link - Main Hub */}
            <a 
              href={brandUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="
                flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all font-medium
                bg-white text-zinc-700 border border-zinc-200 
                hover:bg-zinc-200 hover:text-zinc-900
                dark:bg-zinc-900/50 dark:text-zinc-400 dark:border-zinc-800
                dark:hover:bg-red-950/30 dark:hover:text-red-400 dark:hover:border-red-900/40
              "
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Más proyectos en</span>
              <strong className="tracking-wide">{brandName}</strong>
            </a>
            
            {/* Repo Link */}
            {repoUrl && (
              <>
                <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">|</span>
                <a 
                  href={repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-2 transition-colors
                    text-zinc-600 hover:text-zinc-900
                    dark:text-zinc-500 dark:hover:text-red-400
                  "
                  title="Ver código fuente en GitHub"
                >
                  <Github className="w-4 h-4" />
                  <span>Código</span>
                </a>
              </>
            )}
            
            {/* Signature - Subtle branding */}
            <Signature />
          </div>
        </footer>
      </Wrapper>
    );
  }

  // Full version (non-compact) - Dark Industrial Theme
  return (
    <Wrapper>
      <footer className={`
        py-5 px-6 border-t print:hidden transition-colors
        bg-zinc-100 border-zinc-200
        dark:bg-neutral-950 dark:border-zinc-900
        ${className}
      `}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          {/* App Info */}
          <div className="flex items-center gap-3">
            <span className="font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-tight">
              {appName}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white text-zinc-500 border border-zinc-300 dark:bg-zinc-900 dark:text-red-500 dark:border-red-900/30">
              v{appVersion}
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-5">
            <a 
              href={brandUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="
                flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all font-medium
                bg-white text-zinc-700 border border-zinc-200 
                hover:bg-zinc-200 hover:text-zinc-900
                dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800
                dark:hover:bg-red-950/30 dark:hover:text-red-400 dark:hover:border-red-900/40
              "
            >
              <Globe className="w-4 h-4" />
              <span>Más proyectos en <strong>{brandName}</strong></span>
            </a>
            
            {repoUrl && (
              <>
                <span className="text-zinc-300 dark:text-zinc-700">|</span>
                <a 
                  href={repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-2 transition-colors
                    text-zinc-600 hover:text-zinc-900
                    dark:text-zinc-500 dark:hover:text-red-400
                  "
                  title="Ver código fuente en GitHub"
                >
                  <Github className="w-4 h-4" />
                  <span>Repositorio</span>
                </a>
              </>
            )}
            
            {/* Signature - Subtle branding */}
            <Signature />
          </div>
        </div>
      </footer>
    </Wrapper>
  );
};

export default BrandFooter;
