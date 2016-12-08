import React, { Component } from 'react';
import { map } from 'lodash';
import { post } from '../../../utils/fetch';
const ALIPAY_HOST = "mapi.alipay.com";
const ALIPAY_PATH = "gateway.do";

export default class PayComponent extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      otherMoney: 0,
      paymode: 0
    }
  }

  // 生成微信支付二维码
  generateWeixinPayCode(url) {
    let box = document.createElement('div');
    box.style.cssText = 'position: fixed; top: 0; left: 0;right: 0;bottom: 0;z-index: 9999; background-color: rgba(255, 255, 255, 0.7)';

    let content = document.createElement('div');
    content.style.cssText = 'position: absolute; top: 50%;left: 50%;width: 460px;height: 500px;border: 5px solid rgba(200, 200, 200, .5);margin: -230px 0 0 -230px;background-color:#fff;';

    let qrcode = document.createElement('div');
    qrcode.id = 'qrcode';
    qrcode.style.cssText = 'font-size: 0;margin: 70px auto 0; width: 256px;height: 256px;';

    let qrcodeImage = document.createElement('img');
    qrcodeImage.src = 'data:image/png;base64,' + url;
    qrcodeImage.style.cssText = 'width: 100%; height: 100%;';
    qrcode.appendChild(qrcodeImage);

    let close = document.createElement('span');
    close.innerHTML = '&times;'
    close.style.cssText = 'position: absolute; top: 10px; right: 10px;width: 30px;height: 30px;border: 1px solid #ddd;border-radius: 50%;font-size: 18px;text-align: center;line-height: 28px;color: #ddd;cursor: pointer;';

    close.onclick = function () {
      document.body.removeChild(box);
    };

    let header = document.createElement('div');
    header.style.cssText = 'height: 50px;line-height: 50px;font-size: 18px;color: #fff;padding-left: 20px;background-color: #333;';
    header.innerHTML = '请用手机打开微信APP扫一扫支付';

    let tips = document.createElement('p');
    tips.style.cssText = 'text-align: center;';
    tips.innerHTML = '支付成功后，点击‘支付完成’按钮，即可更新火星币余额';

    let button = document.createElement('div');
    button.innerHTML = '支付完成';
    button.style.cssText = 'cursor:pointer;margin-top: 20px;background-color: #85cc3f;color:#fff;font-size: 18px;text-align: center;line-height: 60px;';

    let clicked = false;

    button.onclick = () => {
      if (clicked) {
        return true;
      }
      let count = 5;
      let self = this;
      function refresh(count) {
        button.innerHTML = '正在查询数据<span>(' + count + ')</span>';
        if (count > 0) {
          setTimeout(() => {
            count -= 1;
            refresh(count);
          }, 1000);
        } else {
          self.props.updateUser();
          document.body.removeChild(box);
        }
      }

      refresh(count);
    };

    content.appendChild(header);

    content.appendChild(close);
    content.appendChild(qrcode);
    content.appendChild(tips);
    content.appendChild(button);

    box.appendChild(content);

    document.body.appendChild(box);

    return {
      close: () => {
        document.removeChild(box);
      }
    };
  }

  doPay(evt) {
    
    // let agree = this.refs.agreePayPolicy.checked;
    // if (!agree) {
    //   alert('请同意《用户使用协议》');
    //   evt.preventDefault();
    //   return false;
    // }

    let { price, otherMoney, paymode } = this.state;

    if (price < 0 && otherMoney < 1) {
      alert('请至少充值1元');
      evt.preventDefault();
      return false;
    }

    let { productList } = this.props;
    let product = productList[price];
    if (paymode === 0) {
      this.refs.pid.value = product.id;
      this.refs.amount.value = 1//product.packamount;
      this.props.onPaying();
      return true;
    }
    evt.preventDefault();

    _loading();
    post('/api/user/wxpay', {
      body: {
        pid: product.id,
        amount: 1//product.packamount
      }
    }).then(resp => {
      _loading(1);
      if (resp.errorCode > 0) {
        _alertCenter('请求失败，请重试', 'error');
      } else {
        this.generateWeixinPayCode(resp.data.qrImage);
      }
    });
  }

  changeOtherMoney(evt) {
    let money = evt.target.value.trim();

    if (money >= 1) {
      this.setState({
        otherMoney: money - 0,
        price: -1
      });
    } else {
      this.setState({
        otherMoney: 0
      });
    }
  }

  render() {
    let { productList, user, route } = this.props;
    return (
     <form ref="payForm" action="/api/user/alipay" method="get" onSubmit={this.doPay.bind(this)} target="_blank" className="topUp-box">
       <ul className="userRect">
         <li className="user-nameRect">
           <label>充值账户：</label>
           <span className="name">{user.nickName}</span>
         </li>
         <li className="user-remainingSumRect">
           <label>火星币余额：</label>
           <span className="sum"><em>{user.goldAmount}</em>火星币</span>
         </li>
       </ul>
       <div className="rech">
         <div className="way">
           <label>充值方式：</label>
           <ul className="wayRect">
            <li 
              onClick={() => this.setState({paymode: 0})}
              className={'way-list' + (this.state.paymode === 0 ? ' on' : '')}>
              <div className="wayLog"><img src={route.CDN + '/assets/images/way-zhifubao.png'}/></div>
              <span className="des"><em></em>支付宝</span>
            </li>
            <li 
              onClick={() => this.setState({paymode: 1})}
              className={'way-list' + (this.state.paymode === 1 ? ' on' : '')}>
              <div className="wayLog"><img src={route.CDN + '/assets/images/way-weixin.png'} /></div>
              <span className="des"><em></em>微信</span>
            </li>
           </ul>
         </div>
         <div className="moneyRect">
           <label>充值金额：</label>
           <ul>
            {
              map(productList, (product, index) => {
                return (
                  <li className={'money-list' + (this.state.price === index ? ' on' : '')} key={index} onClick={() => {this.setState({price: index})}}>
                    <p className="hxNum">{product.title}</p>
                    <span className="moneyNum">{product.packamount / 100}<em>元</em></span>
                    <img src={route.CDN + '/assets/images/money-' + (product.packamount / 100) + '.png'}/>
                  </li>
                );
              })
            }
           </ul>
           {
            /*
            <dl className="restsMoney">
              <dt className="restsMoney-msg">其他金额<span>(输入金额最小为1)</span></dt>
              <dd><input type="text" ref="otherMoney" onChange={this.changeOtherMoney.bind(this)}/><span>元=<em>{this.state.otherMoney * 100}</em>火星币</span></dd>
            </dl>
             */
           }
         </div>
       </div>
       <div className="confirm-box">
         {
          /*
          <dl>
           <dd className="checkBox"><input ref="agreePayPolicy" id="agreePayPolicy" type="checkbox" /><label></label></dd>
           <dt className="agreement"><label style={{cursor: 'pointer'}} htmlFor="agreePayPolicy">我已同意火星小说《用户使用协议》</label> </dt>
         </dl>
         同意并确认充值
           */
         }
         <input type="hidden" name="pid" ref="pid" />
         <input type="hidden" name="amount" ref="amount" />
         <input style={{marginTop: '60px', border: '0 none', lineHeight: 'inherit'}} type="submit" className="confirm-btn" value="确认充值" />
       </div>
     </form>
    )
  }
}