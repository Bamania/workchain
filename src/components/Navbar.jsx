import React from 'react';

const Navbar = ({ account, balance }) => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Your Company</div>
        <div className="flex items-center">
          <div className="bg-gray-700 p-2 rounded shadow-md text-sm mr-4">
            <h2 className="font-semibold mb-1">Wallet Info</h2>
            <p><strong>Account:</strong> {account}</p>
            <p><strong>Balance:</strong> {balance} ETH</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
