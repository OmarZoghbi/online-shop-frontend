import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import KategorienListe from "../views/KategorienListe.vue";
import KategorienView from "../views/KategorienView.vue";
import Kontakt from '../views/Kontakt.vue';
import AboutView from '../views/AboutView.vue';
import CartView from "@/views/CartView.vue";
import {useCart} from "@/stores/cart.ts";
import AdminProductsView from "../views/AdminProductsView.vue";




const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/kategorien',
            name: 'kategorien',
            component: KategorienListe
        },
        {
            path: '/kategorie/:name',
            name: 'kategorie',
            component: KategorienView,
            props: true
        },

        {
            path: '/about',
            name: 'about',
            component:AboutView
        },

        {
            path: '/kontakt',
            name: 'kontakt',
            component: Kontakt
        },
        {
            path: "/warenkorb",
            name: "cart",
            component: CartView,
        },
        {
            path: "/admin/products",
            name: "admin-products",
            component: AdminProductsView,
        }
    ]
});

export default router;