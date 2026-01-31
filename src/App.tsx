import React, { useState } from 'react';
import './App.css';

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: 'Comida' | 'Transporte' | 'Ocio';
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<'Comida' | 'Transporte' | 'Ocio'>('Comida');

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || parseFloat(amount) <= 0) return;

    const newExpense: Expense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category,
    };

    setExpenses([...expenses, newExpense]);
    setDescription('');
    setAmount('');
  };

  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="page-wrapper">
      <div className="main-card">
        <h1 className="title">Gestor de Gastos</h1>
        
        <form onSubmit={addExpense} className="expense-form">
          <div className="form-group">
            <label>Descripción</label>
            <input
              data-testid="input-description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej. Cena sushi"
            />
          </div>

          <div className="form-group">
            <label>Monto ($)</label>
            <input
              data-testid="input-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label>Categoría</label>
            <select 
              data-testid="select-category"
              value={category} 
              onChange={(e) => setCategory(e.target.value as any)}
            >
              <option value="Comida">Comida</option>
              <option value="Transporte">Transporte</option>
              <option value="Ocio">Ocio</option>
            </select>
          </div>

          <button 
            data-testid="btn-add-expense"
            type="submit" 
            className="btn-submit"
          >
            Agregar Gasto
          </button>
        </form>

        <div className="summary-section">
          <h2 className="total-display">
            Total: <span data-testid="total-amount">${total.toFixed(2)}</span>
          </h2>
          
          <ul data-testid="expense-list" className="expense-list">
            {expenses.map((exp) => (
              <li key={exp.id} className="expense-item">
                <div className="expense-info">
                  <span className="expense-desc">{exp.description}</span>
                  <small className="expense-cat">{exp.category}</small>
                </div>
                <span className="expense-price">-${exp.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;