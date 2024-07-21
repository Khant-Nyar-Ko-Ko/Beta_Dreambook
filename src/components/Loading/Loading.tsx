import React from "react";

type LoadingProps = {
  variant?: 'white' | 'black' | 'red' | 'blue' | 'green' | 'yellow';
};

const Loading: React.FC<LoadingProps> = ({ variant = 'white' }) => {
  const variantClasses = {
    white: 'border-white dark:border-blue-500 border-opacity-75 border-t-transparent',
    black: 'border-black border-opacity-75 border-t-transparent',
    red: 'border-red-500 border-opacity-75 border-t-transparent',
    blue: 'border-default dark:border-white border-opacity-75 border-t-transparent',
    green: 'border-green-500 border-opacity-75 border-t-transparent',
    yellow: 'border-yellow-500 border-opacity-75 border-t-transparent',
  };

  return (
    <>
      <div className={`w-5 h-5 border-4 rounded-full animate-spin ${variantClasses[variant]}`}></div>
    </>
  );
};

export default Loading;
