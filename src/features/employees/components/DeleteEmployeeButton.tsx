import { Trash2 } from "lucide-react";
import { useDeleteEmployee } from "../hooks/useDeleteEmployee";
import type { Employee } from "../types/employee.types";

import { Button } from "@/components/ui/button";
import { TText } from "@/shared/components/localization/TText";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
type Props = {
  employee: Employee;
  onDelete?: () => void;
};
export const DeleteEmployeeButton = ({ employee, onDelete }: Props) => {
  const deleteMutation = useDeleteEmployee();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <TText ns="p008" k="delete_title" width={12} />
          </AlertDialogTitle>
          <AlertDialogDescription>
            <TText ns="p008" k="delete_confirm" width={30} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <TText ns="p008" k="cancel" width={8} />
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteMutation.isPending}
            onClick={async (e) => {
              e.preventDefault();

              await deleteMutation.mutateAsync(employee.id);

              onDelete?.();
            }}
          >
            <TText
              ns="p008"
              k={deleteMutation.isPending ? "deleting" : "delete"}
              width={10}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
