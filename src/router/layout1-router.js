import React from "react";

//pages
import Groups from "../views/dashboard/app/groups";
// import GroupDetail from "../views/dashboard/app/group-detail";
import MembershipRequest from "../views/dashboard/app/membershipRequest";
import Members from "../views/dashboard/app/members";
import MemberCategory from "../views/dashboard/app/mcategory";
import Chapters from "../views/dashboard/app/chapters";
import MembershipPlans from "../views/dashboard/app/mship-plans";
import RenewMembership from "../views/dashboard/app/membershipRequest";
import UpgradeMembership from "../views/dashboard/app/upgrade-mship";
import LeaveMembership from "../views/dashboard/app/leave-mship";
import ForMe from "../views/dashboard/app/for-me";
import ByMe from "../views/dashboard/app/by-me";
import ProfileImages from "../views/dashboard/app/profile-images";
import ProfileVideos from "../views/dashboard/app/profile-videos";
import ProfileEvents from "../views/dashboard/app/profile-events";
import EventDetail from "../views/dashboard/app/event-detail";
import Meeting from "../views/dashboard/app/meeting";
import Calendar from "../views/dashboard/app/calendar";
import Birthday from "../views/dashboard/app/birthday";
import Weather from "../views/dashboard/app/weather";
import Music from "../views/dashboard/app/music";
import CatergoryGrid from "../views/dashboard/store/store-category-grid";
import CatergoryList from "../views/dashboard/store/store-category-list";
import StoreDetail from "../views/dashboard/store/store-detail";
import StoreCheckout from "../views/dashboard/store/store-checkout";

//market and profile pages
import Market1 from "../views/dashboard/market-place/market1";
import Market2 from "../views/dashboard/market-place/market2";
import Profile1 from "../views/dashboard/profiles/profile1";
import Profile2 from "../views/dashboard/profiles/profile2";
import Profile3 from "../views/dashboard/profiles/profile3";
import Connections from "../views/dashboard/app/connections";

import ResetPassword from "../views/dashboard/auth/resetPassword";


import SearchResults from "../views/dashboard/app/searchResult";


export const Layout1Router = [
  {
    path: "dashboards/app/groups",
    element: <Groups />,
  },
  {
    path: "dashboards/app/membershipRequest",
    element: <membershipRequest/>,
  },
  {
    path: "dashboards/app/members",
    element: <Members />,
  },
  {
    path: "dashboards/app/mcategory",
    element: <MemberCategory />,
  },
  {
    path: "dashboards/app/searchResults",
    element: <SearchResults />,
  },
  {
    path: "dashboards/app/chapters",
    element: <Chapters />,
  },
  {
    path: "dashboards/app/connections",
    element: <Connections />,
  },
  {
    path: "dashboards/app/mship-plans",
    element: <MembershipPlans />,
  },
  {
    path: "dashboards/app/renew-mship",
    element: <RenewMembership />,
  },
  {
    path: "dashboards/app/upgrade-mship",
    element: <UpgradeMembership />,
  },
  {
    path: "dashboards/app/leave-mship",
    element: <LeaveMembership />,
  },
  {
    path: "dashboards/app/for-me",
    element: <ForMe />,
  },
  {
    path: "dashboards/app/by-me",
    element: <ByMe />,
  },
  {
    path: "dashboards/app/profile-images",
    element: <ProfileImages />,
  },
  {
    path: "dashboards/app/profile-videos",
    element: <ProfileVideos />,
  },
  {
    path: "dashboards/app/profile-events",
    element: <ProfileEvents />,
  },
  {
    path: "dashboards/app/event-detail",
    element: <EventDetail />,
  },
  {
    path: "dashboards/app/meeting",
    element: <Meeting />,
  },
  {
    path: "dashboards/app/calendar",
    element: <Calendar />,
  },
  {
    path: "dashboards/app/birthday",
    element: <Birthday />,
  },
  {
    path: "dashboards/app/weather",
    element: <Weather />,
  },
  {
    path: "dashboards/app/music",
    element: <Music />,
  },
  {
    path: "dashboards/store/store-category-grid",
    element: <CatergoryGrid />,
  },
  {
    path: "dashboards/store/store-category-list",
    element: <CatergoryList />,
  },
  {
    path: "dashboards/store/store-detail",
    element: <StoreDetail />,
  },
  {
    path: "dashboards/store/store-checkout",
    element: <StoreCheckout />,
  },
  {
    path: "dashboards/market-place/market1",
    element: <Market1 />,
  },
  {
    path: "dashboards/market-place/market2",
    element: <Market2 />,
  },
  {
    path: "dashboards/profiles/profile1",
    element: <Profile1 />,
  },
  {
    path: "dashboards/profiles/profile2",
    element: <Profile2 />,
  },
  {
    path: "dashboards/profiles/profile3",
    element: <Profile3 />,
  },
  {
    path : "/auth/resetPassword",
    element: <ResetPassword />
  }
];
