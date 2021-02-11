import { Wrapper } from './Cart.style';
import CartItem from './CartItem';
import { CartItemType } from '../App';

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart}) =>{
    const calculateTotal = (items: CartItemType[]) => 
       items.reduce((acc: number, item) => acc + item.amount * item.price, 0);
    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? <p>Empty</p> : null}
            {cartItems.map(item => <CartItem 
            key={item.id} 
            item={item} 
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            />)}
            <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        </Wrapper>
    )
}

export default Cart;