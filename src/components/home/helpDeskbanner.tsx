import SiteBanner from "@/components/SiteBanner";
import { siteBannerIds } from "@/lib/siteBanners";

const HelpDeskBanner = () => {
  return <SiteBanner bannerId={siteBannerIds.homeHelpdesk} />;
};

export default HelpDeskBanner;
