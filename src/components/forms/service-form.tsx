import { Save, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useZodForm } from "@/hooks/use-zod-form";
import type { ServiceRecord } from "@/types/admin";

const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  service_code: z.string().min(1, "Service code is required"),
});

type ServiceForm = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  editingService?: ServiceRecord | null;
  onSave: () => void;
  onCancel: () => void;
  handleSave?: (
    data: Partial<ServiceRecord>,
    isEditing: boolean,
  ) => Promise<{ success: boolean; error?: string }>;
}

export function ServiceForm({
  editingService,
  onSave,
  onCancel,
  handleSave,
}: ServiceFormProps) {
  const [saving, setSaving] = useState(false);

  const { form, resetForm } = useZodForm(serviceSchema, {
    defaultValues: {
      title: editingService?.title || "",
      description: editingService?.description || "",
      service_code: editingService?.service_code || "",
    },
  });

  useEffect(() => {
    if (editingService) {
      resetForm({
        title: editingService.title || "",
        description: editingService.description || "",
        service_code: editingService.service_code || "",
      });
      console.log("Form reset with service:", editingService.title);
    } else {
      resetForm({
        title: "",
        description: "",
        service_code: "",
      });
    }
  }, [editingService, resetForm]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const handleServiceSave = useCallback(
    async (data: ServiceForm) => {
      try {
        setSaving(true);

        const serviceData = {
          title: data.title,
          description: data.description || null,
          service_code: data.service_code,
        };

        if (handleSave) {
          const { success, error } = await handleSave(
            serviceData,
            !!editingService,
          );

          if (!success) {
            throw new Error(error || "Failed to save service");
          }
        }

        reset();
        onSave();
      } catch (error: any) {
        throw new Error(error.message || "Failed to save service");
      } finally {
        setSaving(false);
      }
    },
    [editingService, reset, onSave, handleSave],
  );

  return (
    <form onSubmit={handleSubmit(handleServiceSave)} className="space-y-6 mt-6">
      <div className="space-y-2">
        <label
          htmlFor="service-title"
          className="text-sm font-medium text-foreground"
        >
          Service Title*
        </label>
        <Input
          id="service-title"
          placeholder="Enter service title"
          {...register("title")}
          className="h-10 border-foreground/20 focus-visible:border-foreground/60"
        />
        {errors.title && (
          <Alert
            variant="destructive"
            className="border-0 bg-destructive/5 p-3"
          >
            <AlertDescription className="text-sm">
              {errors.title.message}
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="service-code"
          className="text-sm font-medium text-foreground"
        >
          Service Code*
        </label>
        <Input
          id="service-code"
          placeholder="Enter service code (e.g. web-development)"
          {...register("service_code")}
          className="h-10 border-foreground/20 focus-visible:border-foreground/60"
        />
        {errors.service_code && (
          <Alert
            variant="destructive"
            className="border-0 bg-destructive/5 p-3"
          >
            <AlertDescription className="text-sm">
              {errors.service_code.message}
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="service-description"
          className="text-sm font-medium text-foreground"
        >
          Description
        </label>
        <Textarea
          id="service-description"
          placeholder="Enter service description"
          {...register("description")}
          className="min-h-32 border-foreground/20 focus-visible:border-foreground/60"
        />
      </div>

      <div className="flex gap-4 pt-6 border-t border-foreground/10">
        <Button
          type="submit"
          disabled={isSubmitting || saving}
          size="lg"
          className="border border-foreground/20 bg-transparent hover:bg-foreground hover:text-background text-foreground px-8"
        >
          <Save className="w-4 h-4 mr-2" />
          {(() => {
            if (isSubmitting || saving) {
              return editingService ? "Updating..." : "Saving...";
            }
            return editingService ? "Update Service" : "Save Service";
          })()}
        </Button>

        <Button
          type="button"
          onClick={onCancel}
          variant="ghost"
          size="lg"
          className="border border-foreground/20 hover:border-foreground/40 px-8"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>
    </form>
  );
}
