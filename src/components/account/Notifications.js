import React, {Fragment} from "react";
import {ONE_LIND} from "../../constants";
import {AddressLink} from "../common/Links";
//import {Divider} from 'antd';
import {getNotifyPermission, requestNotifyPermissions, sendNotification} from "../../services/notifications";
import SweetAlert from "react-bootstrap-sweetalert";
import {connect} from "react-redux";
import {reloadWallet} from "../../actions/wallet";
import {tu} from "../../utils/i18n";
import {NameWithId} from "../common/names";
import rebuildList from "../../utils/rebuildList";

function Notification({account, notification}) {
  switch (notification.type) {
    case "transfer":

      let amount = notification.amount;
      if (notification.tokenName.toUpperCase() === "LIND") {
        amount = amount / ONE_LIND;
      }

      if (notification.transferFromAddress === account.address) {
        return (
            <li key={notification.id} className="dropdown-item p-1 dropdown-text-none">
              <div className="media">
                <i className="fa fa-sort-up fa-2x text-danger m-2"/>
                <div className="media-body mr-2">
                  <h6 className="m-0 text-danger">Send <NameWithId value={notification}/></h6>
                  To <AddressLink address={notification.transferToAddress} truncate={false}/>
                </div>
              </div>
            </li>
        );
      } else if (notification.transferToAddress === account.address) {
        return (
            <li key={notification.id} className="dropdown-item p-1 dropdown-text-none">
              <div className="media">
                <i className="fa fa-sort-down fa-2x text-success m-2"/>
                <div className="media-body mr-2">
                  <h6 className="m-0 text-success">Received <NameWithId value={notification}/></h6>
                  From <AddressLink address={notification.transferFromAddress} truncate={false}/>
                </div>
              </div>
            </li>
        );
      }
      break;

    case "vote":

      return (
          <li key={notification.id} className="dropdown-item p-1 dropdown-text-none">
            <div className="media">
              <i className="fa fa-bullhorn fa-2x text-primary m-2"/>
              <div className="media-body mr-2">
                <h6 className="m-0 text-primary">Received {notification.votes} votes</h6>
                From <AddressLink address={notification.voterAddress} truncate={false}/>
              </div>
            </div>
          </li>
      );
  }

  return null;
}

class Notifications extends React.Component {

  constructor() {
    super();

    this.id = 0;

    this.state = {
      modal: null,
      notifications: [],
    };
  }

  componentDidMount() {
    this.reconnect();
  }

  componentDidUpdate(prevProps) {
    let {wallet,wsdata} = this.props;
    if (prevProps.wallet.current === null || wallet.current.address !== prevProps.wallet.current.address || wsdata !== prevProps.wsdata) {
      this.reconnect();
    }
  }

  reconnect() {
    let {wallet, wsdata} = this.props;
    // this.listener && this.listener.close();

    if (!wallet.isOpen) {
      return;
    }

    // this.listener = channel("/address-" + wallet.current.address,{ forceNew:true });
    // this.listener.on("transfer", lind => {

    if(wsdata && wsdata.type=== 'transfer'){
     const lind = rebuildList([wsdata.data], 'token_id', 'amount')[0]

      lind.timestamp = lind.date_created
      lind.tokenName = lind.token_name
      lind.transactionHash = lind.hash
      lind.transferFromAddress = lind.owner_address
      lind.transferToAddress = lind.to_address
     
      
      let amount = lind.amount;
      if (lind.tokenName.toUpperCase() === "LIND") {
        amount = amount / ONE_LIND;
      }else{
        amount = amount / Math.pow(10,lind.map_token_precision);
      }

      if (lind.transferToAddress === wallet.current.address) {
        sendNotification(`Received ${amount} ${lind.tokenName} from ${lind.transferFromAddress}`, {
          icon: require("../../images/linda-logo.jpg")
        });
      }

      
      this.setState(state => {
        const list = [{
          id: lind.transactionHash,
          type: "transfer",
          ...lind,
        }, ...this.state.notifications.slice(0, 9)]
        const newlind = list
        return {
          notifications: newlind
        }
      });
      this.props.reloadWallet();
    }

    //TODO vote Ws 
    // this.listener.on("vote", vote => {
    //   if (vote.candidateAddress === wallet.current.address) {
    //     sendNotification(`Received ${vote.votes} votes from ${vote.voterAddress}`, {
    //       icon: require("../../images/linda-logo.jpg")
    //     });
    //     this.setState(state => ({
    //       notifications: [{
    //         id: this.id++,
    //         type: "vote",
    //         ...vote,
    //       }, ...state.notifications.slice(0, 9)]
    //     }));
    //   }
    // });

    // this.listener.on("witness-create", event => {
    //   this.props.reloadWallet();
    // });
  }


  componentWillUnmount() {
    // this.listener && this.listener.close();
  }

  enableDesktopNotifications = async () => {
    if (await requestNotifyPermissions()) {
      this.setState({
        modal: (
            <SweetAlert success title={tu("notifications_enabled")} onConfirm={() => this.setState({modal: null,})}>
              {tu("desktop_notification_enabled")}
            </SweetAlert>
        )
      });
    }
  };

  shouldRequestForPermission() {
    return getNotifyPermission() === "default";
  }

  render() {

    let {wallet} = this.props;
    let {modal, notifications = []} = this.state;

    return (
        <li className="nav-item dropdown">
          {modal}
          <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="javascript:;">
            <i className="fa fa-bell mr-2"/>
            {
              notifications.length > 0 &&
              <span className="badge badge-notify">{notifications.length}</span>
            }
          </a>
          <ul className="dropdown-menu dropdown-menu-right wallet-notifications">
            {
              notifications.length === 0 &&
              <h6 className="dropdown-header text-center">{tu("no_notifications")}</h6>
            }
            {
              notifications.length > 0 &&
              <Fragment>
                {
                  notifications.map(notification => (
                      <Notification key={notification.id} account={wallet.current} notification={notification}/>
                  ))
                }
              </Fragment>
            }
            {
              this.shouldRequestForPermission() &&
              <a href="javascript:;" className="dropdown-item" onClick={this.enableDesktopNotifications}>
                {tu("enable_desktop_notifications")}
              </a>
            }
          </ul>
        </li>
    );
  }
}

function mapStateToProps(state) {
  return {
    wsdata: state.account.wsdata
  }
}

const mapDispatchToProps = {
  reloadWallet,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
