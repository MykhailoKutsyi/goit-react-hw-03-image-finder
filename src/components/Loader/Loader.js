import { TailSpin } from 'react-loader-spinner';

const Loader = ({ pendingStatus }) => {
  return (
    pendingStatus && (
      <div className="Loader">
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    )
  );
};
export default Loader;
