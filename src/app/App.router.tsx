import { asyncComponent } from 'ibizsys';
// import Exception from 'ant-design-pro/lib/Exception';

export const AppRoutes: any = [
    {
        path: '/Index/:params',
        // component: asyncComponent(() => import('@pages/base-test/index/index')),
    }, {
        path: '/login',
        component: asyncComponent(() => import('./components/login/login'))
    }, {
        // component: Exception
    }
];