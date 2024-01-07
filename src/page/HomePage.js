import React, { useEffect, useState } from 'react'
import Navbar from '../component/navbar/Navbar'
import SideBar from '../component/sideBar/SideBar'
import axios from 'axios';
import { SITE } from '../App';
import { useSelector } from "react-redux";

export default function HomePage() {

  const [xScroll, setXScoll] = useState(null);
  const [xPage, setXPage] = useState(0);
  const [xScrollNew, setXScollNew] = useState();
  const [scrollableContent, setScrollableContent] = useState();
  const [scrollableContainer, setScrollableContainer] = useState();

  const [maxScrollLeft, setMaxScrollLeft] = useState();

  const [isDrag, setIsDrag] = useState(false)

  //! user
  const user = useSelector(({ users }) => {
    return users.currentUser
  })
  //! xử lý hiển thị trong các pill
  const [arrayMonth, setArrayMonth] = useState(null);
  const getArrayMonth = async () => {
    const resArrayMonth = await axios.get(`${SITE}/fill/20month/${user.user_id}`);
    setArrayMonth(resArrayMonth.data)
  }
  useEffect(() => {
    getArrayMonth()
  }, [])


  //! xu ly keo menu
  useEffect(() => {
    setScrollableContent(document.getElementById('scrollable-content'))
    setScrollableContainer(document.getElementById('scrollable-container'))

  }, [arrayMonth])


  function mouseDown(e) {
    e.preventDefault()
    setIsDrag(true)
    scrollableContent.addEventListener('mousemove', handleDrag);
    scrollableContent.addEventListener('mouseup', mouseUp);
    scrollableContent.addEventListener('mouseleave', mouseLeave);
    setXScoll(e.pageX);


  }
  function mouseLeave(e) {
    e.preventDefault()

    scrollableContent.removeEventListener('mousemove', handleDrag);
    scrollableContent.removeEventListener('mouseleave', mouseLeave);

    // scrollableContent.removeEventListener('mouseup', mouseUp);
    setIsDrag(false)

  }
  function mouseUp(e) {
    e.preventDefault()

    scrollableContent.removeEventListener('mousemove', handleDrag);
    scrollableContent.removeEventListener('mouseup', mouseUp);
    setIsDrag(false)

  }
  function handleDrag(e) {
    e.preventDefault()

    setXScollNew(e.pageX);

  }



  if (xScroll && xScrollNew) {

    if (xPage + (xScrollNew - xScroll) * 1 > 0) {
      setXPage(0)
      scrollableContainer.scrollLeft = 0


    } else if (xPage + (xScrollNew - xScroll) * 1 < -(maxScrollLeft)) {
      console.log(maxScrollLeft);
      setXPage(-(maxScrollLeft))
      scrollableContainer.scrollLeft = maxScrollLeft;


    } else {

      setXPage(xPage + (xScrollNew - xScroll) * 1)
      scrollableContainer.scrollLeft = -(xPage + (xScrollNew - xScroll) * 1);


    }

    setXScoll(xScrollNew)
    setXScollNew(null)
  }

  useEffect(() => {
    if (scrollableContainer) {
      setMaxScrollLeft(scrollableContainer.scrollWidth - scrollableContainer.clientWidth)

    }
  }, [scrollableContainer, arrayMonth])

  useEffect(() => {

    if (scrollableContent) {
      scrollableContent.addEventListener('mousedown', mouseDown, { once: true });
    }
  }, [scrollableContent, isDrag, arrayMonth])

  //! xử lý các modal của time-range
  const [valueModalTransactionInRange, setValueModalTransactionInRange] = useState(null);
  const getTransactionInRange = async (month, range, expense, income) => {
    const resArrayTransaction = await axios.get(`${SITE}/fill/month/${user.user_id}-${month}/range/${range}/total/${expense}-${income}`);
    console.log(resArrayTransaction.data);
    setValueModalTransactionInRange(resArrayTransaction.data)
  }
  useEffect(() => {
    getArrayMonth()
  }, [])
  //! xử lý các modal của wallet Detailt
  const [valueModalWallet, setValueModalWallet] = useState(null);
  const getValueModalWallet = async (transId) => {
    const resTransaction = await axios.get(`${SITE}/transaction/${transId}`);
    console.log(resTransaction.data);
    setValueModalWallet(resTransaction.data)
  }
  // useEffect(() => {
  //   getValueModalWallet()
  // }, [])




  return (
    <>
      <div class='container-navbar-side' style={{ paddingLeft: 80 }}>
        <Navbar />
      </div>

      <div class='container-body-homepage '>
        <div class='box-transaction'>
          <div id="scrollable-container" >
            <div id="scrollable-content" >


              {/* //! Pill Category */}
              <ul class="nav nav-pills  d-inline-flex align-items-center justify-content-center flex-nowrap pill-transaction" id="pills-tab" role="tablist">
                {arrayMonth ?
                  <>
                    {arrayMonth.map(month => <>
                      <li class="nav-item" role="presentation">
                        <button class="nav-link " id={`pills-${month.idMonthYear}-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${month.idMonthYear}`} type="button" role="tab" aria-controls={`pills-${month.idMonthYear}`} aria-selected="false">{month.formattedMonth}</button>
                      </li>
                    </>)}


                  </>

                  : null}


              </ul>


            </div>

          </div>
          <hr class='hr-transaction' />

          {/* //! Tab Pill content */}
          <div class="tab-content" id="pills-tabContent">
            {arrayMonth ?
              <>
                {arrayMonth.map(month => <>
                  <div class="tab-pane fade " id={`pills-${month.idMonthYear}`} role="tabpanel" aria-labelledby={`pills-${month.idMonthYear}-tab`} tabindex="0"
                  >
                    <div class='container-balance-pill'>
                      <div class='balance-pill'>
                        <div class='d-flex income-balance p-2 justify-content-between'>
                          <p>Số dư đầu kỳ</p>
                          <p class='p-income'>{month.soDuDauKy} ₫</p>
                        </div>
                        <div class='d-flex extense-balance p-2 justify-content-between'>
                          <p>Số dư cuối kỳ</p>
                          <p class='p-extense'>{month.soDuCuoiKy} ₫</p>
                        </div>

                      </div>
                    </div>
                    <div class='break'></div>
                    {/* //! Chi tiết từng giai đoạn ngày */}
                    {month.ThuTrong1_10 ?
                      <div class='detail-range-transaction '>
                        <div
                          onClick={() => {
                            getTransactionInRange(month.thang, '01-10', month.ThuTrong1_10, month.chiTieuTrong1_10)

                          }}
                          class='detait-item d-flex justify-content-between align-items-center p-2' data-bs-toggle="modal" data-bs-target="#time-range-modal" >
                          <div class='range-time-transaction' >
                            1-10
                          </div>
                          <div class='total-of-this-time'>

                            <p class='income-of-this-time'>{month.ThuTrong1_10}</p>

                            <p class='expense-of-this-time'>{month.chiTieuTrong1_10}</p>
                            <hr />
                            <p class='balance-of-this-time'>{month.ThuTrong1_10 - month.chiTieuTrong1_10}</p>

                          </div>
                        </div>
                        {/* <hr/ > */}
                        <div class='detait-item d-flex justify-content-between align-items-center p-2' data-bs-toggle="modal" data-bs-target="#time-range-modal"
                          onClick={() => {
                            getTransactionInRange(month.thang, '11-20', month.ThuTrong11_20, month.chiTieuTrong11_20)

                          }}>
                          <div class='range-time-transaction' >
                            11-20
                          </div>
                          <div class='total-of-this-time'>

                            <p class='income-of-this-time'>{month.ThuTrong11_20}</p>

                            <p class='expense-of-this-time'>{month.chiTieuTrong11_20}</p>
                            <hr />
                            <p class='balance-of-this-time'>{month.ThuTrong11_20 - month.chiTieuTrong11_20}</p>

                          </div>
                        </div>
                        {/* <hr/ > */}
                        <div class='detait-item d-flex justify-content-between align-items-center p-2' data-bs-toggle="modal" data-bs-target="#time-range-modal"
                          onClick={() => {
                            getTransactionInRange(month.thang, '21-31', month.ThuTrong21_31, month.chiTieuTrong21_31)

                          }}
                        >
                          <div class='range-time-transaction' >
                            21-30
                          </div>
                          <div class='total-of-this-time'>

                            <p class='income-of-this-time'>{month.ThuTrong21_31}</p>

                            <p class='expense-of-this-time'>{month.chiTieuTrong21_31}</p>
                            <hr />
                            <p class='balance-of-this-time'>{month.ThuTrong21_31 - month.chiTieuTrong21_31}</p>

                          </div>
                        </div>
                      </div>
                      :
                      <div data-v-71b42fb1="" class="transaction-empty">
                        <div data-v-71b42fb1="" class="moneylover-empty">
                          <span data-v-71b42fb1="" class="smile all">^_^</span>

                          <span data-v-71b42fb1="" class="tips">
                            <span data-v-71b42fb1="" class="note">No transactions</span>
                          </span>
                        </div>
                      </div>
                    }

                  </div>
                </>)}


              </>

              : null}


          </div>


        </div>

      </div>
      //! Modal
      {/* Modal Wallet*/}
      <div className="modal fade " id="time-range-modal" tabIndex={-1} aria-labelledby="time-range-modal-label" aria-hidden="true">
        <div className="modal-dialog time-range-modal-dialog">
          {valueModalTransactionInRange ?
            <div className="modal-content time-range-modal-content">
              <div className="modal-header modal-wallet-header">
                <h1 className="modal-title fs-2 fw-semibold " id="time-range-modal-label">{valueModalTransactionInRange.title}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" 
                onClick={() => {
                  setValueModalTransactionInRange(null)
                }}
                />
              </div>
              <div className="modal-body modal-time-range">


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
                                  onClick={()=> {
                                    getValueModalWallet(tran.transaction_transaction_id)
                                  }}>
                                    <div class='left-item-transaction d-flex align-items-center justify-content-between' >
                                      <div class='icon-category'>
                                        <img data-v-7952c15b src={tran.category_child_category_child_icon ? tran.category_child_category_child_icon: tran.category_category_icon} onerror="if (this.src != 'error.jpg') this.src = 'https://static.moneylover.me/img/icon/icon_2.png'" name={2} className="transaction-icon" />

                                      </div>
                                      <div class='name-category'>{tran.category_child_category_child_name ? tran.category_child_category_child_name: tran.category_category_name}</div>

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
                <img data-v-622239a1 src={valueModalWallet.category_child_category_child_icon ? valueModalWallet.category_child_category_child_icon: valueModalWallet.category_category_icon} onerror="if (this.src != 'error.jpg') this.src = 'https://static.moneylover.me/img/icon/icon_2.png'" name={2} width="56px" height="56px" className="transaction-icon" />

              </span>
              <span>{valueModalWallet.category_child_category_child_name ? valueModalWallet.category_child_category_child_name: valueModalWallet.category_category_name}</span>
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
      <SideBar />
    </>


  )
}
