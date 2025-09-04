# Release Notes

## v1.7.0 - 2025-08-29

This release introduces multi-language support, making the extension more accessible to a wider audience.

### Added

* **Multi-Language Support:** The extension now fully supports English (en) and Brazilian Portuguese (pt-BR). It will automatically display in the user's browser language.

### Changed

* Refactored the UI (`popup.html` and `popup.js`) to use Chrome's native i18n API for all user-facing strings, ensuring efficient and seamless translation.

---

## v1.6.0 - 2025-08-29

This release added a powerful link and QR code generation suite to the extension's popup.

### Added

* **Link Generator:** Users can now create shareable links with optional pre-filled text.
* **QR Code Generation:** Instantly generate a scannable QR code for any created link.
* **QR Code Actions:** Added buttons to **Download** the QR code as a PNG image or **Share** it using the native Web Share API.

### Fixed

* The link generator now correctly uses the selected "Open with" (App vs. Web) preference to create the appropriate URL (`api.whatsapp.com` or `web.whatsapp.com`).

---

## v1.5.0 - 2025-08-29

This release focused on branding, legal clarity, and user transparency.

### Added

* A comprehensive `DISCLAIMER.md` file and a direct link to it in the popup footer.

### Changed

* **Project Renamed:** The extension was named "Whats Link+ - WA Easy Sender".
* The UI and manifest were updated to de-brand the extension and reduce the use of trademarked names.

---

## v1.4.0 - 2025-08-29

This release simplified the user experience by consolidating all settings into the main popup.

### Added

* A "Save Defaults" button in the popup to store user preferences.

### Changed

* All settings were moved from a separate options page into the main popup.

### Removed

* The separate options page (`options.html` and `options.js`) was removed.

---

## v1.2.0 - 2025-08-29

### Added

* Smart country code detection for US (10-digit) and Brazilian (11-digit) phone numbers.

---

## v1.1.0 - 2025-08-28

This was a major stability update that fixed critical bugs from the initial version.

### Fixed

* Fixed a critical bug with conflicting content scripts.
* Corrected invalid manifest paths and permissions.

### Changed

* Major refactoring of the entire codebase for stability and performance.

---

## v1.0.0 - 2025-08-28

* Initial public release.
