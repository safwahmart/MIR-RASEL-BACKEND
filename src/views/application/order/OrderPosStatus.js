import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { headers } from 'api/auth';
import { baseUrl } from 'api/apiConfig';
import moment from 'moment';

export default function OrderPosStatus() {
    const [selectedData, setSelectedData] = useState({});
    const [setting, setSetting] = useState({});
    const [selectedProductData, setSelectedProductData] = useState([]);
    const [selectedType, setSelectedType] = useState();
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams()
    useEffect(() => {
        if (id) {
            getOrderInfo(id);
            getOrderProductInfo(id);
            const type = searchParams.get('type');
            setSelectedType(type)
            getSettings()
        }
    }, [id]);
    const getOrderInfo = async (id) => {
        const response = await axios.get(`${baseUrl}/getOrder/${id}`, {
            headers: headers
        });
        setSelectedData(response.data);
    }
    const getOrderProductInfo = async (id) => {
        const response = await axios.get(`${baseUrl}/getOrderProduct/${id}`, {
            headers: headers
        });
        setSelectedProductData(response.data.data);
    }
    const getSettings = async (id) => {
        const response = await axios.get(`${baseUrl}/getSettings`, {
            headers: headers
        });
        setSetting(response.data);
    }
    return (<>
        <table
            border={0}
            cellPadding={0}
            cellSpacing={0}
            role="presentation"
            style={{
                background: "#fff",
                width: '100%',
                margin: "0 auto",
                padding: "0 20px"
            }}
        >
            <tbody>
                {/*  */}
                <tr>
                    <td colSpan={2} style={{ padding: "5px 20px" }}>
                        <h4
                            style={{
                                fontWeight: 700,
                                color: "#000",
                                fontSize: 19,
                                borderBottom: "1px solid #000",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                        >
                            <span>Order Number: {selectedData?.invoice_no}</span>
                        </h4>
                    </td>
                </tr>
                {/* information */}
                <tr>
                    <td style={{ padding: "0px 20px" }}>
                        <h5
                            style={{
                                fontSize: 13,
                                fontWeight: 400,
                                color: "#15242f",
                                marginBottom: 2
                            }}
                        >
                            Customer Name:
                            <span style={{ fontWeight: 700 }}>{selectedData?.customer_name}</span>
                        </h5>
                        <h5
                            style={{
                                fontSize: 13,
                                fontWeight: 400,
                                color: "#15242f",
                                marginBottom: 2
                            }}
                        >
                            Customer Mobile:{" "}
                            <span style={{ fontWeight: 700 }}>{selectedData?.phone}</span>
                        </h5>
                        <h5
                            style={{
                                fontSize: 13,
                                fontWeight: 400,
                                color: "#15242f",
                                marginBottom: 2
                            }}
                        >
                            Customer Email:{" "}
                            <span style={{ fontWeight: 700 }}>{selectedData?.email}</span>
                        </h5>
                        <h5
                            style={{
                                fontSize: 13,
                                fontWeight: 400,
                                color: "#15242f",
                                marginBottom: 2
                            }}
                        >
                            <span style={{ fontWeight: 700 }}>Delivery Address:</span> {selectedData?.address}
                        </h5>
                    </td>
                    <td style={{ padding: "0px 20px" }}>
                        <h5
                            style={{
                                fontSize: 13,
                                color: "#000",
                                fontWeight: 500
                            }}
                        >
                            <span style={{ fontWeight: 700 }}>Order Number: {selectedData?.invoice_no}</span>
                        </h5>
                        <h5
                            style={{
                                fontSize: 13,
                                color: "#000",
                                fontWeight: 500
                            }}
                        >
                            Order Date &amp; Time:
                            <span style={{ fontWeight: 700 }}> {moment(selectedData?.order_date).format("d MMM YYYY h:mm:ss")}</span>
                        </h5>
                        <h5
                            style={{
                                fontSize: 13,
                                color: "#000",
                                fontWeight: 500
                            }}
                        >
                            Delivery Date &amp; Time:
                            <span style={{ fontWeight: 700 }}> {moment(selectedData?.delivery_date).format("d MMM YYYY h:mm:ss")} </span>
                        </h5>
                        <h5
                            style={{
                                fontSize: 13,
                                color: "#000",
                                fontWeight: 500
                            }}
                        >
                            Payment Type:
                            <span style={{ fontWeight: 700 }}> {selectedData?.payment_type === 1 ? 'Online' : 'Cash On Delivery'} </span>
                        </h5>
                        <h5
                            style={{
                                fontSize: 13,
                                color: "#000",
                                fontWeight: 500
                            }}
                        >
                            Status:
                            <span style={{ fontWeight: 700 }}> {selectedData?.status === 0 ? 'Pending' : selectedData?.status === 1 ? 'Accepted' : selectedData?.status === 2 ? 'Processing' : selectedData?.status === 3 ? 'On the way' : selectedData?.status === 4 ? 'Delivered' : selectedData?.status === 5 ? 'Return' : "Return On Process"} </span>
                        </h5>
                    </td>
                </tr>
            </tbody>
        </table>

        <table
            border={0}
            cellPadding={0}
            cellSpacing={0}
            role="presentation"
            style={{
                background: "#fff",
                width: '100%',
                margin: "0 auto",
                padding: "0 30px",
                paddingTop: 10,
                paddingBottom: 15
            }}
        >
            <thead>
                <tr>
                    <th
                        style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#15242f",
                            padding: "3px 10px",
                            borderBottom: "1px solid #dedfe2",
                            textAlign: "left",
                            width: "52%"
                        }}
                    >
                        Product Name
                    </th>
                    <th
                        style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#15242f",
                            padding: "3px 10px",
                            borderBottom: "1px solid #dedfe2"
                        }}
                    >
                        Qty
                    </th>
                    <th
                        style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#15242f",
                            padding: "3px 10px",
                            borderBottom: "1px solid #dedfe2"
                        }}
                    >
                        Price (TK)
                    </th>
                    <th
                        style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#15242f",
                            padding: "3px 10px",
                            borderBottom: "1px solid #dedfe2"
                        }}
                    >
                        D. Amount (TK)
                    </th>
                    <th
                        style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#15242f",
                            padding: "3px 10px",
                            borderBottom: "1px solid #dedfe2",
                            textAlign: "right"
                        }}
                    >
                        Total (TK)
                    </th>
                </tr>
            </thead>
            <tbody>
                {selectedProductData.map((res, index) => {
                    return <tr>
                        <td
                            style={{
                                fontSize: 11,
                                fontWeight: 400,
                                color: "#000",
                                padding: "3px 10px",
                                borderBottom: "1px solid #dedfe2",
                                textAlign: "left",
                                width: "52%"
                            }}
                        >
                            {index + 1}.{res.product_name}
                            (sku-{res.product_sku})
                        </td>
                        <td
                            style={{
                                fontSize: 11,
                                fontWeight: 400,
                                color: "#000",
                                padding: "3px 10px",
                                borderBottom: "1px solid #dedfe2",
                                textAlign: "center"
                            }}
                        >
                            {res.qty}
                        </td>
                        <td
                            style={{
                                fontSize: 11,
                                fontWeight: 400,
                                color: "#000",
                                padding: "3px 10px",
                                borderBottom: "1px solid #dedfe2",
                                textAlign: "center"
                            }}
                        >
                            {res.unit_price}
                        </td>
                        <td
                            style={{
                                fontSize: 11,
                                fontWeight: 400,
                                color: "#000",
                                padding: "3px 10px",
                                borderBottom: "1px solid #dedfe2",
                                textAlign: "center"
                            }}
                        >
                            {res.discount}
                        </td>
                        <td
                            style={{
                                fontSize: 11,
                                fontWeight: 400,
                                color: "#000",
                                padding: "3px 10px",
                                borderBottom: "1px solid #dedfe2",
                                textAlign: "right"
                            }}
                        >
                            {res.total_price}
                        </td>
                    </tr>
                })}
                <tr>
                    {/* left */}
                    <td style={{ width: "50%" }}>
                        <table
                            border={0}
                            cellPadding={0}
                            cellSpacing={0}
                            style={{ width: "100%" }}
                        >
                            <tbody>
                                <tr>
                                    <td>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    {/* right */}
                    <td colSpan={4} style={{ width: "50%" }}>
                        <table
                            border={0}
                            cellPadding={0}
                            cellSpacing={0}
                            style={{ width: "100%" }}
                        >
                            {/* subtotal */}
                            <tbody>
                                <tr>
                                    <td
                                        colSpan={3}
                                        style={{
                                            fontSize: 13,
                                            //lineheight: 18,
                                            fontWeight: 600,
                                            color: "#15242f",
                                            padding: "3px 0",
                                            borderBottom: "1px solid #dedfe2",
                                            borderLeft: "1px solid #dedfe2",
                                            textAlign: "right"
                                        }}
                                    >
                                        <span
                                            style={{
                                                display: "block",
                                                borderBottom: "1px solid #dedfe2"
                                            }}
                                        >
                                            Subtotal:
                                        </span>
                                        <span style={{ display: "block" }}> Vat:</span>
                                    </td>
                                    <td
                                        colSpan={3}
                                        style={{
                                            fontSize: 13,
                                            //lineheight: 18,
                                            fontWeight: 600,
                                            color: "#15242f",
                                            padding: "3px 0px",
                                            borderBottom: "1px solid #dedfe2",
                                            textAlign: "right",
                                            width: 100
                                        }}
                                    >
                                        <span
                                            style={{
                                                display: "block",
                                                borderBottom: "1px solid #dedfe2"
                                            }}
                                        >
                                            {selectedData.sub_total}
                                        </span>
                                        <span style={{ display: "block" }}> {selectedData.vat}</span>
                                    </td>
                                </tr>
                                {/* Total Include */}
                                <tr>
                                    <td
                                        colSpan={3}
                                        style={{
                                            fontSize: 13,
                                            //lineheight: 18,
                                            fontWeight: 600,
                                            color: "#15242f",
                                            padding: "3px 0",
                                            borderBottom: "1px solid #dedfe2",
                                            borderLeft: "1px solid #dedfe2",
                                            textAlign: "right"
                                        }}
                                    >
                                        <span style={{ display: "block" }}> Total (incl. vat):</span>
                                    </td>
                                    <td
                                        colSpan={3}
                                        style={{
                                            fontSize: 13,
                                            //lineheight: 18,
                                            fontWeight: 600,
                                            color: "#15242f",
                                            padding: "3px 0px",
                                            borderBottom: "1px solid #dedfe2",
                                            textAlign: "right",
                                            width: 100
                                        }}
                                    >
                                        <span style={{ display: "block" }}> {parseInt(selectedData.sub_total) + parseInt(selectedData.vat)}</span>
                                    </td>
                                </tr>
                                {/* shipping cost */}
                                <tr>
                                    <td
                                        colSpan={3}
                                        style={{
                                            fontSize: 12,
                                            //lineheight: 15,
                                            fontWeight: 400,
                                            color: "#000",
                                            padding: "3px 0px",
                                            borderBottom: "1px solid #dedfe2",
                                            borderLeft: "1px solid #dedfe2",
                                            textAlign: "right"
                                        }}
                                    >
                                        <span style={{ display: "block" }}> Shipping cost:</span>
                                        <span style={{ display: "block" }}> Discount:</span>
                                        <span style={{ display: "block" }}> Coupon Discount:</span>
                                        <span style={{ display: "block" }}> Special discount:</span>
                                    </td>
                                    <td
                                        colSpan={3}
                                        style={{
                                            fontSize: 12,
                                            //lineheight: 15,
                                            fontWeight: 400,
                                            color: "#000",
                                            padding: "3px 0px",
                                            borderBottom: "1px solid #dedfe2",
                                            textAlign: "right",
                                            width: 100
                                        }}
                                    >
                                        <span style={{ display: "block" }}> {selectedData?.shipping_cost}</span>
                                        <span style={{ display: "block" }}> {selectedData.discount_amount}</span>
                                        <span style={{ display: "block" }}> 0</span>
                                        <span style={{ display: "block" }}> {selectedData.special_discount_amount}</span>
                                    </td>
                                </tr>
                                {/* Grand Total */}
                                <tr>
                                    <td
                                        colSpan={3}
                                        style={{
                                            fontSize: 12,
                                            //lineheight: 15,
                                            fontWeight: 600,
                                            color: "#15242f",
                                            padding: "3px 0px",
                                            borderBottom: "1px solid #dedfe2",
                                            borderLeft: "1px solid #dedfe2",
                                            textAlign: "right"
                                        }}
                                    >
                                        <span style={{ display: "block" }}>
                                            {" "}
                                            Grand total (incl. vat):
                                        </span>
                                    </td>
                                    <td
                                        colSpan={3}
                                        style={{
                                            fontSize: 12,
                                            //lineheight: 15,
                                            fontWeight: 600,
                                            color: "#15242f",
                                            padding: "3px 0px",
                                            borderBottom: "1px solid #dedfe2",
                                            textAlign: "right",
                                            width: 100
                                        }}
                                    >
                                        <span style={{ display: "block" }}>{parseInt(selectedData.sub_total) + parseInt(selectedData.vat) + parseInt(selectedData.shipping_cost) + parseInt(selectedData.discount_amount + selectedData.special_discount_amount)}</span>
                                    </td>
                                </tr>
                                {/* COD charge */}
                                <tr>
                                    <td
                                        colSpan={3}
                                        style={{
                                            fontSize: 12,
                                            //lineheight: 15,
                                            fontWeight: 400,
                                            color: "#000",
                                            padding: "3px 0px",
                                            borderBottom: "1px solid #dedfe2",
                                            borderLeft: "1px solid #dedfe2",
                                            textAlign: "right"
                                        }}
                                    >
                                        <span style={{ display: "block" }}> COD charge (1%):</span>
                                        <span style={{ display: "block" }}> Total payable:</span>
                                        <span style={{ display: "block" }}> Paid amount:</span>
                                    </td>
                                    <td
                                        colSpan={3}
                                        style={{
                                            fontSize: 12,
                                            //lineheight: 15,
                                            fontWeight: 400,
                                            color: "#000",
                                            padding: "3px 0px",
                                            borderBottom: "1px solid #dedfe2",
                                            textAlign: "right",
                                            width: 100
                                        }}
                                    >
                                        <span style={{ display: "block" }}> {selectedData.cod_charge}</span>
                                        <span style={{ display: "block" }}> {selectedData.payable}</span>
                                        <span style={{ display: "block" }}> {selectedData.paid_amount}</span>
                                    </td>
                                </tr>
                                {/* shipping cost */}
                                <tr>
                                    <td
                                        colSpan={3}
                                        style={{
                                            fontSize: 14,
                                            //lineheight: 18,
                                            fontWeight: 600,
                                            color: "#000",
                                            padding: "5px 0px",
                                            borderBottom: "1px solid #dedfe2",
                                            borderLeft: "1px solid #dedfe2",
                                            textAlign: "right"
                                        }}
                                    >
                                        <span style={{ display: "block" }}> Cash to collect:</span>
                                    </td>
                                    <td
                                        colSpan={3}
                                        style={{
                                            fontSize: 14,
                                            //lineheight: 18,
                                            fontWeight: 600,
                                            color: "#000",
                                            padding: "5px 0px",
                                            borderBottom: "1px solid #dedfe2",
                                            textAlign: "right",
                                            width: 100
                                        }}
                                    >
                                        <span style={{ display: "block" }}> {selectedData.payable}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table></>
    )
}
