import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();

  //custom pages
  const [isDashboard, setIsDashboard] = useState(false);
  const [isStatistics, setIsStatistics] = useState(false);
  const [isStatisticsCountry, setStatisticsCountry] = useState(false);
  const [isKuwaitCountry, setKuwaitCountry] = useState(false);
  const [isRealEstate, setIsRealEstate] = useState(false);
  const [isCountries, setIsCountries] = useState(false);
  const [isProvincialRegions, setIsProvincialRegionsy] = useState(false);
  const [isClients, setIsClients] = useState(false);
  const [isAds, setIsAds] = useState(false);
  const [isPackages, setIsPackages] = useState(false);
  const [isWish, setIsWish] = useState(false);
  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  //new
  const [isPages, setIsPages] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [isCrm, setIsCRM] = useState(false);

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
    if (iscurrentState !== "CRM") {
      setIsCRM(false);
    }

    if (iscurrentState !== "RealEestate") {
      setIsRealEstate(false);
    }
    if (iscurrentState !== "Countries") {
      setIsCountries(false);
    }
    if (iscurrentState !== "Clients") {
      setIsClients(false);
    }
    if (iscurrentState !== "Ads") {
      setIsAds(false);
    }
    if (iscurrentState !== "Packages") {
      setIsPackages(false);
    }
    if (iscurrentState !== "Wish") {
      setIsWish(false);
    }
    if (iscurrentState !== "Settings") {
      setIsSettings(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isStatistics,
    isStatisticsCountry,
    isKuwaitCountry,
    isRealEstate,
    isCountries,
    isProvincialRegions,
    isClients,
    isAds,
    isPackages,
    isSettings,
    isWish,
    //
    isPages,
    isCrm,
  ]);

  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: "ri-apps-2-line",
      link: "/dashboard",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
        history("/dashboard");
      },
    },

    {
      id: "Pages",
      label: "Pages",
      icon: "ri-home-3-line",
      link: "/#",
      stateVariables: isPages,
      click: function (e) {
        e.preventDefault();
        setIsPages(!isPages);
        setIscurrentState("Pages");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "real-estate-type",
          label: "blogs",
          link: "/blogs",
          parentId: "Pages",
        },
        {
          id: "real-estate-type",
          label: "Privacy Policies",
          link: "/privacy-policy",
          parentId: "Pages",
        },
      ],
    },
    {
      id: "CRM",
      label: "CRM",
      icon: "ri-home-3-line",
      link: "/#",
      stateVariables: isCrm,
      click: function (e) {
        e.preventDefault();
        setIsCRM(!isCrm);
        setIscurrentState("CRM");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "client-request",
          label: "Client Request",
          link: "/client-request",
          parentId: "CRM",
        },
        {
          id: "client-subscription",
          label: "Client subscription",
          link: "/client-subscription",
          parentId: "CRM",
        },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      icon: "ri-settings-2-line",
      link: "/settings ",
      stateVariables: isSettings,
      click: function (e) {
        e.preventDefault();
        setIsSettings(!isSettings);
        setIscurrentState("Settings");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "integration",
          label: "Integration",
          link: "/integration",
          parentId: "settings",
        },
        {
          id: "social-url",
          label: "Social URL ",
          link: "/social-url ",
          parentId: "settings",
        },
        {
          id: "general",
          label: "General ",
          link: "/general",
          parentId: "settings",
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
