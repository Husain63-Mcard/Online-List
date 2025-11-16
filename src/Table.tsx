// import { tr } from "zod/locales";

interface Expenses {
  id: number;
  description: string;
  amount: number;
  category: string;
}
interface Props {
  expenses: Expenses[];
  onDelete: (id: number) => void;
}
const Table = ({ expenses, onDelete }: Props) => {
  if (expenses.length === 0) return null;
  return (
    <div className=".table-section">
      <table className="table table-bordered border-success">
        <thead>
          <tr>
            <th>Discription</th>
            <th>Amount</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td>
                <button
                  className="btn btn-outline-primary "
                  onClick={() => onDelete(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>
              N
              {expenses
                .reduce((acc, expense) => expense.amount + acc, 0)
                .toFixed(2)}
            </td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
