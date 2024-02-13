import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME, QUERY_TRANSACTIONS } from "../../utils/queries";
import { DELETE_TRANSACTION, ADD_TRANSACTION } from "../../utils/mutations";
import { Modal } from "react-bootstrap";
import TransactionForm from "../../component/Transaction/TransactionForm";
import TransactionTable from "../../component/Transaction/TransactionTable";

import "./transactions.css";

import Auth from "../../utils/auth";
import "../../component/Transaction/Transaction.css";

const Transactions = ({ transactions, setTransactions }) => {


  const [showTransactionForm, setShowTransactionForm] = useState(false);
  // const [transactionList, setTransactionList] = useState([]);
  const [transactionFormState, setTransactionFormState] = useState({
    title: "",
    date: "",
    amount: 0.0,
    category: "",
    description: "",
  });


  // query transaction data then destructure the transactions from all the data
  const { data, loading, refetch } = useQuery(QUERY_ME);


  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    update(cache, { data: { deleteTransaction } }) {
      try {
        const { transactions } = cache.readQuery({
          query: QUERY_TRANSACTIONS,
        }) ?? { transactions: [] };
  
        const updatedTransactions = transactions.filter(
          (transaction) => transaction._id !== deleteTransaction._id
        );
  
        cache.writeQuery({
          query: QUERY_TRANSACTIONS,
          data: { transactions: updatedTransactions },
        });
  
        const { me } = cache.readQuery({ query: QUERY_ME });
  
        cache.writeQuery({
          query: QUERY_ME,
          data: {
            me: {
              ...me,
              transactions: updatedTransactions,
            },
          },
        });
      } catch (e) {
        console.log("error with mutation!");
        console.error(e);
      }
      
      console.log("updated cache:", cache.data.data);
      refetch();
    },
  });

  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    update(cache, { data: { addTransaction } }) {
      try {
        const { transactions } = cache.readQuery({
          query: QUERY_TRANSACTIONS,
        }) ?? { transactions: [] };

        cache.writeQuery({
          query: QUERY_TRANSACTIONS,
          data: { transactions: [addTransaction, ...transactions] },
        });

        const { me } = cache.readQuery({ query: QUERY_ME });

        cache.writeQuery({
          query: QUERY_ME,
          data: {
            me: { 
              ...me, 
              transactions: [addTransaction, ...me.transactions ],
            },
          },
        });

      } catch (e) {
        console.log("error with mutation!");
        console.error(e);
      }
      
      
      
      console.log("updated cache:", cache.data.data);
    },
    variables: {
      title: transactionFormState.title,
      amount: parseFloat(transactionFormState.amount),
      date: transactionFormState.date,
      category: transactionFormState.category,
      description: transactionFormState.description,
      username: Auth.getProfile().data.username,
    },
  });

  useEffect(() => {
    if (data?.me?.transactions) {
      setTransactions(data?.me?.transactions);
    }
  }, [data]);


  if (loading) {
    return <div>Loading...</div>;
  }



  return (
    <div className="transaction-page">
  
      <div className="mt-5 text-center">
        <h1 id="transaction-table-header" className="cool">Let's Add a Transaction</h1>
        <button
          className="btn add-transaction-button"
          onClick={() => setShowTransactionForm(!showTransactionForm)}
        >
          Add Transaction
        </button>
        {showTransactionForm && (
          <div className="modal-background">
            <div className="modal">
              <Modal show={true} onHide={() => setShowTransactionForm(false)}>
                <Modal.Header closeButton>
              
                </Modal.Header>
                <Modal.Body>
                  <TransactionForm
                    setShowTransactionForm={setShowTransactionForm}
                    addTransaction={addTransaction}
                    transactions={transactions}
                    setTransactions={setTransactions}
                    transactionFormState={transactionFormState}
                    setTransactionFormState={setTransactionFormState}
                  />
                </Modal.Body>
              </Modal>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 d-flex justify-content-center">
        <TransactionTable
          data={data}
          loading={loading}
          deleteTransaction={deleteTransaction}
          transactions={transactions}
          setTransactions={setTransactions}
        />
      </div>
    </div>
  );
};  
export default Transactions
