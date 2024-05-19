import WeeklyOrdersKanban from "./WeeklyOrdersKanban";
import {useGetQuery} from "../../../../core/hooks/useApiClientHooks";

const OrdersViewBody = ({ colorMode, mode }) => {
    // API calls, high state management, etc.

    const {
        data: orderData,
        isLoading: isOrderLoading,
        refetch,
    } = useGetQuery("order");

    return (
      <>
        {
          {
            week: (
              <WeeklyOrdersKanban
                colorMode={colorMode}
                orders={orderData}
              />
            ),
          }[mode]
        }
      </>
    );
  };
  export default OrdersViewBody;