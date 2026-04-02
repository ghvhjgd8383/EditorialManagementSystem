// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { authAPI } from '../../services/api';
// import { validateEmail, validatePassword } from '../../utils/validation';
// const SignUp = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     affiliation: '',
//     country: ''
//   });

//   const [errors, setErrors] = useState<{
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   password?: string;
//   affiliation?: string;
//   country?: string;
// }>({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const validateForm = () => {
//   const newErrors = {
//     firstName: !formData.firstName ? 'First name is required' : undefined,
//     lastName: !formData.lastName ? 'Last name is required' : undefined,
//     email: validateEmail(formData.email),
//     password: validatePassword(formData.password),
//     affiliation: !formData.affiliation ? 'Affiliation is required' : undefined,
//     country: !formData.country ? 'Country is required' : undefined
//   };
//   setErrors(newErrors);
//   return !Object.values(newErrors).some(error => error);
// };

//   // const handleChange = (e) => {
//   //   setFormData({
//   //     ...formData,
//   //     [e.target.name]: e.target.value
//   //   });
//   // };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const { name, value } = e.target;
//   setFormData(prev => ({ ...prev, [name]: value }));
  
//   // Real-time validation
//   if (name === 'email') {
//     setErrors(prev => ({ ...prev, email: validateEmail(value) }));
//   } else if (name === 'password') {
//     setErrors(prev => ({ ...prev, password: validatePassword(value) }));
//   } else if (['firstName', 'lastName', 'affiliation', 'country'].includes(name)) {
//     setErrors(prev => ({ ...prev, [name]: value ? undefined : `${name.charAt(0).toUpperCase() + name.slice(1)} is required` }));
//   }
// };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//     return;
//   }
  
//     setLoading(true);
//     setError('');

//     try {
//       const response = await authAPI.register(formData);
      
//       if (response.success) {
//         // ✅ FINAL FIX - Page refresh
//         //window.location.href = '/login';
//         alert('Registration successful! Please log in.');
//       navigate('/login', { replace: true });
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       setError(error.response?.data?.message || 'Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
//           Create Account
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Already have an account?{' '}
//           <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
//             Sign in
//           </Link>
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           {error && (
//             <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
//               {error}
//             </div>
//           )}

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
//                   First Name
//                 </label>
//                 <input
//                   id="firstName"
//                   name="firstName"
//                   type="text"
//                   required
//                   value={formData.firstName}
//                   onChange={handleChange}
                  
//                   className={`mt-1 block w-full border ${
//       errors.firstName ? 'border-red-500' : 'border-gray-300'
//     } rounded-md shadow-sm p-2`}
//                 />
//                 {errors.firstName && (
//     <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
//   )}
//               </div>

//               <div>
//                 <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
//                   Last Name
//                 </label>
//                 <input
//                   id="lastName"
//                   name="lastName"
//                   type="text"
//                   required
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full border ${
//       errors.lastName ? 'border-red-500' : 'border-gray-300'
//     } rounded-md shadow-sm p-2`}
//                 />
//                 {errors.firstName && (
//     <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
//   )}
//               </div>
//             </div>

//             {/* // Update the email input field in signUp.tsx */}
// <div>
//   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//     Email Address
//   </label>
//   <input
//     id="email"
//     name="email"
//     type="email"
//     required
//     value={formData.email}
//     onChange={handleChange}
//     className={`mt-1 block w-full border ${
//       errors.email ? 'border-red-500' : 'border-gray-300'
//     } rounded-md shadow-sm p-2`}
//   />
//   {errors.email && (
//     <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//   )}
// </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full border ${
//       errors.password ? 'border-red-500' : 'border-gray-300'
//     } rounded-md shadow-sm p-2`}
//               />
//               {errors.password && (
//     <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//   )}
//             </div>

//             <div>
//               <label htmlFor="affiliation" className="block text-sm font-medium text-gray-700">
//                 Affiliation
//               </label>
//               <input
//                 id="affiliation"
//                 name="affiliation"
//                 type="text"
//                 required
//                 value={formData.affiliation}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full border ${
//       errors.affiliation ? 'border-red-500' : 'border-gray-300'
//     } rounded-md shadow-sm p-2`}
//               />
//               {errors.affiliation && (
//     <p className="mt-1 text-sm text-red-600">{errors.affiliation}</p>
//   )}
//             </div>

//             <div>
//               <label htmlFor="country" className="block text-sm font-medium text-gray-700">
//                 Country
//               </label>
//               <input
//                 id="country"
//                 name="country"
//                 type="text"
//                 required
//                 value={formData.country}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full border ${
//       errors.country ? 'border-red-500' : 'border-gray-300'
//     } rounded-md shadow-sm p-2`}
//               />
//               {errors.country && (
//     <p className="mt-1 text-sm text-red-600">{errors.country}</p>
//   )}
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//               >
//                 {loading ? 'Creating Account...' : 'Create Account'}
//               </button>
//             </div>
//             <div>
//               <button
//                 type="button"
//                 onClick={() => { window.location.href = 'https://editorialmanagementsystem.onrender.com/api/auth/google'; }}
//                 className="w-full mt-3 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100"
//               >
//                 Continue with Google
//               </button>
//             </div>
//             <div>
//               <button
//                 type="button"
//                 onClick={() => { window.location.href = 'https://editorialmanagementsystem.onrender.com/api/auth/orcid'; }}
//                 className="w-full mt-3 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100"
//               >
//                 Continue with ORCID
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;





import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../../services/api";
import { validateEmail, validatePassword } from "../../utils/validation";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    affiliation: "",
    country: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    const newErrors = {
      firstName: !formData.firstName ? "First name is required" : undefined,
      lastName: !formData.lastName ? "Last name is required" : undefined,
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      affiliation: !formData.affiliation ? "Affiliation is required" : undefined,
      country: !formData.country ? "Country is required" : undefined,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((e) => e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setErrors((prev: any) => ({ ...prev, email: validateEmail(value) }));
    } else if (name === "password") {
      setErrors((prev: any) => ({ ...prev, password: validatePassword(value) }));
    } else {
      setErrors((prev: any) => ({
        ...prev,
        [name]: value ? undefined : `${name} is required`,
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const res = await authAPI.register(formData);

      if (res.success) {
        alert("Registration successful! Please log in.");
        navigate("/login", { replace: true });
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center px-4">

      {/* TOP SECTION */}
      <div className="max-w-lg mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Create your account
        </h2>

        <p className="text-sm text-gray-600 mt-2">
          Join the platform to submit research, track reviews, and collaborate with editors and reviewers.
        </p>

        <p className="text-xs text-gray-500 mt-2">
          Trusted by researchers, authors, and academic institutions.
        </p>
      </div>

      {/* FORM CARD */}
      <div className="max-w-lg mx-auto bg-white border border-gray-300 px-8 py-8">

        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-sm">

          {/* NAME */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">
                First Name
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full border px-3 py-2 ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                Last Name
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full border px-3 py-2 ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-gray-700 mb-1">
              Email Address
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border px-3 py-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            <p className="text-xs text-gray-500 mt-1">
              Used for communication, submission updates, and review notifications.
            </p>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border px-3 py-2 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <p className="text-xs text-gray-500 mt-1">
              Ensure your password is strong and secure.
            </p>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* AFFILIATION */}
          <div>
            <label className="block text-gray-700 mb-1">
              Affiliation / Institution
            </label>
            <input
              name="affiliation"
              value={formData.affiliation}
              onChange={handleChange}
              className={`w-full border px-3 py-2 ${
                errors.affiliation ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {/* COUNTRY */}
          <div>
            <label className="block text-gray-700 mb-1">
              Country
            </label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`w-full border px-3 py-2 ${
                errors.country ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-800 text-white py-2.5 hover:bg-blue-900"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* OAUTH */}
          <div className="border-t pt-5 space-y-3">
            <button
              type="button"
              onClick={() =>
                (window.location.href =
                  "https://editorialmanagementsystem.onrender.com/api/auth/google")
              }
              className="w-full border py-2 hover:bg-gray-100"
            >
              Continue with Google
            </button>

            <button
              type="button"
              onClick={() =>
                (window.location.href =
                  "https://editorialmanagementsystem.onrender.com/api/auth/orcid")
              }
              className="w-full border py-2 hover:bg-gray-100"
            >
              Continue with ORCID
            </button>
          </div>

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700 hover:underline">
              Sign in
            </Link>
          </p>

        </form>

        {/* FOOTER NOTE */}
        <div className="mt-6 pt-4 border-t text-xs text-gray-500 text-center">
          By creating an account, you agree to our platform policies and editorial guidelines.
        </div>

      </div>
    </div>
  );
};

export default SignUp;