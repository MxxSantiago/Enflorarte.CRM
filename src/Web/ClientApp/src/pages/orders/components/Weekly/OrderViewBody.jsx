import WeeklyOrdersKanban from "./WeeklyOrdersKanban";
import useGetOrdersByPeriod from "../../hooks/useGetOrdersByPeriod.tsx";
import { useGetQuery } from "../../../../core/hooks/useApiClientHooks.tsx";
import MonthlyOrdersCalendar from "../Monthly/MonthlyOrdersCalendar.jsx";

const OrdersViewBody = ({ colorMode, mode }) => {
  const { data: ordersData, isLoading: isLoadingOrders } =
    useGetOrdersByPeriod("Week");
  const { data: arrangementData, isLoading: isArrangementLoading } =
    useGetQuery("arrangement");
  const { data: responsibleData, isLoading: responsibleLoading } =
    useGetQuery("responsible");
  const { data: communicationTypeData, isLoading: communicationTypeLoading } =
    useGetQuery("communicationType");
  const { data: brancData, isLoading: branchLoading } = useGetQuery("branch");
  const { data: deliveryTypeData, isLoading: deliveryTypeDataLoading } =
    useGetQuery("deliveryType");

  const isLoading =
    isLoadingOrders ||
    isArrangementLoading ||
    responsibleLoading ||
    communicationTypeLoading ||
    branchLoading ||
    deliveryTypeDataLoading;

  return (
    <>
      {
        {
          week: (
            <WeeklyOrdersKanban
              colorMode={colorMode}
              orders={ordersData}
              arrangementData={arrangementData}
              responsibleData={responsibleData}
              communicationTypeData={communicationTypeData}
              branchData={brancData}
              deliveryTypeData={deliveryTypeData}
              isLoading={isLoading}
            />
          ),
          month: (<MonthlyOrdersCalendar colorMode={colorMode} ordersByDate={ordersData} /> ),
        }[mode]
      }
    </>
  );
};
export default OrdersViewBody;
