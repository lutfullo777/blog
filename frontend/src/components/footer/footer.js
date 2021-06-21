import React from "react";
import { Link } from 'react-router-dom'
import './footer.css'

const footer = () => {
  return (
    <div className="footer">
      <div style={{width:'100%', display:'flex', justifyContent:'space-around'}}><Link to='/' className="footer-link"><h4>&copy;2021 Munavarov Lutfullo</h4></Link></div>
      <h4>Shaxsiy Blog</h4>
    </div>
  );
};

export default footer;
