import {useQuery} from "@chakra-ui/react";
import axios from "axios";

const fetchOrdersByDate = async (date, interval) => {
  let url;
  switch (interval) {
    case 'day':
      url = `/api/Order/GetDayOrders?day=${date}`;
      break;
    case 'week':
      url = `/api/Order/GetWeekOrders?week=${date}`;
      break;
    case 'month':
      url = `/api/Order/GetMonthOrders?month=${date}`;
      break;
    default:
      throw new Error(`Invalid interval: ${interval}`);
  }

  const { data } = await axios.get(url);
  return data;
};

const useOrdersByDate = (date, interval) => {
  return useQuery(['orders', date, interval], () => fetchOrdersByDate(date, interval));
};

export default useOrdersByDate;