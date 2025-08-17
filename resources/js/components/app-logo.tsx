import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="relative flex aspect-square size-8 items-center justify-center rounded-lg bg-theme-gradient shadow-lg transition-transform group-hover:scale-110">
                <AppLogoIcon className="size-5 fill-current text-white drop-shadow-sm" />
                {/* Shine effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>

        </>
    );
}
