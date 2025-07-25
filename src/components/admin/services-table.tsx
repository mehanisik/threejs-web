import { Edit, Trash2 } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Service } from "@/types/admin";

interface ServicesTableProps {
  services: Service[];
  isLoading: boolean;
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
}

export const ServicesTable: React.FC<ServicesTableProps> = ({
  services,
  isLoading,
  onEdit,
  onDelete,
}) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Title</TableHead>
        <TableHead>Service Code</TableHead>
        <TableHead>Slug</TableHead>
        <TableHead>Order</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {isLoading && (
        <TableRow>
          <TableCell colSpan={5} className="text-center">
            Loading...
          </TableCell>
        </TableRow>
      )}
      {!isLoading && services?.length === 0 && (
        <TableRow>
          <TableCell colSpan={5} className="text-center">
            No services found.
          </TableCell>
        </TableRow>
      )}
      {services?.map((service) => (
        <TableRow key={service.id}>
          <TableCell className="font-medium">{service.title}</TableCell>
          <TableCell>{service.service_code}</TableCell>
          <TableCell>{service.slug}</TableCell>
          <TableCell>{service.order_index}</TableCell>
          <TableCell>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(service)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(service.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
