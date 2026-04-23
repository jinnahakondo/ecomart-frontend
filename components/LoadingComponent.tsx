const LoadingComponent = () => {
    return (
        <div className="flex items-center justify-center w-full py-12 h-screen ">
            {/* 'loading-spinner' is the most standard 'big company' look */}
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );
};
export default LoadingComponent;