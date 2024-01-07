import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FillNav from '../component/fillPage/FillNav'
import SideBar from '../component/sideBar/SideBar'
import axios from 'axios';
import { SITE } from '../App';
import { useSelector } from "react-redux";

export default function FillPage() {
  //! user
  const user = useSelector(({ users }) => {
    return users.currentUser
  })
  const [valueModalTransactionInRange, setValueModalTransactionInRange] = useState(null);
  const getTransactionFillPage = async () => {
    const resArrayTransaction = await axios.get(`${SITE}/fill/fillPage/${user.user_id}`,
      { params: {
        timeRange: timeRangeValue ? timeRangeValue : undefined,
        walletId: walletValue ? walletValue.wallet_id : undefined,
        categoryId: categoryValue? categoryValue.categoryId : undefined,
        categoryChildId: categoryValue? categoryValue.categoryChildId : undefined
      }}
        
    )
    console.log(resArrayTransaction.data);
    setValueModalTransactionInRange(resArrayTransaction.data)
  }
  //! setWallet Fillter
  const [walletValue, setWalletValue] = useState(null);
  console.log(walletValue);


  //! setCategory Fillter
  const [categoryValue, setCategoryValue] = useState(null);
  console.log(categoryValue);
  //! setTimeRange Fillter
  const [timeRangeValue, setTimeRangeValue] = useState(null);
  console.log(timeRangeValue);


  //! xử lý các modal của wallet Detailt
  const [valueModalWallet, setValueModalWallet] = useState(null);
  const getValueModalWallet = async (transId) => {
    const resTransaction = await axios.get(`${SITE}/transaction/${transId}`);
    console.log(resTransaction.data);
    setValueModalWallet(resTransaction.data)
  }
  useEffect(() => {
    if (walletValue || categoryValue || timeRangeValue) {
      getTransactionFillPage()

    }
  }, [walletValue, categoryValue,timeRangeValue])
  return (
    <>

      <FillNav setWallet={setWalletValue} setCategory={setCategoryValue} setTimeRange= {setTimeRangeValue} timeRange = {timeRangeValue}/>
      <SideBar />

      <div class='container-body-fillpage'>
        <div class='box-fillpage'>
          {valueModalTransactionInRange ?
            <div className=" body-box-fillpage">
              <div className=" modal-wallet-header">
                <h1 className=" fs-2 fw-semibold " id="time-range-modal-label">{valueModalTransactionInRange.title}</h1>

              </div>
              <div className=" modal-time-range">


                <div class='overview-time-range'>
                  <p >{valueModalTransactionInRange.amountResult} ket qua</p>
                  <div class='overview-detail d-flex justify-content-between'>
                    <p class='overview-detail-title'>khoan chi</p>
                    <p class='overview-detail-number'> {valueModalTransactionInRange.expense}</p>
                  </div>
                  <div class='overview-detail d-flex justify-content-between'>
                    <p class='overview-detail-title'>khoan thu</p>
                    <p class='overview-detail-number'> {valueModalTransactionInRange.income}</p>
                  </div>
                </div>

                <div class='detail-day'>
                  {!valueModalTransactionInRange.arrDays ? null :
                  <>
                  {valueModalTransactionInRange.arrDays.length < 1 ? null :
                    <>
                      {valueModalTransactionInRange.arrDays.map(day =>
                        <>
                          <div class='break-modal-time-range'></div>
                          <div class='detail-day-item'
                          >
                            <div class='header-detail-day d-flex align-items-center justify-content-between'>
                              <div class='day-detail d-flex align-items-center justify-content-between'>
                                <p class='day-less'>{day.date.date}</p>
                                <div class='day-full'>
                                  <p class='day-of-the-week'>{day.date.weekday} </p>
                                  <p class='month-full'>{day.date.formattedDate} </p>
                                </div>
                              </div>
                            </div>
                            <div class='transactions-of-the-day'>
                              <ul class='list-transaction'>
                                {day.arrTrans.map(tran =>
                                  <li class='item-transaction d-flex align-items-center justify-content-between' data-bs-toggle="modal" data-bs-target="#detail-transaction-modal"
                                    onClick={() => {
                                      getValueModalWallet(tran.transaction_transaction_id)
                                    }}>
                                    <div class='left-item-transaction d-flex align-items-center justify-content-between' >
                                      <div class='icon-category'>
                                        <img data-v-7952c15b src={tran.category_child_category_child_icon ? tran.category_child_category_child_icon : tran.category_category_icon} onerror="if (this.src != 'error.jpg') this.src = 'https://static.moneylover.me/img/icon/icon_2.png'" name={2} className="transaction-icon" />

                                      </div>
                                      <div class='name-category'>{tran.category_child_category_child_name ? tran.category_child_category_child_name : tran.category_category_name}</div>

                                    </div>
                                    <div class='right-item-transaction'>
                                      <p>{tran.totalAmount}</p>
                                    </div>
                                  </li>
                                )}

                              </ul>
                            </div>
                          </div>
                        </>
                      )}

                    </>
                  }
                  </>
                  }
                  
                </div>
              </div>

            </div>
            :
            null
          }
        </div>
      </div>

      {/* Modal detail transaction */}
      {/* Modal Wallet*/}
      <div className="modal fade " id="detail-transaction-modal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog detail-transaction-modal-dialog">
          {valueModalWallet ?
            <div className="modal-content detail-transaction-modal-content">
              <div className="modal-header detail-transaction-modal-header">
                <h1 className="modal-title fs-2 fw-semibold " id="exampleModalLabel">Transaction details</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                  onClick={() => {
                    setValueModalWallet(null)
                  }}
                />
              </div>
              <div className="modal-body body-detail-transaction-modal">
                <div class='category-detail-transaction fs-2 d-flex align-items-center'>
                  <span class='pe-3  d-flex align-items-center'>
                    <img data-v-622239a1 src={valueModalWallet.category_child_category_child_icon ? valueModalWallet.category_child_category_child_icon : valueModalWallet.category_category_icon} onerror="if (this.src != 'error.jpg') this.src = 'https://static.moneylover.me/img/icon/icon_2.png'" name={2} width="56px" height="56px" className="transaction-icon" />

                  </span>
                  <span>{valueModalWallet.category_child_category_child_name ? valueModalWallet.category_child_category_child_name : valueModalWallet.category_category_name}</span>
                </div>
                <div class='amount-detail-transaction fs-2'>{valueModalWallet.transaction_amount}</div>
                {/* <hr /> */}
                <div class='time-detail-transaction fs-5'>
                  <span class='pe-3'>
                    <i class="fa-regular fa-calendar-days"></i>
                  </span>
                  <span>{valueModalWallet.transaction_transaction_date.weekday}, {valueModalWallet.transaction_transaction_date.date} {valueModalWallet.transaction_transaction_date.formattedDate}</span>
                </div>
                <div class='wallet-detail-transaction fs-5 d-flex'>
                  <img data-v-6873f8d2 src={valueModalWallet.wallet_wallet_icon} onerror="if (this.src != 'error.jpg') this.src = 'https://static.moneylover.me/img/icon/icon.png'" name={4} className="wallet-icon me-3" />

                  <span >{valueModalWallet.wallet_wallet_name}</span>
                </div>


              </div>
              <div class='delete-transaction-button'>Delete Transaction</div>

            </div>
            :
            null
          }


        </div>
      </div>

    </>
  )
}
