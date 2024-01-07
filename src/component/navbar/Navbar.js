import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateDefaultWallet } from '../../service/walletService';

export default function Navbar() {
  const dispatch = useDispatch();

  const walletDefault = useSelector(({ wallet }) => {
    return wallet.defaultWallet

  })
  
  if(walletDefault) {
    console.log(1);
  }
  console.log(walletDefault);
  const CurrentListWallet = useSelector(({ wallet }) => {
    return wallet.currentListWallet

  })
  if(CurrentListWallet) {
    console.log(1);
  }
  const [subjectSel, setSubject] = useState();
  const [walletDropdown, setWalletDropdown] = useState();
  const [day, setDay] = useState(null);


  useEffect(() => {
    const currentDate = new Date();

  // Lấy thông tin ngày, tháng, năm
  setDay(currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate()) 
  }, [])

  function dropdown(e) {
    myFunction(e, walletDropdown)
  }

  if (subjectSel && walletDropdown) {
    document.addEventListener("click", function (event) {
      if (!walletDropdown.contains(event.target) && !subjectSel.contains(event.target)) {
        walletDropdown.style.display = "none";
      }


    });
  }

  function updateWalletDefault(wallet) {
    try {
      dispatch(updateDefaultWallet(wallet)).then((data) => {
      })

    } catch (error) {
      console.log(error);
    }
  }
  function myFunction(event, dropdownEle) {
    if ((dropdownEle.style.display == "" || dropdownEle.style.display == "none")) {

      dropdownEle.style.display = "block"

    } else if (!dropdownEle.contains(event.target)) {
      dropdownEle.style.display = "none"

    }

  }

  useEffect(() => {
    setSubject(document.getElementById("notif-dropdown"))
    setWalletDropdown(document.getElementById("wallet-dropdown"))
  }, [])

  return (
    <>
      <div class='navbar d-flex'>
        <div class='navbar-left d-flex align-items-center ' id='notif-dropdown' onClick={(e) => {
          dropdown(e);
        }}>
          <div class=''>
            <img class='img-wallet' alt='Anh Wallet' src='https://static.moneylover.me/img/icon/ic_category_all.png' />
          </div>
          <div class='d-flex flex-column info'>
            {!walletDefault ? null : 
            <>
            <div class='name-wallet-navbar'>{walletDefault.wallet_name}</div>
            <div class='total-wallet-navbar'>{walletDefault.total} ₫</div>
            </>}
            
          </div>
          {/* //! Dropdown */}
          <div id='wallet-dropdown' class=''>
            <p class='title-wallet-dropdown'>Select Wallet</p>
            <hr />
            {/* Total wallet */}
            {!CurrentListWallet  ? null :
            <>
            {CurrentListWallet.map(wallet =>
              <div class='wallet-item d-flex align-items-center ps-3' onClick={
                () => {
                  updateWalletDefault(wallet)
                }
              }>
                <div>
                  <img class='img-wallet' alt='Anh Wallet' src='https://static.moneylover.me/img/icon/ic_category_all.png' />
                </div>
                <div class='d-flex flex-column info'>
                  <div class='name-wallet-navbar-dropdown'>{wallet.wallet_name}</div>
                  <div class='total-wallet-navbar-dropdown'>+{wallet.total} ₫</div>
                </div>
                {!walletDefault ? null : 
                <>
                {wallet.wallet_name == walletDefault.wallet_name ?
                  <span data-v-6873f8d2 className="not-support check">
                    <svg data-v-0698e127 data-v-6873f8d2 xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={24} height={24} viewBox="0 0 24 24" aria-labelledby="ic_check" version="1.1">
                      <defs data-v-0698e127 />
                      <g data-v-0698e127 id="Icons/account/ic_account" stroke="none" strokeWidth={1} fill="#1AA333" fillRule="evenodd">
                        <rect data-v-0698e127 id="blue-background" fillOpacity={0} fill="#FFFFFF" x={0} y={0} width={24} height={24} />
                        <polygon data-v-6873f8d2 id="icon-done" fillOpacity="0.65" points="8.55923077 19.1238421 3 13.6303158 4.46907692 12.1791053 8.60215385 16.2645263 19.6382308 6 21.0616154 7.495" data-v-0698e127 />
                      </g>
                    </svg>
                  </span>
                  :
                  null
                }
               </>}


              </div>
            )}
            </>
            
            }  

            



          </div>

        </div>
        <div class='navbar-right me-5'>
          <ul class="list-navbar-right">
            <li class="item-list-navbar-right">
              <div class="jump-to-day-icon">
                <svg class="icon" data-v-0698e127 data-v-6240d44b xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={24} height={24} viewBox="0 0 24 24" aria-labelledby="ic_calendar_empty" version="1.1"><defs data-v-0698e127 /> <g data-v-0698e127 id="Icons/account/ic_account" stroke="none" strokeWidth={1} fill="rgba(0,0,0,0.54)" fillRule="evenodd"><rect data-v-0698e127 id="blue-background" fillOpacity={0} fill="#FFFFFF" x={0} y={0} width={24} height={24} /> <path data-v-6240d44b d="M16,1 L16,3 L8,3 L8,1 L6,1 L6,3 L5,3 C3.895,3 3.01,3.895 3.01,5 L3,19 C3,20.105 3.895,21 5,21 L19,21 C20.105,21 21,20.105 21,19 L21,5 C21,3.895 20.105,3 19,3 L18,3 L18,1 L16,1 L16,1 Z M5,19 L5,8 L19,8 L19,19 L5,19 Z" id="Shape" data-v-0698e127 /></g></svg>

                <span class="today">{day ?day : null}</span>
              </div>
            </li>
            <li class="item-list-navbar-right">
              <div class="jump-to-day-icon">
                <svg data-v-0698e127 data-v-6240d44b xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={24} height={24} viewBox="0 0 24 24" aria-labelledby="ic_view_by_time" version="1.1"><defs data-v-0698e127 /> <g data-v-0698e127 id="Icons/account/ic_account" stroke="none" strokeWidth={1} fill="rgba(0,0,0,0.54)" fillRule="evenodd"><rect data-v-0698e127 id="blue-background" fillOpacity={0} fill="#FFFFFF" x={0} y={0} width={24} height={24} /> <path data-v-0698e127 d="M21.9831525,10 L18.5,10 L18.5,11 L17,11 L17,10 L16.5834809,10 C15.8114517,8.23459741 14.0490273,7 12,7 C9.24,7 7,9.24 7,12 C7,14.5912586 8.97447379,16.7241572 11.5,16.9752745 L11.5,19.4895971 C6.71674598,19.2901826 2.672042,16.2429274 1,12 C2.73,7.61 7,4.5 12,4.5 C16.2047939,4.5 19.8872962,6.69503601 21.9831525,10 Z M22.5,10.8997351 C22.5172517,10.9330647 22.5343504,10.9664866 22.551295,11 L22.5,11 L22.5,10.8997351 Z M14.2348007,10 L13,10 L13,11 L11.5,11 L11.5,14.9583906 C10.0824015,14.7198722 9,13.4846738 9,12 C9,10.345 10.345,9 12,9 C12.8871479,9 13.6852205,9.38647232 14.2348007,10 Z" /> <path data-v-0698e127 d="M19.5,12 L16,12 L16,11 L14,11 L14,12 L13.5,12 C12.8554167,12 12.5,12.337 12.5,13 L12.5,22 C12.5,22.663 12.8554167,23 13.5,23 L22,23 C22.6445833,23 23,22.663 23,22 L23,13 C23,12.337 22.6445833,12 22,12 L21.5,12 L21.5,11 L19.5,11 L19.5,12 Z M13.5,22 L13.5,15 L22,15 L22,22 L13.5,22 Z M21,18 L18,18 L18,21 L21,21 L21,18 L21,18 Z" /></g></svg>

              </div>
            </li>
            <li class="item-list-navbar-right">
              <Link style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} to="/search" >

                <div class="jump-to-day-icon">
                  <svg data-v-0698e127 data-v-6240d44b xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={24} height={24} viewBox="0 0 24 24" aria-labelledby="ic_search" version="1.1"><defs data-v-0698e127 /> <g data-v-0698e127 id="Icons/account/ic_account" stroke="none" strokeWidth={1} fill="rgba(0,0,0,0.54)" fillRule="evenodd"><rect data-v-0698e127 id="blue-background" fillOpacity={0} fill="#FFFFFF" x={0} y={0} width={24} height={24} /> <path data-v-6240d44b d="M16.8472,15.1496 L16.564,15.4328 L15.5056,14.3744 C16.5632,13.068 17.2,11.408 17.2,9.6 C17.2,5.4096 13.7904,2 9.6,2 C5.4096,2 2,5.4096 2,9.6 C2,13.7904 5.4096,17.2 9.6,17.2 C11.408,17.2 13.068,16.5632 14.3744,15.5056 L15.4328,16.564 L15.1496,16.8472 L19.9512,21.6488 L21.648,19.952 L16.8472,15.1496 L16.8472,15.1496 Z M9.6008,14.8 C6.7336,14.8 4.4008,12.4672 4.4008,9.6 C4.4008,6.7328 6.7336,4.4 9.6008,4.4 C12.468,4.4 14.8008,6.7328 14.8008,9.6 C14.8008,12.4672 12.4672,14.8 9.6008,14.8 L9.6008,14.8 Z" id="icon-search" data-v-0698e127 /></g></svg>

                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>

    </>
  )
}
