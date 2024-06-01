import WeeklyOrdersKanban from "./WeeklyOrdersKanban";
import { useGetQuery } from "../../../../core/hooks/useApiClientHooks.tsx";
import MonthlyOrdersCalendar from "../Monthly/MonthlyOrdersCalendar.jsx";

const OrdersViewBody = ({ colorMode, mode }) => {
  const { data: arrangementData, isLoading: isArrangementLoading } =
    useGetQuery("arrangement");
  const { data: responsibleData, isLoading: responsibleLoading } =
    useGetQuery("responsible");
  const { data: communicationTypeData, isLoading: communicationTypeLoading } =
    useGetQuery("communicationType");
  const { data: brancData, isLoading: branchLoading } = useGetQuery("branch");
  const { data: deliveryTypeData, isLoading: deliveryTypeDataLoading } =
    useGetQuery("deliveryType");
  const { data: tagData, isLoading: tagLoading } = useGetQuery("tag");

  const isLoading =
    isArrangementLoading ||
    responsibleLoading ||
    communicationTypeLoading ||
    branchLoading ||
    deliveryTypeDataLoading ||
    tagLoading;

  return (
    <>
      {
        {
          week: (
            <WeeklyOrdersKanban
              colorMode={colorMode}
              arrangementData={arrangementData}
              responsibleData={responsibleData}
              communicationTypeData={communicationTypeData}
              branchData={brancData}
              deliveryTypeData={deliveryTypeData}
              tagData={tagData}
              isLoading={isLoading}
            />
          ),
          month: <MonthlyOrdersCalendar colorMode={colorMode} />,
        }[mode]
      }
    </>
  );
};
export default OrdersViewBody;
