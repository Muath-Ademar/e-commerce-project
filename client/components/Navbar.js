'use client'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { CreditCardIcon, ShoppingCartIcon, XCircleIcon } from '@heroicons/react/24/solid';
import Register from './Register';
import SearchBar from './SearchBar';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Person, SettingsInputComponent } from '@mui/icons-material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Login from './Login';
import NameAndEmail from './NameAndEmail';


const Navbar = () => {
    const [showLogin, setShowLogin] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [openCart, setOpenCart] = useState(false)
    const [productsInCart, setProductsInCart] = useState([])
    const [userId, setUserId] = useState()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [openProfile, setOpenProfile] = useState(false)
    const router = useRouter()
    const cartRef = useRef(null);
    const profileRef = useRef(null);

    const useOutsideClick = (ref, callback) => {
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    callback();
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref, callback]);
    };


    useOutsideClick(cartRef, () => {
        setOpenCart(false);
    });

    useOutsideClick(profileRef, () => {
        setOpenProfile(false);
    });


    const getUser = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/user', { withCredentials: true })
            setFirstName(res.data.user.firstName)
            setLastName(res.data.user.lastName)
            setEmail(res.data.user.email)

        } catch (error) {
            console.log('error: ' + error)
        }
    }

    const logout = () => {
        axios.get('http://localhost:8000/api/logout', { withCredentials: true })
            .then(res => {
                setUserId(null)
                router.push('/')
            })
            .catch(err => console.log(err))
    }



    const authUser = async () => {
        try {

            const res = await axios.get('http://localhost:8000/api/auth', { withCredentials: true });
            const user = res.data.user.id
            setUserId(user)

        }
        catch (error) {
            console.log('error', error)
        }
    }
    useEffect(() => {
        authUser()
        getUser()
    }, [])


    let total = 0

    useEffect(() => {
        const loadCart = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/auth', { withCredentials: true });
                const user = res.data.user;

                const cartRes = await axios.get(`http://localhost:8000/api/cart/${user.id}`, { withCredentials: true });

                const items = Array.isArray(cartRes.data.cart.items)
                    ? cartRes.data.cart.items.map(item => ({
                        _id: item._id,
                        productName: item.productName,
                        price: item.price,
                        images: item.images,
                        quantity: item.quantity,
                        size: item.size,
                        color: item.color //make sure to double check this, if there is an error it could be from here
                    }))
                    : [];
                console.log(items)

                setProductsInCart(items);
            } catch (error) {
                const storedItems = localStorage.getItem('ITEM');
                if (storedItems) {
                    setProductsInCart(JSON.parse(storedItems));
                } else {
                    setProductsInCart([]);
                }
            }
        };

        loadCart(); // Initial load
        window.addEventListener('cart-updated', loadCart);

        return () => {
            window.removeEventListener('cart-updated', loadCart);
        };
    }, []);


    for (let product of productsInCart) {
        total += product.price * product.quantity
    }
    const goToOrder = () => {
        if (userId) {
            if (productsInCart.length == 0) {
                alert('please add items to your cart before checkout')
            } else {

                const orderData = {
                    userId: userId,
                    products: productsInCart.map(item => ({
                        productId: item._id,
                        productQuantity: item.quantity,
                        priceAtPurchase: item.price,
                        size: item.size,
                        color: item.color, // check this again to see how to make it work
                        productName: item.productName,  // for UI rendering
                    })),
                    shippingAddress: {
                        fullName: '',
                        addressLine: '',
                        city: '',
                    },
                    total: total // for UI rendering
                }
                localStorage.setItem('ORDER_DATA', JSON.stringify(orderData))
                router.push('/order')
            }


        } else {
            setShowModal(true)
        }
    }


    const removeItemsfromLocalStorage = async (id) => {


        let isAuthenticated = false;

        try {
            const res = await axios.get('http://localhost:8000/api/auth', { withCredentials: true });
            isAuthenticated = !!res.data.user;
        } catch (error) {
            // Log and proceed as guest
            console.warn('Auth check failed, assuming guest user:', error.response?.status);
        }

        const updated = productsInCart.filter(p => String(p._id) !== String(id));

        if (isAuthenticated) {
            try {
                if (!id) {
                    console.error('Product ID is undefined, cannot delete.');
                    return;
                }
                const deleteRes = await axios.delete(`http://localhost:8000/api/cart/remove/${id}`, { withCredentials: true });
                console.log('Delete response:', deleteRes.status);
            } catch (error) {
                console.error('Failed to delete from server:', error);
                return; // Optional: stop here if you want to avoid showing incorrect UI
            }
        } else {
            // Guest user - remove from localStorage
            localStorage.setItem('ITEM', JSON.stringify(updated));
        }

        // In both cases, update the cart in UI
        setProductsInCart(updated);
    };





    const handleCartClick = () => {
        if (openCart === false) {
            setOpenCart(true)
            setOpenProfile(false)
        }
        else {
            setOpenCart(false)
        }
    }

    const handleCartClose = () => {
        setOpenCart(false)
    }

    const handleProfileOpen = () => {
        if (openProfile === false) {
            setOpenProfile(true)
            setOpenCart(false)
        }
        else {
            setOpenProfile(false)
        }
    }
    const handleProfileClose = () => {
        setOpenProfile(false)
    }



    return (
        <>
            <div className='bg-white shadow-sm px-8 py-4 flex items-center justify-between text-black'>

                <div className='text-xl font-bold tracking-wide'><Link href={'/'}>Home</Link></div>
                <div className='flex-1 flex items-center justify-center space-x-8'>
                    <Link href="#" className='text-sm hover:text-[#D99655] transition'>About</Link>
                    <Link href="/products" className='text-sm hover:text-[#D99655] transition'>Products</Link>
                    <Link href="/contactus" className='text-sm hover:text-[#D99655] transition'>Contact Us</Link>
                    {!userId &&
                        <button
                            onClick={() => setShowModal(true)}
                            className='text-sm hover:text-[#D99655] transition'
                        >
                            Register / Login
                        </button>
                    }
                    <div className='relative ml-4'>
                        <SearchBar />
                    </div>
                </div>
                {userId &&
                    <>
                        <button onClick={handleProfileOpen} className='text-gray-700 hover:text-[#D99655] cursor-pointer transition'>
                            <Person />
                        </button>
                        {openProfile &&
                            <div ref={profileRef} className="absolute right-16 top-14 w-56 bg-white rounded-lg shadow-lg border border-gray-100 z-50 overflow-hidden transition-all duration-200 transform origin-top-right">
                                <div className="py-1">
                                    {/* User Profile */}
                                    <div className="px-4 py-3 border-b border-gray-100 flex items-center space-x-3">
                                        <div>
                                            <NameAndEmail firstName={firstName} lastName={lastName} email={email}/>
                                        </div>
                                        <XCircleIcon width={25} height={25} onClick={handleProfileClose} className='hover:cursor-pointer' />
                                    </div>

                                    {/* Menu Items */}
                                    <button className="w-full px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 text-gray-700 transition-colors duration-150 hover:cursor-pointer" onClick={() => router.push('/orders')}>
                                        <ReceiptLongIcon className="w-5 h-5 text-gray-500" />
                                        <span>Order History</span>
                                    </button>

                                    <button className="w-full px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 text-gray-700 transition-colors duration-150 hover:cursor-pointer">
                                        <CreditCardIcon className="w-5 h-5 text-gray-500" />
                                        <span>Payment Methods</span>
                                    </button>

                                    <button className="w-full px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 text-gray-700 transition-colors duration-150 hover:cursor-pointer">
                                        <FavoriteIcon className="w-5 h-5 text-gray-500" />
                                        <span>Wishlist</span>
                                        <span className="ml-auto bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">3</span>
                                    </button>

                                    <button className="w-full px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 text-gray-700 transition-colors duration-150 hover:cursor-pointer">
                                        <SettingsInputComponent className="w-5 h-5 text-gray-500" />
                                        <span>Account Settings</span>
                                    </button>

                                    {/* Footer */}
                                    <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
                                        <button className="w-full text-left text-sm text-red-600 hover:text-red-800 transition-colors duration-150 hover:cursor-pointer" onClick={logout}>
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }
                    </>
                }
                <div className='ml-4'>
                    <ShoppingCartIcon onClick={handleCartClick} className='h-6 w-6 text-gray-700 hover:text-[#D99655] cursor-pointer transition' />
                    {openCart &&
                        <div ref={cartRef} className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                            <div className="p-4 border-b border-gray-100 font-semibold text-gray-800 flex justify-between items-center">
                                <h1>
                                    Cart Summary
                                </h1>
                                <XCircleIcon width={25} height={25} onClick={handleCartClose} className='hover:cursor-pointer' />
                            </div>

                            <ul className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
                                {productsInCart.length > 0 ? productsInCart.map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50">
                                        <img
                                            src={`http://localhost:8000/${item.images[0]}`}
                                            alt={item.productName}
                                            className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                                        />
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-gray-800">{item.productName}</div>
                                            <div className="text-xs text-gray-500">Quantity: {item.quantity}<br />Size: {item.size} <br /> Color: {item.color}</div>
                                        </div>
                                        <div className="text-sm font-semibold text-gray-700">${Number(item.price || 0).toFixed(2)}</div>
                                        <XCircleIcon width={25} height={25} onClick={() => removeItemsfromLocalStorage(item._id)} className='hover:cursor-pointer' />
                                    </li>
                                )) : (
                                    <p className="p-4 text-gray-500">Cart is empty</p>
                                )}
                            </ul>

                            <div className="p-4 border-t border-gray-100">
                                <div className="flex justify-between text-sm font-medium text-gray-700 mb-3">
                                    <span>Subtotal</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <button onClick={goToOrder} className="w-full py-2 px-4 bg-[#D99655] text-white text-sm font-semibold rounded-lg hover:bg-[#c9833d] transition">
                                    Checkout
                                </button>
                            </div>
                        </div>

                    }
                </div>
            </div>
            {showModal ? (
                <div className="fixed inset-0 z-50">
                    {/* Blur overlay (applies to the page behind) */}
                    <div
                        className="fixed inset-0 backdrop-blur-[4px]"
                        onClick={() => {
                            setShowModal(false);
                            setShowLogin(false);
                        }}
                    ></div>

                    {/* Modal content */}
                    <div className="fixed inset-0 flex justify-center items-center">
                        <div className="bg-white rounded-xl shadow-xl relative w-[28rem] h-[20rem] mb-50 max-w-xl">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setShowLogin(false);
                                }}
                                className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl font-bold"
                            >
                                &times;
                            </button>
                            {showLogin ? (
                                <Login
                                    onLoginSuccess={() => {
                                        setShowModal(false);
                                        setShowLogin(false);
                                        setOpenProfile(false)
                                        authUser();
                                        getUser() ; {/*you need to call the get user method again here for it to fetch the new user info, other wise it wont work untill you refresh */}
                                    }}
                                    showLogin={showLogin}
                                    setShowLogin={setShowLogin}
                                />
                            ) : (
                                <Register
                                    onClose={() => setShowModal(false)}
                                    onRegisterSuccess={()=> {
                                        setOpenProfile(false);
                                        authUser();
                                        getUser() ; {/*you need to call the get user method again here for it to fetch the new user info, other wise it wont work untill you refresh */}
                                    }}
                                    showLogin={showLogin}
                                    setShowLogin={setShowLogin}
                                    
                                />
                            )}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Navbar;
