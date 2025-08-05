import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="relative flex aspect-square size-8 items-center justify-center rounded-lg bg-theme-gradient shadow-lg transition-transform group-hover:scale-110">
                <AppLogoIcon className="size-5 fill-current text-white drop-shadow-sm" />
                {/* Shine effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            <div className="ml-3 grid flex-1 text-left">
                <span className="truncate text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    Feedback Zone
                </span>
                <span className="truncate text-xs text-slate-500 dark:text-slate-400 font-medium group-data-[collapsible=icon]:hidden">
                    Share & Improve
                </span>
            </div>
        </>
    );
}
