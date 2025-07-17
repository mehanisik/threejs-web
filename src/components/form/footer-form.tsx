import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { allowedBudgets, allowedInterests } from "~/constants/form-options";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const formSchema = z
  .object({
    name: z.string().min(1, "Please enter your name (e.g., John Doe)"),
    email: z.string().email("Please enter a valid email address"),
    interests: z
      .array(z.string())
      .min(1, "Please select at least one interest"),
    customInterest: z.string().optional(),
    budget: z
      .string()
      .min(1, "Please select a budget (e.g., $2000, $2k, $2k-5k)"),
    customBudget: z.string().optional(),
    details: z
      .string()
      .optional()
      .refine((val) => val?.length && val.length > 10, {
        message:
          "Please provide at least 10 characters for your project details",
      }),
  })
  .refine(
    (data) => {
      if (
        data.interests.includes("Other") &&
        (!data.customInterest || data.customInterest.trim() === "")
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Please specify your custom interest",
      path: ["customInterest"],
    },
  )
  .refine(
    (data) => {
      if (
        data.budget === "Custom" &&
        (!data.customBudget || data.customBudget.trim() === "")
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Please specify your custom budget",
      path: ["customBudget"],
    },
  );

type FormData = z.infer<typeof formSchema>;

export function FooterForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: [],
      budget: "",
      name: "",
      email: "",
      customInterest: "",
      customBudget: "",
      details: "",
    },
  });

  const interests = useWatch({ control, name: "interests", defaultValue: [] });
  const budget = useWatch({ control, name: "budget", defaultValue: "" });

  const showCustomInterest = interests?.includes("Other");
  const showCustomBudget = budget === "Custom";

  const toggleInterest = (interest: string) => {
    const updatedInterests = interests?.includes(interest)
      ? interests.filter((i: string) => i !== interest)
      : [...(interests || []), interest];

    setValue("interests", updatedInterests, { shouldValidate: true });

    if (!updatedInterests.includes("Other")) {
      setValue("customInterest", "");
      clearErrors("customInterest");
    }
  };

  const handleBudgetSelect = (newBudget: string) => {
    setValue("budget", newBudget, { shouldValidate: true });

    if (newBudget !== "Custom") {
      setValue("customBudget", "");
      clearErrors("customBudget");
    }
  };

  const onSubmit = (data: FormData) => {
    const finalData = {
      ...data,
      interests:
        showCustomInterest && data.customInterest
          ? [
              ...data.interests.filter((i: string) => i !== "Other"),
              data.customInterest,
            ]
          : data.interests,
      budget:
        showCustomBudget && data.customBudget ? data.customBudget : data.budget,
    };

    console.log("Form submitted:", finalData);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 p-6 sm:p-8  rounded-2xl flex flex-col gap-6 sm:gap-8"
    >
      <div>
        <label
          htmlFor="name"
          id="your-data-label"
          className="block text-white text-sm sm:text-base mb-3 sm:mb-4"
        >
          <span className="sr-only">Your Data</span>
          Your Data
        </label>
        <fieldset
          aria-labelledby="your-data-label"
          className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
        >
          <div>
            <Input
              placeholder="Name*"
              {...register("name")}
              className={`w-full bg-transparent border rounded-xl px-4 py-3 text-foreground placeholder-foreground focus:outline-none focus:border-2 focus:border-border transition-all ${
                errors.name ? "border-destructive" : "border-border"
              }`}
            />
            {errors.name && (
              <Alert variant="destructive" className="mt-2">
                <AlertDescription>{errors.name.message}</AlertDescription>
              </Alert>
            )}
          </div>
          <div>
            <Input
              placeholder="Email*"
              type="email"
              {...register("email")}
              className={`w-full bg-transparent border rounded-xl px-4 py-3 text-foreground placeholder-foreground focus:outline-none focus:border-2 focus:border-border transition-all ${
                errors.email ? "border-destructive" : "border-border"
              }`}
            />
            {errors.email && (
              <Alert variant="destructive" className="mt-2">
                <AlertDescription>{errors.email.message}</AlertDescription>
              </Alert>
            )}
          </div>
        </fieldset>
      </div>

      <div>
        <label
          htmlFor="interests-fieldset"
          id="interests-label"
          className="block text-sm sm:text-base mb-3 sm:mb-4 text-white"
        >
          <span className="sr-only">You are interested in</span>
          You are interested in
        </label>
        <fieldset
          aria-labelledby="interests-label"
          className="flex flex-wrap gap-3 sm:gap-4"
        >
          {allowedInterests.map((interest) => (
            <Button
              type="button"
              key={interest}
              onClick={() => toggleInterest(interest)}
              variant={interests?.includes(interest) ? "outline" : "default"}
              className={`px-6 py-3 sm:px-8 sm:py-4 rounded-full border transition-all text-sm sm:text-base font-normal focus:outline-none focus:border-2 focus:border-border ${
                interests?.includes(interest) ? "font-semibold" : ""
              }`}
            >
              {interest}
            </Button>
          ))}
        </fieldset>
        {showCustomInterest && (
          <div className="mt-3">
            <Input
              placeholder="Your custom interest*"
              {...register("customInterest")}
              className={`w-full bg-transparent border rounded-xl px-4 py-3 text-foreground placeholder-foreground focus:outline-none focus:border-2 focus:border-border transition-all ${
                errors.customInterest ? "border-destructive" : "border-border"
              }`}
            />
            {errors.customInterest && (
              <Alert variant="destructive" className="mt-2">
                <AlertDescription>
                  {errors.customInterest.message}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
        {errors.interests && (
          <Alert variant="destructive" className="mt-2">
            <AlertDescription>{errors.interests.message}</AlertDescription>
          </Alert>
        )}
      </div>
      <div>
        <label
          htmlFor="budget-fieldset"
          id="budget-label"
          className="block text-white text-sm sm:text-base mb-3 sm:mb-4"
        >
          <span className="sr-only">Budget in USD:</span>
          Budget in USD:
        </label>
        <fieldset
          id="budget-fieldset"
          aria-labelledby="budget-label"
          className="flex flex-wrap gap-3 sm:gap-4"
        >
          {allowedBudgets.map((b) => (
            <Button
              type="button"
              key={b}
              onClick={() => handleBudgetSelect(b)}
              variant={budget === b ? "outline" : "default"}
              className={`px-6 py-3 sm:px-8 sm:py-4 rounded-full border transition-all text-sm sm:text-base font-normal focus:outline-none focus:border-2 focus:border-border ${
                budget === b ? "font-semibold" : ""
              }`}
            >
              {b}
            </Button>
          ))}
        </fieldset>
        {showCustomBudget && (
          <div className="mt-3">
            <Input
              placeholder="Your custom budget*"
              {...register("customBudget")}
              className={`w-full bg-transparent border rounded-xl px-4 py-3 text-foreground placeholder-foreground focus:outline-none focus:border-2 focus:border-border transition-all ${
                errors.customBudget ? "border-destructive" : "border-border"
              }`}
            />
            {errors.customBudget && (
              <Alert variant="destructive" className="mt-2">
                <AlertDescription>
                  {errors.customBudget.message}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
        {errors.budget && (
          <Alert variant="destructive" className="mt-2">
            <AlertDescription>{errors.budget.message}</AlertDescription>
          </Alert>
        )}
      </div>

      <div>
        <Textarea
          {...register("details")}
          placeholder="Project details (optional)"
          className={`w-full bg-transparent border rounded-xl px-4 py-3 text-foreground placeholder-foreground focus:outline-none focus:border-2 focus:border-foreground transition-all min-h-[80px] resize-none ${
            errors.details ? "border-destructive" : "border-border"
          }`}
        />
        {errors.details && (
          <Alert variant="destructive" className="mt-2">
            <AlertDescription>{errors.details.message}</AlertDescription>
          </Alert>
        )}
      </div>

      <Button
        type="submit"
        variant="default"
        disabled={isSubmitting}
        className="w-full text-base border border-white bg-background sm:text-lg rounded-xl text-foreground font-medium transition-all focus:outline-none focus:border-2 focus:border-border hover:bg-foreground hover:text-background disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
