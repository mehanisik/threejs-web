import type React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { imageSchema, Project, Service } from "@/types/admin.types";

interface ImageFormProps {
  form: UseFormReturn<z.infer<typeof imageSchema>>;
  onSubmit: (data: z.infer<typeof imageSchema>) => void;
  onCancel: () => void;
  projects: Project[];
  services: Service[];
  uploading?: boolean;
  hasFiles?: boolean;
}

export const ImageForm: React.FC<ImageFormProps> = ({
  form,
  onSubmit,
  onCancel,
  projects,
  services,
  uploading = false,
  hasFiles = false,
}) => (
  <Form {...form}>
    <form
      onSubmit={(e) => {
        console.log("Form submit event triggered");
        console.log("Form values:", form.getValues());
        console.log("Form errors:", form.formState.errors);
        form.handleSubmit(onSubmit)(e);
      }}
      className="space-y-4"
    >
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select image type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="portrait">Portrait</SelectItem>
                <SelectItem value="project">Project</SelectItem>
                <SelectItem value="cover">Cover</SelectItem>
                <SelectItem value="preview">Preview</SelectItem>
                <SelectItem value="services">Service</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="project_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project (Optional)</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {projects?.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="service_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Service (Optional)</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {services?.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={uploading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={uploading || !hasFiles}
          onClick={() => {
            console.log("Upload button clicked!");
            console.log("Button disabled?", uploading || !hasFiles);
            console.log("Has files?", hasFiles);
            console.log("Uploading?", uploading);
          }}
        >
          {uploading ? "Uploading..." : "Upload Files"}
        </Button>
      </div>
    </form>
  </Form>
);
