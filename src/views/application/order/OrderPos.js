import PrintIcon from '@mui/icons-material/Print';
import { baseUrl } from 'api/apiConfig';
import { headers } from 'api/auth';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './posStyle.css';

export default function OrderPos() {
	const [selectedData, setSelectedData] = useState({});
	const [setting, setSetting] = useState({});
	const [editable, setEditable] = useState('');
	const [selectedProductData, setSelectedProductData] = useState([]);
	const { id } = useParams();
	useEffect(() => {
		if (id) {
			getOrderInfo(id);
			getOrderProductInfo(id);
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

	const Print = () => {
		// debugger;
		//console.log('print');  
		let printContents = document.getElementById('printablediv').innerHTML;
		let originalContents = document.body.innerHTML;
		document.body.innerHTML = printContents;
		window.print();
		document.body.innerHTML = originalContents;
	}
	console.log('selected', selectedData)
	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'space-around', cursor: 'pointer' }}>
				<PrintIcon sx={{ fontSize: '1.3rem' }} onClick={() => Print()} />
			</div>
			<div id='printablediv' style={{ backgroundColor: '#e0e0e0', margin: '30px 0' }}>
				{/* header part */}
				<table
					border={0}
					cellPadding={0}
					cellSpacing={0}
					role="presentation"
					style={{
						background: "#fff",
						width: 300,
						margin: "0 auto",
						padding: "0 5px"
					}}
				>
					{/* head */}
					<thead>
						<tr>
							<th colSpan={2} style={{ paddingBottom: 0, position: "relative" }}>
								<h4
									style={{
										fontSize: 16,
										fontWeight: 800,
										// lineHeight: 30,
										borderBottom: "1px solid #000",
										color: "#000",
										paddingTop: 10,
										display: "inline-block"
									}}
								>
									{setting.company_name}
								</h4>
								<p
									style={{
										fontWeight: 600,
										fontSize: 9,
										// lineHeight: 16,
										color: "#000",
										marginTop: 5
									}}
								>
									{setting.address}
								</p>
								<a
									href="https://safwahmart.com/"
									style={{
										fontSize: 13,
										// lineHeight: 20,
										color: "#000",
										fontWeight: 700
									}}
								>
									{setting.website_link}
								</a>
								{/* invoice */}
								<div
									style={{ position: "absolute", top: 5, left: 5, textAlign: "left" }}
								>
									<h5
										style={{
											fontSize: 9,
											// lineHeight: 16,
											color: "#000",
											fontWeight: 500
										}}
									>
										Date: <span style={{ fontWeight: 700 }}> 02 Jan 2024 </span>
									</h5>
									<h5
										style={{
											fontSize: 9,
											// lineHeight: 15,
											color: "#000",
											fontWeight: 600
										}}
									>
										Invoice No. <span style={{ fontWeight: 700 }}>{selectedData.invoice_no} </span>
									</h5>
								</div>
								{/* customer Copy */}
								<div
									style={{
										position: "absolute",
										top: 10,
										right: 10,
										textAlign: "left"
									}}
								>
									<h5
										style={{
											fontSize: 9,
											// lineHeight: 16,
											color: "#000",
											fontWeight: 700
										}}
									>
										Customer Copy
									</h5>
								</div>
							</th>
						</tr>
					</thead>
					{/* body */}
					<tbody>
						{/*  */}
						<tr>
							<td colSpan={2} style={{ padding: "5px 10px" }}>
								<h4
									style={{
										fontWeight: 700,
										color: "#000",
										fontSize: 9,
										// lineHeight: 15,
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
							<td style={{ padding: "0px 10px" }}>
								<h5
									style={{
										fontSize: 9,
										// lineHeight: 15,
										fontWeight: 600,
										color: "#15242f",
										marginBottom: 2
									}}
								>
									Cus. Name:
									<span style={{ fontWeight: 700 }}>{selectedData.customer_name}</span>
								</h5>
								<h5
									style={{
										fontSize: 9,
										// lineHeight: 15,
										fontWeight: 600,
										color: "#15242f",
										marginBottom: 2
									}}
								>
									Customer Mobile:{" "}
									<span style={{ fontWeight: 700 }}>{selectedData.phone}</span>
								</h5>
								<h5
									style={{
										fontSize: 9,
										// lineHeight: 15,
										fontWeight: 600,
										color: "#15242f",
										marginBottom: 2
									}}
								>
									<span style={{ fontWeight: 700 }}>Delivery Address:</span> {selectedData.address}
								</h5>
							</td>
							<td style={{ textAlign: "right", padding: "0px 10px" }}>
								<h5
									style={{
										fontSize: 9,
										// lineHeight: 15,
										fontWeight: 600,
										color: "#000"
									}}
								>
									<span style={{ fontWeight: 700 }}> Online Payment </span>
								</h5>
								<h5
									style={{
										fontSize: 9,
										// lineHeight: 15,
										fontWeight: 600,
										color: "#000"
									}}
								>
									Order Date &amp; Time:
									<span style={{ fontWeight: 700 }}> {moment(selectedData.date).format('Do MMM YYYY')}</span>
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
						width: 300,
						margin: "0 auto",
						padding: "0 10px",
						paddingTop: 8,
						paddingBottom: 10
					}}
				>
					<thead>
						<tr>
							<th
								style={{
									fontSize: 9,
									// lineHeight: 15,
									fontWeight: 700,
									color: "#15242f",
									padding: 3,
									borderBottom: "1px solid #dedfe2",
									textAlign: "left",
									width: "40%"
								}}
							>
								Product Name
							</th>
							<th
								style={{
									fontSize: 9,
									// lineHeight: 15,
									fontWeight: 700,
									color: "#15242f",
									padding: 3,
									borderBottom: "1px solid #dedfe2"
								}}
							>
								Qty
							</th>
							<th
								style={{
									fontSize: 9,
									// lineHeight: 15,
									fontWeight: 700,
									color: "#15242f",
									padding: 3,
									borderBottom: "1px solid #dedfe2"
								}}
							>
								Price (TK)
							</th>
							<th
								style={{
									fontSize: 9,
									// lineHeight: 15,
									fontWeight: 700,
									color: "#15242f",
									padding: 3,
									borderBottom: "1px solid #dedfe2"
								}}
							>
								D. Amount (TK)
							</th>
							<th
								style={{
									fontSize: 9,
									// lineHeight: 15,
									fontWeight: 700,
									color: "#15242f",
									padding: 3,
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
										fontSize: 9,
										// lineHeight: 15,
										fontWeight: 500,
										color: "#000",
										padding: 3,
										borderBottom: "1px solid #dedfe2",
										textAlign: "left",
										width: "40%"
									}}
								>
									{index + 1}.{res.product_name}
									(sku-{res.product_sku})
								</td>
								<td
									style={{
										fontSize: 9,
										// lineHeight: 15,
										fontWeight: 500,
										color: "#000",
										padding: 3,
										borderBottom: "1px solid #dedfe2",
										textAlign: "center"
									}}
								>
									{res.qty}
								</td>
								<td
									style={{
										fontSize: 9,
										// lineHeight: 15,
										fontWeight: 500,
										color: "#000",
										padding: 3,
										borderBottom: "1px solid #dedfe2",
										textAlign: "center"
									}}
								>
									{res.unit_price}
								</td>
								<td
									style={{
										fontSize: 9,
										// lineHeight: 15,
										fontWeight: 500,
										color: "#000",
										padding: 3,
										borderBottom: "1px solid #dedfe2",
										textAlign: "center"
									}}
								>
									0
								</td>
								<td
									style={{
										fontSize: 9,
										// lineHeight: 15,
										fontWeight: 500,
										color: "#000",
										padding: 3,
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
														fontSize: 9,
														fontWeight: 500,
														// lineHeight: 15,
														padding: 10
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
													fontSize: 11,
													// lineHeight: 18,
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
													fontSize: 11,
													// lineHeight: 18,
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
													fontSize: 11,
													// lineHeight: 18,
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
													fontSize: 11,
													// lineHeight: 18,
													fontWeight: 600,
													color: "#15242f",
													padding: "3px 0px",
													borderBottom: "1px solid #dedfe2",
													textAlign: "right",
													width: 100
												}}
											>
												{console.log('datapost', selectedData)}
												<span style={{ display: "block" }}> {parseInt(selectedData.sub_total) + parseInt(selectedData.vat)}</span>
											</td>
										</tr>
										{/* shipping cost */}
										<tr>
											<td
												colSpan={3}
												style={{
													fontSize: 9,
													// lineHeight: 15,
													fontWeight: 500,
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
													fontSize: 9,
													// lineHeight: 15,
													fontWeight: 500,
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
													fontSize: 9,
													// lineHeight: 15,
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
													fontSize: 9,
													// lineHeight: 15,
													fontWeight: 600,
													color: "#15242f",
													padding: "3px 0px",
													borderBottom: "1px solid #dedfe2",
													textAlign: "right",
													width: 100
												}}
											>
												<span style={{ display: "block" }}> {parseInt(selectedData.sub_total) ?? 0 + parseInt(selectedData.vat) ?? 0 + parseInt(selectedData.shipping_cost) ?? 0 + parseInt(selectedData.discount_amount) ?? 0 + parseInt(selectedData.special_discount_amount) ?? 0}</span>
											</td>
										</tr>
										{/* COD charge */}
										<tr>
											<td
												colSpan={3}
												style={{
													fontSize: 9,
													// lineHeight: 15,
													fontWeight: 500,
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
													fontSize: 9,
													// lineHeight: 15,
													fontWeight: 500,
													color: "#000",
													padding: "3px 0px",
													borderBottom: "1px solid #dedfe2",
													textAlign: "right",
													width: 100
												}}
											>
												<span style={{ display: "block" }}> {selectedData.cod_charge}</span>
												<span style={{ display: "block" }}> {selectedData.payable}</span>
												<span style={{ display: "block" }}> {selectedData.paid_amount} </span>
											</td>
										</tr>
										{/* shipping cost */}
										<tr>
											<td
												colSpan={3}
												style={{
													fontSize: 11,
													// lineHeight: 16,
													fontWeight: 700,
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
													fontSize: 12,
													// lineHeight: 16,
													fontWeight: 700,
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
										fontSize: 9,
										// lineHeight: 16,
										color: "#000",
										fontWeight: 500
									}}
								>
									Thanks for choosing <a href="" style={{ color: "#000", fontWeight: 500 }}>
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
										fontSize: 11,
										// lineHeight: 26,
										color: "#000",
										marginTop: 0
									}}
								>
									Helpline: +880 9611-656104(10:30 am-4:30 pm)
								</p>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	)
}
