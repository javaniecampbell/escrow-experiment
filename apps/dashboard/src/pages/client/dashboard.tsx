import React from "react";
import ClientDashboard from "@/components/dashboard/ClientDashboard";
import { Action } from "@/components/types";
import {
  UsersIcon,
  BeakerIcon,
  CreditCardIcon,
  CogIcon,
  PresentationChartLineIcon,
  UserGroupIcon,
  ReceiptRefundIcon,
} from "@heroicons/react/20/solid";
import { ActionCardList } from "@/components/global/ActionCardList";
type FeatureFlag = { [key: string]: boolean };

interface NavigationResponse {
  hash: string;
  routes: Array<Route>;
}

type Route = {
  iconName?: string | null;
  label: string;
  path: string;
};

const actions = [
  {
    title: "New Project Request",
    href: "/teams",
    icon: UsersIcon,
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
  },
  {
    title: "Upload Project Idea",
    href: "/teams",
    icon: UsersIcon,
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
  },
  {
    title: "Billing",
    href: "/billing",
    icon: CreditCardIcon,
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
  },
  {
    title: "Manage plan",
    href: "#",
    icon: ReceiptRefundIcon,
    iconForeground: "text-rose-700",
    iconBackground: "bg-rose-50",
  },
  {
    title: "Settings",
    href: "/settings",
    // icon: BadgeCheckIcon,
    icon: CogIcon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  // {
  //     title: 'Request time off',
  //     href: '#',
  //     icon: ClockIcon,
  //     iconForeground: 'text-teal-700',
  //     iconBackground: 'bg-teal-50',
  // },

  // {
  //   title: 'Training',
  //   href: '#',
  //   icon: AcademicCapIcon,
  //   iconForeground: 'text-indigo-700',
  //   iconBackground: 'bg-indigo-50',
  // },
];

const getMenuItems = async (accessToken: string): Promise<Action[]> => {
  try {
    const response = await fetch("/api/accessible-menuitems", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    console.log("data", data.routes);
    const actions = (data?.routes as NavigationResponse).routes.map((route) => {
      const action = {
        title: route.label,
        href: route.path,
        icon: UsersIcon,
        description: "",
        iconForeground: "text-sky-700",
        iconBackground: "bg-sky-50",
      } satisfies Action;

      if (route.label.toLowerCase() === "patients") {
        return {
          ...action,
          icon: UsersIcon,
          description: "View and manage patients",
          iconForeground: "text-sky-700",
          iconBackground: "bg-sky-50",
        } as Action;
      }
      if (route.label.toLowerCase() === "test list") {
        return {
          ...action,
          icon: BeakerIcon,
          description: "View and manage test list",
          iconForeground: "text-yellow-700",
          iconBackground: "bg-yellow-50",
        } as Action;
      }

      if (route.label.toLowerCase() === "billing") {
        return {
          ...action,
          icon: CreditCardIcon,
          description: "View and manage billing",
          iconForeground: "text-yellow-700",
          iconBackground: "bg-yellow-50",
        };
      }

      if (route.label.toLowerCase() === "settings") {
        return {
          ...action,
          icon: CogIcon,
          description: "View and edit settings",
          iconForeground: "text-purple-700",
          iconBackground: "bg-purple-50",
        };
      }

      if (route.label.toLowerCase() === "reports") {
        return {
          ...action,
          icon: PresentationChartLineIcon,
          description: "View and generate reports",
          iconForeground: "text-rose-700",
          iconBackground: "bg-rose-50",
        };
      }

      if (route.label.toLowerCase() === "users") {
        return {
          ...action,
          icon: UserGroupIcon,
          description: "View and manage users",
        };
      }

      return action;
    });

    return actions as Action[];
  } catch (error) {
    console.log(error);
    return [];
  }
};

function Dashboard() {
  return (
    <>
      <ClientDashboard />
      <div className="p-4">
        <ActionCardList actions={actions} />
      </div>
    </>
  );
}

export default Dashboard;
