const formatRestanrant = (restanrant) => {
  return {
    id: restanrant._id,
    name: restanrant.name,
    description: restanrant.description,
    image: restanrant.image,
  };
};
module.exports = formatRestanrant;
