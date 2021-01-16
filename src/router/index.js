import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import AdDashboard from "../views/Admin/AdDashboard.vue";
import AdCustomers from "../views/Admin/AdCustomers.vue";
import EditCustomer from "../views/Admin/EditCustomer.vue";
import AdInvoice from "../views/Admin/AdInvoice.vue";
import EditInvoice from "../views/Admin/EditInvoice.vue";
import AdChats from "../views/Admin/AdChats.vue";
import AdProducts from "../views/Admin/AdProducts.vue";
import AddProduct from "../views/Admin/AddProduct.vue";
import EditProduct from "../views/Admin/EditProduct.vue";
import AdCatalog from "../views/Admin/AdCatalog.vue";
import AddCategory from "../views/Admin/AddCategory.vue";
import EditCategory from "../views/Admin/EditCategory.vue";
import AddBrand from "../views/Admin/AddBrand.vue";
import EditBrand from "../views/Admin/EditBrand.vue";
import AdContents from "../views/Admin/AdContents.vue";
import AddContent from "../views/Admin/AddContent.vue";
import EditContent from "../views/Admin/EditContent.vue";
import AdFeedback from "../views/Admin/AdFeedback.vue";
import EditFeedback from "../views/Admin/EditFeedback.vue";
import {fb} from "../firebase";


Vue.use(VueRouter);

const router = new VueRouter({
  // start new page from top
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      meta: { requiresAuth: true },
      
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: AdDashboard
        },
        {
          path: "customers",
          name: "customers",
          component: AdCustomers
        },
        {
          path: "edit-customer/:id",
          name: "EditCustomer",
          component: EditCustomer
        },
        {
          path: "invoice",
          name: "invoice",
          component: AdInvoice
        },
        {
          path: "edit-invoice/:id",
          name: "EditInvoice",
          component: EditInvoice
        },
        {
          path: "chats",
          name: "chats",
          component: AdChats
        },
        {
          path: "products",
          name: "products",
          component: AdProducts,
        },
        {
          path: 'add-product/',
          name: 'AddProduct',
          component: AddProduct
        },
        {
          path: 'edit-product/:id',
          name: 'EditProduct',
          component: EditProduct
        },
        {
          path: "catalog",
          name: "catalog",
          component: AdCatalog
        },
        {
          path: "add-category",
          name: "add-category",
          component: AddCategory
        },
        {
          path: "edit-category/:id",
          name: "EditCategory",
          component: EditCategory
        },
        {
          path: "add-brand",
          name: "AddBrand",
          component: AddBrand
        },
        {
          path: "edit-brand/:id",
          name: "EditBrand",
          component: EditBrand
        },
        {
          path: "contents",
          name: "contents",
          component: AdContents
        },
        {
          path: "add-content",
          name: "AddContent",
          component: AddContent
        },
        {
          path: "edit-content/:id",
          name: "EditContent",
          component: EditContent
        },
        {
          path: "feedback",
          name: "feedback",
          component: AdFeedback
        },
        {
          path: "edit-feedback/:id",
          name: "EditFeedback",
          component: EditFeedback
        },
        
        
      ]
    },
    {
      path: "/signin",
      name: "SignIn",
      component: () =>
        import( "../views/SignIn.vue")
    },
    {
      path: "/signup",
      name: "SignUp",
      component: () =>
        import( "../views/SignUp.vue")
    },
    {
      path: "/signup-admin",
      name: "SignUpAdmin",
      component: () =>
        import( "../views/SignUpAdmin.vue")
    },
    {
      path: "/about",
      name: "About",
      component: () =>
        import( "../views/About.vue")
    },
    {
      path: "/blog",
      name: "Blog",
      component: () =>
        import( "../views/Blog.vue")
    },
    {
      path: "/brands",
      name: "Brands",
      component: () =>
        import( "../views/Brands.vue")
    },
    {
      path: "/article/:id",
      name: "Articles",
      component: () =>
        import( "../views/Articles.vue")
    },
    {
      path: "/contacts",
      name: "Contacts",
      component: () =>
        import( "../views/Contacts.vue")
    },
    {
      path: "/faq",
      name: "FAQ",
      component: () =>
        import( "../views/FAQ.vue")
    },
    {
      path: "/settings",
      name: "Settings",
      component: () =>
        import( "../views/User/Settings.vue"),
        meta: { requiresAuth: true },
    },
    {
      path: "/personal",
      name: "Personal",
      component: () =>
        import( "../views/User/Personal.vue"),
        meta: { requiresAuth: true },
    },
    {
      path: "/orders",
      name: "Orders",
      component: () =>
        import( "../views/User/Orders.vue"),
        meta: { requiresAuth: true },
    },
    {
      path: "/proof-of-payment/:users",
      name: "ProofOfPayment",
      component: () =>
        import( "../views/User/ProofOfPayment.vue"),
        meta: { requiresAuth: true },
    },
    {
      path: "/products/:id",
      name: "Products",
      component: () =>
        import( "../views/Products.vue")
    },
    {
      path: "/all-products",
      name: "AllProducts",
      component: () =>
        import( "../views/AllProducts.vue")
    },
    {
      path: "/cart",
      name: "Cart",
      component: () =>
        import( "../views/User/Cart.vue")
    },
    {
      path: "/checkout",
      name: "Checkout",
      meta: { requiresAuth: true },
      component: () =>
        import( "../views/User/Checkout.vue"),
    },
    {
      path: "/favorites",
      name: "Favorites",
      meta: { requiresAuth: true },
      component: () =>
        import( "../views/User/Favorites.vue"),
    },
    {
      path: "/*",
      name: "PageNotFound",
      
      component: () =>
        import( "../views/PageNotFound.vue")
    },

  ]
});

router.beforeEach((to, from, next) => {
  
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = fb.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/signin')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})


export default router;
