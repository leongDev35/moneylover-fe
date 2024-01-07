
import React, { useEffect, useState } from 'react';
import { DatePicker, Space } from 'antd';
import { useSelector } from "react-redux";
import axios from "axios";
import { SITE } from "../../App";
import { useDispatch } from "react-redux";
import { updatecurrentListWallet } from '../../service/walletService';
import { Link } from 'react-router-dom';

export default function SideBar() {
  //! user
  const user = useSelector(({ users }) => {
    return users.currentUser

  })


  function openNav() {
    document.getElementById("mySidenav").style.width = "364px";
    document.getElementById("off-canvas").style.width = "100%";
  }

  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("off-canvas").style.width = "0%";

  }

  //! Set amount
  const [amount, setAmount] = useState('0');

  // Hàm xử lý sự kiện thay đổi giá trị
  const handleInputChange = (event) => {
    // Lấy giá trị từ trường input và cập nhật state

    setAmount(event.target.value);
  };
  //! note
  const [noteValue, setNoteValue] = useState('');

  const handleNoteChange = (event) => {
    setNoteValue(event.target.value);
  };

  //! date
  const [dateValue, setDateValue] = useState('');

  const onChange = (date, dateString) => {
    console.log(dateString);
    setDateValue(dateString)
  };
  //! wallet 
  const walletDefault = useSelector(({ wallet }) => {
    return wallet.defaultWallet

  })

  const CurrentListWallet = useSelector(({ wallet }) => {
    return wallet.currentListWallet

  })
  const [walletValue, setWalletValue] = useState(walletDefault);
  function updateWalletValue(wallet) {
    try {
      setWalletValue(wallet)

    } catch (error) {
      console.log(error);
    }
  }


  //! category

  let [arrayCategory, setArrayCategory] = useState();
  let [categoryValue, setCategoryValue] = useState();
  let [categoryDisplayValue, setCategoryDisplayValue] = useState();
  const getCategory = async () => {
    const resCategory = await axios.get(`${SITE}/category/${user.user_id}`);
    setArrayCategory(resCategory.data)
  }
  function updateCategoryValueParent(categoryParent) {
    setCategoryValue({
      categoryId: categoryParent.category_category_id,
      categoryChildId: null,
    })
    setCategoryDisplayValue({
      category_name: categoryParent.category_category_name,
      category_icon: categoryParent.category_category_icon,

    })


  }
  function updateCategoryValueChild(categoryParentId, categoryChild) {


    setCategoryValue({
      categoryId: categoryParentId,
      categoryChildId: categoryChild.category_child_category_child_id,
    })
    setCategoryDisplayValue({
      category_name: categoryChild.category_child_category_child_name,
      category_icon: categoryChild.category_child_category_child_icon,

    })
  }
  useEffect(() => {

    getCategory()
  }, [])

  //! xử lý transaction
  async function handleSaveTransaction() {
    try {

      const transaction = {
        categoryId: categoryValue.categoryId,
        categoryChildId: categoryValue.categoryChildId,
        walletId: walletValue.wallet_id,
        amount: amount,
        userId: user.user_id,
        note: noteValue,
        date: dateValue
      }

      const res = await axios.post(`${SITE}/transaction`, transaction);
      console.log(res.message);
      setAmount(0)
      setCategoryValue(null);
      setDateValue(null);
      setWalletValue(walletDefault);
      setNoteValue(null);

    } catch (error) {
      console.log(error);
    }

  }

  //! Create NewWallet
  let [nameNewWalletValue, setNameNewWalletValue] = useState();
  let [checkNewNameWallet, setCheckNewNameWallet] = useState();
  let [amountNewWallet, setAmountNewWallet] = useState(0);

  const dispatch = useDispatch();

  // check name 
  async function changeNameNewWalle(e) {
    setNameNewWalletValue(e.target.value)
    console.log(e.target.value);
    const res = await axios.post(`${SITE}/wallet/check`, {
      userId: user.user_id,
      walletName: e.target.value
    });
    console.log(res);
    console.log(res.data.message);
    if (res.data.message == 'Tên ví chưa tồn tại') {
      setCheckNewNameWallet(false)
    } else if(res.data.message == 'Tên ví đã tồn tại') {
      setCheckNewNameWallet(true)
    }
  }
  const handleAmountNewWalletChange = (event) => {
    // Lấy giá trị từ trường input và cập nhật state

    setAmountNewWallet(event.target.value);
  };
  async function handleSaveNewWallet() {
    try {

      const wallet = {
        userId: user.user_id,
        total: amountNewWallet,
        walletName: nameNewWalletValue
      }


      const res = await axios.post(`${SITE}/wallet`, wallet);
      console.log(res.message);
      setAmountNewWallet(0)
      setCheckNewNameWallet(true);
      setNameNewWalletValue(null);
      dispatch(updatecurrentListWallet(user.user_id)).then((data) => {
      })
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <>

      <div class='sidebar'>
        <div onClick={() => {
          openNav()
        }} class='icon-modal-side'>
          <i class="fa-solid fa-bars"></i>
        </div>
        <div class='d-flex flex-column align-items-center justify-content-center p-3 item-sidebar' data-bs-toggle="modal" data-bs-target="#transactionModal">
          <div>
            <svg data-v-0698e127 data-v-9301d238 xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={24} height={24} viewBox="0 0 24 24" aria-labelledby="test" version="1.1"><defs data-v-0698e127 /> <g data-v-0698e127 id="Icons/account/ic_account" stroke="none" strokeWidth={1} fill="#BDBDBD" fillRule="evenodd"><rect data-v-0698e127 id="blue-background" fillOpacity={0} fill="#FFFFFF" x={0} y={0} width={24} height={24} /> <path data-v-9301d238 d="M21,18 L21,19 C21,20.105 20.105,21 19,21 L5,21 C3.895,21 3,20.105 3,19 L3,5 C3,3.895 3.895,3 5,3 L19,3 C20.105,3 21,3.895 21,5 L21,6 L12,6 C10.895,6 10,6.895 10,8 L10,16 C10,17.105 10.895,18 12,18 L21,18 L21,18 Z M12,16 L22,16 L22,8 L12,8 L12,16 L12,16 Z M16,13.5 C15.17,13.5 14.5,12.83 14.5,12 C14.5,11.17 15.17,10.5 16,10.5 C16.83,10.5 17.5,11.17 17.5,12 C17.5,12.83 16.83,13.5 16,13.5 L16,13.5 Z" id="Shape" data-v-0698e127 /></g></svg>

          </div>
          <div class='text-sidebar' >Transactions</div>


        </div>
        <div class='d-flex flex-column align-items-center justify-content-center p-3 item-sidebar' data-bs-toggle="modal" data-bs-target="#walletCreateModal">
          <div>
            <svg data-v-0698e127 data-v-9301d238 xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={24} height={24} viewBox="0 0 24 24" aria-labelledby="test" version="1.1"><defs data-v-0698e127 /> <g data-v-0698e127 id="Icons/account/ic_account" stroke="none" strokeWidth={1} fill="#BDBDBD" fillRule="evenodd"><rect data-v-0698e127 id="blue-background" fillOpacity={0} fill="#FFFFFF" x={0} y={0} width={24} height={24} /> <path data-v-9301d238 d="M21,18 L21,19 C21,20.105 20.105,21 19,21 L5,21 C3.895,21 3,20.105 3,19 L3,5 C3,3.895 3.895,3 5,3 L19,3 C20.105,3 21,3.895 21,5 L21,6 L12,6 C10.895,6 10,6.895 10,8 L10,16 C10,17.105 10.895,18 12,18 L21,18 L21,18 Z M12,16 L22,16 L22,8 L12,8 L12,16 L12,16 Z M16,13.5 C15.17,13.5 14.5,12.83 14.5,12 C14.5,11.17 15.17,10.5 16,10.5 C16.83,10.5 17.5,11.17 17.5,12 C17.5,12.83 16.83,13.5 16,13.5 L16,13.5 Z" id="Shape" data-v-0698e127 /></g></svg>

          </div>
          <div class='text-sidebar' >Wallet</div>


        </div>
          <Link to= '/chart' style={{textDecoration: 'none'}}>
        <div class='d-flex flex-column align-items-center justify-content-center p-3 item-sidebar' >


          <div>
            <i class="fa-solid fa-chart-simple"></i>
          </div>
          <div class='text-sidebar'>Chart</div>


        </div>
          </Link>

        <div id="mySidenav" class="sidenav">
          <a href="javascript:void(0)" class="closebtn" onClick={() => {
            closeNav()
          }}>&times;</a>

          <div class='avatar-user d-flex align-items-center justify-content-center flex-column'>
            <span data-v-3ed8046c className="name-alias" style={{ backgroundColor: 'rgb(174, 86, 216)' }}>l</span>

            <div class='mt-3 d-flex align-items-center justify-content-center flex-column'>
              <div class='user-name'>Leong.Dev.35</div>
              <div class='user-email'>leong.dev.35@gmail.com</div>
            </div>
          </div>
          <hr />

        </div>
      </div>
      <div id='off-canvas' onClick={() => {
        closeNav()
      }}></div>

      {/* //! Modal transaction */}
      <div class="modal fade modal-transaction" id="transactionModal" tabindex="-1" aria-labelledby="transactionModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="transactionModalLabel">Transaction</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class='container-transaction-modal'>
                <div class='amount-transaction-modal d-flex align-items-center p-3' >
                  <div class='coin-transaction-modal'>
                    VND
                  </div>
                  <div class='detail-amount'>
                    <div class='title-detail-amount'>
                      Số tiền
                    </div>
                    <div class='number-detail-amount'>
                      <input
                        type="number"
                        id="moneyInput"
                        value={amount}
                        onChange={handleInputChange}
                      // Các thuộc tính khác bạn muốn thêm vào đây

                      />
                    </div>
                  </div>

                </div>
                <div class='category-transaction d-flex align-items-center p-3' data-bs-toggle="modal" data-bs-target="#categoryModal">
                  {categoryDisplayValue ?

                    <>
                      <div class='img-category'>
                        <img src={categoryDisplayValue.category_icon} />
                      </div>
                      <div class='right-category-transaction'>


                        <div class='title-right-category' style={{ color: '#000' }}>
                          {categoryDisplayValue.category_name}
                        </div>

                      </div>
                    </>
                    :
                    <>
                      <div class='img-category'>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Square_gray.svg/2048px-Square_gray.svg.png' />
                      </div>
                      <div class='right-category-transaction'>


                        <div class='title-right-category'>
                          Chọn nhóm
                        </div>

                      </div>
                    </>
                  }

                </div>
                <div class='bottom-transaction note-transaction d-flex align-items-center p-3' data-bs-toggle="modal" data-bs-target="#noteModal">
                  <div class='img-category'>

                    <i class="fa-regular fa-note-sticky"></i>
                  </div>
                  <div class='right-bottom-transaction'>
                    <div class='title-right-bottom'>
                      {noteValue ? noteValue : <span>Ghi chú</span>}
                      {/* Ghi chú */}
                    </div>

                  </div>
                </div>
                <div class='bottom-transaction d-flex align-items-center p-3'>
                  <div class='img-category'>

                    <i class="fa-solid fa-calendar-week"></i>
                  </div>
                  <div class='right-bottom-transaction'>
                    <div class='title-right-bottom'>
                      <DatePicker onChange={onChange} />

                    </div>

                  </div>
                </div>
                <div class='bottom-transaction d-flex align-items-center p-3' data-bs-toggle="modal" data-bs-target="#walletModal">



                  <div class='img-category'>

                    <img src={walletValue.wallet_icon} />

                  </div>
                  <div class='right-bottom-transaction'>
                    <div class='title-right-bottom'>
                      {walletValue.wallet_name}
                    </div>

                  </div>
                </div>

              </div>
            </div>
            <div class="modal-footer">
              {amount != 0 && dateValue && walletValue && categoryValue ?
                <>
                  <button type="button" class="btn btn-danger" data-bs-dismiss="modal" style={{
                    width: '100%',
                  }}
                    onClick={() => {
                      handleSaveTransaction()
                    }}

                  >Lưu</button>
                </>
                :
                <>
                  <button type="button" class="btn btn-danger" disabled data-bs-dismiss="modal" style={{
                    width: '100%',
                  }}>Lưu</button>
                </>
              }



            </div>
          </div>
        </div>
      </div>
      {/* //! Note modal */}
      <div class="modal fade" id="noteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content ">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Note</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <textarea
                id="multiLineInput"
                value={noteValue}
                onChange={handleNoteChange}
                style={{
                  width: '100%', // Chiếm hết chiều dài rộng
                  height: '400px', // Chiều cao tùy ý
                  boxSizing: 'border-box', // Đảm bảo kích thước tính toán bao gồm cả padding và border
                }} />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* //! Wallet modal */}
      <div class="modal fade" id="walletModal" tabindex="-1" aria-labelledby="walletModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content ">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="walletModalLabel">Wallet</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              {CurrentListWallet.map(wallet =>
                <div class='wallet-item d-flex align-items-center' data-bs-dismiss="modal" onClick={
                  () => {
                    updateWalletValue(wallet)
                  }
                }>
                  <div>
                    <img class='img-wallet' alt='Anh Wallet' src='https://static.moneylover.me/img/icon/ic_category_all.png' />
                  </div>
                  <div class='d-flex flex-column info'>
                    <div class='name-wallet-navbar-dropdown'>{wallet.wallet_name}</div>
                    <div class='total-wallet-navbar-dropdown'>+{wallet.total} ₫</div>
                  </div>
                  {wallet.wallet_name == walletValue.wallet_name ?
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


                </div>
              )}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* //! Category modal */}
      <div class="modal fade" id="categoryModal" tabindex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content ">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="categoryModalLabel">Wallet</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <ul class="category-list">
                {arrayCategory ? <>

                  {arrayCategory.map(category =>
                    <li class="category">
                      <div class='wrap-container d-flex align-items-center' data-bs-dismiss="modal"

                        onClick={
                          () => {
                            updateCategoryValueParent(category)
                          }
                        }
                      >
                        <div class='icon-category'>
                          <img src={category.category_category_icon} />
                        </div>
                        <div class='name-category'>  {category.category_category_name}</div>
                      </div>


                      <ul class="sub-category ">
                        {category.categoryChild ?
                          category.categoryChild.map(categoryChild =>
                            <li class='sub-category-item d-flex align-items-center' data-bs-dismiss="modal"
                              onClick={
                                () => {
                                  updateCategoryValueChild(category.category_category_id, categoryChild)
                                }
                              }

                            >
                              <div class='icon-sub-category'>
                                <img src={categoryChild.category_child_category_child_icon} />
                              </div>
                              <div class='name-sub-category'>  {categoryChild.category_child_category_child_name}</div>
                            </li>
                          )
                          : null}


                      </ul>
                    </li>
                  )}

                </> : null}



              </ul>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* //! Create Wallet Modal */}
      <div class="modal fade modal-new-wallet" id="walletCreateModal" tabindex="-1" aria-labelledby="createWalletModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="createWalletModalLabel">Create Wallet</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class='container-new-wallet-modal'>
                <div class='amount-new-wallet-modal d-flex align-items-center p-3' >
                  <div class='coin-new-wallet-modal'>
                    VND
                  </div>
                  <div class='detail-amount'>
                    <div class='title-detail-amount'>
                      Số dư trong ví
                    </div>
                    <div class='number-detail-amount'>
                      <input
                        type="number"
                        id="moneyInput"
                        value={amountNewWallet}
                        onChange={handleAmountNewWalletChange}
                      // Các thuộc tính khác bạn muốn thêm vào đây

                      />
                    </div>
                  </div>

                </div>

                <div class='bottom-new-wallet note-new-wallet d-flex align-items-center p-3'>
                  <div class='img-category'>

                    <i class="fa-regular fa-note-sticky"></i>
                  </div>
                  <div class='right-bottom-new-wallet'>
                    <div class='title-right-bottom'>
                      <input type="text" id="walletName" name="walletName" placeholder="Nhập tên ví" onChange={(e) => {

                        changeNameNewWalle(e)
                      }} />
                      {checkNewNameWallet ? <span class ='text-danger ms-3'>Tên ví đã tồn tại</span> : null}  

                      
                    </div>

                  </div>
                </div>



              </div>
            </div>
            <div class="modal-footer">
              {nameNewWalletValue && !checkNewNameWallet ?
                <>
                  <button type="button" class="btn btn-danger" data-bs-dismiss="modal" style={{
                    width: '100%',
                  }}
                    onClick={() => {
                      handleSaveNewWallet()
                    }}

                  >Lưu</button>
                </>
                :
                <>
                  <button type="button" class="btn btn-danger" disabled data-bs-dismiss="modal" style={{
                    width: '100%',
                  }}>Lưu</button>
                </>
              }



            </div>
          </div>
        </div>
      </div>
    </>
  )
}
