export const options = (token, methodType) => {
  return ({
    method: methodType,
    headers: {
      "Authorization": "Bearer " + token,
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  });
};

export const requiredAIKeys = [
  "small_animals",
  "young_children",
  "activity",
  "living_space_size",
  "garden",
  "allergy_information",
  "other_animals",
  "fencing",
  "previous_experience_years",
  "annual_income"
];
