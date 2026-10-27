# SEOToolSuite Changelog

## v8.0.0

- Added a new **Top Pages** tool. Get the top-performing organic pages of a website.
- Added **Progressive Web App (PWA)** support.
- Added a new **Copy URL** option to the actions dropdown.
- Added a new UI element for indicating **paid competition level** (low, medium, high).
- Updated metric names for better consistency.
- UI improvements and changes for better consistency and design.
- Updated **Reports Tabs** target to the same tab.
- Updated **Cached At Timestamp** for better readability.
- Minor bug fixes.
- Updated packages.

## v7.0.0

- Added a new **Keyword Ideas** tool. Get keyword ideas that are related to the seed keyword.
- Updated the design of **Other Reports**.
- Updated the design of **Keyword Actions Dropdown**.
- Major code refactor and optimization.
- Minor bug fixes.
- Other minor UI changes and fixes.
- Updated packages.

## v6.3.0

- Added new settings to change the default location and language.
- Removed clickstream data from the "Traffic Overview" tool to reduce costs.
- Added "Cached Date" to the tooltips for cached data (only works with new cached data).
- Minor code fixes.
- Updated packages.

## v6.2.0

- Improved the styling of the "DR" column in the "Bulk DR Checker" tool.
- Replaced the "Discord" link with a "Feedback" link in the header.
- Minor UI improvements and fixes.
- Updated packages.

## v6.1.0

- Major UI changes and improvements.
- Use area chart for search volume trend chart instead of bar chart.
- Fix fast refresh not working on tool pages.
- Added example env file for self-deployment.
- Updated packages.

## v6.0.0

- Added a new free "Bulk DR Checker" tool. Check Ahrefs DR for multiple websites at once for free.
- Added pricing (cost calculator) page.
- Added feature pages for each individual tool.
- Added sitemap and robots.txt files.
- Updated homepage.
- Updated README.
- SEO improvements.
- Minor UI improvements and fixes.
- Updated packages.

## v5.2.0

- Added feature to refresh cached data on all tools.
- Updated credits cost according to the new DataForSEO API pricing.
- Responsive UI fixes.
- UI improvements.
- Code optimization and refactor.
- Updated packages.

## v5.1.0

- UI improvements and fixes.
- Moved assets to the public directory.
- SEO metadata improvements.
- Updated packages.

## v5.0.0

- Added a new **Ranked Keywords** tool. Get the keywords that a domain or page ranks for.
- Minor UI and bug fixes.
- Updated packages.

## v4.3.1

- Update packages.

## v4.3.0

- Added **Footer** on all pages.
- Updated the **homepage** and **README** for content improvements and clarity.
- Minor text change for clarity on the **settings** page.
- Updated packages.

## v4.2.0

- Added **Cache Duration** setting for individual tools.
- Added **Max Rows** setting for the **Keyword Suggestions** tool.
- Added **Legends** to **Traffic Overview** tool charts.
- Updated **Umami** event tracking.
- Minor UI improvements and bug fixes.
- Updated packages.

## v4.1.0

- Added an **Other Reports** section to the SEO tools.
- Added a **Credits Cost** badge to the tools that use DataForSEO APIs.
- Added a new **Words** column to the Keyword Suggestions tool DataGrid, which can be toggled via the columns setting.
- Updated **Keyword Quick Actions** in the Keyword Suggestions and Keyword Autocomplete tools.
- Minor UI improvements and bug fixes.
- Updated the homepage with minor content changes.
- Updated the README with minor content changes.
- Updated packages.

## v4.0.0

- Add a new **Traffic Overview** tool. Analyze a website’s organic and paid search performance.
- Update the homepage for the new tool and apply minor UI fixes.
- Add a **Secured** badge element to the **Upstash Redis** section on the settings page.
- Add a new **Discord Server** link to the header and README.
- Change the version badge link in the header from Changelog to Releases.
- Minor UI improvements and bug fixes.
- Code refactoring.
- Update packages.

## v3.0.2

- Update packages.

## v3.0.1

- Disable prefetch for keyword action links.

## v3.0.0

- Restructured into separate tools: Keyword Overview, Keyword Suggestions, and Keyword Autocomplete.
- Major UI improvements and changes.
- Major code refactoring and optimization.
- Added support for auto-submitting tools when URL parameters are present.
- Minor bug fixes.
- Update homepage.
- Update packages.

## v2.1.1

- Update packages.

## v2.1.0

- Added **Tools** page. A central page which lists all available tools.
- Update **HeroUI** theme for UI consistency.
- Fix Umami tracking for Keyword Complete tool.
- Update packages.

## v2.0.0

- Added **Keyword Complete** tool. Generate long-tail keywords for free using Google autocomplete.
- Added more columns in **Keyword Research** tool's DataGrid for filter and export.
- Minor UI improvements and changes.
- Update packages.

## v1.0.5

- Update year in homepage footer.
- Remove year from license.

## v1.0.4

- Minor UI improvements and fixes.
- Update styling of KD (SEO Difficulty) column in DataGrid.
- Homepage UI changes.
- Update packages.

## v1.0.3

- Fix **highTopPageBid** metric tooltip typo.

## v1.0.2

- Added **Low Top of Page Bid** and **High Top of Page Bid** CPC metrics to the keyword research tool.
- Minor UI fixes and changes.
- Update packages.

## v1.0.0

- Added **data caching** support powered by Upstash Redis, allowing users to cache DataForSEO results and reduce unnecessary API costs. Caching is available for keyword suggestions and keyword overview data.
- Update homepage for minor changes.
- Update settings page for UI changes and improvements.
- Update keyword research tool to show status of 'Sandbox Mode' and 'Caching' in UI.
- Other minor UI fixes and changes.

## v0.5.2

- Homepage responsive design fixes.
- Update search intent filter to checkbox from radio.
- Update include/exclude keyword filter to like/not_like.
- Minor UI fixes and changes.

## v0.5.0

- Added "filters" to the keyword research tool, allowing users to refine keyword suggestions using selected criteria.
- Many UI fixes and changes.
- Update packages.

## v0.4.0

- Added a "Keyword Overview" section that provides data for the seed/selected keyword, including clickstream insights.
- Many UI fixes and changes.
- Performance optimisations.

## v0.3.1

- Update packages.

## v0.3.0

- Use environment variable for Umami tracking.
- Add support for DataForSEO sandbox mode in settings and tool.
- Add link to app version in header.

## v0.2.1

- Fix header link corner radius UI issue.
- Add rounding to dataforseo account balance to prevent UI issue.

## v0.2.0

- Added DataForSEO account balance box in header.

## v0.1.0

- Initial release.
