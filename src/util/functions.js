export const inputAttributes = (htmlInputType, validationType) => {
  let attributes = {
    required: true,
    type: htmlInputType,
    placeholder: `Please Enter ${validationType}`,
    title: `Please Provide ${validationType}`,
  };
  return attributes;
};
