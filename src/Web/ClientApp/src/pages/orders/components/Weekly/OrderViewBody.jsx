import WeeklyOrdersKanban from "./WeeklyOrdersKanban";
import useGetOrdersByPeriod from "../../hooks/useGetOrdersByPeriod.tsx";

const OrdersViewBody = ({ colorMode, mode }) => {
  const { data } = useGetOrdersByPeriod("Week");

  return (
    <>
      {
        {
          week: <WeeklyOrdersKanban colorMode={colorMode} orders={data} />,
        }[mode]
      }
    </>
  );
};
export default OrdersViewBody;
