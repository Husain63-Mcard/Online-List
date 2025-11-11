// import { useState } from "react";
import { useState } from "react";
import "./App.css";
import Form from "./Form";
import Table from "./Table";
import ExpenseFilter from "./ExpenseFilter";

function App() {
  const [selectedCat, setSelectedCat] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [list, setList] = useState([
    {
      id: 1,
      description: "  Phone",
      amount: 10,
      category: "Utilities",
    },
    {
      id: 2,
      description: "Lenovo",
      amount: 10,
      category: "Utilities",
    },
    {
      id: 3,
      description: "Bags",
      amount: 10,
      category: "Utilities",
    },
  ]);
  const VisibleCat = selectedCat
    ? list.filter((e) => e.category === selectedCat)
    : list;
  // if the user inetr selected category return category else return list
  const total = list.reduce((sum, item) => sum + item.amount, 0);

  return (
    <>
      <h1 className="text-secondry">Welcome to Shoping Catalog Form</h1>
      <Form
        onSubmit={
          (expense) => setList([...list, { ...expense, id: list.length + 1 }])
          // we are adding our form values to our table
        }
      />
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategories={(category) => setSelectedCat(category)}
        />
      </div>
      <Table
        expenses={VisibleCat}
        onDelete={(id) => setList(list.filter((e) => e.id !== id))}
      />
      <button className="btn btn-primary" onClick={() => setShowReceipt(true)}>
        Click for the Receipt
      </button>
      {showReceipt && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "30px",
              maxWidth: "500px",
              width: "90%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "25px" }}>
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  margin: "0 0 10px 0",
                }}
              >
                RECEIPT
              </h2>
              <p style={{ color: "#666", margin: "5px 0" }}>
                {new Date().toLocaleDateString()}{" "}
                {new Date().toLocaleTimeString()}
              </p>
            </div>

            <div
              style={{
                borderTop: "2px dashed #333",
                borderBottom: "2px dashed #333",
                padding: "20px 0",
                margin: "20px 0",
              }}
            >
              {list.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                      {item.description}
                    </div>
                    <div style={{ color: "#666", fontSize: "14px" }}>
                      {item.category}
                    </div>
                  </div>
                  <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                    ${item.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "24px",
                fontWeight: "bold",
                margin: "20px 0",
              }}
            >
              <span>TOTAL:</span>
              <span>N{total.toFixed(2)}</span>
            </div>

            <div
              style={{
                textAlign: "center",
                color: "#666",
                marginBottom: "20px",
              }}
            >
              <p>Thank you for shopping!</p>
            </div>

            <button
              onClick={() => setShowReceipt(false)}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              // onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
              // onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
