import Happy from "./assets/happy.png";
import Bad from "./assets/angry.png";
import Neutral from "./assets/icon.png";
import Browser from "webextension-polyfill";

type ReviewType = "good" | "neutral" | "bad";

const reviewTypes = {
  good: Happy,
  neutral: Neutral,
  bad: Bad,
  default: Neutral,
};

export const changeIcon = async (review: ReviewType) => {
  await Browser.browserAction.setIcon({
    path: review ? reviewTypes[review] : reviewTypes.default,
  });
};

function fakeReviewCall(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Math.random() > 0.5); // good or bad review
    }, 2000);
  });
}

export const processReview = async (customReviewState?: boolean) => {
  const review = customReviewState ?? (await fakeReviewCall());
  reviewHandler(review);
};

const reviewHandler = async (review: boolean) => {
  changeIcon(review ? "good" : "bad");
};

let oldURL: string;
const reviewListener = (
  tabId: number,
  changeInfo: Browser.Tabs.OnUpdatedChangeInfoType,
  tab: Browser.Tabs.Tab,
) => {
  if (tab.status === "complete" && oldURL !== tab.url) {
    oldURL = tab.url;
    processReview();
  }
};

Browser.tabs.onUpdated.addListener(reviewListener);
