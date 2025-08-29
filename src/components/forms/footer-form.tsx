import { useForm } from "@formspree/react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useWatch } from "react-hook-form";
import { z } from "zod";
import { allowedBudgets, allowedInterests } from "@/constants/form-options";
import { useZodForm } from "@/hooks/use-zod-form";
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

type FormValues = z.infer<typeof formSchema>;

export function FooterForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const isFormInView = useInView(formRef, { amount: 0.2, once: true });

  const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_FORM_ID);

  const { form } = useZodForm(formSchema, {
    defaultValues: {
      name: "",
      email: "",
      interests: [],
      customInterest: "",
      budget: "",
      customBudget: "",
      details: "",
    },
  });

  const {
    register,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
    control,
  } = form;

  const interests = useWatch({ control, name: "interests", defaultValue: [] });
  const budget = useWatch({ control, name: "budget", defaultValue: "" });

  const showCustomInterest = interests?.includes("Other");
  const showCustomBudget = budget === "Custom";

  const [startTime, setStartTime] = useState(Date.now());
  const [honeypot, setHoneypot] = useState("");
  const [spamError, setSpamError] = useState("");

  useEffect(() => {
    setStartTime(Date.now());
    setHoneypot("");
    setSpamError("");
  }, []);

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

  const onSubmit = (data: FormValues) => {
    setSpamError("");
    if (Date.now() - startTime < 2000) {
      setSpamError("Form submitted too quickly. Please try again.");
      return;
    }
    if (honeypot) {
      setSpamError("Spam detected.");
      return;
    }
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
      _gotcha: honeypot,
    };
    handleSubmit(finalData);
  };

  useEffect(() => {
    if (state.succeeded) {
      reset();
      setStartTime(Date.now());
      setHoneypot("");
    }
  }, [state.succeeded, reset]);

  return (
    <motion.div
      ref={formRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
      className="w-full"
    >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full bg-background border border-foreground/15 p-6 md:p-8 lg:p-10 flex flex-col gap-8 md:gap-10"
        autoComplete="off"
      >
        <input
          type="text"
          name="_gotcha"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />
        {spamError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <Alert variant="destructive">
              <AlertDescription>{spamError}</AlertDescription>
            </Alert>
          </motion.div>
        )}
        {state.succeeded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <Alert className="border-green-500 bg-green-500/10">
              <AlertDescription className="text-green-700">
                Thank you! Your message has been sent successfully.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {state.errors && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <Alert variant="destructive">
              <AlertDescription>
                {typeof state.errors === "string"
                  ? state.errors
                  : "An error occurred while submitting the form. Please try again."}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-lg md:text-xl font-light mb-6 text-foreground/90">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <Input
                placeholder="Full Name*"
                {...register("name")}
                className={`w-full bg-transparent border-0 border-b-2 rounded-none px-0 py-3 text-foreground focus-visible:ring-0 focus-visible:border-foreground transition-all ${
                  errors.name ? "border-destructive" : "border-foreground/30"
                }`}
              />
              {errors.name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2"
                >
                  <Alert
                    variant="destructive"
                    className="border-0 bg-destructive/10 p-2"
                  >
                    <AlertDescription className="text-xs text-destructive">
                      {errors.name.message}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </div>
            <div>
              <Input
                placeholder="Email Address*"
                type="email"
                {...register("email")}
                className={`w-full bg-transparent border-0 border-b-2 rounded-none px-0 py-3 text-foreground focus-visible:ring-0 focus-visible:border-foreground transition-all ${
                  errors.email ? "border-destructive" : "border-foreground/30"
                }`}
              />
              {errors.email && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2"
                >
                  <Alert
                    variant="destructive"
                    className="border-0 bg-destructive/10 p-2"
                  >
                    <AlertDescription className="text-xs text-destructive">
                      {errors.email.message}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-lg md:text-xl font-light mb-6 text-foreground/90">
            Areas of Interest
          </h2>
          <div className="flex flex-wrap gap-3 md:gap-4">
            {allowedInterests.map((interest, idx) => (
              <motion.div
                key={interest}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isFormInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  variant="ghost"
                  className={`px-4 py-2 border transition-all text-sm font-normal ${
                    interests?.includes(interest)
                      ? "border-foreground bg-foreground text-background"
                      : "border-foreground/30 hover:border-foreground/60 bg-transparent"
                  }`}
                >
                  {interest}
                </Button>
              </motion.div>
            ))}
          </div>
          {showCustomInterest && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <Input
                placeholder="Please specify your custom interest*"
                {...register("customInterest")}
                className={`w-full bg-transparent border-0 border-b-2 rounded-none px-0 py-3 text-foreground focus-visible:ring-0 focus-visible:border-foreground transition-all ${
                  errors.customInterest
                    ? "border-destructive"
                    : "border-foreground/30"
                }`}
              />
              {errors.customInterest && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2"
                >
                  <Alert
                    variant="destructive"
                    className="border-0 bg-destructive/10 p-2"
                  >
                    <AlertDescription className="text-xs text-destructive">
                      {errors.customInterest.message}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </motion.div>
          )}
          {errors.interests && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <Alert
                variant="destructive"
                className="border-0 bg-destructive/10 p-2"
              >
                <AlertDescription className="text-xs text-destructive">
                  {errors.interests.message}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-lg md:text-xl font-light mb-6 text-foreground/90">
            Project Budget (USD)
          </h2>
          <div className="flex flex-wrap gap-3 md:gap-4">
            {allowedBudgets.map((b, idx) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isFormInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.4, delay: 0.4 + idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="button"
                  onClick={() => handleBudgetSelect(b)}
                  variant="ghost"
                  className={`px-4 py-2 border transition-all text-sm font-normal ${
                    budget === b
                      ? "border-foreground bg-foreground text-background"
                      : "border-foreground/30 hover:border-foreground/60 bg-transparent"
                  }`}
                >
                  {b}
                </Button>
              </motion.div>
            ))}
          </div>
          {showCustomBudget && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <Input
                placeholder="Please specify your custom budget*"
                {...register("customBudget")}
                className={`w-full bg-transparent border-0 border-b-2 rounded-none px-0 py-3 text-foreground focus-visible:ring-0 focus-visible:border-foreground transition-all ${
                  errors.customBudget
                    ? "border-destructive"
                    : "border-foreground/30"
                }`}
              />
              {errors.customBudget && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2"
                >
                  <Alert
                    variant="destructive"
                    className="border-0 bg-destructive/10 p-2"
                  >
                    <AlertDescription className="text-xs text-destructive">
                      {errors.customBudget.message}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </motion.div>
          )}
          {errors.budget && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <Alert
                variant="destructive"
                className="border-0 bg-destructive/10 p-2"
              >
                <AlertDescription className="text-xs text-destructive">
                  {errors.budget.message}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-lg md:text-xl font-light mb-6 text-foreground/90">
            Project Details
          </h2>
          <Textarea
            {...register("details")}
            placeholder="Tell me about your project, goals, and any specific requirements..."
            className={`w-full bg-transparent border-2 rounded-none px-4 py-4 text-foreground focus-visible:ring-0 focus-visible:border-foreground transition-all min-h-[120px] resize-none ${
              errors.details ? "border-destructive" : "border-foreground/30"
            }`}
          />
          {errors.details && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2"
            >
              <Alert
                variant="destructive"
                className="border-0 bg-destructive/10 p-2"
              >
                <AlertDescription className="text-xs text-destructive">
                  {errors.details.message}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            variant="outline"
            disabled={state.submitting}
            className="w-full py-4 text-base md:text-lg border-2 border-foreground bg-transparent hover:bg-foreground hover:text-background text-foreground font-medium transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {state.submitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="w-5 h-5 border-2 border-current border-t-transparent rounded-full mr-2"
              />
            ) : null}
            {state.submitting ? "Submitting..." : "Send Message"}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
