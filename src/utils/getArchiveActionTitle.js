function getArchiveActionTitle(isArchived, locale) {
  if (isArchived && locale === "en") return "Unarchive";
  if (isArchived && locale === "id") return "Keluarkan dari Arsip";
  if (!isArchived && locale === "en") return "Archive";
  return "Arsipkan";
}

export default getArchiveActionTitle;