// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
	IconApps,
	IconUserCheck,
	IconBasket,
	IconMessages,
	IconBellRinging,
	IconLayoutKanban,
	IconMail,
	IconCalendar,
	IconNfc
} from '@tabler/icons';
// import { useTranslation } from 'react-i18next';

// constant
const icons = {
	IconApps,
	IconUserCheck,
	IconBasket,
	IconMessages,
	IconLayoutKanban,
	IconBellRinging,
	IconMail,
	IconCalendar,
	IconNfc
};

// ==============================|| APPLICATION MENU ITEMS ||============================== //


const language = localStorage.getItem('i18nextLng');
// debugger;
const application = {
	id: 'application',
	title: <FormattedMessage id={language === 'en-US' ? 'application' : 'প্রাসঙ্গিকতা'} />,
	icon: icons.IconApps,
	type: 'group',
	// eslint-disable-next-line no-sparse-arrays
	children: [
		// {
		//     id: 'customer',
		//     title: <FormattedMessage id="customer" />,
		//     type: 'item',
		//     icon: icons.IconUserCheck,
		//     url: '/dasboard/default',
		// },

		// {
		//     id: 'category types',
		//     title: <FormattedMessage id="category types" />,
		//     type: 'item',
		//     icon: icons.IconUserCheck,
		//     url: '/customer/customer-list',
		//     permission: [
		//         permissions.customers.read,
		//         permissions.customers.create,
		//         permissions.customers.delete,
		//         permissions.customers.update
		//     ]
		// },
		// {
		//     id: 'promotions',
		//     title: 'Promotions',
		//     type: 'item',
		//     icon: icons.IconBellRinging,
		//     url: '/promotions/promtions-lists',
		//     permission: [
		//         permissions.customers.read,
		//         permissions.customers.create,
		//         permissions.customers.delete,
		//         permissions.customers.update
		//     ]
		// },
		// {
		//     // id: 'categorys',
		//     // title: <FormattedMessage id="Categorys" />,
		//     // type: 'collapse',
		//     // icon: icons.IconBasket,
		//     // children: [

		//         // {
		//         //     id: 'category-types',
		//         //     title: <FormattedMessage id="Categorys Types" />,
		//         //     type: 'item',
		//         //     url: '/category-types'
		//         // },
		//         // {
		//         //     id: 'categorys',
		//         //     title: <FormattedMessage id="Categories" />,
		//         //     type: 'item',
		//         //     url: '/category'
		//         // },
		//         // {
		//         //     id: 'brands',
		//         //     title: <FormattedMessage id="Brands" />,
		//         //     type: 'item',
		//         //     url: '/e-commerce/brands'
		//         // },
		//         // {
		//         //     id: 'products',
		//         //     title: <FormattedMessage id="products" />,
		//         //     type: 'item',
		//         //     url: '/e-commerce/products'
		//         // },
		//         // {
		//         //     id: 'product-details',
		//         //     title: <FormattedMessage id="product-details" />,
		//         //     type: 'item',
		//         //     url: '/e-commerce/product-details/1',
		//         //     breadcrumbs: false
		//         // },
		//         // {
		//         //     id: 'product-list',
		//         //     title: <FormattedMessage id="product-list" />,
		//         //     type: 'item',
		//         //     url: '/e-commerce/product-list',
		//         //     breadcrumbs: false
		//         // },
		//         // {
		//         //     id: 'checkout',
		//         //     title: <FormattedMessage id="checkout" />,
		//         //     type: 'item',
		//         //     url: '/e-commerce/checkout'
		//         // }
		//     // ]
		// },

		{
			id: 'order',
			title: <FormattedMessage id="Order" />,
			type: 'collapse',
			icon: icons.IconBasket,
			children: [
				{
					id: 'order-create',
					title: <FormattedMessage id="Order Create" />,
					type: 'item',
					url: '/order-create'
				},
				{
					id: 'order-list',
					title: <FormattedMessage id="Order List" />,
					type: 'item',
					url: '/order-list'
				},
				{
					id: 'productRequest',
					title: <FormattedMessage id="Request List" />,
					type: 'item',
					url: '/productRequest'
				},
			]
		},
		{
			id: 'report',
			title: <FormattedMessage id="Reports" />,
			type: 'collapse',
			icon: icons.IconBasket,
			children: [
				{
					id: 'receivableDue',
					title: <FormattedMessage id="Receivable Due" />,
					type: 'item',
					url: '/receivableDue'
				},
				{
					id: 'productwiseOrder',
					title: <FormattedMessage id="Productwise Order" />,
					type: 'item',
					url: '/productwiseOrder'
				},
				{
					id: 'dailyOrder',
					title: <FormattedMessage id="Daily Order" />,
					type: 'item',
					url: '/dailyOrder'
				},
				{
					id: 'monthlyOrder',
					title: <FormattedMessage id="Monthly Order" />,
					type: 'item',
					url: '/monthlyOrder'
				},
			]
		},
		{
			id: 'purchase',
			title: <FormattedMessage id="Purchase" />,
			type: 'collapse',
			icon: icons.IconBasket,
			children: [
				{
					id: 'add-purchase',
					title: <FormattedMessage id="Add Purchase" />,
					type: 'item',
					url: '/add-purchase'
				},
				{
					id: 'purchase-list',
					title: <FormattedMessage id="Purchase List" />,
					type: 'item',
					url: '/purchase-list'
				}
			]
		},
		{
			id: 'sale',
			title: <FormattedMessage id="Sale" />,
			type: 'collapse',
			icon: icons.IconBasket,
			children: [
				{
					id: 'pos',
					title: <FormattedMessage id="POS" />,
					type: 'item',
					url: '/pos'
				},
				{
					id: 'new-sale',
					title: <FormattedMessage id="NewSale" />,
					type: 'item',
					url: '/new-sale'
				},
				{
					id: 'sale-list',
					title: <FormattedMessage id="Sale List" />,
					type: 'item',
					url: '/sale-list'
				}
			]
		},
		{
			id: 'customer',
			title: <FormattedMessage id="Customer" />,
			type: 'collapse',
			icon: icons.IconBasket,
			children: [
				{
					id: 'customer-types',
					title: <FormattedMessage id="Customer Type" />,
					type: 'item',
					url: '/customer-types'
				},
				{
					id: 'customer',
					title: <FormattedMessage id="Customer" />,
					type: 'item',
					url: '/customer'
				}
			]
		},
		{
			id: 'product',
			title: <FormattedMessage id="Product" />,
			type: 'collapse',
			icon: icons.IconBasket,
			children: [
				{
					id: 'add-product',
					title: <FormattedMessage id="Add Product" />,
					type: 'item',
					url: '/add-product'
				},
				{
					id: 'products',
					title: <FormattedMessage id="Product" />,
					type: 'item',
					url: '/products'
				},
				{
					id: 'productTypes',
					title: <FormattedMessage id="Product Types" />,
					type: 'item',
					url: '/product-types'
				},
				{
					id: 'variation',
					title: <FormattedMessage id="Variation" />,
					type: 'item',
					url: '/variation'
				},
				{
					id: 'variationUpload',
					title: <FormattedMessage id="Variation Upload" />,
					type: 'item',
					url: '/variationUpload'
				},
				{
					id: 'productUpload',
					title: <FormattedMessage id="Product Upload" />,
					type: 'item',
					url: '/productUpload'
				},
				{
					id: 'barcode',
					title: <FormattedMessage id="Barcode" />,
					type: 'item',
					url: '/barcode'
				},
				{
					id: 'offers',
					title: <FormattedMessage id="Offer" />,
					type: 'item',
					url: '/offers'
				},
				{
					id: 'dicounts',
					title: <FormattedMessage id="Discount" />,
					type: 'item',
					url: '/dicounts'
				},
				{
					id: 'brands',
					title: <FormattedMessage id="Brands" />,
					type: 'item',
					url: '/brands'
				},
				{
					id: 'category',
					title: <FormattedMessage id="Category" />,
					type: 'item',
					url: '/category'
				},
				{
					id: 'attributeType',
					title: <FormattedMessage id="Attribute Type" />,
					type: 'item',
					url: '/attribute_type'
				},
				{
					id: 'attribute',
					title: <FormattedMessage id="Attribute" />,
					type: 'item',
					url: '/attribute'
				},
				{
					id: 'highlightType',
					title: <FormattedMessage id="Hightlight Type" />,
					type: 'item',
					url: '/highlight_type'
				},
				{
					id: 'tag',
					title: <FormattedMessage id="Tag" />,
					type: 'item',
					url: '/tag'
				},
				{
					id: 'unit',
					title: <FormattedMessage id="Unit" />,
					type: 'item',
					url: '/unit'
				},

			]
		},
		{
			id: 'Account',
			title: <FormattedMessage id="Account" />,
			type: 'collapse',
			icon: icons.IconBasket,
			children: [
				{
					id: 'account-group',
					title: <FormattedMessage id="Account Group" />,
					type: 'item',
					url: '/account-group'
				},
				{
					id: 'account-control',
					title: <FormattedMessage id="Account control" />,
					type: 'item',
					url: '/account-control'
				},
				{
					id: 'account-subsidary',
					title: <FormattedMessage id="Account subsidary" />,
					type: 'item',
					url: '/account-subsidary'
				},
				{
					id: 'account-charts',
					title: <FormattedMessage id="Account charts" />,
					type: 'item',
					url: '/account-chart'
				}
			]
		},
		{
			id: 'User',
			title: <FormattedMessage id="user" />,
			type: 'collapse',
			icon: icons.IconBasket,
			children: [
				{
					id: 'user-list',
					title: <FormattedMessage id="UserList" />,
					type: 'item',
					url: '/user-list'
				},
			]
		},

		{
			id: 'logistics',
			title: <FormattedMessage id="Logistics" />,
			type: 'collapse',
			icon: icons.IconBasket,
			children: [
				{
					id: 'delivery-man',
					title: <FormattedMessage id="Delivery Man" />,
					type: 'item',
					url: '/delivery-man'
				},
				{
					id: 'supplier',
					title: <FormattedMessage id="Supplier" />,
					type: 'item',
					url: '/supplier'
				},
			]
		},
		{
			id: 'supplyRequest',
			title: <FormattedMessage id="Supply Request" />,
			type: 'collapse',
			icon: icons.IconBasket,
			children: [
				{
					id: 'requestList',
					title: <FormattedMessage id="Request List" />,
					type: 'item',
					url: '/requestList'
				},
			]
		},
		{
			id: 'website',
			title: <FormattedMessage id="Website" />,
			type: 'collapse',
			icon: icons.IconBasket,
			children: [
				{
					id: 'banners',
					title: <FormattedMessage id="Banner" />,
					type: 'item',
					url: '/banners'
				},
				{
					id: 'sliders',
					title: <FormattedMessage id="Slider" />,
					type: 'item',
					url: '/sliders'
				},
				{
					id: 'articles',
					title: <FormattedMessage id="Article" />,
					type: 'item',
					url: '/articles'
				},
				{
					id: 'socialLinks',
					title: <FormattedMessage id="Social Link" />,
					type: 'item',
					url: '/social-links'
				},
				{
					id: 'pages',
					title: <FormattedMessage id="Pages" />,
					type: 'item',
					url: '/pages'
				},
				{
					id: 'corporateForm',
					title: <FormattedMessage id="Corporate Form" />,
					type: 'item',
					url: '/corporateForm'
				},
				{
					id: 'orderByPicture',
					title: <FormattedMessage id="Order By Picture" />,
					type: 'item',
					url: '/orderByPicture'
				},
				{
					id: 'appointmentBooking',
					title: <FormattedMessage id="Appointment Booking" />,
					type: 'item',
					url: '/appointmentBooking'
				},
				{
					id: 'reviews',
					title: <FormattedMessage id="Reviews" />,
					type: 'item',
					url: '/reviews'
				},
				{
					id: 'feedback',
					title: <FormattedMessage id="Feedback" />,
					type: 'item',
					url: '/feedback'
				},
			]
		},
		{
			id: 'config',
			title: <FormattedMessage id="Config" />,
			type: 'collapse',
			icon: icons.IconBasket,
			children: [
				{
					id: 'time-slot',
					title: <FormattedMessage id="Time Slot" />,
					type: 'item',
					url: '/time-slot'
				},
				{
					id: 'return-reason',
					title: <FormattedMessage id="Return Reason" />,
					type: 'item',
					url: '/return-reason'
				},
				{
					id: 'extra-shipping-cost',
					title: <FormattedMessage id="Extra Ship. Cost" />,
					type: 'item',
					url: '/extra-shipping-cost'
				},
				{
					id: 'shipping-cost-discounts',
					title: <FormattedMessage id="Shipping Cost Disc." />,
					type: 'item',
					url: '/shipping-cost-discounts'
				},
				{
					id: 'points',
					title: <FormattedMessage id="Point" />,
					type: 'item',
					url: '/points'
				},
				{
					id: 'coupons',
					title: <FormattedMessage id="Coupon" />,
					type: 'item',
					url: '/coupons'
				},
				{
					id: 'district',
					title: <FormattedMessage id="District" />,
					type: 'item',
					url: '/district'
				},
				{
					id: 'area',
					title: <FormattedMessage id="Area" />,
					type: 'item',
					url: '/area'
				},
				{
					id: 'wareHouse',
					title: <FormattedMessage id="WareHouse" />,
					type: 'item',
					url: '/wareHouse'
				},
				{
					id: 'deliveryDiscount',
					title: <FormattedMessage id="DeliveryDiscount" />,
					type: 'item',
					url: '/deliveryDiscount'
				},
			]
		},
		{
			id: 'settings',
			title: <FormattedMessage id="Settings" />,
			icon: icons.IconBasket,
			type: 'item',
			url: '/settings'
		},
		// {
		//     id: 'purchase',
		//     title: <FormattedMessage id="Purchase" />,
		//     type: 'collapse',
		//     icon: icons.IconBasket,
		//     children: [
		//         {
		//             id: 'add-purchase',
		//             title: <FormattedMessage id="Add Purchase" />,
		//             type: 'item',
		//             url: '/add-purchase'
		//         },
		//         {
		//             id: 'purchase-list',
		//             title: <FormattedMessage id="Purchase List" />,
		//             type: 'item',
		//             url: '/purchase-list'
		//         }
		//     ]
		// },
		{
			id: 'popupNotification',
			title: <FormattedMessage id="Popup Notification" />,
			icon: icons.IconBasket,
			type: 'item',
			url: '/popupNotification'
		},
		// {
		//     id: 'users',
		//     title: <FormattedMessage id="Users" />,
		//     type: 'collapse',
		//     icon: icons.IconUserCheck,
		//     children: [
		//         {
		//             id: 'user',
		//             title: <FormattedMessage id="Users" />,
		//             type: 'item',
		//             url: '/users'
		//         }
		//     ]
		// }

		// {
		//     id: 'mail',
		//     title: <FormattedMessage id="mail" />,
		//     type: 'item',
		//     icon: icons.IconMail,
		//     url: '/app/mail'
		// },
		// {
		//     id: 'calendar',
		//     title: <FormattedMessage id="calendar" />,
		//     type: 'item',
		//     url: '/app/calendar',
		//     icon: icons.IconCalendar,
		//     breadcrumbs: false
		// }
		// {
		//     id: 'contact',
		//     title: <FormattedMessage id="contact" />,
		//     type: 'collapse',
		//     icon: icons.IconNfc,
		//     children: [
		//         {
		//             id: 'c-card',
		//             title: <FormattedMessage id="cards" />,
		//             type: 'item',
		//             url: '/app/contact/c-card',
		//             breadcrumbs: false
		//         },
		//         {
		//             id: 'c-list',
		//             title: <FormattedMessage id="list" />,
		//             type: 'item',
		//             url: '/app/contact/c-list',
		//             breadcrumbs: false
		//         }
		//     ]
		// },
		// {
		//     id: 'e-commerce',
		//     title: <FormattedMessage id="e-commerce" />,
		//     type: 'collapse',
		//     icon: icons.IconBasket,
		//     children: [
		//         {
		//             id: 'products',
		//             title: <FormattedMessage id="products" />,
		//             type: 'item',
		//             url: '/e-commerce/products'
		//         },
		//         {
		//             id: 'product-details',
		//             title: <FormattedMessage id="product-details" />,
		//             type: 'item',
		//             url: '/e-commerce/product-details/1',
		//             breadcrumbs: false
		//         },
		//         {
		//             id: 'product-list',
		//             title: <FormattedMessage id="product-list" />,
		//             type: 'item',
		//             url: '/e-commerce/product-list',
		//             breadcrumbs: false
		//         },
		//         {
		//             id: 'checkout',
		//             title: <FormattedMessage id="checkout" />,
		//             type: 'item',
		//             url: '/e-commerce/checkout'
		//         }
		//     ]
		// }
		,
	]
};

export default application;
