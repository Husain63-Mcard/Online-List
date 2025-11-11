import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";
import categories from "./categories";

interface Props {
  onSubmit: (data: FormData) => void;
}
const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description most be atleast 3 character" })
    .max(50),
  amount: z.number().min(0.01, { message: "Amount is required" }).max(100_000),
  category: z.enum(categories),
});
type FormData = z.infer<typeof schema>;
// formData is type of our form data

const Form = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <form
      action=""
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
        //  onSubmit(data) is going to submit our data to the table and  reset(); is going to reset our form in order to allow us put another data
      })}
    >
      <label htmlFor="discription" className="form-label">
        Discription
      </label>
      <input
        {...register("description")}
        id="description"
        type="text"
        className="form-control"
      />
      {errors.description && (
        <p className="text-danger">{errors.description.message}</p>
      )}
      <label htmlFor="amount" className="form-label">
        Amount
      </label>
      <input
        {...register("amount", { valueAsNumber: true })}
        id="amount"
        type="number"
        className="form-control"
      />
      {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
      <label htmlFor="category" className="form-label">
        Category
      </label>

      <select {...register("category")} id="category" className="form-select">
        <option value=""></option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      {errors.category && (
        <p className="text-danger">{errors.category.message}</p>
      )}

      <button className="btn btn-primary">Add To List</button>
    </form>
  );
};

export default Form;
