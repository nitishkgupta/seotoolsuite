"use client";

import { getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorage";
import { addToast, Button, Form, Input, Tooltip } from "@heroui/react";
import { useState } from "react";
import DataForSEO from "@/services/DataForSEO";
import { LockIcon } from "lucide-react";
import Link from "next/link";

export default function SettingsComponent() {
  const [isDFSCredentialsFormLoading, setIsDFSCredentialsFormLoading] =
    useState<boolean>(false);

  const handleDFSCredentialsFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("dfs-username") as string;
    const password = formData.get("dfs-password") as string;

    if (!username || !password) return;

    try {
      setIsDFSCredentialsFormLoading(true);
      const dfsService = new DataForSEO(username, password);
      const apiResponse = await dfsService.getUserData();
      const availableBalance =
        apiResponse?.tasks[0]?.result[0]?.money?.balance ?? 0;

      setLocalStorageItem("DATAFORSEO_USERNAME", username);
      setLocalStorageItem("DATAFORSEO_PASSWORD", password);

      addToast({
        title: "DataForSEO API Connected",
        description: `Available account balance: $${Number(availableBalance).toFixed(2)}`,
        color: "success",
      });
    } catch (error: any) {
      addToast({
        title: "DataForSEO API Error",
        description: error?.response?.data?.status_message
          ? error?.response?.data?.status_message
          : error?.message,
        color: "danger",
      });
    } finally {
      setIsDFSCredentialsFormLoading(false);
    }
  };

  return (
    <div className="settings-page px-4 py-4 md:px-8 md:py-8">
      <div className="w-full rounded-md border-2 border-slate-200 bg-white">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 border-b-2 border-slate-200 px-4 py-3">
            <div className="flex w-full items-center justify-between">
              <h2 className="text-lg font-medium lg:text-2xl">
                DataForSEO API
              </h2>
              <Tooltip content="Your credentials are stored securely on your browser.">
                <div className="flex items-center gap-1 rounded-md border border-green-500 bg-green-50 px-2 py-1 font-medium text-green-600">
                  <LockIcon size={16} />
                  Secured
                </div>
              </Tooltip>
            </div>
          </div>
          <div className="w-full p-4">
            <div className="mb-4">
              Don&apos;t have an account?{" "}
              <Link
                href="https://app.dataforseo.com/?aff=44560"
                target="_blank"
                rel="nofollow"
                className="underline"
              >
                Create one for free!
              </Link>
            </div>
            <Form
              onSubmit={handleDFSCredentialsFormSubmit}
              id="dataforseo-credentials"
              className="flex flex-col gap-2"
            >
              <div className="flex w-full flex-col gap-2 md:flex-row">
                <Input
                  name="dfs-username"
                  variant="flat"
                  type="text"
                  label="API Login"
                  placeholder="test@example.com"
                  defaultValue={
                    getLocalStorageItem("DATAFORSEO_USERNAME") ?? ""
                  }
                  isRequired
                />
                <Input
                  name="dfs-password"
                  variant="flat"
                  type="password"
                  label="API Password"
                  defaultValue={
                    getLocalStorageItem("DATAFORSEO_PASSWORD") ?? ""
                  }
                  placeholder="********"
                  isRequired
                />
              </div>
              <Button
                color="primary"
                variant="flat"
                type="submit"
                size="lg"
                disabled={isDFSCredentialsFormLoading}
                isLoading={isDFSCredentialsFormLoading}
                className="mt-2 w-full shrink-0"
              >
                Save
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
