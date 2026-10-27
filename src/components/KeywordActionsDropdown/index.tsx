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
  BookOpenTextIcon,
  ClipboardCopyIcon,
  EllipsisIcon,
  ExternalLinkIcon,
  InfoIcon,
  LightbulbIcon,
  LoaderPinwheelIcon,
  TextSearchIcon,
} from "lucide-react";
import { memo, useCallback } from "react";

const KeywordActionsDropdown = ({
  keyword,
  target,
  locationCode,
  languageCode,
  showKeywordDetailsItem = false,
  onKeywordDetailsClick,
}: {
  keyword: string;
  target?: string;
  locationCode: number;
  languageCode: string;
  showKeywordDetailsItem?: boolean;
  onKeywordDetailsClick?: () => void;
}) => {
  const handleKeywordClipboardCopy = useCallback(async (keyword: string) => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(keyword);
      addToast({
        title: "Keyword copied to clipboard.",
        color: "default",
      });
    }
  }, []);

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
    <div className="keyword-actions-dropdown-container">
      <Dropdown className="border border-b-2 border-slate-200">
        <DropdownTrigger>
          <Button size="sm" isIconOnly variant="flat">
            <EllipsisIcon size={16} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="flat">
          <DropdownSection title="Actions">
            <DropdownItem
              key="keyword-copy"
              onPress={() => handleKeywordClipboardCopy(keyword)}
              startContent={<ClipboardCopyIcon size={16} />}
            >
              Copy Keyword
            </DropdownItem>
            <DropdownItem
              key="url-copy"
              hidden={!target}
              onPress={() => handleUrlClipboardCopy(target ?? "")}
              startContent={<ClipboardCopyIcon size={16} />}
            >
              Copy URL
            </DropdownItem>
            <DropdownItem
              key="keyword-details"
              onPress={onKeywordDetailsClick}
              startContent={<InfoIcon size={16} />}
              hidden={!showKeywordDetailsItem}
            >
              Keyword Details
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Keyword Research">
            <DropdownItem
              key="keyword-overview"
              href={`/tool/keyword-research/overview?keyword=${keyword}&location_code=${locationCode}&language_code=${languageCode}`}
              target="_blank"
              startContent={<BookOpenTextIcon size={16} />}
              endContent={
                <ExternalLinkIcon size={14} className="text-black/80" />
              }
            >
              Overview
            </DropdownItem>
            <DropdownItem
              key="keyword-suggestions"
              href={`/tool/keyword-research/suggestions?keyword=${keyword}&location_code=${locationCode}&language_code=${languageCode}`}
              target="_blank"
              startContent={<TextSearchIcon size={18} />}
              endContent={
                <ExternalLinkIcon size={14} className="text-black/80" />
              }
            >
              Suggestions
            </DropdownItem>
            <DropdownItem
              key="keyword-ideas"
              href={`/tool/keyword-research/ideas?keyword=${keyword}&location_code=${locationCode}&language_code=${languageCode}`}
              target="_blank"
              startContent={<LightbulbIcon size={18} />}
              endContent={
                <ExternalLinkIcon size={14} className="text-black/80" />
              }
            >
              Ideas
            </DropdownItem>
            <DropdownItem
              key="keyword-autocomplete"
              href={`/tool/keyword-research/autocomplete?keyword=${keyword}&location_code=${locationCode}&language_code=${languageCode}`}
              target="_blank"
              startContent={<LoaderPinwheelIcon size={16} />}
              endContent={
                <ExternalLinkIcon size={14} className="text-black/80" />
              }
            >
              Autocomplete
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Competitive Research" hidden={!target}>
            <DropdownItem
              key="ranked-keywords"
              href={`/tool/competitive-research/keywords?target=${target}&location_code=${locationCode}&language_code=${languageCode}`}
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

export default memo(KeywordActionsDropdown);
