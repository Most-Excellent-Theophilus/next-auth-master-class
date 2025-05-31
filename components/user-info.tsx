import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-xl font-semibold text-center">🖥️ {label}</p>
      </CardHeader>
      <CardContent className="space-y-4 ">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm">ID</p>
          <p className="truncate text-xs mx-w-[180px] font-mono bg-slate-100 rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm">Name</p>
          <p className="truncate text-xs mx-w-[180px] font-mono bg-slate-100 rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm">Email</p>
          <p className="truncate text-xs mx-w-[180px] font-mono bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm">Role</p>
          <p className="truncate text-xs mx-w-[180px] font-mono bg-slate-100 rounded-md">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm">Two factor Enabled</p>
          <p className="truncate text-xs mx-w-[180px] font-mono bg-slate-100 rounded-md">
            <Badge
              variant={user?.isTwoFactorEnabled ? "success" : "destructive"}
            >
              {user?.isTwoFactorEnabled ? "ON" : "OFF"}
            </Badge>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
