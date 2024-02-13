import React, { useState, useRef } from "react";
import "./Transaction.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { Button } from "react-bootstrap";

export default function TransactionForm({
  setShowTransactionForm,
  addTransaction,
  transactions,
  setTransactions,
  transactionFormState,
  setTransactionFormState
}) {
  
  const [errorMessage, setErrorMessage] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate] = useState(new Date());
  const inputRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(transactionFormState);
    if (transactionFormState.category === "") {
      setErrorMessage("Please select a category");
    return;
  }
    try {
      const { data } = await addTransaction({
        variables: {
          title: transactionFormState.title,
          amount: parseFloat(transactionFormState.amount),
          date: transactionFormState.date,
          category: transactionFormState.category,
          description: transactionFormState.description,
        },
      });

      setTransactionFormState({
        title: "",
        amount: null,
        date: "",
        category: "",
        description: "",
      });
      setShowTransactionForm(false);
      setTransactions([...transactions, data.addTransaction]);
    } catch (err) {
      console.error(err);
    }
  }

  // handles date selection
  function handleDateSelect(date) {
    setTransactionFormState({
      ...transactionFormState,
      date: date.toLocaleDateString(), // formats string MM/DD/YYYY, but 0 doesn't show, not sure how to apply the date formatting helper
    });
  }

  function handleChange(e) {
    if (!e.target.value.length) {
      setErrorMessage(`${e.target.name} is required`);
    }

    if (!errorMessage) {
      setTransactionFormState({
        ...transactionFormState,
        [e.target.name]: e.target.value,
      });
    }
  }

  // handles when user clicks in transaction date input field
  function handleInputClick() {
    setShowDatePicker(true); // sets date picker to true, so it displays
  }

  // when a user clicks outside of the input field / date picker component
  // only closes date picker if you focus on date input field and focus on another
  // if you click date picker and select another input field, it won't close it
  function handleInputBlur() {
    if (inputRef.current.contains(document.activeElement)) {
      return;
    }
    setShowDatePicker(false);
  }

  return (
    <>
      <div className="transaction-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="cool">Transaction Title:</label>
            <textarea
              name="title"
              className="form-control"
              id="title"
              rows="1"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="date" className="cool">Transaction Date</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="date"
                name="date"
                value={transactionFormState.date}
                // satisfies requirement of onChange prop where value of input is controlled by component state? found this on stack overflow
                onChange={() => { }}
                onClick={handleInputClick}
                onBlur={handleInputBlur}
                ref={inputRef}
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleInputClick}
                >
                  <FaCalendarAlt size={20} />
                </button>
              </div>
              {showDatePicker && (
                <div className="date-picker-container">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      handleDateSelect(date);
                      setShowDatePicker(false);
                    }}
                    inline
                  />
                </div>
              )}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="amount" className="cool">Transaction Amount (USD):</label>
            <input
              className="form-control"
              id="amount"
              name="amount"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category" className="cool">Select a Category:</label>
            <select
              className="form-control form-select"
              id="category"
              onChange={handleChange}
              name="category"
              value={transactionFormState.category} 
            >
              <option value="" disabled selected hidden>Add a category</option>
              <option value="Housing">Housing</option>
              <option value="Food-Groceries">Food-Groceries</option>
              <option value="Restaurant/Fast-Food">Restaurant/Fast-Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Medical/Health">Medical/Health</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Vacations">Vacations</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description" className="cool">Transaction Description:</label>
            <textarea
              name="description"
              className="form-control"
              id="description"
              rows="3"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group cool" >
            <Button variant="primary" type="submit" >
              Add Transaction
            </Button>
            {errorMessage ? (
              <p className="error-message">{errorMessage}</p>
            ) : null}
          </div>
        </form>
      </div>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    </>
  );
}

