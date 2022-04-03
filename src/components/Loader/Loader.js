import { TailSpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="Loader">
      <TailSpin color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;
