import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

//custom
import { Card, Col, Container, Input, Row } from "reactstrap";
import { ButtonPrimary, DropdownBtn } from "../../Components/buttons/buttons";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import HeaderProfile from "../../common/table/HeaderProfile";
import { AdsDrawer } from "../Ads/components/drawer";
import { AdsTable } from "../Ads/components/table";
import HeaderFilter from "../../common/table/HeaderFilter";

//assets
import user from "../../assets/images/users/avatar-9.jpg";

import {
  useActiveClientMutation,
  useBanClientMutation,
  useGetClientQuery,
  useUpdateClientOptionMutation,
} from "../../custom-store/services/clientsApi";
import { useGetAllOffersTypesQuery } from "../../custom-store/services/offersTypes";

import { toast } from "react-toastify";
import AddNumOfAds from "./components/addNoADs";
import {
  useGetActiveClientOffersQuery,
  useGetAllOffersQuery,
  useGetExpiredClientOffersQuery,
  useGetLastClientOffersQuery,
} from "../../custom-store/services/offersApi";

const subPages = [
  {
    id: "last",
    name: "الاعلانات الاخيرة",
    active: true,
  },
  {
    id: "active",
    name: "الاعلانات النشطه",
    active: false,
  },
  {
    id: "end",
    name: "الاعلانات المنتهيه",
    active: false,
  },
  {
    id: "available",
    name: "عدد الاعلانات المتبقية والاشتراكات ",
    active: false,
  },
];

const ClientProfile = () => {
  document.title = "العملاء ";
  const [activeSec, setActiveSec] = useState(
    subPages.filter((item) => item.active)[0]
  );

  const [showAddAdsModal, setShowAdAddsModal] = useState(false);
  const { clientID } = useParams();

  //RTQ Query
  const {
    data: offerTypes,
    isLoading: offerTypesLoading,
    isError: offerTypesError,
  } = useGetAllOffersTypesQuery();
  const {
    data: lastOffers,
    isLoading: lastOffersLoading,
    isError: lastOffersError,
  } = useGetLastClientOffersQuery(clientID);
  const {
    data: activeOffers,
    isLoading: activeOffersLoading,
    isError: activeOffersError,
  } = useGetActiveClientOffersQuery(clientID);
  const {
    data: expiredOffers,
    isLoading: expiredOffersLoading,
    isError: expiredOffersError,
  } = useGetExpiredClientOffersQuery(clientID);

  const {
    data: client,
    isSuccess,
    isError,
    isLoading,
  } = useGetClientQuery(clientID);
  const [onActiveClient, activeClientResult] = useActiveClientMutation();
  const [onBanClient, banClientResult] = useBanClientMutation();
  const [onUpdateAdsNo, onUpdateAdsNoResult] = useUpdateClientOptionMutation();

  const [offersState, setOffersState] = useState({
    data: activeOffers?.data || [],
    isLoading: activeOffersLoading,
    isError: activeOffersError,
  });

  useEffect(() => {
    switch (activeSec.id) {
      case "last":
        setOffersState({
          data: lastOffers?.data,
          isLoading: lastOffersLoading,
          isError: lastOffersError,
        });
      case "active":
        setOffersState({
          data: activeOffers?.data,
          isLoading: activeOffersLoading,
          isError: activeOffersError,
        });
      case "end":
        setOffersState({
          data: expiredOffers?.data,
          isLoading: expiredOffersLoading,
          isError: expiredOffersError,
        });
      default:
        setOffersState({
          data: [],
          isLoading: false,
          isError: false,
        });
    }
  }, [activeSec.id]);

  useEffect(() => {
    if (banClientResult.isSuccess) {
      toast.success("تم حظر المستخدم بنجاح");
    }
  }, [banClientResult.isSuccess]);

  useEffect(() => {
    if (onUpdateAdsNoResult.isSuccess) {
      toast.success("تم اضافة عدد من الاعلانات بنجاح");
      setShowAdAddsModal(false);
    }
  }, [onUpdateAdsNoResult.isSuccess]);

  useEffect(() => {
    if (activeClientResult.isSuccess) {
      toast.success("تم تنشيط المستخدم بنجاح");
    }
  }, [activeClientResult.isSuccess]);

  const handleClientStatus = () => {
    if (client.data.status === "active") {
      onBanClient(clientID);
    } else {
      onActiveClient(clientID);
    }
  };
  return (
    <React.Fragment>
      <AddNumOfAds
        isLoading={onUpdateAdsNoResult.isLoading}
        options={offerTypes?.data}
        name=" عدد من الاعلانات للعميل"
        modal={showAddAdsModal}
        setModal={setShowAdAddsModal}
        onAdd={onUpdateAdsNo}
        selected={{
          id: client?.data?.id,
          offers_number: client?.data?.offers_number,
          offer_type: client?.data?.offer_type,
        }}
      />

      <div className="page-content">
        <HeaderProfile
          img={client?.data?.profile_image?.url ||user}
          name={client?.data?.name}
          onClick={handleClientStatus}
          about="مستخدم"
          total={client?.data?.total_wallet || 0}
          data={client?.data}
        />
        <Container fluid>
          <div className="m-4 d-flex  justify-content-between">
            <DropdownBtn
              options={subPages}
              active={activeSec}
              setActive={setActiveSec}
            />

            {activeSec.id === "available" && (
              <ButtonPrimary
                classIcon="ri-add-line align-bottom me-1"
                value="إضافة عدد من الاعلانات"
                onClick={() => setShowAdAddsModal(true)}
              />
            )}
          </div>
          <Card>
            <HeaderFilter>
              <ButtonPrimary
                value="تصفيه بواسطه"
                classIcon="ri-list-settings-line"
              />
            </HeaderFilter>
            <div className="mt-4"></div>
            <AdsTable
              outSide
              data={offersState.data === "" ? [] : offersState.data}
              isLoading={offersState.isLoading}
              isError={offersState.isError}
            />
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ClientProfile;
