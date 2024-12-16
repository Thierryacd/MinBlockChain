import React, { useState, useEffect } from 'react';
import { getChain, addTransaction, mineBlock, checkChainValidity } from './api';
import './App.css'; // Assurez-vous que le fichier CSS est importé

function App() {
    const [chain, setChain] = useState([]);
    const [transaction, setTransaction] = useState({ sender: '', receiver: '', amount: 0 });
    const [miner, setMiner] = useState("MinerAddress");
    const [isChainValid, setIsChainValid] = useState(null);

    useEffect(() => {
        fetchChain();
    }, []);

    const fetchChain = async () => {
        try {
            const response = await getChain();
            setChain(response.data);
        } catch (error) {
            console.error("Error during loading of the Minblockchain :", error);
        }
    };

    const handleAddTransaction = async () => {
        if (!transaction.sender || !transaction.receiver || transaction.amount <= 0) {
            alert("Please complete all transaction fields.");
            return; 
        }
        try {
            await addTransaction(transaction);
            alert("Transaction added !");
        } catch (error) {
            console.error("Error while adding the transaction :", error);
        }
    };

    const handleMineBlock = async () => {
        try {
            await mineBlock(miner);
            alert("Bloc mined !");
            fetchChain();
        } catch (error) {
            console.error("Error during mining :", error);
        }
    };

    const handleCheckChainValidity = async () => {
        try {
            const response = await checkChainValidity();
            setIsChainValid(response.data); // La réponse sera "true" ou "false"
        } catch (error) {
            console.error("Error while checking blockchain validity:", error);
        }
    };

    return (
        <div className="app">
            <h1>MinCoin</h1>

            <section className="transaction-section">
                <h2>Add a Transaction</h2>
                <input
                    placeholder="Sender"
                    value={transaction.sender}
                    onChange={(e) => setTransaction({ ...transaction, sender: e.target.value })}
                />
                <input
                    placeholder="Receiver"
                    value={transaction.receiver}
                    onChange={(e) => setTransaction({ ...transaction, receiver: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={transaction.amount}
                    onChange={(e) => setTransaction({ ...transaction, amount: parseFloat(e.target.value) })}
                />
                <button onClick={handleAddTransaction}>Add Transaction</button>
            </section>

            <section className="mining-section">
                <h2>Mining a Block</h2>
                <input
                    placeholder="Miner Address"
                    value={miner}
                    onChange={(e) => setMiner(e.target.value)}
                />
                <button onClick={handleMineBlock}>Mine Block</button>
            </section>

            <section className="blockchain-section">
                <h2>Blockchain</h2>
                {chain.length === 0 ? (
                    <p>Loading blockchain...</p>
                ) : (
                    chain.map((block, index) => (
                        <div key={index} className="block">
                            <div className="block-header">
                                <p><strong>Index:</strong> {block.index}</p>
                                <p><strong>Timestamp:</strong> {block.timestamp}</p>
                                <p><strong>Hash:</strong> {block.hash}</p>
                                <p><strong>Previous Hash:</strong> {block.previousHash}</p>
                            </div>
                            <div className="transactions">
                                <h4>Transactions:</h4>
                                <ul>
                                    {block.transactions.map((tx, txIndex) => (
                                        <li key={txIndex}>
                                            {tx.sender ? tx.sender : (tx.amount === 50 ? "System" : "Unknown Sender")}
                                            {" "} - {tx.receiver || "Unknown Receiver"}:
                                            {" "}{tx.amount || "0"} coins
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))
                )}
            </section>

            <section className="validity-section">
                <h2>Blockchain Validity</h2>
                <button onClick={handleCheckChainValidity}>Check Blockchain Validity</button>
                {isChainValid !== null && (
                    <p className={`validity-status ${isChainValid ? 'valid' : 'invalid'}`}>
                        Blockchain is {isChainValid ? "Valid" : "Invalid"}
                    </p>
                )}
            </section>
        </div>
    );
}

export default App;
