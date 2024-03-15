import PrintIcon from '@mui/icons-material/Print';
import { baseUrl } from 'api/apiConfig';
import { headers } from 'api/auth';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import './posStyle.css';

export default function OrderPosA4() {
  const [selectedData, setSelectedData] = useState({});
  const [setting, setSetting] = useState({});
  const [editable, setEditable] = useState('');
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

  // console.log('selectedData', selectedData);

  const Print = () => {
    //console.log('print');  
    let printContents = document.getElementById('printablediv').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around', cursor: 'pointer' }}>
        <PrintIcon sx={{ fontSize: '1.3rem' }} onClick={() => Print()} />
      </div>
      <div id='printablediv' style={{ backgroundColor: '#e0e0e0', margin: '30px 0' }}>
        <>
          <table
            border={0}
            cellPadding={0}
            cellSpacing={0}
            role="presentation"
            style={{
              background: "#fff",
              width: 850,
              margin: "0 auto",
              padding: "0 20px"
            }}
          >
            {/* head */}
            <thead>
              <tr>
                <th colSpan={2} style={{ paddingBottom: 0, position: "relative" }}>
                  <h4
                    style={{
                      fontSize: 25,
                      fontWeight: 700,
                      borderBottom: "1px solid #000",
                      color: "#000",
                      paddingTop: 10,
                      display: "inline-block"
                    }}
                  >
                    {setting?.company_name}
                  </h4>
                  <p
                    style={{
                      fontWeight: 500,
                      fontSize: 12,
                      color: "#000",
                      marginTop: 5
                    }}
                  >
                    {setting?.address}
                  </p>
                  <a
                    href="https://safwahmart.com/"
                    style={{ fontSize: 16, color: "#000" }}
                  >
                    {setting?.website_link}
                  </a>
                  {/* invoice */}
                  <div
                    style={{
                      position: "absolute",
                      top: 20,
                      left: 15,
                      textAlign: "left"
                    }}
                  >
                    <h6
                      style={{
                        fontSize: 14,
                        lineHeight: 20,
                        color: "#7e7e7e",
                        fontWeight: 500
                      }}
                    >
                      {/* Date: <span style={{ fontWeight: 700 }}> {moment(selectedData?.order_date).format("d MMM YYYY h:mm:ss")} </span> */}
                    </h6>
                    <h5
                      style={{
                        fontSize: 14,
                        color: "#000",
                        fontWeight: 500
                      }}
                    >
                      Invoice No. <span style={{ fontWeight: 700 }}>{selectedData.invoice_no} </span>
                    </h5>
                  </div>
                  {/* customer Copy */}
                  <div
                    style={{
                      position: "absolute",
                      top: 20,
                      right: 15,
                      textAlign: "left"
                    }}
                  >
                    <h5
                      style={{
                        fontSize: 16,
                        color: "#7e7e7e",
                        fontWeight: 700
                      }}
                    >
                      {selectedType === 'customer' && 'Customer Copy'}
                      {selectedType === 'accounts' && 'Account Copy'}
                      {selectedType === 'delivery' && 'Delivery Copy'}
                      {selectedType === 'store' && 'store Copy'}
                    </h5>
                  </div>
                </th>
              </tr>
            </thead>
            {/* body */}
            <tbody>
              {/*  */}
              <tr>
                <td colSpan={2} style={{ padding: "5px 20px" }}>
                  <h4
                    style={{
                      fontWeight: 700,
                      color: "#000",
                      fontSize: 13,
                      borderBottom: "1px solid #000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <span>BIN Number: {setting.bin}</span>
                    <span>MUSHAK {setting.musak}</span>
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
                    <span style={{ fontWeight: 700 }}>{selectedData.customer_name}</span>
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
                    <span style={{ fontWeight: 700 }}>{selectedData.phone}</span>
                  </h5>
                  <h5
                    style={{
                      fontSize: 13,
                      fontWeight: 400,
                      color: "#15242f",
                      marginBottom: 2
                    }}
                  >
                    <span style={{ fontWeight: 700 }}>Delivery Address:</span> {selectedData.address}
                  </h5>
                </td>
                <td style={{ textAlign: "right", padding: "0px 20px" }}>
                  <h5
                    style={{
                      fontSize: 13,
                      color: "#000",
                      fontWeight: 500
                    }}
                  >
                    <span style={{ fontWeight: 700 }}>{selectedData?.payment_type === 1 ? 'Online' : 'Cash On Delivery'}</span>
                  </h5>
                  <h5
                    style={{
                      fontSize: 13,
                      color: "#000",
                      fontWeight: 500
                    }}
                  >
                    Order Date & Time:
                    <span style={{ fontWeight: 700 }}>
                      {selectedData?.order_date ? moment(selectedData.order_date).format("D MMM YYYY h:mm:ss") : "No date available"}
                    </span>
                  </h5>
                  <h5
                    style={{
                      fontSize: 13,
                      color: "#000",
                      fontWeight: 500
                    }}
                  >
                    Delivery Date & Time:
                    <span style={{ fontWeight: 700 }}>
                      {selectedData?.delivery_date ? moment(selectedData.delivery_date).format("D MMM YYYY h:mm:ss") : "No date available"}
                    </span>
                  </h5>
                </td>
              </tr>
            </tbody>
          </table>
          {/* Product quantity */}
          <table
            border={0}
            cellPadding={0}
            cellSpacing={0}
            role="presentation"
            style={{
              background: "#fff",
              width: 850,
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
            {/* table Data */}
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
                          <p
                            style={{
                              fontSize: 12,
                              fontWeight: 300,
                              padding: "10px 20px"
                            }}
                          >
                            {/* Akhne Editable test hobe Client ja dite chay tai akhne se
                            bosate parbe */}
                            <input style={{ border: 'none' }} type='text' placeholder='editable text' value={editable} onChange={(e) => setEditable(e.target.value)} />
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                {/* right */}
                <td colSpan={4} style={{ width: "50%", padding: "2px 5px" }}>
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
                            fontWeight: 600,
                            color: "#15242f",
                            padding: "3px 0px",
                            borderBottom: "1px solid #dedfe2",
                            textAlign: "right",
                            width: 100
                          }}
                        >
                          <span style={{ display: "block" }}> {parseInt(selectedData.sub_total) + parseInt(selectedData.vat) + parseInt(selectedData.shipping_cost) + parseInt(selectedData.discount_amount + selectedData.special_discount_amount)}</span>
                        </td>
                      </tr>
                      {/* COD charge */}
                      <tr>
                        <td
                          colSpan={3}
                          style={{
                            fontSize: 12,
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
              <tr>
                <td colSpan={5} style={{ paddingTop: 20 }}>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#000",
                      fontWeight: 400,
                      textAlign: 'justify',
                      padding: '2px 7px'
                    }}
                  >
                    Thanks for choosing
                    <a href="" style={{ color: "#000", fontWeight: 500 }}>
                      Safwah Mart (A concern of Safwah Ltd)
                    </a>
                    . Product return only allowed, if physical damage during delivery
                    with appropriate proof &amp; invoice within 24hrs after receiving
                    the products. (Condition applied) *Total is inclusive of VAT
                    (Calculated as per GO 02/Mushak/2019). This is a system generate
                    invoice and no signature or seal is required.
                  </p>
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: 13,
                      color: "#000",
                      marginTop: 0,
                      paddingLeft: '5px'
                    }}
                  >
                    Helpline: +880 9611-656104(10:30 am-4:30 pm)
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </>


      </div>
    </>
  )
}
