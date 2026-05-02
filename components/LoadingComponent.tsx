interface LoadingComponentProps {
    size?: 'xs' | 'sm' | 'md' | 'lg';
    fullScreen?: boolean;
    className?: string;
}

const LoadingComponent = ({
    size = 'lg',
    fullScreen = true,
    className = ''
}: LoadingComponentProps) => {
    const containerClasses = fullScreen
        ? "flex items-center justify-center w-full py-12 h-screen"
        : "flex items-center justify-center w-full py-8";

    const spinnerClasses = `loading loading-spinner loading-${size} text-primary ${className}`;

    return (
        <div className={containerClasses}>
            <span className={spinnerClasses}></span>
        </div>
    );
};

export default LoadingComponent;