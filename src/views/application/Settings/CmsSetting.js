import React, { useEffect, useState } from 'react';
import { Button, Grid, Switch, TextField, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import axios from 'axios';
import { headers } from 'api/auth';
import { baseUrl } from 'api/apiConfig';
import { useToast } from 'hooks/useToast';
import { useTranslation } from 'react-i18next';

const validationSchema = Yup.object().shape({
    // product_show_per_page: Yup.number().required('Minimum Order Amount is required'),
    // maximum_order_amount: Yup.number().required('Maximum Order Amount is required')
});

const CmsSetting = () => {
    const showToast = useToast();
    const [existingData, setExistingData] = useState(null);
    const { t } = useTranslation();

    const [isCartOnTop, setIsCartOnTop] = useState(false);
    const [isCartOnRightSide, setIsCartOnRightSide] = useState(false);
    const [isHomePageSliderSection, setIsHomePageSliderSection] = useState(false);
    const [isAdvertiseTwoPhotos, setIsAdvertiseTwoPhotos] = useState(false);
    const [isProductCategorySection, setIsProductCategorySection] = useState(false);
    const [isThreeFormsPhotos, setIsThreeFormsPhotos] = useState(false);
    const [isHighlightedProductSection, setIsHighlightedProductSection] = useState(false);
    const [isHighlightedBrandSection, setIsHighlightedBrandSection] = useState(false);
    const [isTestimonialSection, setIsTestimonialSection] = useState(false);
    const [isArticleSection, setIsArticleSection] = useState(false);
    const [isSubscriberSection, setIsSubscriberSection] = useState(false);
    const [isServicesSection, setIsServicesSection] = useState(false);
    const [isTimeSlot, setIsTimeSlot] = useState(false);
    const [isDeliveryDate, setIsDeliveryDate] = useState(false);
    const [isHeaderHome, setIsHeaderHome] = useState(false);
    const [isHeaderApp, setIsHeaderApp] = useState(false);
    const [isHeaderHelp, setIsHeaderHelp] = useState(false);
    const [isHeaderTrackOrder, setIsHeaderTrackOrder] = useState(false);
    const [isHeaderSupplyProduct, setIsHeaderSupplyProduct] = useState(false);
    const [isHeaderDeliveryTimeAndLocation, setIsHeaderDeliveryTimeAndLocation] = useState(false);
    const [isHeaderLanguage, setIsHeaderLanguage] = useState(false);
    const [isHeaderSignInOption, setIsHeaderSignInOption] = useState(false);
    const [isDownloadGoogleApp, setIsDownloadGoogleApp] = useState(false);
    const [isDownloadIOSApp, setIsDownloadIOSApp] = useState(false);
    const [isFacebookLogin, setIsFacebookLogin] = useState(false);
    const [isGoogleLogin, setIsGoogleLogin] = useState(false);
    const [isPoint, setIsPoint] = useState(false);
    const [isReturnOrder, setIsReturnOrder] = useState(false);
    const [isWallet, setIsWallet] = useState(false);
    const [isBrandActive, setIsBrandActive] = useState(false);
    const [isDeliveryDateTimeInPrint, setIsDeliveryDateTimeInPrint] = useState(false);
    const [isSaleBy, setIsSaleBy] = useState(false);
    const [isBinMusakPrint, setIsBinMusakPrint] = useState(false);
    const [isCODChargePrint, setIsCODChargePrint] = useState(false);
    const [isAllProductCategory, setIsAllProductCategory] = useState(false);
    const [loadingImage, setLoadingImage] = useState(null);
    const [isTopShop, setIsTopShop] = useState(null);
    const [isTopBrand, setIsTopBrand] = useState(null);
    const [isTopWishList, setIsTopWishList] = useState(null);
    const [isTopNotice, setIsTopNotice] = useState(null);
    const [offerPrice, setOfferPrice] = useState(null);
    const [appPrice, setAppPrice] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [discount, setDiscount] = useState(null);
    const [flatDiscount, setFlatDiscount] = useState(null);

    const [initialValues, setInitialValues] = useState({
        product_show_per_page: 0,
        notification_popup_display_limit: 0,
        top_advertisement: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/settings`, {
                    headers: headers
                });

                console.log('zres====', response.data.data[0]);

                if (response.data.data) {
                    setExistingData(response.data.data[0]);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    console.log('existdata=======', existingData);

    useEffect(() => {
        if (existingData) {
            setIsCartOnTop(existingData.cart_on_top === '1');
            setIsTopShop(existingData.shop_on_top === '1');
            setIsTopBrand(existingData.brand_on_top === '1');
            setIsTopWishList(existingData.wishlist_on_top === '1');
            setIsTopNotice(existingData.notice_on_top === '1');
            setIsCartOnRightSide(existingData.cart_on_right_side === '1');
            setIsHomePageSliderSection(existingData.home_page_slider_section === '1');
            setIsAdvertiseTwoPhotos(existingData.advertise_two_section === '1');
            setIsProductCategorySection(existingData.product_category_section === '1');
            setIsThreeFormsPhotos(existingData.three_forms_photos === '1');
            setIsHighlightedProductSection(existingData.highlighted_product_section === '1');
            setIsHighlightedBrandSection(existingData.highlighted_brand_section === '1');
            setIsTestimonialSection(existingData.testimonial_section === '1');
            setIsArticleSection(existingData.article_section === '1');
            setIsSubscriberSection(existingData.subscriber_section === '1');
            setIsServicesSection(existingData.services_section === '1');
            setIsTimeSlot(existingData.time_slot === '1');
            setIsDeliveryDate(existingData.delivery_date === '1');
            setIsHeaderHome(existingData.header_home === '1');
            setIsHeaderApp(existingData.header_app === '1');
            setIsHeaderHelp(existingData.header_help === '1');
            setIsHeaderTrackOrder(existingData.header_track_order === '1');
            setIsHeaderSupplyProduct(existingData.header_supply_product === '1');
            setIsHeaderDeliveryTimeAndLocation(existingData.header_delivery_time === '1');
            setIsHeaderLanguage(existingData.header_language === '1');
            setIsHeaderSignInOption(existingData.header_sign_in_option === '1');
            setIsDownloadGoogleApp(existingData.download_google_app === '1');
            setIsDownloadIOSApp(existingData.download_ios_app === '1');
            setIsFacebookLogin(existingData.facebook_login === '1');
            setIsGoogleLogin(existingData.google_login === '1');
            setIsPoint(existingData.point === '1');
            setIsReturnOrder(existingData.return_order === '1');
            setIsWallet(existingData.wallet === '1');
            setIsBrandActive(existingData.brand_active === '1');
            setIsDeliveryDateTimeInPrint(existingData.delivery_date_time_in_print === '1');
            setIsSaleBy(existingData.sale_by === '1');
            setIsBinMusakPrint(existingData.bin_musak_print === '1');
            setIsCODChargePrint(existingData.cod_charge_print === '1');
            setIsAllProductCategory(existingData.all_product_category === '1');
            setOfferPrice(existingData.offer_price === '1');
            setAppPrice(existingData.app_price === '1');
            setQuantity(existingData.quantity === '1');
            setDiscount(existingData.discount === '1');
            setFlatDiscount(existingData.flat_discount === '1');
            setLoadingImage(existingData.loading_image || null);

            setInitialValues(() => ({
                product_show_per_page: existingData.product_show_per_page || 0,
                top_advertisement: existingData.top_advertisement || '',
                notification_popup_display_limit: existingData.notification_popup_display_limit || 0,
                theme_color: existingData.theme_color || '#000000',
                product_hover_color: existingData.product_hover_color || '#000000',
                cart_on_top: existingData.cart_on_top || '',
                cart_on_right_side: existingData.cart_on_right_side || '',
                loading_image: existingData.loading_image || '',
                home_page_slider_section: existingData.home_page_slider_section || '',
                advertise_two_section: existingData.advertise_two_section || '',
                product_category_section: existingData.product_category_section || '',
                three_forms_photos: existingData.three_forms_photos || '',
                highlighted_product_section: existingData.highlighted_product_section || '',
                highlighted_brand_section: existingData.highlighted_brand_section || '',
                testimonial_section: existingData.testimonial_section || '',
                article_section: existingData.article_section || '',
                subscriber_section: existingData.subscriber_section || '',
                services_section: existingData.services_section || '',
                time_slot: existingData.time_slot || '',
                delivery_date: existingData.delivery_date || '',
                header_home: existingData.header_home || '',
                header_app: existingData.header_app || '',
                header_help: existingData.header_help || '',
                header_track_order: existingData.header_track_order || '',
                header_supply_product: existingData.header_supply_product || '',
                header_delivery_time: existingData.header_delivery_time || '',
                header_language: existingData.header_language || '',
                header_sign_in_option: existingData.header_sign_in_option || '',
                download_google_app: existingData.download_google_app || '',
                download_ios_app: existingData.download_ios_app || '',
                facebook_login: existingData.facebook_login || '',
                google_login: existingData.google_login || '',
                point: existingData.point || '',
                return_order: existingData.return_order || '',
                wallet: existingData.wallet || '',
                brand_active: existingData.brand_active || '',
                delivery_date_time_in_print: existingData.delivery_date_time_in_print || '',
                sale_by: existingData.sale_by || '',
                bin_musak_print: existingData.bin_musak_print || '',
                cod_charge_print: existingData.cod_charge_print || '',
                all_product_category: existingData.all_product_category || '',
                point_rate: existingData.point_rate || '',
                minimum_point_for_withdraw: existingData.minimum_point_for_withdraw || ''
            }));
        }
    }, [existingData]);

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('product_show_per_page', values.product_show_per_page);
            formData.append('top_advertisement', values.top_advertisement);
            formData.append('notification_popup_display_limit', values.notification_popup_display_limit);
            formData.append('theme_color', values.theme_color);
            formData.append('product_hover_color', values.product_hover_color);
            formData.append('loading_image', loadingImage);
            formData.append('cart_on_top', isCartOnTop ? 1 : 0);
            formData.append('shop_on_top', isTopShop ? 1 : 0);
            formData.append('brand_on_top', isTopBrand ? 1 : 0);
            formData.append('wishlist_on_top', isTopWishList ? 1 : 0);
            formData.append('notice_on_top', isTopNotice ? 1 : 0);
            formData.append('offer_price', offerPrice ? 1 : 0);
            formData.append('app_price', appPrice ? 1 : 0);
            formData.append('quantity', quantity ? 1 : 0);
            formData.append('discount', discount ? 1 : 0);
            formData.append('flat_discount', flatDiscount ? 1 : 0);
            formData.append('cart_on_right_side', isCartOnRightSide ? 1 : 0);
            formData.append('home_page_slider_section', isHomePageSliderSection ? 1 : 0);
            formData.append('advertise_two_section', isAdvertiseTwoPhotos ? 1 : 0);
            formData.append('product_category_section', isProductCategorySection ? 1 : 0);
            formData.append('three_forms_photos', isThreeFormsPhotos ? 1 : 0);
            formData.append('highlighted_product_section', isHighlightedProductSection ? 1 : 0);
            formData.append('highlighted_brand_section', isHighlightedBrandSection ? 1 : 0);
            formData.append('testimonial_section', isTestimonialSection ? 1 : 0);
            formData.append('article_section', isArticleSection ? 1 : 0);
            formData.append('subscriber_section', isSubscriberSection ? 1 : 0);
            formData.append('services_section', isServicesSection ? 1 : 0);
            formData.append('time_slot', isTimeSlot ? 1 : 0);
            formData.append('delivery_date', isDeliveryDate ? 1 : 0);
            formData.append('header_home', isHeaderHome ? 1 : 0);
            formData.append('header_app', isHeaderApp ? 1 : 0);
            formData.append('header_help', isHeaderHelp ? 1 : 0);
            formData.append('header_track_order', isHeaderTrackOrder ? 1 : 0);
            formData.append('header_supply_product', isHeaderSupplyProduct ? 1 : 0);
            formData.append('header_delivery_time', isHeaderDeliveryTimeAndLocation ? 1 : 0);
            formData.append('header_language', isHeaderLanguage ? 1 : 0);
            formData.append('header_sign_in_option', isHeaderSignInOption ? 1 : 0);
            formData.append('download_google_app', isDownloadGoogleApp ? 1 : 0);
            formData.append('download_ios_app', isDownloadIOSApp ? 1 : 0);
            formData.append('facebook_login', isFacebookLogin ? 1 : 0);
            formData.append('google_login', isGoogleLogin ? 1 : 0);
            formData.append('point', isPoint ? 1 : 0);
            formData.append('return_order', isReturnOrder ? 1 : 0);
            formData.append('wallet', isWallet ? 1 : 0);
            formData.append('brand_active', isBrandActive ? 1 : 0);
            formData.append('delivery_date_time_in_print', isDeliveryDateTimeInPrint ? 1 : 0);
            formData.append('sale_by', isSaleBy ? 1 : 0);
            formData.append('bin_musak_print', isBinMusakPrint ? 1 : 0);
            formData.append('cod_charge_print', isCODChargePrint ? 1 : 0);
            formData.append('all_product_category', isAllProductCategory ? 1 : 0);

            const url = existingData ? `${baseUrl}/settings/${existingData.id}` : `${baseUrl}/settings`;

            if (existingData && Object.keys(existingData).length > 0) {
                formData.append('_method', 'PUT');
            }

            const response = await axios.post(url, formData, {
                headers: headers
            });

            if (existingData) {
                if (response.status === 200) {
                    showToast('Update Successfully', 'success');
                } else {
                    showToast('Update Failed', 'error');
                }
            } else {
                if (response.status === 201) {
                    showToast('Create Successfully', 'success');
                    // Reload the page after successful creation
                    window.location.reload();
                } else {
                    showToast('Create Failed', 'error');
                }
            }

        } catch (error) {
            showToast(error.response?.data?.errors[0] || 'An error occurred.', 'error');
        }
    };

    const handleImage = (e) => {
        const selectedFile = e.target.files[0];

        setLoadingImage(URL.createObjectURL(selectedFile));
    };

    console.log('loadImg', loadingImage);

    return (
        <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, values, handleChange, setFieldValue }) => (
                <Form>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Theme color')}</Typography>
                            </Grid>
                            <Grid item>
                                <input type="color" name="theme_color" onChange={handleChange} value={values.theme_color} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Product Hover color')}</Typography>
                            </Grid>
                            <Grid item>
                                <input type="color" name="product_hover_color" onChange={handleChange} value={values.product_hover_color} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field name="product_show_per_page">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label={t('Product show per page')}
                                        value={values.product_show_per_page}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={Boolean(errors.product_show_per_page && touched.product_show_per_page)}
                                        helperText={touched.product_show_per_page && errors.product_show_per_page}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="notification_popup_display_limit">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label={t('Notification Popup Display Limit(Min)')}
                                        value={values.notification_popup_display_limit}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={Boolean(errors.notification_popup_display_limit && touched.notification_popup_display_limit)}
                                        helperText={touched.notification_popup_display_limit && errors.notification_popup_display_limit}
                                    />
                                )}
                            </Field>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Field name="top_advertisement">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        multiline
                                        rows={3}
                                        label={t('Top Advertisement')}
                                        value={values.top_advertisement}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={Boolean(errors.top_advertisement && touched.top_advertisement)}
                                        helperText={touched.top_advertisement && errors.top_advertisement}
                                    />
                                )}
                            </Field>
                        </Grid>
                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Loading image')}</Typography>
                            </Grid>
                            <Grid item>
                                <input type="file" name="loading_image" onChange={(e) => { handleImage(e); setFieldValue('company_logo', e.target.files[0]) }} />
                            </Grid>
                            <Grid item>
                                {loadingImage && (
                                    <div>
                                        <Typography variant="caption">{t('Selected Image Preview:')}</Typography>
                                        <img src={loadingImage} alt="Loading Preview" style={{ maxWidth: '100%', marginTop: '8px' }} />
                                    </div>
                                )}
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Cart on top')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isCartOnTop}
                                    onChange={() => setIsCartOnTop((prevValue) => !prevValue)}
                                    color="primary"
                                    name="cart_on_top"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Shop on top')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isTopShop}
                                    onChange={() => setIsTopShop((prevValue) => !prevValue)}
                                    color="primary"
                                    name="shop_on_top"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Brand on top')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isTopBrand}
                                    onChange={() => setIsTopBrand((prevValue) => !prevValue)}
                                    color="primary"
                                    name="brand_on_top"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Wishlist on top')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isTopWishList}
                                    onChange={() => setIsTopWishList((prevValue) => !prevValue)}
                                    color="primary"
                                    name="wishlist_on_top"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Top Notice')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isTopNotice}
                                    onChange={() => setIsTopNotice((prevValue) => !prevValue)}
                                    color="primary"
                                    name="notice_on_top"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Cart on right side')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isCartOnRightSide}
                                    onChange={() => setIsCartOnRightSide((prevValue) => !prevValue)}
                                    color="primary"
                                    name="cart_on_right_side"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Home page slider section')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isHomePageSliderSection}
                                    onChange={() => setIsHomePageSliderSection((prevValue) => !prevValue)}
                                    color="primary"
                                    name="home_page_slider_section"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Advertise two photos')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isAdvertiseTwoPhotos}
                                    onChange={() => setIsAdvertiseTwoPhotos((prevValue) => !prevValue)}
                                    color="primary"
                                    name="advertise_two_section"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Product category section')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isProductCategorySection}
                                    onChange={() => setIsProductCategorySection((prevValue) => !prevValue)}
                                    color="primary"
                                    name="product_category_section"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Three forms photos')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isThreeFormsPhotos}
                                    onChange={() => setIsThreeFormsPhotos((prevValue) => !prevValue)}
                                    color="primary"
                                    name="three_forms_photos"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Highlighted product section')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isHighlightedProductSection}
                                    onChange={() => setIsHighlightedProductSection((prevValue) => !prevValue)}
                                    color="primary"
                                    name="highlighted_product_section"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Highlighted brand section')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isHighlightedBrandSection}
                                    onChange={() => setIsHighlightedBrandSection((prevValue) => !prevValue)}
                                    color="primary"
                                    name="highlighted_brand_section"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Testimonial section')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isTestimonialSection}
                                    onChange={() => setIsTestimonialSection((prevValue) => !prevValue)}
                                    color="primary"
                                    name="testimonial_section"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Article section')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isArticleSection}
                                    onChange={() => setIsArticleSection((prevValue) => !prevValue)}
                                    color="primary"
                                    name="article_section"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Subscriber section')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isSubscriberSection}
                                    onChange={() => setIsSubscriberSection((prevValue) => !prevValue)}
                                    color="primary"
                                    name="subscriber_section"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Services section')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isServicesSection}
                                    onChange={() => setIsServicesSection((prevValue) => !prevValue)}
                                    color="primary"
                                    name="services_section"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Time Slot')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isTimeSlot}
                                    onChange={() => setIsTimeSlot((prevValue) => !prevValue)}
                                    color="primary"
                                    name="time_slot"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Delivery Date')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isDeliveryDate}
                                    onChange={() => setIsDeliveryDate((prevValue) => !prevValue)}
                                    color="primary"
                                    name="delivery_date"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Header - Home')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isHeaderHome}
                                    onChange={() => setIsHeaderHome((prevValue) => !prevValue)}
                                    color="primary"
                                    name="header_home"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Header - App')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isHeaderApp}
                                    onChange={() => setIsHeaderApp((prevValue) => !prevValue)}
                                    color="primary"
                                    name="header_app"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Header - Help')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isHeaderHelp}
                                    onChange={() => setIsHeaderHelp((prevValue) => !prevValue)}
                                    color="primary"
                                    name="header_help"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Header - Track Order')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isHeaderTrackOrder}
                                    onChange={() => setIsHeaderTrackOrder((prevValue) => !prevValue)}
                                    color="primary"
                                    name="header_track_order"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Header - Supply Product')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isHeaderSupplyProduct}
                                    onChange={() => setIsHeaderSupplyProduct((prevValue) => !prevValue)}
                                    color="primary"
                                    name="header_supply_product"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Header - Delivery Time & Location')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isHeaderDeliveryTimeAndLocation}
                                    onChange={() => setIsHeaderDeliveryTimeAndLocation((prevValue) => !prevValue)}
                                    color="primary"
                                    name="header_delivery_time"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Header - Language')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isHeaderLanguage}
                                    onChange={() => setIsHeaderLanguage((prevValue) => !prevValue)}
                                    color="primary"
                                    name="header_language"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Header - Sign in Option')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isHeaderSignInOption}
                                    onChange={() => setIsHeaderSignInOption((prevValue) => !prevValue)}
                                    color="primary"
                                    name="header_sign_in_option"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Download Google App')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isDownloadGoogleApp}
                                    onChange={() => setIsDownloadGoogleApp((prevValue) => !prevValue)}
                                    color="primary"
                                    name="download_google_app"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Download IOS App')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isDownloadIOSApp}
                                    onChange={() => setIsDownloadIOSApp((prevValue) => !prevValue)}
                                    color="primary"
                                    name="download_ios_app"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Facebook Login')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isFacebookLogin}
                                    onChange={() => setIsFacebookLogin((prevValue) => !prevValue)}
                                    color="primary"
                                    name="facebook_login"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Google Login')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isGoogleLogin}
                                    onChange={() => setIsGoogleLogin((prevValue) => !prevValue)}
                                    color="primary"
                                    name="google_login"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Point')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isPoint}
                                    onChange={() => setIsPoint((prevValue) => !prevValue)}
                                    color="primary"
                                    name="point"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Return order')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isReturnOrder}
                                    onChange={() => setIsReturnOrder((prevValue) => !prevValue)}
                                    color="primary"
                                    name="return_order"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Wallet')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isWallet}
                                    onChange={() => setIsWallet((prevValue) => !prevValue)}
                                    color="primary"
                                    name="wallet"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Brand Active')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isBrandActive}
                                    onChange={() => setIsBrandActive((prevValue) => !prevValue)}
                                    color="primary"
                                    name="brand_active"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Delivery Date & Time in print')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isDeliveryDateTimeInPrint}
                                    onChange={() => setIsDeliveryDateTimeInPrint((prevValue) => !prevValue)}
                                    color="primary"
                                    name="delivery_date_time_in_print"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Sale by')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isSaleBy}
                                    onChange={() => setIsSaleBy((prevValue) => !prevValue)}
                                    color="primary"
                                    name="sale_by"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Bin & Musak Print')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isBinMusakPrint}
                                    onChange={() => setIsBinMusakPrint((prevValue) => !prevValue)}
                                    color="primary"
                                    name="bin_musak_print"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('COD charge Print')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isCODChargePrint}
                                    onChange={() => setIsCODChargePrint((prevValue) => !prevValue)}
                                    color="primary"
                                    name="cod_charge_print"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('All product category')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={isAllProductCategory}
                                    onChange={() => setIsAllProductCategory((prevValue) => !prevValue)}
                                    color="primary"
                                    name="all_product_category"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Offer Price')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={offerPrice}
                                    onChange={() => setOfferPrice((prevValue) => !prevValue)}
                                    color="primary"
                                    name="offer_price"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('App Price')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={appPrice}
                                    onChange={() => setAppPrice((prevValue) => !prevValue)}
                                    color="primary"
                                    name="app_price"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Quantity')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={quantity}
                                    onChange={() => setQuantity((prevValue) => !prevValue)}
                                    color="primary"
                                    name="quantity"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Discount')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={discount}
                                    onChange={() => setDiscount((prevValue) => !prevValue)}
                                    color="primary"
                                    name="discount"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">{t('Flat Discount')}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={flatDiscount}
                                    onChange={() => setFlatDiscount((prevValue) => !prevValue)}
                                    color="primary"
                                    name="flat_discount"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button type="submit" variant="contained">
                                    {existingData && existingData.id ? t('Update') : t('Create')}
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

export default CmsSetting;
