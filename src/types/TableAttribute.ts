export default interface TableAttribute {
    attribute: string;
    name: string;
    type: "normal" | "status" | "object" | "date" | "datetime" | "time" | "logntext" | "float";
  }