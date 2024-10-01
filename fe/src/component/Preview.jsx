import PropTypes from "prop-types";
const PreviewLampiran = ({ data, isOpen }) => {
  const closeHandler = () => {
    isOpen(false);
  };
  return (
    <>
      <div
        className="fixed top-0 left-0  bg-gray-300/50 overflow-auto w-full h-full z-20"
        onClick={closeHandler}
      >
        <div className=" h-full flex items-center">
          <embed
            className="margin-auto min-h-[80vh] min-w-[600px] max-w-6xl max-h-96 mx-auto border rounded-lg border-solid overflow-hidden border-gray-200"
            src={data}
            type=""
          />
        </div>
      </div>
    </>
  );
};

PreviewLampiran.propTypes = {
  data: PropTypes.any,
  isOpen: PropTypes.any,
};
export default PreviewLampiran;
