import { zodResolver } from "@hookform/resolvers/zod";
import {
  type UseFormProps,
  type UseFormReturn,
  useForm,
} from "react-hook-form";
import type { z } from "zod";

type IUseZodForm = <T extends z.ZodTypeAny>(
  schema: T,
  props?: UseFormProps<z.infer<T>>,
) => {
  form: UseFormReturn<z.infer<T>>;
  resetForm: (values: Partial<z.infer<T>>) => void;
};

export const useZodForm: IUseZodForm = (schema, props) => {
  type FormType = z.infer<typeof schema>;

  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    mode: "onChange",
    ...props,
  });

  const resetForm = (values: Partial<FormType>) => {
    form.reset(values as FormType);
  };

  return { form, resetForm };
};
