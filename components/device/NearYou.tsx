const NearYouHeader: React.FC = () => {
  return (
    <div className="flex justify-center my-5">
      <div className="mt-5 flex flex-col justify-center md:w-4/5 w-5/6">
        <div className="flex flex-col gap-2 items-center">
          <p className="md:text-3xl text-lg md:leading-10 font-bold">
            Find Merchants Near You
          </p>

          <p className="md:text-md text-xs font-normal">
          Use our location-based search tool to find a nearby merchant.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NearYouHeader;
