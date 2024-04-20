import { User, Agency, SubAccount, SidebarOption } from "@/shared/app.types";
import React, { useEffect, useState } from "react";
import MenuOptions from "./menu-options";
import { set } from "date-fns";

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
    async function init() {
      const authUser = await getAuthUserDetails();
      if (authUser) {
        setUser(authUser);
      }

      if (!authUser?.Agency) return;

      const details: Agency | SubAccount | undefined =
        type === "agency"
          ? authUser?.Agency
          : authUser?.Agency?.SubAccounts?.find(
              (subaccount) => subaccount.id === id
            );
      const isWhiteLabeledAgency = authUser?.Agency?.whiteLabel;
      setIsWhiteLabeledAgency(isWhiteLabeledAgency);
      if (!details) return;

      let sidebarLogo: string | undefined =
        authUser?.Agency?.agencyLogo || "/assets/freelance-escrow-logo.webp";

      if (!isWhiteLabeledAgency) {
        if (type === "subaccount") {
          sidebarLogo =
            authUser?.Agency?.SubAccounts?.find(
              (subaccount) => subaccount.id === id
            )?.subAccountLogo ?? user?.Agency?.agencyLogo;
        }
      }
      setAgencyDetails(details);
      setSideBarLogo(sidebarLogo);

      const tempSidebarOptions =
        type === "agency"
          ? user?.Agency?.SidebarOptions ?? []
          : user?.Agency?.SubAccounts?.find(
              (subaccount) => subaccount.id === id
            )?.SidebarOptions ?? [];

      const subaccounts =
        user?.Agency?.SubAccounts?.filter((subaccount) =>
          user?.Permissions?.find(
            (permission) =>
              permission.subAccountId === subaccount.id && permission.access
          )
        ) ?? [];

      setSidebarOptions(tempSidebarOptions);
      setSubAccounts(subaccounts);
    }
    init();
  }, [id, type, user]);

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
    Agency: {
      whiteLabel: true,
      address: "",
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
          connectAccountId: null,
        },
        {
          id: "2",
          name: "Subaccount 2",
          subAccountLogo: "/assets/freelance-escrow-logo-v5.webp",
          agencyId: "1",
          connectAccountId: null,
        },
      ],
    },
  } satisfies User);
}
