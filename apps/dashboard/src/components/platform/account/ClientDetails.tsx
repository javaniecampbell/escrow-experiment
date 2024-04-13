import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function ClientDetails() {
  return (
    <div className="flex flex-col gap-3 jus">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-md font-semibold">Company Name</h3>
          <p className="text-gray-500 text-xs">Technology Company</p>
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="space-y-1">
        {/* Address */}
        <p className="text-gray-500 text-xs">Anytown, USA</p>
        <p className="text-gray-500 text-xs">Last Active: 2 days ago</p>
        {/* <time className="text-gray-500 text-xs" dateTime="2021-01-01">
              Joined: January 1, 2021
            </time> */}
        <p className="text-gray-500 text-xs">4.7/5</p>
      </div>
    </div>
  );
}
