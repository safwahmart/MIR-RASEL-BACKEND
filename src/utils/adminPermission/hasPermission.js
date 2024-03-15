/* eslint-disable */
export const setPermission = (permissions) => {
	localStorage.setItem('permissions', permissions);
};

export function getPermission() {
	const permissionList = localStorage.getItem('permissions');
	return JSON.parse(permissionList);
}
export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function hasPermission(values) {
	let permissionList = getPermission();
	if (typeof values === 'string') {
		values = [values];
	} else {
		values = Object.values(values);
	}
	const child = values[4]
	const matchMenu = permissionList.filter(res => {
		if (capitalizeFirstLetter(values[0]) === 'Product') {
			return res.name === 'Product' || res.name === "Barcode" || res.name === "Discount" || res.name === 'Brand' || res.name === "Unit Measure" || res.name === "Highlight Type" || res.name === "Product Tag" || res.name === "Offer" || res.name === "Attribute Type" || res.name === "Product Types" || res.name === "Category" || res.name === "Attribute";
		} else if (capitalizeFirstLetter(values[0]) === 'Website') {
			return res.name === "Website CMS";
		} else {
			return res.name === capitalizeFirstLetter(values[0])
		}
	})
	console.log('matchMenu', matchMenu)
	const data = Array.isArray(child) === true && child?.map((el, i) => {
		console.log('childeren', el.id)
		if (el.id === 'order-create') {
			const process = matchMenu.findIndex(res => res.name === 'Order' && res.guard_name === 'index')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'order-list') {
			const process = matchMenu.findIndex(res => res.name === 'Order' && res.guard_name === 'index')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'purchase-list') {
			const process = matchMenu.findIndex(res => res.name === 'Purchase' && res.guard_name === 'index')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'add-purchase') {
			const process = matchMenu.findIndex(res => res.name === 'Purchase' && res.guard_name === 'create')
			if (process !== -1) {
				return true;
			} else {

				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'pos') {
			const process = matchMenu.findIndex(res => res.name === 'Sale' && res.guard_name === 'create')
			if (process !== -1) {
				return true;
			} else {

				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'new-sale') {
			const process = matchMenu.findIndex(res => res.name === 'Sale' && res.guard_name === 'create')
			if (process !== -1) {
				return true;
			} else {

				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'sale-list') {
			const process = matchMenu.findIndex(res => res.name === 'Sale' && res.guard_name === 'index')
			if (process !== -1) {
				return true;
			} else {

				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'customer-types') {
			const process = matchMenu.findIndex(res => res.name === 'Customer' && res.guard_name === 'index')
			if (process !== -1) {
				return true;
			} else {

				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'customer') {
			const process = matchMenu.findIndex(res => res.name === 'Customer' && res.guard_name === 'index')
			if (process !== -1) {
				return true;
			} else {

				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'add-product') {
			const process = matchMenu.findIndex(res => res.name === 'Product' && res.guard_name === 'createProduct')
			if (process !== -1) {
				return true;
			} else {

				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'products') {
			const process = matchMenu.findIndex(res => res.name === 'Product' && res.guard_name === 'index')
			if (process !== -1) {
				return true;
			} else {

				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'productTypes') {
			const process = matchMenu.findIndex(res => res.name === 'Product Types' && res.guard_name === 'index')
			if (process !== -1) {
				return true;
			} else {

				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'variation') {
			const process = matchMenu.findIndex(res => res.name === 'Product' && res.guard_name === 'index')
			if (process !== -1) {
				return true;
			} else {

				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'variationUpload') {
			const process = matchMenu.findIndex(res => res.name === 'Product' && res.guard_name === 'productVariationUpload')
			if (process !== -1) {
				return true;
			} else {

				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'barcode') {
			const process = matchMenu.findIndex(res => res.name === 'Barcode' && res.guard_name === 'index')
			console.log('this is barcode', process)
			if (process !== -1) {
				return true;
			} else {

				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'productUpload') {
			const process = matchMenu.findIndex(res => res.name === 'Product' && res.guard_name === 'index')
			if (process !== -1) {
				return true;
			} else {

				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'offers') {
			const process = matchMenu.findIndex(res => res.name === 'Offer' && res.guard_name === 'index')
			if (process !== -1) {
				return true;
			} else {

				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'dicounts') {
			const process = matchMenu.findIndex(res => res.name === 'Discount' && res.guard_name === 'index')
			if (process !== -1) {
				return true;
			} else {

				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'brands') {
			const process = matchMenu.findIndex(res => res.name === 'Brand' && res.guard_name === 'index')
			if (process !== -1) {
				return true;
			} else {

				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'category') {
			const process = matchMenu.findIndex(res => res.name === 'Category' && res.guard_name === 'index')
			if (process !== -1) {
				return true;
			} else {

				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'attributeType') {
			const process = matchMenu.findIndex(res => res.name === 'Attribute Type' && res.guard_name === 'index')
			console.log('this is barcode2', process)
			if (process !== -1) {
				return true;
			} else {

				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'attribute') {
			const process = matchMenu.findIndex(res => res.name === 'Attribute' && res.guard_name === 'index')
			if (process !== -1) {
				return true;
			} else {

				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'highlightType') {
			const process = matchMenu.findIndex(res => res.name === 'Highlight Type' && res.guard_name === 'index')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'tag') {
			const process = matchMenu.findIndex(res => res.name === 'Product Tag' && res.guard_name === 'index')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'unit') {
			const process = matchMenu.findIndex(res => res.name === 'Unit Measure' && res.guard_name === 'index')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'account-group') {
			const process = matchMenu.findIndex(res => res.name === 'Account Setup' && res.guard_name === 'account_group')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'account-control') {
			const process = matchMenu.findIndex(res => res.name === 'Account Setup' && res.guard_name === 'account_control')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'account-subsidary') {
			const process = matchMenu.findIndex(res => res.name === 'Account Setup' && res.guard_name === 'account_subsidiary')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'account-charts') {
			const process = matchMenu.findIndex(res => res.name === 'Account Setup' && res.guard_name === 'account_chart')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'user-list') {
			const process = matchMenu.findIndex(res => res.name === 'User' && res.guard_name === 'user')
			return true
			// if (process !== -1) {
			//     return true;
			// } else {
			//     values[4].splice(i, 1);
			//     return false
			// }
		} else if (el.id === 'permission-access') {
			const process = matchMenu.findIndex(res => res.name === 'Access Panel' && res.guard_name === 'permissionAccess')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'banners') {
			const process = matchMenu.findIndex(res => res.name === 'Website CMS' && res.guard_name === 'banners')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'sliders') {
			const process = matchMenu.findIndex(res => res.name === 'Website CMS' && res.guard_name === 'sliders')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'articles') {
			const process = matchMenu.findIndex(res => res.name === 'Website CMS' && res.guard_name === 'articles')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'reviews') {
			const process = matchMenu.findIndex(res => res.name === 'Website CMS' && res.guard_name === 'reviews')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'socialLinks') {
			const process = matchMenu.findIndex(res => res.name === 'Website CMS' && res.guard_name === 'social_links')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'appointmentBooking') {
			const process = matchMenu.findIndex(res => res.name === 'Website CMS' && res.guard_name === 'appointmentBooking')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'orderByPicture') {
			const process = matchMenu.findIndex(res => res.name === 'Website CMS' && res.guard_name === 'orderByPicture')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'corporateForm') {
			const process = matchMenu.findIndex(res => res.name === 'Website CMS' && res.guard_name === 'corporateForm')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'feedback') {
			const process = matchMenu.findIndex(res => res.name === 'Website CMS' && res.guard_name === 'feedback')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'requestList') {
			const process = matchMenu.findIndex(res => res.name === 'SupplyRequest' && res.guard_name === 'supply_request')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'productRequest') {
			const process = matchMenu.findIndex(res => res.name === 'Order' && res.guard_name === 'productRequest')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'time-slot') {
			const process = matchMenu.findIndex(res => res.name === 'Config' && res.guard_name === 'time-slot')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'return-reason') {
			const process = matchMenu.findIndex(res => res.name === 'Config' && res.guard_name === 'return-reason')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'extra-shipping-cost') {
			const process = matchMenu.findIndex(res => res.name === 'Config' && res.guard_name === 'extra-shipping-cost')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'shipping-cost-discounts') {
			const process = matchMenu.findIndex(res => res.name === 'Config' && res.guard_name === 'shipping-cost-discounts')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'points') {
			const process = matchMenu.findIndex(res => res.name === 'Config' && res.guard_name === 'points')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'coupons') {
			const process = matchMenu.findIndex(res => res.name === 'Config' && res.guard_name === 'coupons')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'district') {
			const process = matchMenu.findIndex(res => res.name === 'Config' && res.guard_name === 'district')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'area') {
			const process = matchMenu.findIndex(res => res.name === 'Config' && res.guard_name === 'area')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'wareHouse') {
			const process = matchMenu.findIndex(res => res.name === 'Config' && res.guard_name === 'wareHouse')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'deliveryDiscount') {
			const process = matchMenu.findIndex(res => res.name === 'Config' && res.guard_name === 'deliveryDiscount')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'pages') {
			const process = matchMenu.findIndex(res => res.name === "Website CMS" && res.guard_name === 'pages')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'articles') {
			const process = matchMenu.findIndex(res => res.name === "Website CMS" && res.guard_name === 'articles')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'banners') {
			const process = matchMenu.findIndex(res => res.name === "Website CMS" && res.guard_name === 'banners')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		}
		else if (el.id === 'receivableDue') {
			const process = matchMenu.findIndex(res => res.name === 'Report' && res.guard_name === 'receivableDue')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'productwiseOrder') {
			const process = matchMenu.findIndex(res => res.name === 'Report' && res.guard_name === 'productwiseOrder')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'dailyOrder') {
			const process = matchMenu.findIndex(res => res.name === 'Report' && res.guard_name === 'dailyOrder')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'monthlyOrder') {
			const process = matchMenu.findIndex(res => res.name === 'Report' && res.guard_name === 'monthlyOrder')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else if (el.id === 'deliveryDiscount') {
			const process = matchMenu.findIndex(res => res.name === 'Order' && res.guard_name === 'index')
			if (process !== -1) {
				return true;
			} else {
				values[4].splice(i, 1);
				return false
			}
		} else {
			values[4].splice(i, 1);
			return false
		}
	})
	if (child.length > 0) {
		return true;
	} else {
		return false;
	}
	// console.log('process', values[0], child)
	// return data;
	// if (requiredAll) {
	//     return values.every((el) => permissionList.includes(el));
	// } else {
	//     return values.some((el) => permissionList?.includes(el));
	// }
}

export default hasPermission;
