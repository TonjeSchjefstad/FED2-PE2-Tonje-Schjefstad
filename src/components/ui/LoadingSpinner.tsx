/**
 * Loading spinner component displayed while data is being fetched.
 */
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="w-10 h-10 border-4 border-border border-t-button-primary rounded-full animate-spin" />
    </div>
  );
}

export default LoadingSpinner;
