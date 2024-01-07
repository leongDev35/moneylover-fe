import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from "axios";
import { useSelector } from "react-redux";
import { SITE } from "../../App";
import { generateDateRange } from '../../function/getDateFillPage';
export default function FillNav({ setWallet, setCategory, setTimeRange ,timeRange}) {
  const [dateRange, setDateRange] = useState();
  //! dateRange
  function handleSelectDateRange(dateRange) {
    console.log(dateRange);
    setTimeRange(dateRange.range)
  }
  useEffect(() => {

    setDateRange(generateDateRange())
  }, [])
  console.log(dateRange);
  //! user
  const user = useSelector(({ users }) => {
    return users.currentUser

  })
  //! wallet
  const CurrentListWallet = useSelector(({ wallet }) => {
    return wallet.currentListWallet
  })
  const walletDefault = useSelector(({ wallet }) => {
    return wallet.defaultWallet

  })
  const [walletChoice, setWalletChoice] = useState(walletDefault)

  function changeWalletFill(wallet) {
    setWalletChoice(wallet)
    setWallet(wallet)
  }

  //! category
  let [arrayCategory, setArrayCategory] = useState();
  let [categoryDisplayValue, setCategoryDisplayValue] = useState();
  const getCategory = async () => {
    const resCategory = await axios.get(`${SITE}/category/${user.user_id}`);
    setArrayCategory(resCategory.data)
  }

  function updateCategoryValueParent(categoryParent) {
    setCategory({
      categoryId: categoryParent.category_category_id,
      categoryChildId: null,
    })
    setCategoryDisplayValue({
      category_name: categoryParent.category_category_name,
      category_icon: categoryParent.category_category_icon,

    })


  }
  function updateCategoryValueChild(categoryParentId, categoryChild) {


    setCategory({
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
  function handleReset() {
    setCategoryDisplayValue(null)
    setWalletChoice(walletDefault)
    setWallet(null);
    setCategory(null);
    setTimeRange(null);
  }
  return (
    <>
      <div class='search-bar'>
        <div class='container-search-bar'>
          <div class='search-bar-top d-flex justify-content-between align-items-center'>
            <div class='search-bar-top-left d-flex align-items-center'>

              <div class='icon-backhome d-flex justify-content-center align-items-center'>
                <Link to='/'>

                  <svg data-v-0698e127 data-v-0e0162ea xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={24} height={24} viewBox="0 0 24 24" aria-labelledby="ic_cancel" version="1.1"><defs data-v-0698e127 /> <g data-v-0698e127 id="Icons/account/ic_account" stroke="none" strokeWidth={1} fill="#000" fillRule="evenodd"><rect data-v-0698e127 id="blue-background" fillOpacity={0} fill="#FFFFFF" x={0} y={0} width={24} height={24} /> <polygon data-v-0e0162ea id="Shape" points="20 11 7.83 11 13.415 5.415 12 4 4 12 12 20 13.415 18.585 7.83 13 20 13" data-v-0698e127 /></g></svg>
                </Link>

              </div>
              <div class='title-search-bar'>Search for transaction</div>
            </div>
            <div class='search-bar-top-right' onClick={()=> {
              handleReset()
            }}>
              Reset
            </div>
          </div>

          <div class='search-bar-bottom d-flex flex-wrap'>
            <div class='item-search-bar-bottom' data-bs-toggle="modal" data-bs-target="#exampleModal">
              <div class='container-item'>


                <div class='name-field'>Wallet</div>
                <div class='detail-item d-flex align-items-center'>
                  <img data-v-6bc9d4d3 src="https://static.moneylover.me/img/icon/ic_category_all.png" onerror="if (this.src != 'error.jpg') this.src = 'https://static.moneylover.me/img/icon/icon_2.png'" name={2} width={24} height={24} className="transaction-icon" />

                  <span class='name-item'>
                    {walletChoice.wallet_name}
                  </span>
                  <i class="fa-solid fa-angle-right"></i>

                </div>
              </div>

            </div>
            <div class='item-search-bar-bottom' data-bs-toggle="modal" data-bs-target="#categoryFillNavModal">

              <div class='container-item'>
                <div class='name-field'>Category</div>
                {categoryDisplayValue ?
                  <div class='detail-item d-flex align-items-center'>
                    <img data-v-6bc9d4d3 src={categoryDisplayValue.category_icon} onerror="if (this.src != 'error.jpg') this.src = 'https://static.moneylover.me/img/icon/icon_2.png'" name={2} width={24} height={24} className="transaction-icon" />

                    <span class='name-item'>
                      {categoryDisplayValue.category_name}
                    </span>
                    <i class="fa-solid fa-angle-right"></i>

                  </div>
                  :
                  <div class='detail-item d-flex align-items-center'>
                    <img data-v-6bc9d4d3 src="https://static.moneylover.me/img/icon/ic_category_all.png" onerror="if (this.src != 'error.jpg') this.src = 'https://static.moneylover.me/img/icon/icon_2.png'" name={2} width={24} height={24} className="transaction-icon" />

                    <span class='name-item'>
                      All Category
                    </span>
                    <i class="fa-solid fa-angle-right"></i>

                  </div>
                }


              </div>

            </div>
            <div class='item-search-bar-bottom' data-bs-toggle="modal" data-bs-target="#dateModal">

              <div class='container-item'>
                <div class='name-field'>Date</div>
                <div class='detail-item d-flex align-items-center'>
                  <span class='name-placehoder'>
                {timeRange? timeRange : 'Select time range'}    
                  </span>
               

                  <i class="fa-solid fa-angle-right"></i>

                </div>
              </div>

            </div>
            <div class='item-search-bar-bottom'>

              <div class='container-item'>
                <div class='name-field'>Note</div>
                <div class='detail-item d-flex align-items-center'>

                  <span class='name-placehoder'>
                    Note
                  </span>
                  <i class="fa-solid fa-angle-right"></i>

                </div>
              </div>

            </div>
            <div class='item-search-bar-bottom'>

              <div class='container-item'>
                <div class='name-field'>Location</div>
                <div class='detail-item d-flex align-items-center'>
                  <span class='name-placehoder'>
                    Select location
                  </span>
                  <i class="fa-solid fa-angle-right"></i>

                </div>
              </div>

            </div>
            <div class='item-search-bar-bottom'>

              <div class='container-item'>
                <div class='name-field'>With</div>
                <div class='detail-item d-flex align-items-center'>
                  <span class='name-placehoder'>
                    With
                  </span>
                  <i class="fa-solid fa-angle-right"></i>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Modal Wallet*/}
      <div className="modal fade " id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header modal-wallet-header">
              <h1 className="modal-title fs-5 fw-semibold " id="exampleModalLabel">Select Wallet</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body modal-wallet">


              {/* Total wallet */}
              {CurrentListWallet.map(wallet =>
                <div class='modal-wallet-item d-flex align-items-center ps-3' data-bs-dismiss="modal" onClick={() => {
                  changeWalletFill(wallet)
                }}>
                  <div>
                    <img class='modal-img-wallet' alt='Anh Wallet' src='https://static.moneylover.me/img/icon/ic_category_all.png' />
                  </div>
                  <div class='d-flex flex-column modal-info'>
                    <div class='name-wallet-navbar-modal'>{wallet.wallet_name}</div>
                    <div class='total-wallet-navbar-modal'>+{wallet.total} ₫</div>
                  </div>
                  {wallet.wallet_name == walletChoice.wallet_name ?
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
              <hr class='hr-wallet' />

              {/* <hr /> */}
              {/* <hr class = 'hr-wallet'/> */}




            </div>

          </div>
        </div>
      </div>


      {/* Modal Category*/}
      <div className="modal fade " id="categoryFillNavModal" tabIndex={-1} aria-labelledby="categoryFillNavModalLabel" aria-hidden="true">
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header modal-wallet-header">
              <h1 className="modal-title fs-5 fw-semibold " id="categoryFillNavModalLabel">Select Category</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body modal-wallet">

              {/* //! Search categoryFillNavModal */}
              {/* <div class='d-flex searchbox align-items-center '>
                <div class='p-3'>
                  <i class="fa-solid fa-magnifying-glass"></i>
                </div>
                <input placeholder='Search' class='input-search '></input>
              </div> */}

              {/* //! Pill Category */}
              <ul class="nav nav-pills mb-3 mt-3 d-flex align-items-center justify-content-center pill-category" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-loan" type="button" role="tab" aria-controls="pills-loan" aria-selected="true">DEBT/LOAN</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-expense" type="button" role="tab" aria-controls="pills-expense" aria-selected="false">EXPENSE</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-income" type="button" role="tab" aria-controls="pills-income" aria-selected="false">INCOME</button>
                </li>

              </ul>
              <hr class='hr-wallet' />

              {/* //! Tab Pill content */}
              <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-loan" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                  {/* Total wallet */}
                  <ul class="category-list">
                    {arrayCategory ? <>

                      {arrayCategory.map(category =>


                        <li class="category">
                          {category.category_category_type == 'loan' ?
                            <>
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
                            </>

                            : null}

                        </li>
                      )}

                    </> : null}



                  </ul>

                </div>
                <div class="tab-pane fade" id="pills-expense" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                  <ul class="category-list">
                    {arrayCategory ? <>

                      {arrayCategory.map(category =>


                        <li class="category">
                          {category.category_category_type == 'expense' ?
                            <>
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
                            </>

                            : null}

                        </li>
                      )}

                    </> : null}



                  </ul>
                </div>
                <div class="tab-pane fade" id="pills-income" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">
                  <ul class="category-list">
                    {arrayCategory ? <>

                      {arrayCategory.map(category =>


                        <li class="category">
                          {category.category_category_type == 'income' ?
                            <>
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
                            </>

                            : null}

                        </li>
                      )}

                    </> : null}



                  </ul>
                </div>
                <div class="tab-pane fade" id="pills-disabled" role="tabpanel" aria-labelledby="pills-disabled-tab" tabindex="0">...</div>
              </div>

              {/* <hr class = 'hr-wallet'/> */}




            </div>

          </div>
        </div>
      </div>
      {/* Modal Date*/}
      <div className="modal fade " id="dateModal" tabIndex={-1} aria-labelledby="dateModalLabel" aria-hidden="true">
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header modal-wallet-header">
              <h1 className="modal-title fs-5 fw-semibold " id="dateModalLabel">Select Time Range</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body modal-wallet">


              {!dateRange ? null :
                <>
                  {dateRange.map(range =>
                    <>
                      <div class='modal-wallet-item d-flex align-items-center ps-3' data-bs-dismiss="modal" onClick={()=>{
                        handleSelectDateRange(range)
                      }}>

                        <div class='d-flex flex-column modal-info'>
                          <div class='name-wallet-navbar-modal'>{range.title}</div>
                          <div class='total-wallet-navbar-modal'>
                            <span>{range.range}</span>

                            

                          </div>
                        </div>
                      </div>

                      {/* <hr /> */}
                      <hr class='hr-wallet' />
                    </>
                  )}

                </>
              }
              

              <div class='modal-wallet-item d-flex align-items-center ps-3'>

                <div class='d-flex flex-column modal-info'>
                  <div class='name-wallet-navbar-modal'>Custom</div>
                  <div class='total-wallet-navbar-modal'>
                    <span> - </span>

                  </div>
                </div>
              </div>



            </div>

          </div>
        </div>
      </div>


    </>
  )
}
