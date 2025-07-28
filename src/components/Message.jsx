/* eslint-disable react/prop-types */
export const Message = ({ message, condition }) => {
  return <div className={`message ${condition}`}>{message}</div>;
};
