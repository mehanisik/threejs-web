import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { ServicesTable } from "@/components/admin/services-table";
import { ServiceForm } from "@/components/forms/service-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createService, deleteService, updateService } from "@/lib/admin";
import { type Service, serviceSchema } from "@/types/admin";

interface ServiceDialogProps {
  services: Service[];
  refreshServices: () => void;
  isLoadingServices: boolean;
}

export const ServiceDialog: React.FC<ServiceDialogProps> = ({
  services,
  refreshServices,
  isLoadingServices,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const serviceForm = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      description: "",
      service_code: "",
      icon_url: "",
      slug: "",
      order_index: 0,
    },
  });

  const handleServiceSubmit = async (data: z.infer<typeof serviceSchema>) => {
    if (editingService) {
      const { error } = await updateService(editingService.id, data);
      if (!error) {
        refreshServices();
        setIsDialogOpen(false);
        setEditingService(null);
        serviceForm.reset();
      }
    } else {
      const { error } = await createService(data);
      if (!error) {
        refreshServices();
        setIsDialogOpen(false);
        serviceForm.reset();
      }
    }
  };
  const handleDeleteService = async (id: string) => {
    const { error } = await deleteService(id);
    if (!error) refreshServices();
  };
  const openEditServiceDialog = (service: Service) => {
    setEditingService(service);
    serviceForm.reset({
      title: service.title,
      description: service.description || "",
      service_code: service.service_code,
      icon_url: service.icon_url || "",
      slug: service.slug || "",
      order_index: service.order_index || 0,
    });
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Services</CardTitle>
          <CardDescription>Manage your service offerings</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingService(null);
                serviceForm.reset();
              }}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingService ? "Edit Service" : "Add New Service"}
              </DialogTitle>
              <DialogDescription>
                Fill in the service details below
              </DialogDescription>
            </DialogHeader>
            <ServiceForm
              form={serviceForm}
              onSubmit={handleServiceSubmit}
              onCancel={() => setIsDialogOpen(false)}
              editingService={editingService}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <ServicesTable
          services={services}
          isLoading={isLoadingServices}
          onEdit={openEditServiceDialog}
          onDelete={handleDeleteService}
        />
      </CardContent>
    </Card>
  );
};
