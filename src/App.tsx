import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import { Wrapper, StyledButton } from './App.style';
import axios from 'axios';
import Item from './components/Item';
import Cart from './components/Cart';

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}


function App() {

  const [products, setProducts] = useState<CartItemType[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  useEffect((()=> {
    axios.get<CartItemType[]>('http://fakestoreapi.com/products')
    .then(res => setProducts(prev => [...res.data]))
    .catch(e => console.log(e));
  }), [])

  const getTotalItem = (items: CartItemType[]) => 
    items.reduce((acc: number, cur) => acc + cur.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
       const isItemInCart = prev.find(item => item.id === clickedItem.id);
       console.log(isItemInCart)
       if (isItemInCart) {
         return prev.map(item => (
          item.id === clickedItem.id 
          ? {...item, amount: item.amount + 1} 
          : item
         ))
       }
       return [...prev, {...clickedItem, amount: 1}]
    })
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => (
      prev.reduce((acc, item) => {
        if(item.id === id) {
          if(item.amount === 1) return acc;
          return [...acc, {...item, amount: item.amount - 1}]
        } else {
          return [...acc, item]
        }
      }, [] as CartItemType[])
    ))
  };

  return (
      <Wrapper>
        <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
          <Cart 
          cartItems={cartItems} 
          addToCart={handleAddToCart} 
          removeFromCart={handleRemoveFromCart} />
        </Drawer>
        <StyledButton onClick={() => setCartOpen(true)} >
          <Badge badgeContent={getTotalItem(cartItems)} color='error'>
             <AddShoppingCartIcon />
          </Badge>
        </StyledButton>
      <Grid container spacing={3}>
          {products?.map(item => {
            return (
              <Grid item key={item.id} xs={12} sm={4}> 
                  <Item item={item} handleAddToCart={handleAddToCart} />
              </Grid>
            )
          })}
      </Grid>
      </Wrapper>
  );
}

export default App;
