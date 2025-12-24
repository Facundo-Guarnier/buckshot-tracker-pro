
/**
 * BrandFooter - Reusable footer component for all Guarnold projects
 * Adapted for Buckshot Tracker Pro (Dark Industrial Theme)
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
   */
  forceDark?: boolean;
}

export const BrandFooter: React.FC<BrandFooterProps> = ({ 
  className = '', 
  compact = false,
  forceDark = false 
}) => {
  // Configuración por defecto
  const env = (import.meta as any).env || {};
  
  const appName = env.VITE_APP_NAME || 'Buckshot Tracker';
  const appVersion = env.VITE_APP_VERSION || '4.3.0';
  const brandName = env.VITE_BRAND_NAME || 'Guarnold';
  const brandUrl = env.VITE_BRAND_URL || 'https://guarnold.com.ar';
  const repoUrl = 'https://github.com/Facundo-Guarnier/buckshot-tracker-pro';
  
  // RUTA DE LA IMAGEN
  // En Vite, los archivos dentro de la carpeta 'public' se sirven en la raíz '/'.
  // Archivo físico: public/assets/guarnold_firma.png
  // URL del navegador: /assets/guarnold_firma.png
  const signatureUrl = '/assets/guarnold_firma.png';

  // Wrapper para forzar modo oscuro
  // Usamos 'div' normal (no 'contents') para asegurar que la clase 'dark' se aplique correctamente al contexto.
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => 
    forceDark ? <div className="dark w-full flex justify-center">{children}</div> : <div className="w-full flex justify-center">{children}</div>;

  const SignatureImage = () => (
    <img 
      src={signatureUrl} 
      alt="Firma Guarnold"
      // dark:invert invierte los colores (negro a blanco) cuando la clase 'dark' está presente en un padre
      className="h-6 sm:h-8 w-auto dark:invert block"
      style={{ display: 'block' }} // Forzar display block por si acaso
    />
  );

  if (compact) {
    return (
      <Wrapper>
        <footer className={`
          w-full py-3 px-4 border-t transition-colors backdrop-blur-md z-50
          bg-zinc-100/80 border-zinc-200
          dark:bg-black/40 dark:border-red-900/20
          ${className}
        `}>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
            {/* App Name */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-tight">
                {appName}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-zinc-500 border border-zinc-300 dark:bg-zinc-900 dark:text-red-500 dark:border-red-900/30">
                v{appVersion}
              </span>
            </div>
            
            <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">|</span>
            
            {/* Brand Link */}
            <a 
              href={brandUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="
                flex items-center gap-2 px-2 py-1 rounded transition-all font-medium
                bg-white text-zinc-700 border border-zinc-200 
                hover:bg-zinc-200 hover:text-zinc-900
                dark:bg-zinc-900/50 dark:text-zinc-400 dark:border-zinc-800
                dark:hover:bg-red-950/30 dark:hover:text-red-400 dark:hover:border-red-900/40
              "
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">By</span>
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
                >
                  <Github className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Source</span>
                </a>
              </>
            )}
            
            {/* FIRMA - Renderizado directo */}
            <SignatureImage />
          </div>
        </footer>
      </Wrapper>
    );
  }

  // Versión Full
  return (
    <Wrapper>
      <footer className={`
        w-full py-6 px-6 border-t transition-colors
        bg-zinc-100 border-zinc-200
        dark:bg-neutral-950 dark:border-zinc-900
        ${className}
      `}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm w-full">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              {appName}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-white text-zinc-500 border border-zinc-300 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800">
              v{appVersion}
            </span>
          </div>

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
                dark:hover:bg-zinc-800 dark:hover:text-white
              "
            >
              <Globe className="w-4 h-4" />
              <span>Más proyectos en <strong>{brandName}</strong></span>
            </a>
            
            <SignatureImage />
          </div>
        </div>
      </footer>
    </Wrapper>
  );
};

export default BrandFooter;
