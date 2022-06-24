import { SubPage } from "../Consultation";
import Chat from "./Chat";
import Info from "./Info";
import Options from "./Options";
import Vote from "./Vote";

interface SubPagesProps {
  page: SubPage;
}

const SubPages = (props: SubPagesProps) => {
  const { page } = props;
  switch (page) {
    case SubPage.INFO:
      return <Info />;
    case SubPage.CHAT:
      return <Chat />;
    case SubPage.OPTIONS:
      return <Options />;
    case SubPage.VOTES:
      return <Vote />;
    default:
      return <Info />;
  }
};

export default SubPages;
