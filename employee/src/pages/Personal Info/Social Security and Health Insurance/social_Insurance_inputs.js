const social_Insurance_inputs = [
  {
    name: "tax_identification_number",
    label: "Tax identification number",
    type: "text",
  },
  {
    name: "social_insurance_number",
    label: "Social insurance number",
    type: "text",
  },
  {
    name: "health_insurance_company_name",
    label: "health insurance company name",
    type: "text",
  },
  {
    name: "health_insurance_number",
    label: "Health insurance number",
    type: "text",
  },
  {
    name: "number_of_children",
    label: "Number of children",
    type: "number",
  },
];

const social_Insurance_select = [
  {
    name: "marital_status",
    label: "Marital status",
    optians: ["single", "married", "divorced", "widowed"],
  },
  {
    name: "health_insurance_type",
    label: "Health insurance type",
    optians: ["public", "private"],
  },
  {
    name: "tax_bracket",
    label: "Tax bracket",
    optians: ["1", "2", "3", "4", "5", "6"],
  },
];
export { social_Insurance_inputs, social_Insurance_select };
