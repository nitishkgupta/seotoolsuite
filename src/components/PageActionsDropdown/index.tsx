"use client";

import {
  addToast,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/react";
import {
  ClipboardCopyIcon,
  EllipsisIcon,
  ExternalLinkIcon,
  InfoIcon,
  TextSearchIcon,
} from "lucide-react";
import { memo, useCallback } from "react";

const PageActionsDropdown = ({
  pageAddress,
  locationCode,
  languageCode,
  showPageDetailsItem = false,
  onPageDetailsClick,
}: {
  pageAddress: string;
  locationCode: number;
  languageCode: string;
  showPageDetailsItem?: boolean;
  onPageDetailsClick?: () => void;
}) => {
  const handleUrlClipboardCopy = useCallback(async (url: string) => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(url);
      addToast({
        title: "URL copied to clipboard.",
        color: "default",
      });
    }
  }, []);

  return (
    <div className="page-actions-dropdown-container">
      <Dropdown className="border border-b-2 border-slate-200">
        <DropdownTrigger>
          <Button size="sm" isIconOnly variant="flat">
            <EllipsisIcon size={16} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="flat">
          <DropdownSection title="Actions">
            <DropdownItem
              key="url-copy"
              onPress={() => handleUrlClipboardCopy(pageAddress)}
              startContent={<ClipboardCopyIcon size={16} />}
            >
              Copy URL
            </DropdownItem>
            <DropdownItem
              key="page-details"
              onPress={onPageDetailsClick}
              startContent={<InfoIcon size={16} />}
              hidden={!showPageDetailsItem}
            >
              Page Details
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Competitive Research">
            <DropdownItem
              key="page-keywords"
              href={`/tool/competitive-research/keywords?target=${pageAddress}&location_code=${locationCode}&language_code=${languageCode}`}
              target="_blank"
              startContent={<TextSearchIcon size={18} />}
              endContent={
                <ExternalLinkIcon size={14} className="text-black/80" />
              }
            >
              Keywords
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default memo(PageActionsDropdown);
