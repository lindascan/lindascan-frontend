import React, { Component, Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import { loadTokens } from "../../../actions/tokens";
import { login } from "../../../actions/app";
import { FormattedNumber, FormattedDate, injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import "moment/min/locales";
import ContractCodeRequest from "../../tools/ContractCodeRequest";
import moment from "moment";
import Lockr from "lockr";
import _ from "lodash";
import { filter, trim } from "lodash";
import { Client } from "../../../services/api";
import { withLindaWeb } from "../../../utils/lindaWeb";
import { transactionResultManager } from "../../../utils/linda";
import { t, tu } from "../../../utils/i18n";
import { LindaLoader } from "../../common/loaders";
import { API_URL, ASSET_ISSUE_COST, ONE_LIND } from "../../../constants";
import BigNumber from "bignumber.js";

import { Form, Row, Col, Input, Button, Icon } from "antd";

const { TextArea } = Input;
BigNumber.config({ EXPONENTIAL_AT: [-1e9, 1e9] });
@withLindaWeb
class SubmitInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.state,
      captcha_code: null,
      checkbox: false,
      loading: false,
      errors: {
        confirm: null
      }
    };
  }

  componentDidMount() {}

  ErrorLabel = error => {
    if (error !== null) {
      return <small className="text-danger"> {error} </small>;
    }
    return null;
  };

  tokenState = value => {
    let {
      iconList,
      modal,
      checkbox,
      errors,
      captcha_code,
      type,
      paramData: {
        token_name,
        token_abbr,
        token_introduction,
        token_supply,
        precision,
        author,
        logo_url,
        contract_address,
        contract_created_date,
        contract_code,
        token_amount,
        lind_amount,
        freeze_amount,
        freeze_date,
        freeze_type,
        participation_start_date,
        participation_end_date,
        participation_type,
        website,
        email,
        white_paper,
        github_url,
        file_name
      }
    } = this.state;
    let logoURL;
    if (file_name) {
      logoURL = logo_url + "?t=" + new Date().getTime();
    } else {
      logoURL = logo_url;
    }
    let frozenSupplyAmount = freeze_amount * Math.pow(10, Number(precision));
    let frozenSupply = [{ amount: frozenSupplyAmount, days: freeze_date }];
    if (!participation_type) {
      participation_start_date = moment(new Date().getTime() + 60 * 1000);
      participation_end_date = moment(new Date().getTime() + 120 * 1000);
    }
    let orderState = {
      name: token_name,
      abbreviation: token_abbr,
      description: token_introduction,
      url: website,
      totalSupply: token_supply * Math.pow(10, Number(precision)),
      totalSupplyLRC20: new BigNumber(token_supply)
        .shiftedBy(precision)
        .toString(),
      address: author,
      logoUrl: logo_url,
      updateLogoUrl: logoURL,
      contractAddress: contract_address,
      contractCreatedRatio: contract_created_date
        ? contract_created_date.valueOf()
        : "",
      contractCode: contract_code,
      tokenRatio: token_amount * Math.pow(10, Number(precision)),
      lindRatio: lind_amount * ONE_LIND,
      saleStart: participation_start_date.valueOf(),
      saleEnd: participation_end_date.valueOf(),
      startTime: participation_start_date.toDate(),
      endTime: participation_end_date.toDate(),
      freeBandwidth: 0,
      freeBandwidthLimit: 0,
      frozenAmount: frozenSupplyAmount,
      frozenDuration: freeze_date,
      //'frozenAmount': '',
      //'frozenDuration': '',
      frozenSupply: filter(frozenSupply, fs => fs.amount > 0),
      precision: Number(precision),
      email: email,
      whitePaper: white_paper,
      socialList: _.filter(iconList, function(o) {
        return o.active;
      }),
      issueTime: moment(new Date().getTime()).valueOf(),
      github_url: github_url,
      fileName: file_name
    };
    return orderState[value];
  };

  setSelect(type) {
    this.setState({ type }, () => {
      this.props.nextState(this.state);
    });
  }

  handleCaptchaCode = val => {
    this.setState({ captcha_code: val });
  };

  hideModal = () => {
    this.setState({
      modal: null
    });
  };

  redirectToTokenList = () => {
    this.setState(
      {
        modal: null
      },
      () => {
        window.location.hash = "#/tokens/list";
      }
    );
  };
  renderSubmit = () => {
    let { intl, currentWallet } = this.props;
    if (!currentWallet) {
      this.setState({
        modal: (
          <SweetAlert
            error
            confirmBtnText={intl.formatMessage({ id: "confirm" })}
            confirmBtnBsStyle="success"
            onConfirm={this.hideModal}
            style={{ marginLeft: "-240px", marginTop: "-195px" }}
          >
            {tu("lind_token_wallet_requirement")}
          </SweetAlert>
        )
      });
      return false;
    }
    if (currentWallet.balance < ASSET_ISSUE_COST) {
      this.setState({
        modal: (
          <SweetAlert
            info
            confirmBtnText={intl.formatMessage({ id: "confirm" })}
            confirmBtnBsStyle="success"
            onConfirm={this.hideModal}
            style={{ marginLeft: "-240px", marginTop: "-195px" }}
          >
            {tu("lind_token_fee_message")}
          </SweetAlert>
        )
      });
      return false;
    }
    return true;
  };

  //Confirm Token Issue
  confirmSubmit = () => {
    let { intl } = this.props;
    let { isUpdate, type } = this.state;
    if (!this.renderSubmit() && !isUpdate && type == "lrc10") {
      return;
    }
    this.setState({
      modal: (
        <SweetAlert
          info
          showCancel
          confirmBtnText={intl.formatMessage({ id: "confirm" })}
          confirmBtnBsStyle="success"
          cancelBtnText={intl.formatMessage({ id: "cancel" })}
          cancelBtnBsStyle="default"
          title={intl.formatMessage({ id: "confirm_token_issue" })}
          onConfirm={this.createToken}
          onCancel={this.hideModal}
          //style={{marginLeft: '-240px', marginTop: '-195px'}}
        ></SweetAlert>
      )
    });
  };

  submit = () => {
    let newErrors = {
      confirm: null
    };
    let { checkbox, type, isUpdate } = this.state;
    let { intl } = this.props;
    if (type == "lrc10") {
      if (!isUpdate) {
        if (checkbox) this.confirmSubmit();
        else {
          newErrors.confirm = intl.formatMessage({ id: "tick_checkbox" });
          this.setState({ errors: newErrors });
        }
      } else {
        this.confirmSubmit();
      }
    } else if (type == "lrc20") {
      this.confirmSubmit();
    }
  };

  createToken = async () => {
    let { account, intl } = this.props;
    let { type } = this.state;
    let res, createInfo, errorInfo;
    const lindaWebLedger = this.props.lindaWeb();
    const { lindaWeb } = this.props.account;
    this.setState({
      modal: (
        <SweetAlert
          showConfirm={false}
          showCancel={false}
          cancelBtnBsStyle="default"
          title={intl.formatMessage({ id: "in_progress" })}
          //style={{marginLeft: '-240px', marginTop: '-195px', width: '450px', height: '300px'}}
        >
          <LindaLoader />
        </SweetAlert>
      ),
      loading: true
    });
    switch (type) {
      case "lrc10":
        if (account.isLoggedIn) {
          if (this.props.walletType.type === "ACCOUNT_LEDGER") {
            // const unSignTransaction = await lindaWebLedger.transactionBuilder.createToken({
            //     name: this.tokenState('name'),
            //     abbreviation: this.tokenState('abbreviation'),
            //     description: this.tokenState('description'),
            //     url: this.tokenState('url'),
            //     totalSupply: this.tokenState('totalSupply'),
            //     tokenRatio: this.tokenState('tokenRatio'),
            //     lindRatio: this.tokenState('lindRatio'),
            //     saleStart: this.tokenState('saleStart'),
            //     saleEnd: this.tokenState('saleEnd'),
            //     freeBandwidth: 1,
            //     freeBandwidthLimit: 1,
            //     frozenAmount: this.tokenState('frozenAmount'),
            //     frozenDuration: this.tokenState('frozenDuration'),
            //     precision:  this.tokenState('precision'),
            // }, lindaWebLedger.defaultAddress.hex).catch(function (e) {
            //     errorInfo = e;
            // })
            // if (!unSignTransaction) {
            //     res = false;
            // } else {
            //     const {result} = await transactionResultManager(unSignTransaction, lindaWebLedger);
            //     res = result;
            // }
          } else if (this.props.walletType.type === "ACCOUNT_LINDALINK") {
            let unSignTransaction = "";
            if (this.state.isUpdate) {
              //Update
              let data = {
                address: this.tokenState("address"),
                issuer_addr: this.tokenState("address"),
                logo_url: this.tokenState("updateLogoUrl"),
                website: this.tokenState("url"),
                email: this.tokenState("email"),
                white_paper: this.tokenState("whitePaper"),
                social_media: this.tokenState("socialList"),
                github: this.tokenState("github_url"),
                issue_time: this.tokenState("issueTime"),
                timestamp: this.tokenState("issueTime"),
                file_name: this.tokenState("fileName")
              };
              let hash = lindaWeb.toHex(JSON.stringify(data), false);
              let sig = await lindaWeb.lind.sign(hash);
              unSignTransaction = await Client.updateToken10({
                content: JSON.stringify(data),
                sig: sig
              });
              if (unSignTransaction.retCode === "0") {
                res = true;
              } else if (unSignTransaction.retCode === "1") {
                res = false;
                errorInfo = unSignTransaction.retMsg;
              }
            } else {
              //Create

              unSignTransaction = await lindaWeb.transactionBuilder
                .createToken(
                  {
                    name: this.tokenState("name"),
                    abbreviation: this.tokenState("abbreviation"),
                    description: this.tokenState("description"),
                    url: this.tokenState("url"),
                    totalSupply: this.tokenState("totalSupply"),
                    tokenRatio: this.tokenState("tokenRatio"),
                    lindRatio: this.tokenState("lindRatio"),
                    saleStart: this.tokenState("saleStart"),
                    saleEnd: this.tokenState("saleEnd"),
                    freeBandwidth: 0,
                    freeBandwidthLimit: 0,
                    frozenAmount: this.tokenState("frozenAmount"),
                    frozenDuration: this.tokenState("frozenDuration"),
                    precision: this.tokenState("precision")
                  },
                  lindaWeb.defaultAddress.hex
                )
                .catch(function(e) {
                  errorInfo = e.indexOf(":") != -1 ? e.split(":")[1] : e;
                });
              if (!unSignTransaction && unSignTransaction != "") {
                res = false;
              } else {
                const { result } = await transactionResultManager(
                  unSignTransaction,
                  lindaWeb
                );
                res = result;
              }
            }
          } else if (this.props.walletType.type == "ACCOUNT_PRIVATE_KEY") {
            if (this.state.isUpdate) {
              let unSignTransaction = "";
              let data = {
                address: this.tokenState("address"),
                issuer_addr: this.tokenState("address"),
                logo_url: this.tokenState("updateLogoUrl"),
                website: this.tokenState("url"),
                email: this.tokenState("email"),
                white_paper: this.tokenState("whitePaper"),
                social_media: this.tokenState("socialList"),
                github: this.tokenState("github_url"),
                issue_time: this.tokenState("issueTime"),
                timestamp: this.tokenState("issueTime"),
                file_name: this.tokenState("fileName")
              };
              let hash = lindaWeb.toHex(JSON.stringify(data), false);
              let sig = await lindaWeb.lind.sign(hash);
              unSignTransaction = await Client.updateToken10({
                content: JSON.stringify(data),
                sig: sig
              });

              if (unSignTransaction.retCode === "0") {
                res = true;
              } else {
                res = false;
                errorInfo = unSignTransaction.retMsg;
              }
            } else {
              createInfo = await Client.createToken({
                address: account.address,
                name: this.tokenState("name"),
                shortName: this.tokenState("abbreviation"),
                description: this.tokenState("description"),
                url: this.tokenState("url"),
                totalSupply: this.tokenState("totalSupply"),
                num: this.tokenState("tokenRatio"),
                lindNum: this.tokenState("lindRatio"),
                startTime: this.tokenState("startTime"),
                endTime: this.tokenState("endTime"),
                frozenSupply: this.tokenState("frozenSupply"),
                precision: this.tokenState("precision")
              })(account.key);
              res = createInfo.success;
              errorInfo =
                createInfo.message.indexOf(":") != -1
                  ? createInfo.message.split(":")[1]
                  : createInfo.message;
            }
          }
        }

        this.setState(
          {
            res,
            errorInfo
          },
          () => {
            if (res == true || res == false) {
              Lockr.rm("TokenLogo");
              this.props.nextState({ res, errorInfo });
              this.props.nextStep(3);
            }
          }
        );
        break;

      case "lrc20":
        let data = {
          name: this.tokenState("name"),
          symbol: this.tokenState("abbreviation"),
          token_desc: this.tokenState("description"),
          total_supply: this.tokenState("totalSupplyLRC20"),
          decimals: this.tokenState("precision"),
          issuer_addr: this.tokenState("address"),
          icon_url: this.tokenState("updateLogoUrl"),
          git_hub: this.tokenState("github_url"),
          contract_address: this.tokenState("contractAddress"),
          contract_created_ratio: this.tokenState("contractCreatedRatio"),
          // "contract_code":this.tokenState('contractCode'),
          home_page: this.tokenState("url"),
          email: this.tokenState("email"),
          white_paper: this.tokenState("whitePaper"),
          social_media: this.tokenState("socialList"),
          issue_time: this.tokenState("issueTime"),
          timestamp: this.tokenState("issueTime"),
          file_name: this.tokenState("fileName")
        };

        if (account.isLoggedIn) {
          //LINDALINK Login  or PRIVATE_KEY Login
          if (
            this.props.walletType.type === "ACCOUNT_LINDALINK" ||
            this.props.walletType.type === "ACCOUNT_PRIVATE_KEY"
          ) {
            let hash = lindaWeb.toHex(JSON.stringify(data), false);
            let sig = await lindaWeb.lind.sign(hash);
            let unSignTransaction = "";

            //Judge update Token or create Token
            if (this.state.isUpdate) {
              unSignTransaction = await Client.updateToken20({
                content: JSON.stringify(data),
                sig: sig
              });
            } else {
              unSignTransaction = await Client.createToken20({
                content: JSON.stringify(data),
                sig: sig
              });
            }

            if (unSignTransaction.retCode === "0") {
              res = true;
            } else {
              res = false;
              errorInfo = unSignTransaction.retMsg;
            }
          }
        } else if (this.props.walletType.type === "ACCOUNT_LEDGER") {
          let hash = lindaWebLedger.toHex(JSON.stringify(data), false);
          let sig = await lindaWebLedger.lind.sign(hash);
          let unSignTransaction = "";
          if (this.state.isUpdate) {
            unSignTransaction = await Client.updateToken20({
              content: JSON.stringify(data),
              sig: sig
            });
          } else {
            unSignTransaction = await Client.createToken20({
              content: JSON.stringify(data),
              sig: sig
            });
          }

          if (unSignTransaction.retCode === "0") {
            res = true;
          } else {
            res = false;
            errorInfo = unSignTransaction.retMsg;
          }
        }

        this.setState(
          {
            res,
            errorInfo
          },
          () => {
            this.props.nextState({ res, errorInfo });
            this.props.nextStep(3);
          }
        );
        break;
    }
  };

  render() {
    let { intl, nextStep } = this.props;
    let {
      iconList,
      modal,
      checkbox,
      errors,
      captcha_code,
      type,
      isUpdate,
      paramData: {
        token_name,
        token_abbr,
        token_introduction,
        token_supply,
        precision,
        author,
        logo_url,
        contract_address,
        contract_created_date,
        contract_code,
        token_amount,
        lind_amount,
        freeze_amount,
        freeze_date,
        freeze_type,
        participation_start_date,
        participation_end_date,
        participation_type,
        website,
        email,
        white_paper,
        github_url,
        contract_created_address
      }
    } = this.state;
    const isLrc10 = type === "lrc10";
    const isLrc20 = type === "lrc20";
    let startTime = participation_start_date
      ? participation_start_date.valueOf()
      : "";
    let endTime = participation_end_date
      ? participation_end_date.valueOf()
      : "";
    let contractCreateTime = contract_created_date
      ? contract_created_date.valueOf()
      : contract_created_date;
    logo_url = Lockr.get("TokenLogo", logo_url);
    iconList.map((item, index) => {
      item.link.map((link, link_index) => {
        if (!link) {
          item.link.splice(link_index, 1);
        }
      });
      if (item.link.length == 0) {
        item.active = false;
      }
    });

    return (
      <main className="token-submit">
        {modal}
        <section>
          <h4 className="mb-3">{tu("basic_info")}</h4>
          <hr />
          <Row type="flex" gutter={64}>
            <Col span={24} md={12}>
              <label>{tu("name_of_the_token")}</label>
              <p className="border-dashed">{token_name}</p>
            </Col>
            <Col span={24} md={12}>
              <label>{tu("token_abbr")}</label>
              <p className="border-dashed">{token_abbr}</p>
            </Col>
          </Row>
          <Row type="flex" gutter={64}>
            <Col span={24} md={12}>
              <label>{tu("token_description")}</label>
              <p className="border-dashed-textarea">
                <TextArea
                  autosize={{ minRows: 4, maxRows: 6 }}
                  disabled={true}
                  defaultValue={token_introduction}
                />
              </p>
            </Col>
            <Col span={24} md={12}>
              <label>{tu("total_supply")}</label>
              <p className="border-dashed">
                <FormattedNumber value={token_supply} />
              </p>
            </Col>
          </Row>
          <Row type="flex" gutter={64}>
            <Col span={24} md={12}>
              <label>{tu("LRC20_decimals")}</label>
              <p className="border-dashed">{precision}</p>
            </Col>
            <Col span={24} md={12}>
              <label>{tu("issuer")}</label>
              <p className="border-dashed">{author}</p>
            </Col>
          </Row>
          {isUpdate && (
            <Row type="flex" gutter={64}>
              <Col span={24} md={12}>
                {/*<Col span={24} md={12} className={ isLrc20? 'd-block': 'd-none'}>*/}
                <label>{tu("token_logo")}</label>
                <img
                  className="d-block mt-2"
                  src={logo_url}
                  alt=""
                  width={100}
                  height={100}
                />
              </Col>
            </Row>
          )}
        </section>
        <section className={isLrc20 ? "d-block mt-4" : "d-none"}>
          <h4 className="mb-3">{tu("contract_info")}</h4>
          <hr />
          <Row type="flex" gutter={64}>
            <Col span={24} md={12}>
              <label>{tu("lrc20_token_info_Contract_Address")}</label>
              <p className="border-dashed">{contract_address}</p>
            </Col>
            <Col span={24} md={12}>
              <label>{tu("contract_created_date")}</label>
              <p className="border-dashed">
                <FormattedDate value={contractCreateTime} />
              </p>
            </Col>
            <Col span={24} md={12}>
              <label>{tu("contract_created_address")}</label>
              <p className="border-dashed">{contract_created_address}</p>
            </Col>
          </Row>
          {/*<Row type="flex">*/}
          {/*<Col span={24} md={24}>*/}
          {/*<label>{tu('contract_code')}</label>*/}
          {/*<TextArea rows={4}*/}
          {/*disabled={true}*/}
          {/*defaultValue={contract_code}*/}
          {/*/>*/}
          {/*</Col>*/}
          {/*</Row>*/}
        </section>
        <section className={isLrc10 ? "d-block mt-4" : "d-none"}>
          <h4 className="mb-3">{tu("price_info")}</h4>
          <hr />
          <Row type="flex" gutter={64}>
            <Col span={24} md={12}>
              <label>{tu("token_price")}</label>
              <p className="border-dashed">
                {token_amount} {token_abbr} = {lind_amount} LIND
              </p>
            </Col>

            <Col span={24} md={12}>
              <label>{tu("participation")}</label>
              <p className="border-dashed">
                {!participation_type ? (
                  <span>
                    {tu("start_date")}: <span> - </span> &nbsp;&nbsp;{" "}
                    {tu("end_date")}: <span> - </span>
                  </span>
                ) : (
                  <span>
                    {tu("start_date")}: <FormattedDate value={startTime} />{" "}
                    &nbsp;&nbsp; {tu("end_date")}:{" "}
                    <FormattedDate value={endTime} />{" "}
                  </span>
                )}
              </p>
            </Col>
          </Row>
          <Row type="flex" gutter={64}>
            <Col span={24} md={12}>
              <label>{tu("frozen_supply")}</label>
              <p className="border-dashed">
                {freeze_type ? (
                  <span>
                    {" "}
                    {tu("amount")}: {freeze_amount} {tu("days_to_freeze")}{" "}
                    {freeze_date}
                  </span>
                ) : (
                  <span>{tu("freeze_not_valid")}</span>
                )}
              </p>
            </Col>
          </Row>
        </section>
        <section className="mt-4">
          <h4 className="mb-3">{tu("social_info")}</h4>
          <hr />
          <Row type="flex" gutter={64}>
            <Col span={24} md={12}>
              <label>{tu("project_website")}</label>
              <p className="border-dashed">{website}</p>
            </Col>
            {(isLrc20 || isUpdate) && (
              <Col span={24} md={12}>
                <label>{tu("GitHub")}</label>
                <p className="border-dashed">{github_url}</p>
              </Col>
            )}
          </Row>
          <Row
            type="flex"
            gutter={64}
            className={isLrc20 || isUpdate ? "d-flex" : "d-none"}
          >
            <Col
              span={24}
              md={12}
              className={isLrc20 || isUpdate ? "d-block" : "d-none"}
            >
              <label>{tu("email")}</label>
              <p className="border-dashed">{email}</p>
            </Col>
            <Col span={24} md={12}>
              <label>{tu("whitepaper_address")}</label>
              <p className="border-dashed">{white_paper}</p>
            </Col>
          </Row>
          <Row type="flex" className={isLrc20 ? "d-flex mt-3" : "d-none"}>
            <div className="d-md-flex mb-4">
              <label>{tu("already_add_social_link_")}</label>
              <div className="d-flex icon-list ml-2">
                {iconList.map((item, index) => {
                  if (item.active) {
                    return (
                      <div
                        key={index}
                        className={`${
                          item.active ? item.method + "-active" : item.method
                        } icon-list-item mr-2`}
                      ></div>
                    );
                  }
                })}
              </div>
            </div>
          </Row>
          {(isLrc20 || isUpdate) && (
            <Row gutter={64} type="flex" justify="space-between">
              {iconList.map((item, index) => {
                if (item.active) {
                  return (
                    <Col span={24} md={12} key={index}>
                      <div className="d-flex justify-content-between mb-2 pr-4">
                        <div className="d-flex align-items-center">
                          <i className={`${item.method}-active`}></i>
                          <span className="text-capitalize ml-2">
                            {item.method}
                          </span>
                        </div>
                      </div>
                      {item.link.map((link, link_index) => {
                        return (
                          <div
                            className="d-flex align-items-center mb-4"
                            key={link_index}
                          >
                            {/*<Input value={link} onChange={(e) => this.setLinks(index, link_index, e)}/>*/}
                            <p
                              className="border-dashed"
                              style={{ width: "100%" }}
                            >
                              {link}
                            </p>
                          </div>
                        );
                      })}
                    </Col>
                  );
                }
              })}
            </Row>
          )}
        </section>
        <section>
          <div className="mt-4">
            <ContractCodeRequest handleCaptchaCode={this.handleCaptchaCode} />
          </div>
        </section>

        <section className={isLrc10 && !isUpdate ? "d-block mt-4" : "d-none"}>
          <div className="form-check d-flex">
            <input
              type="checkbox"
              className="form-check-input"
              value={checkbox}
              onChange={e => {
                this.setState({
                  checkbox: e.target.checked,
                  errors: { confirm: null }
                });
              }}
            />
            <label className="form-check-label">
              {tu("token_spend_confirm_new")}
            </label>
          </div>
          {this.ErrorLabel(errors.confirm)}
        </section>
        <section className="text-right px-2">
          <button
            className="btn btn-default btn-lg"
            onClick={() => nextStep(1)}
          >
            {tu("lrc20_token_return")}
          </button>
          {/* {// todo wangyan} */}
          <button
                className="ml-4 btn btn-danger btn-lg"
                htmltype="submit"
                disabled={!captcha_code}
                onClick={this.submit}
              >
                {tu("submit")}
              </button>
        </section>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeLanguage: state.app.activeLanguage,
    tokens: state.tokens.tokens,
    account: state.app.account,
    walletType: state.app.wallet,
    wallet: state.wallet.current,
    currentWallet: state.wallet.current
  };
}

const mapDispatchToProps = {
  login,
  loadTokens
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(SubmitInfo));
