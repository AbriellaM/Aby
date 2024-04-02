const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware for parsing JSON data
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Welcome to my Homepage!')
})


//data to simulate orders
let orders = [
  { id: 1, items: ['Pizza', 'Burger'], table: 1 },
  { id: 2, items: ['Salad'], table: 2 }
];

// Route for getting all orders
app.get('/orders', (req, res) => {
  res.json(orders);
});

// Route for getting a specific order by ID
app.get('/orders/:id', (req, res) => {
  const order = orders.find(order => order.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
});

// Route for placing a new order
app.post('/orders', (req, res) => {
  const { items, table } = req.body;
  if (!items || !table) {
    return res.status(400).json({ message: 'Items and table number are required' });
  }
  const newOrder = {
    id: orders.length + 1,
    items,
    table
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Route for updating an order by ID
app.put('/orders/:id', (req, res) => {
  const order = orders.find(order => order.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  const { items, table } = req.body;
  if (items) order.items = items;
  if (table) order.table = table;
  res.json(order);
});

// Route for deleting an order by ID
app.delete('/orders/:id', (req, res) => {
  const index = orders.findIndex(order => order.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Order not found' });
  }
  orders.splice(index, 1);
  res.status(204).send();
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

module.exports = app;