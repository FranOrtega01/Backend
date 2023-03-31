import { Product, Cart, User, Message, Ticket} from '../DAO/factory.js'

import ProductRepository from './products.repository.js'
import CartRepository from './carts.repository.js'
import UserRepository from './users.repository.js'
import MessageRepository from './messages.repository.js'
import TicketRepository from './ticket.repository.js'
import Mocking from '../DAO/mocking/products.mock.js';

export const ProductService = new ProductRepository(new Product)
export const CartService = new CartRepository(new Cart)
export const UserService = new UserRepository(new User)
export const MessageService = new MessageRepository(new Message)
export const TicketService = new TicketRepository(new Ticket)
export const MockService = new Mocking(100);