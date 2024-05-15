import WeeklyOrdersKanban from "./WeeklyOrdersKanban";

const OrdersViewBody = ({ colorMode, mode }) => {
    // API calls, high state management, etc.

    const defaultOrder = {
      orderDate: new Date(), // Datetime
      deliveryDate: new Date(), // Datetime
      deliveryFrom: new Date(), // Datetime
      deliveryTo: new Date(), // Datetime
      responsible: {
        name: "John Doe",
      }, // FK (1)
      deliveryType: {
        name: "Uber",
      }, // FK (0-1)
      paymentStatus: "Pending", // Enum (String)
      address: "123 Main Street", // String
      wasOrderGenerated: false, // Bool
      description: "Description of the order", // String
      referenceImage: "url_to_reference_image", // String
      resultImage: "url_to_result_image", // String
      arrangements: [
        {
          name: "Arrangement 1",
          isTemplate: false,
          extras: "Extra information for the arrangement",
          referenceImage: "url_to_reference_image",
          isAvailable: true,
          wrapperVariants: [
            {
              name: "Wrapper Variant 1",
            },
            {
              name: "Wrapper Variant 2",
            },
          ],
          flowerVariants: [
            {
              name: "Flower Variant 1",
            },
            {
              name: "Flower Variant 2",
            },
          ],
          arrangementTypes: [
            {
              name: "Arrangement Type 1",
            },
            {
              name: "Arrangement Type 2",
            },
          ],
        },
      ], // FK (0-N)
      communicationType: {
        name: "WhatsApp",
      }, // FK (0-1)
      tags: [
        // {
        //   name: "San valentin",
        //   color: "blue",
        // },
        // {
        //   name: "Cliente importante",
        //   color: "red",
        // },
        // {
        //   name: "Cumpleaños",
        //   color: "green",
        // },
    
        {
          name: "SanValentin",
          color: "blue",
        },
        {
          name: "Cumpleanos",
          color: "red",
        },
        {
          name: "Domicilio",
          color: "green",
        },
      ], // FK (0-N), Max 3 tags per order
      orderPrice: 0.0, // Decimal
      shippingPrice: 0.0, // Decimal
      paidAmount: 0.0, // Decimal
      isPaid: false, // Bool
      wasDelivered: false, // Bool
      branch: "Headquarters", // FK (1)
      recipientName: "John Doe", // String
      recipientPhoneNumber: "123-456-7890", // String
    };
    
    const defaultOrderArray = Array.from({ length: 35 }, (_, index) => {
      const orderDate = new Date();
      orderDate.setDate(orderDate.getDate() + Math.floor(index / 5));
      return {
        ...defaultOrder,
        orderDate,
      };
    });

    const ordersByDate = defaultOrderArray.reduce((acc, order) => {
      const date = new Date(order.orderDate).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(order);
      return acc;
    }, {});
    
   /**  const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];*/
  
    return (
      <>
        {
          {
            week: (
              <WeeklyOrdersKanban
                colorMode={colorMode}
                ordersByDate={ordersByDate}
              />
            ),/**
            month: (
              <MonthlyOrdersCalendar
                colorMode={colorMode}
                ordersByDate={ordersByDate}
              />
            ), */
          }[mode]
        }
      </>
    );
  };
  export default OrdersViewBody;