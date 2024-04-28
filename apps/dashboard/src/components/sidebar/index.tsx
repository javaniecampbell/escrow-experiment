import { User, Agency, SubAccount, SidebarOption } from "@/shared/app.types";
import React, { useEffect, useState } from "react";
import MenuOptions from "./menu-options";
import { set } from "date-fns";
import { tracer } from "@/lib/tracing";
import { Attributes } from "@opentelemetry/api";
type Props = {
  id: string;
  type: "agency" | "client" | "subaccount";
};

/**
 * Sidebar component.
 *
 * @param {Object} props - The props.
 * @param {string} props.id - The id.
 * @param {'agency' | 'client' | 'subaccount'} props.type - The type.
 *
 * @returns {Promise<JSX.Element>} The sidebar component.
 */
const Sidebar = ({ id, type }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isWhiteLabeledAgency, setIsWhiteLabeledAgency] = useState(false);
  const [sideBarLogo, setSideBarLogo] = useState<string | null | undefined>(
    null
  );
  const [sidebarOptions, setSidebarOptions] = useState<SidebarOption[]>([]);
  const [agencyDetails, setAgencyDetails] = useState<
    Agency | SubAccount | null
  >(null);
  const [subAccounts, setSubAccounts] = useState<SubAccount[]>([]);

  useEffect(() => {
    const span = tracer.startSpan("Sidebar_Init");
    async function init() {
      const authUser = await getAuthUserDetails();
      if (authUser) {
        span.addEvent("User_Fetched", { user: authUser.role });
        setUser(authUser);
      }

      if (!authUser?.Agency) return;
      span.addEvent("Agency_Fetched", { agency: authUser.Agency.name });
      const details: Agency | SubAccount | undefined =
        type === "agency"
          ? authUser?.Agency
          : authUser?.Agency?.SubAccounts?.find(
              (subaccount) => subaccount.id === id
            );
      span.addEvent("Details_Fetched", { details: details?.name });
      //const isWhiteLabeledAgency = authUser?.Agency?.whiteLabel;
      setIsWhiteLabeledAgency(authUser?.Agency?.whiteLabel);
      if (!details) return;

      let sidebarLogo: string | undefined =
        authUser?.Agency?.agencyLogo ?? "/assets/freelance-escrow-logo.webp";

      if (!isWhiteLabeledAgency) {
        if (type === "subaccount") {
          sidebarLogo =
            authUser?.Agency?.SubAccounts?.find(
              (subaccount) => subaccount.id === id
            )?.subAccountLogo ?? user?.Agency?.agencyLogo;
        }
      }
      span.addEvent("Sidebar_Logo_Fetched", { sidebarLogo });
      setAgencyDetails(details);
      setSideBarLogo(sidebarLogo);

      const tempSidebarOptions =
        type === "agency"
          ? user?.Agency?.SidebarOptions ?? []
          : user?.Agency?.SubAccounts?.find(
              (subaccount) => subaccount.id === id
            )?.SidebarOptions ?? [];
      span.addEvent("Sidebar_Options_Fetched", {
        sidebarOptionsNumber: tempSidebarOptions.length,
      });
      const subaccounts =
        user?.Agency?.SubAccounts?.filter((subaccount) =>
          user?.Permissions?.find(
            (permission) =>
              permission.subAccountId === subaccount.id && permission.access
          )
        ) ?? [];
      span.addEvent("Subaccounts_Fetched", {
        subaccountsNumber: subaccounts.length,
      });

      setSidebarOptions(tempSidebarOptions);
      setSubAccounts(subaccounts);
    }
    init();
    span.end();
  }, [id, isWhiteLabeledAgency, type, user]);

  return (
    <>
      <MenuOptions
        defaultOpen={true}
        subAccounts={subAccounts ?? []}
        sidebarOption={sidebarOptions ?? []}
        sidebarLogo={sideBarLogo ?? ""}
        details={agencyDetails}
        user={user}
        id={id}
      />
      <MenuOptions
        defaultOpen={true}
        subAccounts={subAccounts ?? []}
        sidebarOption={sidebarOptions ?? []}
        sidebarLogo={sideBarLogo ?? ""}
        details={agencyDetails}
        user={user}
        id={id}
      />
    </>
  );
};

/**
 * Exports the Sidebar component as the default export.
 */
export default Sidebar;

function getAuthUserDetails(): Promise<User | null> {
  return Promise.resolve({
    role: "AGENCY_OWNER",
    Permissions: [
      {
        id: "1",
        name: "Dashboard",
        description: "View the dashboard",
        permissions: ["VIEW"],
        subAccountId: "1",
        access: true,
      },
      {
        id: "2",
        name: "Dashboard",
        description: "View the dashboard",
        permissions: ["VIEW"],
        subAccountId: "2",
        access: true,
      },
    ],
    Agency: {
      id: "agency-owner-id",
      name: "DevDaysAtWork",
      whiteLabel: true,

      address: "123 Main St, New York, NY 10001",
      SidebarOptions: [
        {
          id: "1",
          name: "Dashboard",
          icon: "dashboard",
          link: "/dashboard",
          subAccountId: null,
        },
        {
          id: "2",
          name: "Payments",
          icon: "payments",
          link: "/payments",
          subAccountId: null,
        },
        {
          id: "3",
          name: "Settings",
          icon: "settings",
          link: "/settings",
          subAccountId: null,
        },
      ],
      agencyLogo: "/assets/freelance-escrow-logo-v2.webp",
      SubAccounts: [
        {
          id: "1",
          name: "Subaccount 1",
          subAccountLogo: "/assets/freelance-escrow-logo-v4.webp",
          agencyId: "1",
          address: "123 Main St, New York, NY 10001",
          connectAccountId: null,
        },
        {
          id: "2",
          name: "Subaccount 2",
          subAccountLogo: "/assets/freelance-escrow-logo-v5.webp",
          agencyId: "1",
          address: "123 Main St, New York, NY 10001",
          connectAccountId: null,
        },
      ],
    },
  } satisfies User);
}
