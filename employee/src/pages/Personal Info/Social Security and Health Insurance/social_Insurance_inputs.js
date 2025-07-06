const social_Insurance_inputs = [
  {
    name: "tax_identification_number",
    label: "Tax identification number",
    type: "text",
  },
  { name: "tax_bracket", label: "Tax bracket", type: "number" },
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
    optians: ["single", "married", "divorced", "widowed"],
  },
  {
    name: "health_insurance_type",
    optians: ["public", "private", "family", "international"],
  },
];
export { social_Insurance_inputs, social_Insurance_select };
