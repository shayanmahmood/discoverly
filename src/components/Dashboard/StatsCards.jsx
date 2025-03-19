/* eslint-disable react/prop-types */
import React from "react";
import { Card } from "../ui/Card";

const StatsCards = ({
  userEventsCount,
  registeredEventsCount,
  totalAttendees,
  totalRevenue,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 flex flex-col">
        <p className="text-sm font-medium text-muted-foreground">
          Total Events
        </p>
        <p className="text-2xl font-bold">{userEventsCount}</p>
        <p className="text-xs text-muted-foreground mt-1">+2 from last month</p>
      </Card>
      <Card className="p-4 flex flex-col">
        <p className="text-sm font-medium text-muted-foreground">
          Registered Events
        </p>
        <p className="text-2xl font-bold">{registeredEventsCount}</p>
        <p className="text-xs text-muted-foreground mt-1">+1 from last month</p>
      </Card>
      <Card className="p-4 flex flex-col">
        <p className="text-sm font-medium text-muted-foreground">
          Total Attendees
        </p>
        <p className="text-2xl font-bold">{totalAttendees}</p>
        <p className="text-xs text-muted-foreground mt-1">
          +124 from last month
        </p>
      </Card>
      <Card className="p-4 flex flex-col">
        <p className="text-sm font-medium text-muted-foreground">
          Total Revenue
        </p>
        <p className="text-2xl font-bold">{totalRevenue}</p>
        <p className="text-xs text-muted-foreground mt-1">
          +{Math.round(totalRevenue - totalRevenue * 0.7)}  from last month
        </p>
      </Card>
    </div>
  );
};

export default StatsCards;
