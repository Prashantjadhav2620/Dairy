// eslint-disable-next-line no-unused-vars
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../../../context/data/myContext';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../../components/loader/Loader';
// import { useNavigate } from 'react-router-dom';
function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");

    const context = useContext(myContext);
    const { loading, setLoading } = context;
    // const navigate = useNavigate();
    const validatePasswords = () => {
        // Password validation criteria
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (password !== rePassword) {
            toast.error("Passwords do not match. Please enter matching passwords.");
            return false;
        }

        if (!passwordRegex.test(password)) {
            toast.error("Password must be at least 6 characters long and contain at least one uppercase letter, one symbol, and one digit.");
            return false;
        }

        return true;
    };

    const signup = async () => {
        const userData = {
            username: name,
            emailId: email,
            password: password,
            mobileNumber: mobileNumber,
        };

        try {
            setLoading(true);

            const response = await fetch("http://localhost:2620/api/user/register", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                toast.success("Signup successful!");
            } else {
                toast.error("Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during signup:", error.message);
            toast.error("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader />}
            <div className='bg-gray-800 px-10 py-10 rounded-xl'>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                </div>
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name='name'
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Name'
                    />
                </div>
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Re-enter Password'
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Mobile Number'
                    />
                </div>
                <div className='flex justify-center mb-3'>
                    <button
                        onClick={() => validatePasswords() && signup()}
                        className='bg-red-500 w-full text-white font-bold px-2 py-2 rounded-lg'>
                        Signup
                    </button>
                    <ToastContainer />
                </div>
                <div>
                    <h2 className='text-white'>Have an account <Link className='text-red-500 font-bold' to={'/Login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    );
}

export default Signup;
