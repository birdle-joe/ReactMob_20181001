import { Carousel, WingBlank } from 'antd-mobile';
import React from 'react';
import './ibiz-carousel.less';

export class CarouselDemo extends React.Component {
    public state = {
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
        imgHeight: 176,
    }
    public componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }

    public before = (from: any, to: any) => {
        // console.log(`slide from ${from} to ${to}`);
    }

    public after = (index: any) => {
        // console.log(`slide from after ${index}`);
    }

    public onload = () => {
        // fire window resize event to change height
        window.dispatchEvent(new Event('resize'));
        this.setState({ imgHeight: 'auto' });
    }

    public render() {
        return (
            <WingBlank>
                <Carousel
                    autoplay={true}
                    infinite
                    beforeChange={this.before}
                    afterChange={this.after}
                >
                    {this.state.data.map(val => (
                        <a
                            key={val}
                            href="http://www.alipay.com"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={this.onload}
                            />
                        </a>
                    ))}
                </Carousel>
            </WingBlank>
        );
    }
}