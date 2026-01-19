import { cn } from "@/lib/utils"

export default function DesignControl({
    className,
    srcMobile,
    srcDesktop,
}: Readonly<{ className?: string, srcMobile: string, srcDesktop: string }>) {
    return (
        <picture>
            <source media="(min-width: 768px)" srcSet={srcDesktop} />
            <img
                src={srcMobile}
                className={cn("fixed top-0 left-0 opacity-30 z-20 pointer-events-none object-none object-center h-full w-full object-top md:object-center", className)}
                data-testid="deso"
            />
        </picture>
    )
}