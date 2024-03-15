const panel = [
    {
        name: 'Access Panel',
        fields: [
            { name: 'permissionAccess', label: 'Permission Access' },
            { name: 'permittedUsers', label: 'Permitted Users' },
            { name: 'permissionCreate', label: 'Permission Create' },
            { name: 'permissionEdit', label: 'Permission Edit' },
            { name: 'permissionDelete', label: 'Permission Delete' }
        ],
        selectAll: false
    },
    {
        name: 'User',
        fields: [
            { name: 'user', label: 'User' },
            { name: 'create', label: 'Create' },
            { name: 'edit', label: 'Edit' },
            { name: 'delete', label: 'Delete' }
        ],
        selectAll: false
    },
    {
        name: 'Product',
        fields: [
            { name: 'index', label: 'Index' },
            { name: 'view', label: 'View' },
            { name: 'createProduct', label: 'Create' },
            { name: 'editProduct', label: 'Edit' },
            { name: 'deleteProduct', label: 'Delete' },
            { name: 'upload', label: 'Upload' },
            { name: 'productVariationUpload', label: 'Product Variation Upload' }
        ],
        selectAll: false
    },
    {
        name: 'Category',
        fields: [
            { name: 'index', label: 'Index' },
            { name: 'view', label: 'View' },
            { name: 'create', label: 'Create' },
            { name: 'edit', label: 'Edit' },
            { name: 'delete', label: 'Delete' }
        ],
        selectAll: false
    },
    {
        name: 'Brand',
        fields: [
            { name: 'index', label: 'Index' },
            { name: 'view', label: 'View' },
            { name: 'create', label: 'Create' },
            { name: 'edit', label: 'Edit' },
            { name: 'delete', label: 'Delete' }
        ],
        selectAll: false
    },
    {
        name: 'Unit Measure',
        fields: [
            { name: 'index', label: 'Index' },
            { name: 'view', label: 'View' },
            { name: 'create', label: 'Create' },
            { name: 'edit', label: 'Edit' },
            { name: 'delete', label: 'Delete' }
        ],
        selectAll: false
    },
    {
        name: 'Attribute Type',
        fields: [
            { name: 'index', label: 'Index' },
            { name: 'view', label: 'View' },
            { name: 'create', label: 'Create' },
            { name: 'edit', label: 'Edit' },
            { name: 'delete', label: 'Delete' }
        ],
        selectAll: false
    },
    {
        name: 'Attribute',
        fields: [
            { name: 'index', label: 'Index' },
            { name: 'view', label: 'View' },
            { name: 'create', label: 'Create' },
            { name: 'edit', label: 'Edit' },
            { name: 'delete', label: 'Delete' }
        ],
        selectAll: false
    },
    {
        name: 'Highlight Type',
        fields: [
            { name: 'index', label: 'Index' },
            { name: 'view', label: 'View' },
            { name: 'create', label: 'Create' },
            { name: 'edit', label: 'Edit' },
            { name: 'delete', label: 'Delete' }
        ],
        selectAll: false
    },
    {
        name: 'Product Tag',
        fields: [
            { name: 'index', label: 'Index' },
            { name: 'view', label: 'View' },
            { name: 'create', label: 'Create' },
            { name: 'edit', label: 'Edit' },
            { name: 'delete', label: 'Delete' }
        ],
        selectAll: false
    },
    {
        name: 'Product Types',
        fields: [
            { name: 'index', label: 'Index' },
            { name: 'view', label: 'View' },
            { name: 'create', label: 'Create' },
            { name: 'edit', label: 'Edit' },
            { name: 'delete', label: 'Delete' }
        ],
        selectAll: false
    },

    {
        name: 'Discount',
        fields: [
            { name: 'index', label: 'Index' },
            { name: 'view', label: 'View' },
            { name: 'create', label: 'Create' },
            { name: 'edit', label: 'Edit' },
            { name: 'delete', label: 'Delete' }
        ],
        selectAll: false
    },
    {
        name: 'Barcode',
        fields: [{ name: 'index', label: 'Index' }],
        selectAll: false
    },
    {
        name: 'Offer',
        fields: [{ name: 'index', label: 'Index' }],
        selectAll: false
    },
    {
        name: 'Order',
        fields: [
            { name: 'index', label: 'Index' },
            { name: 'print', label: 'Print' },
            { name: 'status', label: 'Status' },
            { name: 'edit', label: 'Edit' },
            { name: 'delete', label: 'Delete' },
            { name: 'discount', label: 'Discount' },
            { name: 'Print_customer_copy', label: 'Print Customer Copy' },
            { name: 'Print_accounts_copy', label: 'Print Accounts Copy' },
            { name: 'Print_delivery_man_copy', label: 'Print Delivery Man Copy' },
            { name: 'Print_store_copy', label: 'Print Store Copy' }
        ],
        selectAll: false
    },
    {
        name: 'Sale',
        fields: [
            { name: 'index', label: 'Index' },
            { name: 'view', label: 'View' },
            { name: 'create', label: 'Create' },
            { name: 'edit', label: 'Edit' },
            { name: 'delete', label: 'Delete' },
            { name: 'print', label: 'Print' }
        ],
        selectAll: false
    },
    {
        name: 'Purchase',
        fields: [
            { name: 'index', label: 'Index' },
            { name: 'view', label: 'View' },
            { name: 'create', label: 'Create' },
            { name: 'edit', label: 'Edit' },
            { name: 'delete', label: 'Delete' },
            { name: 'print', label: 'Print' },
            { name: ' Popup Notification', label: 'Approve and Receive' }
        ],
        selectAll: false
    },
    {
        name: 'Customer',
        fields: [
            { name: 'index', label: 'Index' },
            { name: 'create', label: 'Create' },
            { name: 'edit', label: 'Edit' },
            { name: 'delete', label: 'Delete' }
        ],
        selectAll: false
    },
    {
        name: 'Config',
        fields: [
            { name: 'config', label: 'Config' },
            { name: 'free_delivery', label: 'Free Delivery' },
            { name: 'cod_charge', label: 'Cod Charge' },
            { name: 'district', label: 'District' },
            { name: 'area', label: 'Area' }
        ],
        selectAll: false
    },
    {
        name: 'Logistic',
        fields: [{ name: 'selectAllLogistic', label: 'Select All' }], // Dummy field for "Select All"
        selectAll: false
      },
    {
        name: 'Website CMS',
        fields: [
            { name: 'index', label: 'Index' },
            { name: 'view', label: 'View' },
            { name: 'create', label: 'Create' },
            { name: 'edit', label: 'Edit' },
            { name: 'delete', label: 'Delete' },
            { name: 'meta_tag', label: ' Meta Tag' },
            { name: 'popup_notification', label: 'Popup Notification' },
            { name: 'supply_request', label: 'Supply Request' },
        ],
        selectAll: false
    },
    {
        name: 'Account Setup',
        fields: [
            { name: 'account_setup', label: 'Account Setup' },
            { name: 'account_group', label: 'Account Group' },
            { name: 'account_control', label: 'Account Control' },
            { name: 'account_subsidiary', label: 'Account Subsidiary' },
            { name: 'account_chart', label: 'Account Chart' },
        ],
        selectAll: false
    },
    {
        name: 'Setting',
        fields: [
            { name: 'company', label: 'Company' },
            { name: 'order', label: 'Order' },
            { name: 'email', label: 'Email' },
            { name: 'cms', label: 'CMS' },
        ],
        selectAll: false
    },
];

export default panel;
