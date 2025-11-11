import categories from "./categories";

interface Props {
  onSelectCategories: (Category: string) => void;
}

const ExpenseFilter = ({ onSelectCategories }: Props) => {
  return (
    <select
      className="form-select"
      onChange={(event) => onSelectCategories(event?.target.value)}
    >
      <option value="">All categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default ExpenseFilter;
