import { delay, motion } from "framer-motion";

const PopUpDelete = ({ show, handleDelete, handleCancel }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      className={`${
        show ? "flex" : "hidden"
      } px-4 fixed bg-zinc-900/60 w-screen h-screen top-0 right-0 justify-center items-center z-20`}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: show ? 1 : 0, opacity: show ? 1 : 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg overflow-hidden p-4 w-full max-w-[350px]"
      >
        <h2 className="text-lg font-bold">Delete message</h2>
        <p className="my-4">Are you sure you want to delete this message?</p>
        <div className="w-full flex items-center justify-end">
          <button onClick={handleCancel} className="text-blue-500 px-2">
            Cancel
          </button>
          <button onClick={handleDelete} className="text-red-500 px-2">
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PopUpDelete;
