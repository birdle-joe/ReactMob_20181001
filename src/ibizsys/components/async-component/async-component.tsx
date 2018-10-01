import React, { Component } from 'react';

/**
 * 用于分割代码，异步加载组件
 *
 * @export
 * @param {*} importComponent
 * @returns
 */
export function asyncComponent(importComponent: any, asyncProps: any = {}) {
    class AsyncComponent extends Component<any, any> {
        constructor(props: any) {
            super(props);
            this.state = {
                component: null,
                asyncProps: {}
            };
        }

        public componentDidMount() {
            importComponent().then((mod: any) => {
                this.setState({
                    component: mod.default ? mod.default : undefined,
                    asyncProps
                });
            });
        }

        public render() {
            const C = this.state.component;
            return C ? <C {...this.state.asyncProps} /> : null;
        }
    }

    return AsyncComponent;
}