const AuthPageLeftContent = () => {
  const textClass = "text-3xl font-[350] leading-5";
  return (
    <div className="flex flex-col justify-center items-center h-screen text-left p-10">
      <div className="flex flex-col gap-3 items-center text-center">
        <h1 className={textClass}>Start Your</h1>
        <h1 className={textClass}>Device Financing</h1>
        <h1 className={textClass}>Journey</h1>
      </div>
      <img
        src="/register.png"
        alt="Man with laptop"
        className="mt-6 max-w-sm"
      />
    </div>
  );
};

export default AuthPageLeftContent;
