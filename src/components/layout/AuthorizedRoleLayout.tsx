import { useRouter } from "next/router";
import { BaseLayout, ProtectedLayoutProps } from "./base-components/BaseLayout";
import { useCallback, useEffect, useState } from "react";

export const AuthorizedRoleLayout = ({
  children,
  type,
  session,
}: ProtectedLayoutProps) => {
  const router = useRouter();
  const authCheck = useCallback(() => {
    if (!session) {
      void router.push("/");
    }
  },[router, session]);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  return <BaseLayout>{children}</BaseLayout>;
};
