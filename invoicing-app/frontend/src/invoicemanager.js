import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InvoiceManager = () => {
  const [invoices, setInvoices] = useState([]);
  const [client, setClient] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = () => {
    axios.get('http://localhost:5000/invoices')
      .then(response => {
        setInvoices(response.data);
      })
      .catch(error => {
        console.error('Error fetching invoices:', error);
      });
  };

  const handleCreateInvoice = () => {
    axios.post('http://localhost:5000/createinvoice', { client, amount, description })
      .then(response => {
        fetchInvoices(); // Refresh the invoice list
        setClient('');
        setAmount('');
        setDescription('');
      })
      .catch(error => {
        console.error('Error creating invoice:', error);
      });
  };

  return (
    <div>
      <h1>Invoice Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Client"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleCreateInvoice}>Create Invoice</button>
      </div>
      <ul>
        {invoices.map(invoice => (
          <li key={invoice.id}>
            {invoice.client} - ${invoice.amount} - {invoice.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceManager;
