import s from './sidebar.module.scss';
import React from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo.png'

const routes = [
    { title: 'Home', icon: 'fas-solid fa-house', path: '/' },
    { title: 'Sales', icon: 'chart-line', path: '/sales' },
    { title: 'Costs', icon: 'chart-column', path: '/costs' },
    { title: 'Payments', icon: 'wallet', path: '/payments' },
    { title: 'Finances', icon: 'chart-pie', path: '/finances' },
    { title: 'Messages', icon: 'envelope', path: '/messages' },
];

const bottomRoutes = [
    { title: 'Settings', icon: 'sliders', path: '/settings' },
    { title: 'Support', icon: 'phone-volume', path: '/support' },
];

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpened: true,
            activeMainIndex: null,
            activeFooterIndex: null,
        };
    }

    toggleSidebar = () => {
        this.setState((state) => ({ isOpened: !state.isOpened }) );
    };

    goToRoute = (path) => {
        console.log(`going to "${path}"`);
    };

    toggleSidebarMainItem = (index) => {
        this.setState({activeMainIndex: index});
    }

    toggleSidebarFooterItem = (index) => {
        this.setState({activeFooterIndex: index});
    }

    render() {
        const { isOpened, activeMainIndex, activeFooterIndex } = this.state;
        const containerClassnames = cn(isOpened ? s.sidebar : s.sidebar__closed);

        return (
            <div className={ containerClassnames }>
                <div className={s.sidebar__header}>
                    <img
                        className={s.sidebar__img}
                        src={ logo }
                        alt="TensorFlow logo"
                    />
                    <span className={cn(isOpened ? s.sidebar__title : s.sidebar__title_closed)}>TensorFlow</span>
                    <button className={isOpened ? s.sidebar__btn : s.sidebar__btn_closed} onClick={ this.toggleSidebar }>
                        <FontAwesomeIcon icon={ isOpened ? 'angle-left' : 'angle-right' } />
                    </button>
                </div>
                <div className={s.sidebar__items}>
                    <div className={s.sidebar__main}>
                        {
                            routes.map((route, index) => (
                                <div
                                    className={cn(activeMainIndex !== index ? s.sidebar__item : s.sidebar__item_active)}
                                    key={ route.title }
                                    onClick={ () => {this.goToRoute(route.path); this.toggleSidebarMainItem(index)}}
                                >
                                    <FontAwesomeIcon icon={ route.icon } />
                                    <span className={cn(isOpened ? s.sidebar__textMain : s.sidebar__textClosed)}>{ route.title }</span>
                                </div>
                            ))
                        }
                    </div>

                    <div className={s.sidebar__footer}>
                        {
                            bottomRoutes.map((route, index) => (
                                <div
                                    className={cn(activeFooterIndex !== index ? s.sidebar__item : s.sidebar__item_active)}
                                    key={ route.title }
                                    onClick={ () => { this.goToRoute(route.path); this.toggleSidebarFooterItem(index) }}
                                >
                                    <FontAwesomeIcon icon={ route.icon } />
                                    <span className={cn(isOpened ? s.sidebar__textFooter : s.sidebar__textClosed)}>{ route.title }</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}
