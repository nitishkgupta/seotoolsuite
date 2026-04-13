"use client";

import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/localStorage";
import {
  Accordion,
  AccordionItem,
  addToast,
  Button,
  Form,
  Input,
  Slider,
  Switch,
  Tooltip,
} from "@heroui/react";
import { memo, useCallback, useEffect, useState } from "react";
import DataForSEO from "@/services/DataForSEO";
import {
  BinocularsIcon,
  BookOpenTextIcon,
  BoxIcon,
  DatabaseIcon,
  DatabaseZapIcon,
  LifeBuoyIcon,
  LockIcon,
  Rows4Icon,
  TelescopeIcon,
  TextSearchIcon,
  ToolCaseIcon,
} from "lucide-react";
import Link from "next/link";
import useDFSBalance from "@/hooks/useDFSBalance";

function SettingsComponent() {
  const { refreshDFSBalance } = useDFSBalance(false);
  const [dfsSandboxEnabled, setDFSSandboxEnabled] = useState<boolean>(false);
  const [cachingEnabled, setCachingEnabled] = useState<boolean>(false);

  const [KWOverviewCachingDuration, setKWOverviewCachingDuration] =
    useState<number>(30);
  const [KWSuggestionsCachingDuration, setKWSuggestionsCachingDuration] =
    useState<number>(30);
  const [KWSuggestionsMaxRows, setKWSuggestionsMaxRows] = useState<number>(250);
  const [TrafficOverviewCachingDuration, setTrafficOverviewCachingDuration] =
    useState<number>(30);

  const [dfsTutorialShown, setDFSTutorialShown] = useState<boolean>(false);
  const [upstashTutorialShown, setUpstashTutorialShown] =
    useState<boolean>(false);

  const [isDFSCredentialsFormLoading, setIsDFSCredentialsFormLoading] =
    useState<boolean>(false);

  const handleDFSCredentialsFormSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>,
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

      window.setTimeout(() => {
        refreshDFSBalance();
      }, 500);
    } catch (error: any) {
      console.error(error);
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

  const handleDFSSandboxChange = useCallback((enabled: boolean) => {
    setDFSSandboxEnabled(enabled);
    if (enabled) {
      setLocalStorageItem("DATAFORSEO_SANDBOX", "true");
    } else {
      removeLocalStorageItem("DATAFORSEO_SANDBOX");
    }
  }, []);

  const handleUpstashCredentialsFormSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const restURL = formData.get("rest-url") as string;
    const restToken = formData.get("rest-token") as string;

    if (!restURL || !restToken) return;

    setLocalStorageItem("UPSTASH_REDIS_REST_URL", restURL);
    setLocalStorageItem("UPSTASH_REDIS_REST_TOKEN", restToken);

    addToast({
      title: "Credentials Updated",
      color: "success",
    });
  };

  const handleCachingEnabledChange = useCallback((enabled: boolean) => {
    setCachingEnabled(enabled);
    if (enabled) {
      setLocalStorageItem("CACHING_ENABLED", "true");
    } else {
      setUpstashTutorialShown(false);
      removeLocalStorageItem("CACHING_ENABLED");
    }
  }, []);

  const handleKWOverviewCachingDurationChange = useCallback(
    (duration: number | number[]) => {
      if (typeof duration === "number") {
        setKWOverviewCachingDuration(duration);
        setLocalStorageItem(
          "KW_OVERVIEW_CACHING_DURATION",
          duration.toString(),
        );
      }
    },
    [],
  );

  const handleKWSuggestionsCachingDurationChange = useCallback(
    (duration: number | number[]) => {
      if (typeof duration === "number") {
        setKWSuggestionsCachingDuration(duration);
        setLocalStorageItem(
          "KW_SUGGESTIONS_CACHING_DURATION",
          duration.toString(),
        );
      }
    },
    [],
  );

  const handleTrafficOverviewCachingDurationChange = useCallback(
    (duration: number | number[]) => {
      if (typeof duration === "number") {
        setTrafficOverviewCachingDuration(duration);
        setLocalStorageItem(
          "TRAFFIC_OVERVIEW_CACHING_DURATION",
          duration.toString(),
        );
      }
    },
    [],
  );

  const handleKWSuggestionsMaxRowsChange = useCallback(
    (rows: number | number[]) => {
      if (typeof rows === "number") {
        setKWSuggestionsMaxRows(rows);
        setLocalStorageItem("KW_SUGGESTIONS_MAX_ROWS", rows.toString());
      }
    },
    [],
  );

  useEffect(() => {
    setDFSSandboxEnabled(getLocalStorageItem("DATAFORSEO_SANDBOX") === "true");
    setCachingEnabled(getLocalStorageItem("CACHING_ENABLED") === "true");
    setKWOverviewCachingDuration(
      Number(getLocalStorageItem("KW_OVERVIEW_CACHING_DURATION") ?? 30),
    );
    setKWSuggestionsCachingDuration(
      Number(getLocalStorageItem("KW_SUGGESTIONS_CACHING_DURATION") ?? 30),
    );
    setTrafficOverviewCachingDuration(
      Number(getLocalStorageItem("TRAFFIC_OVERVIEW_CACHING_DURATION") ?? 30),
    );
    setKWSuggestionsMaxRows(
      Number(getLocalStorageItem("KW_SUGGESTIONS_MAX_ROWS") ?? 250),
    );
  }, []);

  return (
    <div className="settings-page px-4 py-4 md:px-8 md:py-8">
      <h1 className="mb-4 w-fit text-2xl font-semibold text-sky-950 md:mb-8 md:text-4xl">
        Settings
      </h1>
      <div className="w-full rounded-md border-2 border-slate-200 bg-white">
        <div className="flex flex-col">
          <div
            className={`flex items-center gap-2 border-b-2 border-slate-200 px-4 py-3`}
          >
            <div className="flex w-full flex-wrap items-center justify-between gap-4">
              <h2 className="flex items-center gap-2 text-lg font-medium lg:text-2xl">
                <ToolCaseIcon size={24} />
                SEO Tools
              </h2>
            </div>
          </div>
          <div className={`w-full p-4`}>
            <Accordion
              variant="bordered"
              selectionMode="multiple"
              className="border-slate-200"
            >
              <AccordionItem
                key="keyword-overview"
                aria-label="Keyword Overview"
                title={
                  <span className="text-base md:text-lg">Keyword Overview</span>
                }
                startContent={
                  <div className="flex items-center gap-1.5">
                    <TelescopeIcon className="w-5" />
                    <div className="h-4 w-0.5 bg-black"></div>
                    <BookOpenTextIcon className="w-4" />
                  </div>
                }
              >
                <div className="flex flex-col gap-2 pb-2">
                  <div className="px-2">
                    <div className="flex items-center gap-1.5">
                      <DatabaseZapIcon size={16} />
                      <div className="text-sm md:text-base">Cache Duration</div>
                    </div>
                    <div className="mt-2.5 px-4">
                      <Slider
                        value={KWOverviewCachingDuration}
                        onChange={handleKWOverviewCachingDurationChange}
                        minValue={0}
                        maxValue={365}
                        step={1}
                        showTooltip
                        label="Days"
                        size="sm"
                      ></Slider>
                    </div>
                  </div>
                </div>
              </AccordionItem>
              <AccordionItem
                key="keyword-suggestions"
                aria-label="Keyword Suggestions"
                title={
                  <span className="text-base md:text-lg">
                    Keyword Suggestions
                  </span>
                }
                startContent={
                  <div className="flex items-center gap-1.5">
                    <TelescopeIcon className="w-5" />
                    <div className="h-4 w-0.5 bg-black"></div>
                    <TextSearchIcon className="w-4" />
                  </div>
                }
              >
                <div className="flex flex-col gap-2 pb-2">
                  <div className="px-2">
                    <div className="flex items-center gap-1.5">
                      <Rows4Icon size={16} />
                      <div className="text-sm md:text-base">
                        Max. Rows Per Page
                      </div>
                    </div>
                    <div className="mt-2.5 px-4">
                      <Slider
                        value={KWSuggestionsMaxRows}
                        onChange={handleKWSuggestionsMaxRowsChange}
                        minValue={1}
                        maxValue={1000}
                        step={1}
                        showTooltip
                        label="Rows"
                        size="sm"
                      ></Slider>
                    </div>
                  </div>
                  <div className="px-2">
                    <div className="flex items-center gap-1.5">
                      <DatabaseZapIcon size={16} />
                      <div className="text-sm md:text-base">Cache Duration</div>
                    </div>
                    <div className="mt-2.5 px-4">
                      <Slider
                        value={KWSuggestionsCachingDuration}
                        onChange={handleKWSuggestionsCachingDurationChange}
                        minValue={0}
                        maxValue={365}
                        step={1}
                        showTooltip
                        label="Days"
                        size="sm"
                      ></Slider>
                    </div>
                  </div>
                </div>
              </AccordionItem>
              <AccordionItem
                key="traffic-overview"
                aria-label="Traffic Overview"
                title={
                  <span className="text-base md:text-lg">Traffic Overview</span>
                }
                startContent={
                  <div className="flex items-center gap-1.5">
                    <BinocularsIcon className="w-5 scale-90" />
                    <div className="h-4 w-0.5 bg-black"></div>
                    <BookOpenTextIcon className="w-4" />
                  </div>
                }
              >
                <div className="flex flex-col gap-2 pb-2">
                  <div className="px-2">
                    <div className="flex items-center gap-1.5">
                      <DatabaseZapIcon size={16} />
                      <div className="text-sm md:text-base">Cache Duration</div>
                    </div>
                    <div className="mt-2.5 px-4">
                      <Slider
                        value={TrafficOverviewCachingDuration}
                        onChange={handleTrafficOverviewCachingDurationChange}
                        minValue={0}
                        maxValue={365}
                        step={1}
                        showTooltip
                        label="Days"
                        size="sm"
                      ></Slider>
                    </div>
                  </div>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      <div className="mt-4 w-full rounded-md border-2 border-slate-200 bg-white">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 border-b-2 border-slate-200 px-4 py-3">
            <div className="flex w-full flex-wrap items-center justify-between gap-4">
              <h2 className="flex items-center gap-2 text-lg font-medium lg:text-2xl">
                <DatabaseIcon size={24} />
                DataForSEO API
              </h2>
              <div className="flex items-center gap-2">
                <Tooltip content="Tutorial">
                  <button
                    onClick={() => setDFSTutorialShown(!dfsTutorialShown)}
                    className={`cursor-pointer rounded-md border-2 border-slate-200 bg-white p-2 transition hover:bg-slate-50 ${dfsTutorialShown ? "bg-slate-200!" : ""}`}
                  >
                    <LifeBuoyIcon size={20} />
                  </button>
                </Tooltip>
                <Tooltip content="Your credentials are stored securely on your browser.">
                  <div className="flex items-center gap-1 rounded-md border border-green-500 bg-green-50 px-2 py-1 font-medium text-green-600">
                    <LockIcon size={16} />
                    Secured
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="w-full p-4">
            <div
              className={`mb-6 w-full rounded-md border-2 border-slate-200 bg-slate-50/50 p-4 ${!dfsTutorialShown ? "hidden" : ""}`}
            >
              <h3 className="flex items-center gap-1 text-lg font-medium md:text-xl">
                <LifeBuoyIcon size={20} />
                DataForSEO Tutorial
              </h3>
              <div className="mt-4 flex flex-col gap-1 px-2">
                <h4 className="text-sm md:text-base">
                  1. Get started by creating a{" "}
                  <Link
                    href="https://app.dataforseo.com/?aff=44560"
                    target="_blank"
                    rel="nofollow"
                    className="underline"
                  >
                    free account
                  </Link>
                  .
                </h4>
                <h4 className="text-sm md:text-base">
                  2. After verifying email, go to the dashboard.
                </h4>
                <h4 className="text-sm md:text-base">
                  3. Click on &apos;API Access&apos; from the header or sidebar.
                </h4>
                <h4 className="text-sm md:text-base">
                  4. Get your API credentials (API login and API password).
                </h4>
                <h4 className="text-sm md:text-base">
                  5. Add your API credentials to the form below and click save.
                  If you credentials are correct, you will get a success alert,
                  and your balance will be shown in the header.
                </h4>
                <h4 className="text-sm md:text-base">
                  6. You can now start using the SEO tools which require
                  DataForSEO API.
                </h4>
                <span className="mt-2 text-sm md:text-base">
                  <b className="font-medium">Recommended:</b> It is recommended
                  to set-up and use the caching service, to cache data and avoid
                  unnecessary costs.
                </span>
                <span className="text-sm md:text-base">
                  <b className="font-medium">Optional:</b> If you want to just
                  test the API, you can use the sandbox mode (no charges, dummy
                  data).
                </span>
              </div>
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
            <div className="mt-4">
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
            <Tooltip content="Turn on the API sandbox mode to use free, dummy data. Ideal for testing and development.">
              <div className="mt-6 flex w-fit items-stretch rounded-md border-2 border-slate-200">
                <div className="border-r-2 border-slate-200 p-2">
                  <BoxIcon size={22} />
                </div>
                <div className="flex items-center px-2">
                  <Switch
                    isSelected={dfsSandboxEnabled}
                    onValueChange={handleDFSSandboxChange}
                    size="sm"
                  >
                    Sandbox Mode
                  </Switch>
                </div>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="mt-4 w-full rounded-md border-2 border-slate-200 bg-white">
        <div className="flex flex-col">
          <div
            className={`flex items-center gap-2 border-slate-200 px-4 py-3 ${cachingEnabled ? "border-b-2" : ""}`}
          >
            <div className="flex w-full flex-wrap items-center justify-between gap-4">
              <h2 className="flex items-center gap-2 text-lg font-medium lg:text-2xl">
                <DatabaseZapIcon size={24} />
                Upstash Redis (Caching)
              </h2>
              <div className="flex items-center gap-2">
                <Tooltip content="Tutorial">
                  <button
                    onClick={() => {
                      handleCachingEnabledChange(true);
                      setUpstashTutorialShown(!upstashTutorialShown);
                    }}
                    className={`cursor-pointer rounded-md border-2 border-slate-200 bg-white p-2 transition hover:bg-slate-50 ${upstashTutorialShown ? "bg-slate-200!" : ""}`}
                  >
                    <LifeBuoyIcon size={20} />
                  </button>
                </Tooltip>
                <Tooltip content="Your credentials are stored securely on your browser.">
                  <div className="flex items-center gap-1 rounded-md border border-green-500 bg-green-50 px-2 py-1 font-medium text-green-600">
                    <LockIcon size={16} />
                    Secured
                  </div>
                </Tooltip>
                <Switch
                  isSelected={cachingEnabled}
                  onValueChange={handleCachingEnabledChange}
                  aria-label="Enable caching"
                ></Switch>
              </div>
            </div>
          </div>
          <div className={`w-full p-4 ${!cachingEnabled ? "hidden" : ""}`}>
            <div
              className={`mb-6 w-full rounded-md border-2 border-slate-200 bg-slate-50/50 p-4 ${!upstashTutorialShown ? "hidden" : ""}`}
            >
              <h3 className="flex items-center gap-1 text-lg font-medium md:text-xl">
                <LifeBuoyIcon size={20} />
                Upstash Redis Tutorial
              </h3>
              <div className="mt-4 flex flex-col gap-1 px-2">
                <h4 className="text-sm md:text-base">
                  1. Get started by creating a{" "}
                  <Link
                    href="https://console.upstash.com/"
                    target="_blank"
                    rel="nofollow"
                    className="underline"
                  >
                    free account
                  </Link>
                  .
                </h4>
                <h4 className="text-sm md:text-base">
                  2. After verifying email, go to the dashboard.
                </h4>
                <h4 className="text-sm md:text-base">
                  3. Click on &apos;Redis&apos; tab in the header. After that,
                  click on &apos;Create Database&apos; button.
                </h4>
                <h4 className="text-sm md:text-base">
                  4. Name the database anything (ex: SEOToolSuite).
                </h4>
                <h4 className="text-sm md:text-base">
                  5. Select primary region closest to your location (for optimal
                  performance).
                </h4>
                <h4 className="text-sm md:text-base">
                  6. Enable &apos;Eviction&apos; to auto-delete old cache once
                  storage is full.
                </h4>
                <h4 className="text-sm md:text-base">
                  7. Click &apos;Next&apos; and select the free plan.
                </h4>
                <h4 className="text-sm md:text-base">
                  8. Click &apos;Create&apos; to create the free Redis database
                  instance.
                </h4>
                <h4 className="text-sm md:text-base">
                  9. Once the database is created, go to the database details
                  and get the &apos;UPSTASH_REDIS_REST_URL&apos; and
                  &apos;UPSTASH_REDIS_REST_TOKEN&apos; from the
                  &apos;Connect&apos; section.
                </h4>
                <h4 className="text-sm md:text-base">
                  10. Add your credentials to the form below and click save.
                </h4>
                <h4 className="text-sm md:text-base">
                  11. Enable caching to start caching the DataForSEO data.
                </h4>
                <span className="mt-2 text-sm md:text-base">
                  <b className="font-medium">Optional:</b> You can change the
                  caching duration as per your needs.
                </span>
              </div>
            </div>
            <div className="mb-4">
              Use Upstash&apos;s Redis service to cache DataForSEO data and
              avoid unnecessary costs.
            </div>
            <Form
              onSubmit={handleUpstashCredentialsFormSubmit}
              id="upstash-credentials"
              className="flex flex-col gap-2"
            >
              <div className="flex w-full flex-col gap-2 md:flex-row">
                <Input
                  name="rest-url"
                  variant="flat"
                  type="text"
                  label="Redis REST URL"
                  placeholder="https://xxxxxxxx.upstash.io"
                  defaultValue={
                    getLocalStorageItem("UPSTASH_REDIS_REST_URL") ?? ""
                  }
                  isRequired
                />
                <Input
                  name="rest-token"
                  variant="flat"
                  type="password"
                  label="Redis REST Token"
                  defaultValue={
                    getLocalStorageItem("UPSTASH_REDIS_REST_TOKEN") ?? ""
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
                className="mt-2 w-full shrink-0"
              >
                Save
              </Button>
            </Form>
            <div className="mt-4">
              Don&apos;t have an account?{" "}
              <Link
                href="https://console.upstash.com/"
                target="_blank"
                rel="nofollow"
                className="underline"
              >
                Create one for free!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(SettingsComponent);
