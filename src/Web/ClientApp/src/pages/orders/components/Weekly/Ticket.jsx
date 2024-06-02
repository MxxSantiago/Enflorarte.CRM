import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Box,
  VStack,
  Text,
  Divider,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { CgPrinter } from "react-icons/cg";
const logo = process.env.PUBLIC_URL + "/LogoFloreria.png";


function Ticket({ printData }) {
  const generatePdf = async () => {
    const element = document.getElementById("content-to-export");
    if (!element) {
      console.error("No element found with id 'content-to-export'");
      return;
    }

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("portrait", "mm", "letter");

    const width = pdf.internal.pageSize.getWidth();
    const imgWidth = 110;
    const imgHeight = (imgWidth * canvas.height) / canvas.width;
    const x = (width - imgWidth) / 2;
    const y = 10;
    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

    window.open(pdf.output("bloburl"), "_blank");
  };
  const fecha = new Date();
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Meses van de 0-11
  const day = String(fecha.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  return (
    <Box>
      <Box display="flex" justifyContent="center" pb={2}>
        <IconButton
          icon={<CgPrinter />}
          onClick={generatePdf}
          className="bg-blue-600 text-white text-xl shadow-xl py-1 px-5 rounded-md hover:bg-blue-700 active:bg-blue-800"
        ></IconButton>
      </Box>
      <VStack id="content-to-export" border="1px">

      <Image src={logo} alt='logo' w="90px" h="90px" pt={2}/>
      <Text>Impreso el: {formattedDate}</Text>
      <strong>Fechas</strong>

        <Text className="text-xl self-center mb-1">
          <strong>Fecha de orden: </strong>
          {printData.orderDate}
        </Text>
        <Text className="text-base self-center mb-11">
          <strong>Fecha de entrega: </strong>
          {printData.deliveryDate}
        </Text>
        <Divider />

        <strong>Cliente</strong>

        <Text className="text-lg">
          <strong>Nombre: </strong>
          {printData.recipientName}
        </Text>
        <Text className="text-lg">
          <strong>Número celular: </strong>
          {printData.recipientCellphoneNumber}
        </Text>
        <Text className="text-lg">
          <strong>Tipo de comunicación: </strong>
          {printData.communicationType.join(", ")}
        </Text>
        <Divider />

        <strong>Pedido</strong>

        <Text className="text-lg">
          <strong>Responsable: </strong>
          {printData.responsible.join(", ")}
        </Text>
        <Text className="text-lg">
          <strong>Estado del pedido: </strong>
          {printData.orderStatus}
        </Text>
        <Text className="text-lg">
          <strong>Arreglos: </strong>
          {printData.arrangement.join(", ")}
        </Text>
        <Text className="text-justify text-lg mb-11">
          <strong>Descripción: </strong>
          {printData.description}
        </Text>
        <Text className="text-lg">
          <strong>Tipo de entrega: </strong>
          {printData.deliveryType.join(", ")}
        </Text>
        <Text className="text-lg">
          <strong>Precio de la orden: </strong>${printData.orderPrice}
        </Text>
        <Text className="text-lg">
          <strong>Estado de pago: </strong>
          {printData.paymentStatus}
        </Text>
        <Divider />

        <strong>Etiquetas</strong>
        <Text className="text-lg">
          <strong>Tag: </strong>
          {printData.tag.join(", ")}
        </Text>
        <Divider color="black" />
        <Text>Sucursales</Text>
        <Text className="text-lg" pb={4}>
          <strong>Sucursal encargada: </strong>
          {printData.branch.join(", ")}
        </Text>

      </VStack>
    </Box>
  );
}

export default Ticket;
