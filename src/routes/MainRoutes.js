import { lazy } from 'react';
// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import Loading from 'ui-component/Loading';
import AddProduct from 'views/application/product/AddProduct/AddProduct';
import Variation from 'views/application/product/Variation';
import VariationEntry from 'views/application/product/VariationEntry';
import ProductUpload from 'views/application/product/ProductUpload';
import Offer from 'views/application/product/Offer';
import Products from 'views/application/product/Products';
import OrderAdd from 'views/application/order/OrderAdd';
import Order from 'views/application/order';
import OrderPos from 'views/application/order/OrderPos';
import OrderPosA4 from 'views/application/order/OrderPosA4';
import OrderPosStatus from 'views/application/order/OrderPosStatus';
import POS from 'views/application/sale/POS';
import NewSale from 'views/application/sale/NewSale';
import SaleList from 'views/application/sale/index';
import Barcode from 'views/application/product/Barcode/index';
import SalePos from 'views/application/sale/SalePos';
import Users from 'views/application/Users';
import Permission from 'views/application/Users/Permission';
// import Category from 'views/application/product/Category';
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
// application e-commerce pages
const AppCategoriesType = Loadable(lazy(() => import('views/application/categories/CategoriesType')));
const AppCategory = Loadable(lazy(() => import('views/application/product/Category')));
const Discount = Loadable(lazy(() => import('views/application/product/Discount')));
const DiscountAdd = Loadable(lazy(() => import('views/application/product/Discount/DiscountAdd')));
const AppBrands = Loadable(lazy(() => import('views/application/product/Brands')));
const Banners = Loadable(lazy(() => import('views/application/website/Banner')));
const Sliders = Loadable(lazy(() => import('views/application/website/Slider')));
const Articles = Loadable(lazy(() => import('views/application/website/Article')));
const SocialLinks = Loadable(lazy(() => import('views/application/website/SocialLink')));
const AppProductType = Loadable(lazy(() => import('views/application/product/ProductType')));
const AppCustomerType = Loadable(lazy(() => import('views/application/product/CustomerType')));
const AppCustomer = Loadable(lazy(() => import('views/application/product/Customer')));
const AttributeType = Loadable(lazy(() => import('views/application/product/AttributeType')));
const Attribute = Loadable(lazy(() => import('views/application/product/Attribute')));
const HighlightType = Loadable(lazy(() => import('views/application/product/HighlightType')));
const Tag = Loadable(lazy(() => import('views/application/product/Tag')));
const Unit = Loadable(lazy(() => import('views/application/product/Unit')));
const Area = Loadable(lazy(() => import('views/application/product/Area')));
const WareHouse = Loadable(lazy(() => import('views/application/product/WareHouse')));
const DeliveryDiscount = Loadable(lazy(() => import('views/application/product/DeliveryDiscount')));
const Settings = Loadable(lazy(() => import('views/application/Settings')));
const PopupNotification = Loadable(lazy(() => import('views/application/PopupNotification')));
const Feedback = Loadable(lazy(() => import('views/application/Feedback')));
const District = Loadable(lazy(() => import('views/application/product/District')));
const TimeSlot = Loadable(lazy(() => import('views/application/product/TimeSlot')));
const ReturnReason = Loadable(lazy(() => import('views/application/product/ReturnReason')));
const ExtraShipCost = Loadable(lazy(() => import('views/application/product/ExtraShipCost')));
const ShipCostDisc = Loadable(lazy(() => import('views/application/product/ShipCostDisc')));
const Point = Loadable(lazy(() => import('views/application/product/Point')));
const Coupon = Loadable(lazy(() => import('views/application/product/Coupon')));
const AccounGroup = Loadable(lazy(() => import('views/application/account/AccountGroup')));
const AccountControl = Loadable(lazy(() => import('views/application/account/AccountControl')));
const AccountSubsidary = Loadable(lazy(() => import('views/application/account/AccountSubsidary')));
const AccountChart = Loadable(lazy(() => import('views/application/account/AccountChart')));
const AppUsers = Loadable(lazy(() => import('views/application/userList/Style1')));
const Purchase = Loadable(lazy(() => import('views/application/Purchase')));
const PurchaseAdd = Loadable(lazy(() => import('views/application/Purchase/PurchaseAdd')));
const DeliveryMan = Loadable(lazy(() => import('views/application/DeliveryMan')));
const Supplier = Loadable(lazy(() => import('views/application/Supplier')));
const Pages = Loadable(lazy(() => import('views/application/Pages')));
const Corporate = Loadable(lazy(() => import('views/application/Form/Corporate')));
const OrderByPicture = Loadable(lazy(() => import('views/application/Form/OrderByPicture')));
const AppointmentBooking = Loadable(lazy(() => import('views/application/Form/AppointmentBooking')));
const SupplyRequest = Loadable(lazy(() => import('views/application/Form/SupplyRequest')));
const Review = Loadable(lazy(() => import('views/application/Form/Review')));
const Request = Loadable(lazy(() => import('views/application/Form/Request')));
// widget routing
const WidgetStatistics = Loadable(
	lazy(() => import('views/widget/Statistics'), {
		fallback: Loading({
			pastDelay: true,
			error: false,
			timedOut: false
		})
	})
);
// application - customer routing
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
	path: '/',
	element: (
		<AuthGuard>
			<MainLayout />
		</AuthGuard>
	),
	children: [
		// {
		//     path: '/dashboard/analytics',
		//     element: <DashboardAnalytics />
		// },
		// {
		//     path: '/customer/customer-list',
		//     element: <PermittedRoute path="/customer/customer-list" component={AppCustomerList} permissions={permissions.customers} />
		// },
		// {
		//     path: '/customer/customer-list/:id',
		//     element: (
		//         <PermittedRoute path="/customer/customer-list/:id" component={AppCustomerDetails} permissions={permissions.customers} />
		//     )
		// },
		// {
		//     path: '/promotions/promtions-lists',
		//     element: (
		//         <PermittedRoute path="/promotions/promtions-lists" component={AppPromotionsLists} permissions={permissions.customers} />
		//     )
		// },
		// {
		//     path: '/promotions/promtions-lists/:id',
		//     element: (
		//         <PermittedRoute path="/promotions/promtions-lists/:id" component={AppPromotionsDetails} permissions={permissions.customers} />
		//     )
		// },
		// {
		//     path: '/e-commerce/products',
		//     element: <AppCustomerProduct />
		// },
		{
			path: '/dashboard',
			element: <DashboardDefault />
		},
		{
			path: '/category-types',
			element: <AppCategoriesType />
		},
		{
			path: '/category',
			element: <AppCategory />
		},
		{
			path: '/products',
			element: <Products />
		},
		{
			path: '/add-product',
			element: <AddProduct />
		},
		{
			path: '/edit-product/:id',
			element: <AddProduct />
		},
		{
			path: '/variationUpload',
			element: <Variation />
		},
		{
			path: '/variation',
			element: <VariationEntry />
		},
		{
			path: '/offers',
			element: <Offer />
		},
		{
			path: '/productUpload',
			element: <ProductUpload />
		},
		{
			path: '/purchase-list',
			element: <Purchase />
		},
		{
			path: '/add-purchase',
			element: <PurchaseAdd />
		},
		{
			path: '/edit-purchase/:id',
			element: <PurchaseAdd />
		},
		{
			path: '/dicounts',
			element: <Discount />
		},
		{
			path: '/discount-add',
			element: <DiscountAdd />
		},
		{
			path: '/product-types',
			element: <AppProductType />
		},
		{
			path: '/customer-types',
			element: <AppCustomerType />
		},
		{
			path: '/customer',
			element: <AppCustomer />
		},
		{
			path: '/brands',
			element: <AppBrands />
		},
		{
			path: '/banners',
			element: <Banners />
		},
		{
			path: '/sliders',
			element: <Sliders />
		},
		{
			path: '/articles',
			element: <Articles />
		},
		{
			path: '/social-links',
			element: <SocialLinks />
		},
		{
			path: '/attribute_type',
			element: <AttributeType />
		},
		{
			path: '/attribute',
			element: <Attribute />
		},
		{
			path: '/highlight_type',
			element: <HighlightType />
		},
		{
			path: '/tag',
			element: <Tag />
		},
		{
			path: '/unit',
			element: <Unit />
		},
		{
			path: '/area',
			element: <Area />
		},
		{
			path: '/district',
			element: <District />
		},
		{
			path: '/time-slot',
			element: <TimeSlot />
		},
		{
			path: '/return-reason',
			element: <ReturnReason />
		},
		{
			path: '/extra-shipping-cost',
			element: <ExtraShipCost />
		},
		{
			path: '/shipping-cost-discounts',
			element: <ShipCostDisc />
		},
		{
			path: '/points',
			element: <Point />
		},
		{
			path: '/coupons',
			element: <Coupon />
		},
		{
			path: '/account-group',
			element: <AccounGroup />
		},
		{
			path: '/account-control',
			element: <AccountControl />
		},
		{
			path: '/account-subsidary',
			element: <AccountSubsidary />
		},
		{
			path: '/account-chart',
			element: <AccountChart />
		},
		{
			path: '/wareHouse',
			element: <WareHouse />
		},
		{
			path: '/deliveryDiscount',
			element: <DeliveryDiscount />
		},
		{
			path: '/settings',
			element: <Settings />
		},
		{
			path: '/popupNotification',
			element: <PopupNotification />
		},
		{
			path: '/users',
			element: <AppUsers />
		},
		{
			path: '/delivery-man',
			element: <DeliveryMan />
		},
		{
			path: '/supplier',
			element: <Supplier />
		},
		{
			path: '/order-create',
			element: <OrderAdd />
		},
		{
			path: '/edit-order/:id',
			element: <OrderAdd />
		},
		{
			path: '/order-list',
			element: <Order />
		},
		{
			path: '/inventory/order/:id',
			element: <OrderPos />
		},
		{
			path: '/inventory/orderA4/:id',
			element: <OrderPosA4 />
		},
		{
			path: '/pos',
			element: <POS />
		},
		{
			path: '/new-sale',
			element: <NewSale />
		},
		{
			path: '/sale-list',
			element: <SaleList />
		},
		{
			path: '/barcode',
			element: <Barcode />
		},
		{
			path: '/inventory/sale/:id',
			element: <SalePos />
		},
		{
			path: '/inventory/sale/normal/:id',
			element: <SalePos />
		},
		{
			path: '/user-list',
			element: <Users />
		},
		{
			path: '/pages',
			element: <Pages />
		},
		{
			path: '/permission-access/:id',
			element: <Permission />
		},
		{
			path: '/corporateForm',
			element: <Corporate />
		},
		{
			path: '/orderByPicture',
			element: <OrderByPicture />
		},
		{
			path: '/appointmentBooking',
			element: <AppointmentBooking />
		},
		{
			path: '/requestList',
			element: <SupplyRequest />
		},
		{
			path: '/reviews',
			element: <Review />
		},
		{
			path: '/productRequest',
			element: <Request />
		},
		{
			path: '/feedback',
			element: <Feedback />
		},
		{
			path: '/order-status/:id',
			element: <OrderPosStatus />
		}
	]
};

export default MainRoutes;
