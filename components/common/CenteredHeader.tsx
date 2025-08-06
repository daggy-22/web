
interface HeaderProps {
  text: string;
}

const CenteredHeader: React.FC<HeaderProps> = ({ text }) => {
  return (
    <div className="flex justify-center my-5">
      <h1 className="md:text-3xl text-lg md:leading-10 text-md font-bold">
        {text}</h1>
    </div>
  );
};

export default CenteredHeader;
