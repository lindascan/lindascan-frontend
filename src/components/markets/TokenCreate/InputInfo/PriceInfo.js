import React, { Component } from 'react';
import { t, tu } from '../../../../utils/i18n';
import 'moment/min/locales';
import { LINDPrice } from '../../../common/Price';
import {
    Form, Row, Col, Icon, Input
} from 'antd';

export class PriceInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token_lind_order: true,
            ...this.props.state
        };
    }

    render() {
        const { getFieldDecorator, getFieldsValue } = this.props.form;
        const { token_lind_order, isUpdate } = this.state;
        const { isLrc10 } =  this.props.state;

        let first = {};
        let last = {};
        let abbrAmount = 0;
        const {
            tokenSymbol,
            fprice,
            sprice,
        } = getFieldsValue(['tokenSymbol', 'fprice', 'sprice']);

        if (token_lind_order){
            first = {
                abbr: tokenSymbol,
                name: 'fprice',
                disabled: true,
            };
            last = {
                abbr: 'LIND',
                name: 'sprice',
                disabled: false,
            };
            abbrAmount = parseInt((sprice / fprice)*100) / 100;
        } else {
            first = {
                abbr: 'LIND',
                name: 'sprice',
                disabled: isLrc10,
            };
            last = {
                abbr: tokenSymbol,
                name: 'fprice',
                disabled: true,
            };
            abbrAmount = parseInt((fprice / sprice)*100) / 100;
        }

        // pair item
        const pairItem = (
            <div className="pair-box">
                <p className="pair-trading">{tu('pair_trading')}</p>
                <div className="pair">LIND</div>
            </div>
        );

        // token price left item
        const tokenPriceLeftItem = (
            <Form.Item  className="d-flex align-items-center">
                {getFieldDecorator(first.name, {
                    rules: [
                        { required: true, message: tu('enter_the_amount'), whitespace: true }]
                })(
                    <Input type="number" style={{ width: '200px' }} className="mr-2" disabled={first.disabled} />
                )}
                {first.abbr}
            </Form.Item>
        );

        // token price right item
        const tokenPriceRightItem = (
            <Form.Item  className="d-flex align-items-center mr-4">
                {getFieldDecorator(last.name, {
                    rules: [
                        { required: true, message: tu('enter_the_amount'), whitespace: true },
                        { validator: function(rule, value, callback) {
                            if (value && (!/^(0|[1-9][0-9]*)(\.\d{0,6})?$/.test(value) || value > 4200000000 || value <= 0 )) {
                                return false;
                            }
                            callback();
                        }, message: tu('initial_price_v_format'), whitespace: true }
                    ]
                })(
                    <Input type="number" style={{ width: '200px' }} className="mr-2" disabled={!!isLrc10 || isUpdate ? true : last.disabled } />
                )}
                {last.abbr}
            </Form.Item>);

        // token price item
        const tokenPrice = (
            <Form.Item label={tu('initial_price')} required className="m-0">
                <div className="d-flex" style={{ flexWrap: 'wrap'}}>
                    {tokenPriceLeftItem}
                    <Icon type="swap" className="mx-2 fix_form ordericon"
                        onClick={() => this.setState({ token_lind_order: !token_lind_order })}/>
                    {tokenPriceRightItem}
                    <span className={isNaN(abbrAmount)? 'd-none': ''} style={{ color: '#9e9e9e' }}>
                        (1 {first.abbr} = {`${abbrAmount} ${last.abbr}`})
                    </span>
                    <span className="mr-3">
                        LIND{tu('lrc20_last_price')}: <LINDPrice amount={1} currency="USD"/>
                    </span>
                </div>
            </Form.Item>
        );
        return (
            <div className="d-block">
                <h4 className="mb-3">{tu('pair_message')}</h4>
                <hr/>
                <Row gutter={24} type="flex" justify="space-between" className="px-2">
                    <Col span={24}>
                        {pairItem}
                        {tokenPrice}
                    </Col>
                </Row>
            </div>
        );
    }
}
