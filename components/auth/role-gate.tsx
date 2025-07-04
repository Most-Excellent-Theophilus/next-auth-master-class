"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "../form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

const RoleGate = ({ allowedRole, children }: RoleGateProps) => {
  const role = useCurrentRole();
  if (role !== allowedRole) {
    return (
      <FormError message="You do not have permission to interact with this resource!" />
    );
  }

  return <>{children}</>;
};

export default RoleGate;
