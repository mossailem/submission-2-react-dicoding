import { PropTypes } from "prop-types";
import "../styles/ContentCard.css";
import ContentCardContent from "./ContentCardContent";
import ContentCardActionButton from "./ContentCardActionButton";
import { useContext } from "react";
import LocaleContext from "../context/LocaleContext";
import getArchiveActionTitle from "../utils/getArchiveActionTitle";

function ContentCard({
  id,
  title,
  timestamp,
  description,
  archived,
  mainHandler,
  onDeleteHandler,
}) {
  const { locale } = useContext(LocaleContext);
  const actionTitle = getArchiveActionTitle(archived, locale);
  const actionIcon = archived ? "fa-reply" : "fa-box-archive";

  return (
    <article className="card">
      <ContentCardContent
        id={id}
        title={title}
        timestamp={timestamp}
        description={description}
        locale={locale}
      />

      <div className="card-action">
        <ContentCardActionButton
          title={actionTitle}
          icon={actionIcon}
          handler={mainHandler}
          id={id}
        />
        <ContentCardActionButton
          title={locale === "en" ? "Delete" : "Hapus"}
          icon="fa-trash"
          handler={onDeleteHandler}
          id={id}
          additionalClass="bg-danger"
        />
      </div>
    </article>
  );
}

ContentCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  mainHandler: PropTypes.func.isRequired,
  onDeleteHandler: PropTypes.func.isRequired,
};

export default ContentCard;
