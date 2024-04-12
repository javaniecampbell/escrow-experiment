import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const AgencyPage = async () => {
  const authUser = currentUser();
  if (!authUser) {
    return redirect("/login");
  }

  //   get user data from the database or API
  //   const user = await getUser(authUser.id);
  return <div>AgencyPage</div>;
};

export default AgencyPage;
