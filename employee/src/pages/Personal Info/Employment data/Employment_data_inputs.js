export const employmentQuestions = [
  {
    type: "radio",
    name: "school_qualification",
    label: "Highest school qualification",
    options: [
      { value: "Technical/Abitur", label: "Technical/Abitur" },
      {
        value: "Intermediate school leaving certificate",
        label: "Intermediate school leaving certificate",
      },
      {
        value: "Secondary/elementary school leaving certificate",
        label: "Secondary/elementary school leaving certificate",
      },
      {
        value: "without school leaving certificate",
        label: "without school leaving certificate",
      },
    ],
  },
  {
    type: "radio",
    name: "vocational_training",
    label: "has vocational training?",
    options: [
      { value: "true", label: "Yes" },
      { value: "false", label: "No" },
    ],
  },
  {
    type: "radio",
    name: "pregnant",
    label: "Are you pregnant or not?",
    options: [
      { value: "true", label: "Yes" },
      { value: "false", label: "No" },
    ],
  },
  {
    type: "radio",
    name: "corona",
    label: "Have you received the Corona vaccine?",
    options: [
      { value: "true", label: "Yes" },
      { value: "false", label: "No" },
    ],
  },
  {
    type: "radio",
    name: "hepatitis",
    label: "Have you received the Hepatitis vaccination?",
    options: [
      { value: "true", label: "Yes" },
      { value: "false", label: "No" },
    ],
  },
  {
    type: "radio",
    name: "over18",
    label: "confirm that you are +18",
    options: [
      { value: "true", label: "Yes" },
      { value: "false", label: "No" },
    ],
  },
];
