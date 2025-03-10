/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { finalizeEmailUpdate } from "./AuthApi"; // Import function

export const FinalizeEmailButton = ({ newEmail }) => {
  const handleFinalize = async () => {
    const response = await finalizeEmailUpdate(newEmail);
    alert(response.message); // Show success/error message
  };

  return (
    <button 
      onClick={handleFinalize} 
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Finalize Email Update
    </button>
  );
};
